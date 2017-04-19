"""
Gray scale
"""
from core.component import Component

class GrayScale(Component):
    """
    Class for grayscale an image
    """
    def __init__(self, log_server, component_id, auto_glue, properties, additional_components):
        super(GrayScale, self).__init__(log_server, component_id, auto_glue, properties, additional_components)
        self.input_observer = GrayScale.InputObserver(self)

    def get_description(self):
        """
        return an description of the component
        """
        return "Grayscale an image"

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, arg):
            self.outer.log_line('grayscale image')
            self.outer.output_notifier.notify_observers(arg.convert('LA'))
