"""
Jpeg Output
"""
from core.observer import Observer

class JpegOutput:
    """
    Class for JpegOutput
    """
    def __init__(self):
        self.open_observer = JpegOutput.OpenObserver(self)
    # An inner class for observing openings:
    class OpenObserver(Observer):
        """
        Class for observers
        """
        def __init__(self, outer):
            self.outer = outer
        def update(self, observable, arg):
            arg.save('test.png')
