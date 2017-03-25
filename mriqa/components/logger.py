"""
Compontent for logging messages
"""
from enum import Enum
from mriqa.core import Interface, Component

class LogLevel(Enum):
    """"
    Enumeration for setting a log level
    """
    INFO = '\033[1;37m'
    DEBUG = '\033[0;37m'
    SUCCESS = '\033[92m'
    WARNING = '\033[93m'
    ERROR = '\033[91m'

class ILog(Interface):
    """
    Interface for log messages
    """
    def write_line(self, line, log_level):
        """Called when a logline has to be written"""

class LogServer(Component):
    """
    Component for logging messages
    """
    Component.implements(ILog)

    @classmethod
    def write_line(cls, line, log_level=LogLevel.INFO):
        """
        Write log messages in defined log level color
        """
        print log_level.value +  line + '\033[0m'
