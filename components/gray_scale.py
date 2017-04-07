"""
Gray scale
"""
from core.component import Component

class GrayScale(Component):
    """
    Class for graysacale an image
    """
    def __init__(self, log_server, properties):
        super(GrayScale, self).__init__(log_server, properties)
        self.input_observer = GrayScale.InputObserver(self)

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, arg):
            self.outer.log_line('grayscale image')
            self.outer.output_notifier.notify_observers(arg.convert('LA'))
