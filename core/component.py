"""
Component
"""
from core.observer import Observable, Observer

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

    def log_line(self, line):
        """
        notify log_server with log message
        """
        self.log_notifier.notify_observers([line, self.__class__.__name__])

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
