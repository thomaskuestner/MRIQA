"""
Gray scale
"""
from core.component import Component

class GrayScale(Component):
    """
    Class for graysacale an image
    """
    def __init__(self, logServer):
        super(GrayScale, self).__init__(logServer)
        self.input_observer = GrayScale.InputObserver(self)
        self.output_notifier = GrayScale.OutputNotifier(self)
    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, arg):
            self.outer.log_line('grayscale image')
            self.outer.output_notifier.notify_observers(arg.convert('LA'))
