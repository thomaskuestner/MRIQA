"""
Jpeg Input
"""
from PIL import Image
from core.component import Component

class JpegInput(Component):
    """
    Class for Jpeg Input
    """
    def __init__(self, file_path, log_server):
        self.file_path = file_path
        super(JpegInput, self).__init__(log_server)

    def open(self):
        """
        open a file and sends notifier
        """
        image = Image.open(self.file_path)
        self.log_line('open file')
        self.output_notifier.notify_observers(image)
