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
    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, arg):
            self.outer.log_line('save file')
            arg.save(self.outer.properties['file_path'])
            self.outer.log_line('saved file', LogLevel.SUCCESS)
