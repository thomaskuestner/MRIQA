"""
Log GUI
"""
from PyQt5.QtCore import QObject, pyqtSignal
from core.component import Component

class LogGui(Component, QObject):
    """
    Log GUI Component
    """
    logged_message = pyqtSignal(str, name="loggedMessage")

    def __init__(self, log_server, properties):
        Component.__init__(self, log_server, properties)
        QObject.__init__(self)
        self.input_observer = LogGui.InputObserver(self)

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, arg):
            self.outer.logged_message.emit(arg)
