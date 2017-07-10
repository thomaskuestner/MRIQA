"""
Image Output
"""
import cv2
from core.component import Component
from components.log_server import LogLevel

class ImgOutput(Component):
    """
    Class for ImgOutput
    """
    def __init__(self, options):
        super(ImgOutput, self).__init__(options)
        self.input_observer = ImgOutput.InputObserver(self)
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
        for key, value in ImgOutput.__dict__.items():
            if isinstance(value, property):
                print(key)

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, package):
            self.outer.log_line('save file')
            cv2.imwrite(self.outer.file_path, package['data'])
            self.outer.log_line('saved file', LogLevel.SUCCESS)
            self.outer.send({'status': 'stopped'})
