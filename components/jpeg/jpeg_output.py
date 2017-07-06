"""
Jpeg Output
"""
from core.component import Component
from components.log_server import LogLevel

class JpegOutput(Component):
    """
    Class for JpegOutput
    """
    def __init__(self, options):
        super(JpegOutput, self).__init__(options)
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
        def update(self, observable, package):
            self.outer.log_line('save file')
            package['data'].save(self.outer.file_path)
            self.outer.log_line('saved file', LogLevel.SUCCESS)
            self.outer.send({'status': 'stopped'})
