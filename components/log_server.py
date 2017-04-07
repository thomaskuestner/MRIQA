"""
Log Server
"""
import sys
from time import gmtime, strftime
from enum import Enum
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

class LogServer(object):
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
            log_line = args[2].value + strftime("%Y-%m-%d %H:%M:%S", gmtime()) + " " + \
                       args[1] + ": " + \
                       args[0] + '\033[0m'
            if args[2] == LogLevel.ERROR:
                eprint(log_line)
            else:
                print(log_line)

def eprint(*args, **kwargs):
    """
    define print function with print out to stderr
    """
    print(*args, file=sys.stderr, **kwargs)
