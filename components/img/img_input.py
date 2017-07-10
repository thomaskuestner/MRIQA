"""
Image Input
"""
import cv2
from core.component import Component

class ImgInput(Component):
    """
    Class for Image Input
    """
    def __init__(self, options):
        super(ImgInput, self).__init__(options)
        self.__file_path = ""
        self.file_path = self.properties['file_path']

    @property
    def file_path(self):
        """
        getter of file_path
        """
        return self.__file_path

    @file_path.setter
    def file_path(self, value):
        self.__file_path = value

    @staticmethod
    def get_parameters():
        """
        return all parameters of the component
        """
        for key, value in ImgInput.__dict__.items():
            if isinstance(value, property):
                print(key)

    def start(self):
        """
        open a file and sends notifier
        """
        super(ImgInput, self).start()
        self.package['data'] = cv2.imread(self.file_path)
        self.log_line('open file')
        self.output_notifier.notify_observers(self.package)
