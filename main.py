"""
main.py
"""
import sys
from components.log_server import LogServer
from components.gui.gui import Gui
from core.pipeline import Pipeline

# start GUI
if __name__ == '__main__':
    LOGSERVER = LogServer()
    if len(sys.argv) == 1:
        GUI = Gui(LOGSERVER, sys.argv)
        GUI.start()
    else:
        PIPELINE = Pipeline(LOGSERVER, sys.argv[1])
        PIPELINE.run()
