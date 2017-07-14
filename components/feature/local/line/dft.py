"""
DFT
"""
import numpy as np
import cv2
from core.component import Component

class Dft(Component):
    """
    Class for calculate discrete fourier transformation
    """
    def __init__(self, options):
        super(Dft, self).__init__(options)
        self.input_observer = Dft.InputObserver(self)

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, package):
            self.outer.log_line('calculate discrete fourier transformation')
            package['Dft'] = \
                cv2.dft(np.float32(package['data']), flags=cv2.DFT_COMPLEX_OUTPUT).tostring()

            self.outer.output_notifier.notify_observers(package)
