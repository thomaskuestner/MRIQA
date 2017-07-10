"""
Rotate
"""
import cv2
from core.component import Component

class Rotate(Component):
    """
    Class for rotating an image
    """
    def __init__(self, options):
        super(Rotate, self).__init__(options)
        self.input_observer = Rotate.InputObserver(self)
        self.__angle = 0
        self.angle = self.properties['angle']

    @property
    def angle(self):
        """
        getter of angle
        """
        return self.__angle

    @angle.setter
    def angle(self, value):
        self.__angle = value

    @staticmethod
    def get_parameters():
        """
        return all parameters of the component
        """
        for key, value in Rotate.__dict__.items():
            if isinstance(value, property):
                print(key)

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, package):
            self.outer.log_line('rotate image')
            if ('angle' in package) is False:
                package['angle'] = 0
            package['angle'] = package['angle'] + self.outer.angle
            rows, cols = package['data'].shape
            affine_matrix = cv2.getRotationMatrix2D((cols/2, rows/2), self.outer.angle, 1)
            package['data'] = cv2.warpAffine(package['data'], affine_matrix, (cols, rows))
            self.outer.output_notifier.notify_observers(package)
