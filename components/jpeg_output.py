"""
Jpeg Output
"""
from core.component import Component

class JpegOutput(Component):
    """
    Class for JpegOutput
    """
    def __init__(self, logServer):
        super(JpegOutput, self).__init__(logServer)
        self.input_observer = JpegOutput.InputObserver(self)
    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, arg):
            self.outer.log_line('save file')
            arg.save('test.png')
