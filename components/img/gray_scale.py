"""
Gray scale
"""
import cv2
from core.component import Component

class GrayScale(Component):
    """
    Class for grayscale an image
    """
    def __init__(self, options):
        super(GrayScale, self).__init__(options)
        self.input_observer = GrayScale.InputObserver(self)

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, package):
            self.outer.log_line('grayscale image')
            package['data'] = cv2.cvtColor(package['data'], cv2.COLOR_BGR2GRAY)
            self.outer.output_notifier.notify_observers(package)
