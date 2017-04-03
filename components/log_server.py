"""
Log Server
"""
from time import gmtime, strftime
from core.observer import Observer

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
        def update(self, observable, arg):
            print(strftime("%Y-%m-%d %H:%M:%S", gmtime()), arg[1], ":", arg[0])
