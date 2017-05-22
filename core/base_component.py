"""
Component
"""
import asyncio
import json
import websockets
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
    async def ws_send(package):
        """
        send data to websocket
        """
        try:
            async with websockets.connect('ws://localhost:%s' % \
                BaseComponent.config['web_socket_port']) as websocket:
                await websocket.send(str(package))
        except ConnectionRefusedError:
            pass

    def send(self, data):
        """
        bundle data package for sending to websocket
        """
        package = dict()
        package['component'] = self.__class__.__name__
        package['data'] = data
        asyncio.get_event_loop().run_until_complete(BaseComponent.ws_send(package))

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
            self.set_changed()
            Observable.notify_observers(self, arg)
