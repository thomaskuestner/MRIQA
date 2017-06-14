"""
Component
"""
import json
from websocket import create_connection
from core.observer import Observable

class BaseComponent(object):
    """
    Class for components
    """
    config = dict()

    def __init__(self):
        with open('./config.json') as file:
            BaseComponent.config = json.loads(file.read())

        self.output_notifier = BaseComponent.OutputNotifier(self)
        self.component_id = None

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

    @staticmethod
    def ws_send(package):
        """
        send data to websocket
        """
        try:
            websocket = create_connection('ws://localhost:%s' % \
                    BaseComponent.config['web_socket_port'])
            websocket.send(package)
            websocket.close()
        except ConnectionRefusedError:
            pass

    def send(self, data):
        """
        bundle data package for sending to websocket
        """
        package = dict()
        package['component'] = self.__class__.__name__
        if self.component_id is None:
            package['id'] = 'undefined'
        else:
            package['id'] = self.component_id
        package['data'] = data
        BaseComponent.ws_send(str(package))

    class OutputNotifier(Observable):
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
            self.outer.send({'status': 'stopped'})
            self.set_changed()
            Observable.notify_observers(self, arg)
