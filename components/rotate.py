"""
Rotate
"""
from core.component import Component

class Rotate(Component):
    """
    Class for rotating an image
    """
    def __init__(self, log_server, properties):
        super(Rotate, self).__init__(log_server, properties)
        self.input_observer = Rotate.InputObserver(self)
        self.__angle = 0
        self.angle = self.properties['angle']

    @property
    def angle(self):
        """
        getter of angle
        """
        return self.__angle

    @angle.setter
    def angle(self, value):
        self.__angle = value

    def get_description(self):
        """
        return an description of the component
        """
        return "Rotate an image"

    @staticmethod
    def get_parameters():
        """
        return all parameters of the component
        """
        for key, value in Rotate.__dict__.items():
            if isinstance(value, property):
                print(key)

    class InputObserver(Component.InputObserver):
        """
        Class for observers
        """
        def update(self, observable, arg):
            self.outer.log_line('rotate image')
            self.outer.output_notifier.notify_observers(arg.rotate(self.outer.angle))
