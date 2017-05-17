"""
pipeline.py
"""
from importlib import import_module
from multiprocessing import Process
from pydoc import locate
from lxml import etree
from PyQt5.QtCore import QThread

class Pipeline(QThread):
    """
    pipeline class
    """
    def __init__(self, log_server, file_name, *args, **kwargs):
        super(Pipeline, self).__init__()
        self.log_server = log_server
        self.file_name = file_name
        self.gui = kwargs.get('gui')

    def run(self):
        """
        startup method
        """
        # read xml file
        pipeline = etree.parse(self.file_name, \
            etree.XMLParser \
            (schema=etree.XMLSchema(etree.XML(open('core/pipeline.xsd', 'r').read()))))
        components = []

        # dynamically load components
        for component in pipeline.xpath('component'):
            # get component class
            component_class = getattr(import_module('components.' + \
                component.xpath('name')[0].text), \
                component.xpath('class')[0].text)
            # instantiate class
            components.append(component_class(self.read_options(component)))

        # glue components together which aren't disabled with autoglue
        for index, component in enumerate(components):
            if index + 1 < len(components) and components[index + 1].auto_glue:
                component.output_notifier.add_observer(components[index + 1].input_observer)

        # add additional components to component
        for component in components:
            if len(component.additional_components) > 0:
                for additional_component in component.additional_components:
                    for b_comp in components:
                        if b_comp.component_id == additional_component['additional_component_id']:
                            notifier = getattr(b_comp, additional_component['notifier'])
                            notifier.add_observer(component.input_observer)

        # start at component
        process = Process(target=components[0].start)
        process.start()

    def read_options(self, component):
        """
        read options from xml
        """
        options = dict()
        options['log_server'] = self.log_server
        if self.gui != None:
            options['gui'] = self.gui

        # read id value
        component_id = component.xpath('id')
        if len(component_id) > 0:
            options['component_id'] = component.xpath('id')[0].text
        else:
            options['component_id'] = None

        # read autoglue value
        options['auto_glue'] = component.xpath('autoglue')
        if len(options['auto_glue']) > 0:
            options['auto_glue'] = component.xpath('autoglue')[0].text
            if options['auto_glue'] == 'true':
                options['auto_glue'] = True
            elif options['auto_glue'] == 'false':
                options['auto_glue'] = False
        else:
            options['auto_glue'] = True

        # read properties
        options['properties'] = dict()
        for component_property in component.xpath('property'):
            property_value = component_property.xpath('value')[0]
            property_value_type = component_property.xpath('value/@type')
            # typecast components
            if len(property_value_type) > 0:
                property_type = locate(property_value_type[0])
                property_value = property_type(property_value.text)
            else:
                property_value = property_value.text
            options['properties'][component_property.xpath('name')[0].text] = property_value

        # read additional_component
        options['additional_components'] = []
        for additional_component in component.xpath('additional_component'):
            component_id = additional_component.xpath('id')[0].text
            # by convention notifiers has to end with _notifier
            if len(additional_component.xpath('notifier')) > 0:
                notifier = additional_component.xpath('notifier')[0].text + "_notifier"
            else:
                notifier = "output" + "_notifier"
            options['additional_components'].append(dict(additional_component_id=component_id, \
                                                         notifier=notifier))

        return options
