"""
Visualize Table
"""
from core.component import Component

class Table(Component):
    """
    Class for visualize data in a table
    """
    def __init__(self, options):
        super(Table, self).__init__(options)
        self.input_observer = Table.InputObserver(self)

    def get_description(self):
        """
        return an description of the component
        """
        return "Visualize data in a table"

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, package):
            self.outer.log_line('visualize table')
            package['status'] = 'sending'
            package['data'] = str(package['data'])
            self.outer.send(package)
            self.outer.output_notifier.notify_observers(package)
