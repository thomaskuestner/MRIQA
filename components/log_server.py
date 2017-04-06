"""
Log Server
"""
from enum import Enum
from time import gmtime, strftime
from core.observer import Observer

class LogLevel(Enum):
    """"
    Enumeration for setting a log level
    """
    INFO = '\033[0m'
    DEBUG = '\033[0;37m'
    SUCCESS = '\033[92m'
    WARNING = '\033[93m'
    ERROR = '\033[91m'

class LogServer:
    """
    Class for LogServer
    """
    def __init__(self):
        self.log_observer = LogServer.LogObserver(self)
    # An inner class for observing openings:
    class LogObserver(Observer):
        """
        Class for log observers
        """
        def __init__(self, outer):
            self.outer = outer
        def update(self, observable, args):
            print(args[2].value,
                  strftime("%Y-%m-%d %H:%M:%S", gmtime()),
                  args[1], ":", args[0], '\033[0m')
