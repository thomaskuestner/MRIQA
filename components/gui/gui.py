"""
Gui Component
"""
import sys
from core.base_component import BaseComponent
from core.pipeline import Pipeline
from PyQt5.QtCore import QObject
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtQml import QQmlApplicationEngine

class MainWindow(QWidget):
    """
    MainWindow class
    """
    def __init__(self, log_server):
        super(MainWindow, self).__init__()
        self.pipeline = None
        self.log_server = log_server
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

class Gui(BaseComponent):
    """
    Class for LogServer
    """
    def __init__(self, log_server, argv):
        BaseComponent.__init__(self)
        self.app = QApplication(argv)
        self.log_server = log_server
        self.main_window = None

    def get_description(self):
        """
        return an description of the component
        """
        return "Gui"

    def start(self):
        """
        open the gui
        """
        self.main_window = MainWindow(self.log_server)
        sys.exit(self.app.exec_())
