"""
Gray scale
"""
from core.observer import Observer, Observable

class GrayScale:
    """
    Class for graysacale an image
    """
    def __init__(self):
        self.open_observer = GrayScale.OpenObserver(self)
        self.open_notifier = GrayScale.OpenNotifier(self)
    # An inner class for observing openings:
    class OpenObserver(Observer):
        """
        Class for observers
        """
        def __init__(self, outer):
            self.outer = outer
        def update(self, observable, arg):
            self.outer.open_notifier.notify_observers(arg.convert('LA'))

    class OpenNotifier(Observable):
        """
        Class for notifier
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
