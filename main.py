"""
main.py
"""
import sys
from PyQt5.QtCore import QObject
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtQml import QQmlApplicationEngine
from components.log_server import LogServer
from core.pipeline import Pipeline

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
        LOGSERVER = LogServer()
        PIPELINE = Pipeline(LOGSERVER, sys.argv[1])
        PIPELINE.run()
