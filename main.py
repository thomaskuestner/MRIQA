"""
main.py
"""
import sys
from importlib import import_module
from pydoc import locate
from lxml import etree
from PyQt5.QtCore import QObject, QThread
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtQml import QQmlApplicationEngine
from components.log_server import LogServer

class Pipeline(QThread):
    """
    pipeline class
    """
    def __init__(self, log_server, file_name):
        super(Pipeline, self).__init__()
        self.log_server = log_server
        self.file_name = file_name

    def run(self):
        """
        startup method
        """
        # read xml file
        pipeline = etree.parse(self.file_name, \
            etree.XMLParser \
            (schema=etree.XMLSchema(etree.XML(open('core/pipeline.xsd', 'r').read()))))
        xml_components = pipeline.xpath('component')
        components = []

        # dynamically load components
        for component in xml_components:
            # read properties
            xml_properties = component.xpath('property')
            properties = dict()
            for component_property in xml_properties:
                property_value = component_property.xpath('value')[0]
                property_value_type = component_property.xpath('value/@type')
                # typecast components
                if len(property_value_type) > 0:
                    property_type = locate(property_value_type[0])
                    property_value = property_type(property_value.text)
                else:
                    property_value = property_value.text
                properties[component_property.xpath('name')[0].text] = property_value
            # get component class
            component_class = getattr(import_module('components.' + \
                component.xpath('name')[0].text), \
                component.xpath('class')[0].text)
            # instantiate class
            components.append(component_class(self.log_server, properties))

        # glue components together
        for index, component in enumerate(components):
            if index + 1 < len(components):
                component.output_notifier.add_observer(components[index + 1].input_observer)

        # start at component
        components[0].start()

class MainWindow(QWidget):
    """
    MainWindow class
    """
    def __init__(self):
        super(MainWindow, self).__init__()
        self.pipeline = None
        self.log_server = LogServer()
        self.log_server.logged_message.connect(self.log_message)

        self.engine = QQmlApplicationEngine()
        self.context = self.engine.rootContext()
        self.context.setContextProperty("main", self.engine)

        self.engine.load('gui/basic.qml')

        self.window = self.engine.rootObjects()[0]
        self.window.show()

        self.filedialog = self.window.findChild(QObject, "mriqa_file_dialog")
        self.filedialog.file_selected.connect(self.start_pipeline)

    def log_message(self, arg):
        """
        log message
        """
        log_text_area = self.window.findChild(QObject, "log_text_area")
        log_text_area.append(arg)

    def start_pipeline(self, file_name):
        """
        start pipeline after file selection
        """
        self.pipeline = Pipeline(self.log_server, file_name)
        self.pipeline.start()

# start GUI
if __name__ == '__main__':
    if len(sys.argv) == 1:
        APP = QApplication(sys.argv)
        MAINWINDOW = MainWindow()
        sys.exit(APP.exec_())
    else:
        log_server = LogServer()
        pipeline = Pipeline(log_server, sys.argv[1])
        pipeline.run()
