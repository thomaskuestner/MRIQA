"""
Condition

GUI-DESCRIPTION
{
    "description": "Condition helps to create a feedback loop",
    "url": "https://github.com/thomaskuestner/MRIQA/wiki/Components#condition",
    "settings":
        [
            {
                "counter": {
                    "property": [
                        {
                            "name": "type",
                            "value": "counter"
                        },
                        {
                            "name": "value",
                            "value": 1,
                            "type": "int"
                        }
                    ]
                }
            },
            {
                "parameter": {
                    "property": [
                        {
                            "name": "type",
                            "value": "parameter"
                        },
                        {
                            "name": "name",
                            "value": "angle"
                        },
                        {
                            "name": "operator",
                            "value": "eq"
                        },
                        {
                            "name": "value",
                            "value": 0,
                            "type": "int"
                        }
                    ]
                }
            }
        ]
}
"""
from core.observer import Observable
from core.component import Component

class Condition(Component):
    """
    Class for condition
    """
    def __init__(self, options):
        super(Condition, self).__init__(options)
        self.condition_notifier = Condition.ConditionNotifier(self)
        self.input_observer = Condition.InputObserver(self)
        self.round = 0
        self.type = self.properties['type']

    def get_description(self):
        """
        return an description of the component
        """
        return "Condition"

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, package):
            self.outer.log_line('check condition')
            state = False
            if self.outer.type == 'counter':
                state = self.outer.counter_condition(state)
            elif self.outer.type == 'parameter':
                state = self.outer.parameter_condition(state, package)

            if state is True:
                self.outer.output_notifier.notify_observers(package)
            else:
                self.outer.condition_notifier.notify_observers(package)

    class ConditionNotifier(Observable):
        """
        Class for Notifier
        """
        def __init__(self, outer):
            Observable.__init__(self)
            self.outer = outer
        def notify_observers(self, arg=None):
            """
            notify observers
            """
            self.set_changed()
            Observable.notify_observers(self, arg)

    def counter_condition(self, state):
        """
        check counter condition
        """
        self.round = self.round + 1
        self.log_line('round ' + str(self.round))
        if self.round >= self.properties['value']:
            state = True
        return state

    def parameter_condition(self, state, package):
        """
        check parameter condition
        """
        self.log_line('parameter: ' + self.properties['name'] + ' ' + \
            str(package[self.properties['name']]) + ' '  + \
            self.properties['operator'] + ' ' + str(self.properties['value']))
        if self.properties['operator'] == 'gt':
            if package[self.properties['name']] > self.properties['value']:
                state = True
        if self.properties['operator'] == 'lt':
            if package[self.properties['name']] < self.properties['value']:
                state = True
        if self.properties['operator'] == 'ge':
            if package[self.properties['name']] >= self.properties['value']:
                state = True
        if self.properties['operator'] == 'le':
            if package[self.properties['name']] <= self.properties['value']:
                state = True
        if self.properties['operator'] == 'eq':
            if package[self.properties['name']] == self.properties['value']:
                state = True
        if self.properties['operator'] == 'ne':
            if package[self.properties['name']] != self.properties['value']:
                state = True
        return state
