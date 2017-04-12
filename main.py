"""
main.py
"""
import sys
from importlib import import_module
from pydoc import locate
from lxml import etree
from PyQt5.QtCore import QObject, QTimer, QThread
from PyQt5.QtWidgets import QApplication
from PyQt5.QtQml import QQmlApplicationEngine
from components.log_server import LogServer

class Pipeline(QThread):
    """
    pipeline class
    """
    def __init__(self, log_server):
        super(Pipeline, self).__init__()
        self.log_server = log_server

    def run(self):
        """
        startup method
        """
        # read xml file
        pipeline = etree.parse('pipelines/dummy.xml', \
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

def log_message(arg):
    """
    log message
    """
    log_text_area = WINDOW.findChild(QObject, "log_text_area")
    log_text_area.append(arg)

# start GUI
if __name__ == '__main__':
    # initialize base components
    LOGSERVER = LogServer()
    LOGSERVER.logged_message.connect(log_message)

    APP = QApplication(sys.argv)

    ENGINE = QQmlApplicationEngine()
    CONTEXT = ENGINE.rootContext()
    CONTEXT.setContextProperty("main", ENGINE)

    ENGINE.load('gui/basic.qml')

    WINDOW = ENGINE.rootObjects()[0]
    WINDOW.show()

    TIMER = QTimer()

    PIPELINE = Pipeline(LOGSERVER)
    PIPELINE.start()

    sys.exit(APP.exec_())
