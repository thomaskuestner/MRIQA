"""
Base for all Observers
"""
from core.synchronization import Synchronization, synchronize

class Observer:
    """
    Base Class for all Observers
    """
    def update(self, observable, arg):
        '''Called when the observed object is
        modified. You call an Observable object's
        notifyObservers method to notify all the
        object's observers of the change.'''
        pass

class Observable(Synchronization):
    """
    Base Class for all Observables
    """
    def __init__(self):
        self.obs = []
        self.changed = 0
        Synchronization.__init__(self)

    def add_observer(self, observer):
        """
        add an observer
        """
        if observer not in self.obs:
            self.obs.append(observer)

    def delete_observer(self, observer):
        """
        delete an observer
        """
        self.obs.remove(observer)

    def notify_observers(self, arg=None):
        '''If 'changed' indicates that this object
        has changed, notify all its observers, then
        call clearChanged(). Each observer has its
        update() called with two arguments: this
        observable object and the generic 'arg'.'''
        self.mutex.acquire()
        try:
            if not self.changed: return
            # Make a local copy in case of synchronous
            # additions of observers:
            local_array = self.obs[:]
            self.clear_changed()
        finally:
            self.mutex.release()
        # Updating is not required to be synchronized:
        for observer in local_array:
            observer.update(self, arg)

    def delete_observers(self):
        """
        delete all observers
        """
        self.obs = []

    def set_changed(self):
        """
        set changes
        """
        self.changed = 1

    def clear_changed(self):
        """
        cleat changes
        """
        self.changed = 0

    def has_changed(self):
        """
        has changes
        """
        return self.changed

    def count_observers(self):
        """
        count all observers
        """
        return len(self.obs)

synchronize(Observable,
            "addObserver deleteObserver deleteObservers " +
            "setChanged clearChanged hasChanged " +
            "countObservers")
