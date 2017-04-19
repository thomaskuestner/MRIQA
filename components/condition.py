"""
Condition
"""
from core.component import Component

class Condition(Component):
    """
    Class for condition
    """
    def __init__(self, log_server, component_id, auto_glue, properties, additional_components):
        super(Condition, self).__init__(log_server, component_id, auto_glue, properties, additional_components)
        self.condition_notifier = Component.OutputNotifier(self)
        self.input_observer = Condition.InputObserver(self)
        self.round = 0
        self.counter = self.properties['counter']

    def get_description(self):
        """
        return an description of the component
        """
        return "Condition"

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, arg):
            self.outer.round = self.outer.round + 1
            self.outer.log_line('check condition')
            self.outer.log_line('round ' + str(self.outer.round))
            if self.outer.round == self.outer.counter:
                self.outer.output_notifier.notify_observers(arg)
            else:
                self.outer.condition_notifier.notify_observers(arg)
