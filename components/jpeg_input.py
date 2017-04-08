"""
Jpeg Input
"""
from PIL import Image
from core.component import Component

class JpegInput(Component):
    """
    Class for Jpeg Input
    """

    def get_description(self):
        """
        return an description of the component
        """
        return "Read file from a specified file path"

    def start(self):
        """
        open a file and sends notifier
        """
        image = Image.open(self.properties['file_path'])
        self.log_line('open file')
        self.output_notifier.notify_observers(image)
