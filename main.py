"""
main.py
"""
from components.log_server import LogServer
from components.jpeg_input import JpegInput
from components.gray_scale import GrayScale
from components.rotate import Rotate
from components.jpeg_output import JpegOutput

# initalize components
LOGSERVER = LogServer()
JPEGINPUT = JpegInput(LOGSERVER)
GRAYSCALE = GrayScale(LOGSERVER)
ROTATE = Rotate(LOGSERVER)
JPEGOUTPUT = JpegOutput(LOGSERVER)

# glue components together
JPEGINPUT.output_notifier.add_observer(GRAYSCALE.input_observer)
GRAYSCALE.output_notifier.add_observer(ROTATE.input_observer)
ROTATE.output_notifier.add_observer(JPEGOUTPUT.input_observer)

# start pipeline
JPEGINPUT.open('IMG_5946_b.JPG')
