"""
Rotate
"""
from core.component import Component

class Rotate(Component):
    """
    Class for rotating an image
    """
    def __init__(self, log_server):
        super(Rotate, self).__init__(log_server)
        self.input_observer = Rotate.InputObserver(self)
    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, arg):
            self.outer.log_line('rotate image')
            self.outer.output_notifier.notify_observers(arg.rotate(90))
