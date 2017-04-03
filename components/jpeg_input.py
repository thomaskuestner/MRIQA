"""
Jpeg Input
"""
from PIL import Image
from core.observer import Observable

class JpegInput:
    """
    Class for Jpeg Input
    """
    def __init__(self):
        self.open_notifier = JpegInput.OpenNotifier(self)
    def open(self, file_path):
        """
        open a file and sends notifier
        """
        image = Image.open(file_path)
        self.open_notifier.notify_observers(image)

    class OpenNotifier(Observable):
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
