"""
Histogram
"""
from cv2 import calcHist
from core.component import Component

class Histogram(Component):
    """
    Class for grayscale an image
    """
    def __init__(self, options):
        super(Histogram, self).__init__(options)
        self.input_observer = Histogram.InputObserver(self)

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, package):
            self.outer.log_line('histogram')
            package['histogram'] = \
                str(calcHist(package['data'].T, [0], None, [256], [0, 256]))
            self.outer.output_notifier.notify_observers(package)
