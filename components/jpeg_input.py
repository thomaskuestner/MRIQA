"""
Jpeg Input
"""
from PIL import Image
from core.component import Component

class JpegInput(Component):
    """
    Class for Jpeg Input
    """
    def __init__(self, logServer):
        super(JpegInput, self).__init__(logServer)
        self.output_notifier = JpegInput.OutputNotifier(self)
    def open(self, file_path):
        """
        open a file and sends notifier
        """
        image = Image.open(file_path)
        self.log_line('open file')
        self.output_notifier.notify_observers(image)
