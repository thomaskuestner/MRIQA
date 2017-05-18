"""
main.py
"""
import sys
from components.log_server import LogServer
from core.pipeline import Pipeline

# start GUI
if __name__ == '__main__':
    LOGSERVER = LogServer()
    PIPELINE = Pipeline(LOGSERVER, sys.argv[1])
    PIPELINE.run()
