"""
Component
"""
from core.observer import Observable

class BaseComponent(object):
    """
    Class for components
    """

    def __init__(self):
        self.output_notifier = BaseComponent.OutputNotifier(self)

    def get_description(self):
        """
        return an description of the component
        """
        pass

    @staticmethod
    def get_parameters():
        """
        copy this to every component with parameters and
        change Component to the inherit class name
        return all parameters of the component
        """
        for key, value in BaseComponent.__dict__.items():
            if isinstance(value, property):
                print(key)

    class OutputNotifier(Observable):
        """
        Class for Notifier
        """
        def __init__(self, outer):
            Observable.__init__(self)
            self.outer = outer
        def notify_observers(self, arg=None):
            """
            notify observers
            """
            self.set_changed()
            Observable.notify_observers(self, arg)
