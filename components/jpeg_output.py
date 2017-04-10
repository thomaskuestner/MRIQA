"""
Jpeg Output
"""
from core.component import Component
from components.log_server import LogLevel

class JpegOutput(Component):
    """
    Class for JpegOutput
    """
    def __init__(self, log_server, properties):
        super(JpegOutput, self).__init__(log_server, properties)
        self.input_observer = JpegOutput.InputObserver(self)
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

    def get_description(self):
        """
        return an description of the component
        """
        return "Save image to a specified file path"

    @staticmethod
    def get_parameters():
        """
        return all parameters of the component
        """
        for key, value in JpegOutput.__dict__.items():
            if isinstance(value, property):
                print(key)

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, arg):
            self.outer.log_line('save file')
            arg.save(self.outer.file_path)
            self.outer.log_line('saved file', LogLevel.SUCCESS)
