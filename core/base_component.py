"""
Component
"""

class BaseComponent(object):
    """
    Class for components
    """
    def get_description(self):
        """
        return an description of the component
        """
        pass

    @staticmethod
    def get_parameters():
        """
        copy this to every component with parameters and
        change Component to the inherit class name
        return all parameters of the component
        """
        for key, value in BaseComponent.__dict__.items():
            if isinstance(value, property):
                print(key)
