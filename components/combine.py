"""
Combine

GUI-DESCRIPTION
{
    "description": "Combine helps to gether information",
    "url": "https://github.com/thomaskuestner/MRIQA/wiki/Components#combine"
}
"""
from multiprocessing import Queue
from core.component import Component

class Combine(Component):
    """
    Class for condition
    """
    def __init__(self, options):
        super(Combine, self).__init__(options)
        self.input_observer = Combine.InputObserver(self)
        self.notify_counter = Queue()
        self.notify_counter.put(0)
        self.queue = Queue()

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, package):
            notify_counter = self.outer.notify_counter.get()
            self.outer.notify_counter.put(notify_counter + 1)
            self.outer.log_line('combine informations')
            combined_package = dict()
            if not self.outer.queue.empty():
                combined_package = self.outer.queue.get()
            combined_package = {**combined_package, **package}
            self.outer.queue.put(combined_package)
            if notify_counter >= len(self.outer.additional_components):
                self.outer.queue.close()
                self.outer.notify_counter.close()
                self.outer.output_notifier.notify_observers(combined_package)
