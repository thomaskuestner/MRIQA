"""
Component
"""
from core.observer import Observable, Observer
from core.log_server import LogLevel

class Component(object):
    """
    Class for components
    """
    def __init__(self, log_server, properties):
        self.properties = properties
        self.log_notifier = Component.LogNotifier(self)
        self.log_notifier.add_observer(log_server.log_observer)
        self.output_notifier = Component.OutputNotifier(self)
        self.input_observer = Component.InputObserver(self)

    def get_description(self):
        """
        return an description of the component
        """
        self.log_line('Missing description!', LogLevel.WARNING)

    @staticmethod
    def get_parameters():
        """
        copy this to every component with parameters and
        change Component to the inherit class name
        return all parameters of the component
        """
        for key, value in Component.__dict__.items():
            if isinstance(value, property):
                print(key)

    def start(self):
        """
        has to be implemented in components which can be at the beginning of a pipeline
        """
        self.log_line('start-Method is not defined!', LogLevel.ERROR)

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
