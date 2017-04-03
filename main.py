"""
main.py
"""
from components.jpeg_input import JpegInput
from components.gray_scale import GrayScale
from components.jpeg_output import JpegOutput

JPEGINPUT = JpegInput()
GRAYSCALE = GrayScale()
JPEGOUTPUT = JpegOutput()
JPEGINPUT.open_notifier.add_observer(GRAYSCALE.open_observer)
GRAYSCALE.open_notifier.add_observer(JPEGOUTPUT.open_observer)
JPEGINPUT.open('IMG_5946_b.JPG')
