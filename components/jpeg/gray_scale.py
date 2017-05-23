"""
Gray scale
"""
from core.component import Component
from components.log_server import LogLevel

class GrayScale(Component):
    """
    Class for grayscale an image
    """
    def __init__(self, options):
        super(GrayScale, self).__init__(options)
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
        def update(self, observable, package):
            self.outer.log_line('grayscale image')
            package['data'] = package['data'].convert('LA')
            self.outer.output_notifier.notify_observers(package)
