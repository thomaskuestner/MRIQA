"""
Gui Component
"""
import sys
from time import gmtime, strftime
from enum import Enum
from core.base_component import BaseComponent
from core.pipeline import Pipeline
from core.observer import Observer
from PyQt5.QtCore import QObject
from PyQt5.QtWidgets import QApplication
from PyQt5.QtQml import QQmlApplicationEngine

class LogLevel(Enum):
    """"
    Enumeration for setting a log level
    """
    INFO = '\033[0m'
    DEBUG = '\033[0;37m'
    SUCCESS = '\033[92m'
    WARNING = '\033[93m'
    ERROR = '\033[91m'

class Gui(BaseComponent):
    """
    Class for LogServer
    """
    def __init__(self, log_server, argv):
        BaseComponent.__init__(self)
        self.app = QApplication(argv)
        self.log_server = log_server
        self.window = None
        self.pipeline = None
        self.log_observer = Gui.LogObserver(self)

    def get_description(self):
        """
        return an description of the component
        """
        return "Gui"
    def start_pipeline(self, file_name):
        """
        start pipeline after file selection
        """
        self.pipeline = Pipeline(self.log_server, file_name, gui=self)
        self.pipeline.start()

    def log_message(self, arg):
        """
        log message
        """
        log_text_area = self.window.findChild(QObject, "log_text_area")
        log_text_area.append(arg)

    def start(self):
        """
        open the gui
        """
        engine = QQmlApplicationEngine()
        context = engine.rootContext()
        context.setContextProperty("main", engine)

        engine.load('gui/basic.qml')

        self.window = engine.rootObjects()[0]
        self.window.show()

        filedialog = self.window.findChild(QObject, "mriqa_file_dialog")
        filedialog.file_selected.connect(self.start_pipeline)
        sys.exit(self.app.exec_())

    class LogObserver(Observer):
        """
        Class for log observers
        """
        def __init__(self, outer):
            self.outer = outer
        def update(self, observable, args):
            log_message = strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " " + \
                       args[1] + ": " + \
                       args[0]
            log_line = args[2].value + log_message + '\033[0m'
            self.outer.log_message(log_line)
