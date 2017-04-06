# Util/Synchronization.py
'''Simple emulation of Java's 'synchronized'
keyword, from Peter Norvig.'''
import threading

def synchronized(method):
    """
    synchronized method
    """
    def mutex(*args):
        """
        method for mutex
        """
        self = args[0]
        self.mutex.acquire()
        try:
            return method(*args)
        finally:
            self.mutex.release()
    return mutex

def synchronize(klass, names=None):
    """Synchronize methods in the given class.
    Only synchronize the methods whose names are
    given, or all methods if names=None."""
    if isinstance(names, str):
        names = names.split()
    for (name, val) in klass.__dict__.items():
        if callable(val) and name != '__init__' and (names is None or name in names):
            # print("synchronizing", name)
            setattr(klass, name, synchronized(val))

# You can create your own self.mutex, or inherit
# from this class:
class Synchronization(object):
    """
    Class for Synchronization
    """
    def __init__(self):
        self.mutex = threading.RLock()
