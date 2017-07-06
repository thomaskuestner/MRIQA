"""
Visualize line charts
"""
from core.component import Component

class Line(Component):
    """
    Class for visualize data in a line chart
    """
    def __init__(self, options):
        super(Line, self).__init__(options)
        self.input_observer = Line.InputObserver(self)

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, package):
            self.outer.log_line('visualize line chart')
            package['status'] = 'sending'
            package['data'] = str(package['data'])
            self.outer.send(package)
            self.outer.output_notifier.notify_observers(package)
