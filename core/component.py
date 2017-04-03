"""
Component
"""
from core.observer import Observable, Observer
from components.log_server import LogLevel

class Component:
    """
    Class for components
    """
    def __init__(self, logServer):
        self.log_notifier = Component.LogNotifier(self)
        self.log_notifier.add_observer(logServer.log_observer)
        self.output_notifier = Component.OutputNotifier(self)
        self.input_observer = Component.InputObserver(self)

    class OutputNotifier(Observable):
        """
        Class for Notifier
        """
        def __init__(self, outer):
            Observable.__init__(self)
            self.outer = outer
        def notify_observers(self, arg=None):
            """
            notifiy observers
            """
            self.set_changed()
            Observable.notify_observers(self, arg)

    class InputObserver(Observer):
        """
        Class for observers
        """
        def __init__(self, outer):
            self.outer = outer

    def log_line(self, *args):
        """
        notify log_server with log message and log level
        """
        line = args[0]
        if len(args) == 1:
            log_level = LogLevel.INFO
        elif len(args) == 2:
            log_level = args[1]

        self.log_notifier.notify_observers([line, self.__class__.__name__, log_level])

    class LogNotifier(Observable):
        """
        Class for Notifier
        """
        def __init__(self, outer):
            Observable.__init__(self)
            self.outer = outer
        def notify_observers(self, arg=None):
            """
            notifiy observers
            """
            self.set_changed()
            Observable.notify_observers(self, arg)
