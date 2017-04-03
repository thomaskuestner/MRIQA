"""
main.py
"""
from components.log_server import LogServer
from components.jpeg_input import JpegInput
from components.gray_scale import GrayScale
from components.jpeg_output import JpegOutput

LOGSERVER = LogServer()
JPEGINPUT = JpegInput(LOGSERVER)
GRAYSCALE = GrayScale(LOGSERVER)
JPEGOUTPUT = JpegOutput(LOGSERVER)
JPEGINPUT.output_notifier.add_observer(GRAYSCALE.input_observer)
GRAYSCALE.output_notifier.add_observer(JPEGOUTPUT.input_observer)
JPEGINPUT.open('IMG_5946_b.JPG')
