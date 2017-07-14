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
            if len(package['data'].shape) > 2:
                _, _, z_index = package['data'].shape
            else:
                z_index = 1
            package['histogram'] = dict()
            image_slice = 0
            while image_slice < z_index:
                package['histogram'][str(image_slice)] = \
                    str(calcHist(package['data'].T, [image_slice], None, [256], [0, 256]))
                image_slice = image_slice + 1
            self.outer.output_notifier.notify_observers(package)
