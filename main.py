"""
main.py
"""
from importlib import import_module
from pydoc import locate
from lxml import etree
from components.log_server import LogServer

# initalize base components
LOGSERVER = LogServer()

# read xml file
PIPELINE = etree.parse('pipelines/dummy.xml')
XML_COMPONENTS = PIPELINE.xpath('component')
COMPONENTS = []

# dynamically load components
for component in XML_COMPONENTS:
    className = component.xpath('class')[0]
    fileName = component.xpath('name')[0]
    # read properties
    xml_properties = component.xpath('property')
    properties = dict()
    for component_property in xml_properties:
        property_name = component_property.xpath('name')[0]
        property_value = component_property.xpath('value')[0]
        property_value_type = component_property.xpath('value/@type')
        # typecast components
        if len(property_value_type) > 0:
            property_type = locate(property_value_type[0])
            property_value = property_type(property_value.text)
        else:
            property_value = property_value.text
        properties[property_name.text] = property_value
    # get component class
    ComponentClass = getattr(import_module('components.' + fileName.text), className.text)
    # instantiate class
    instance = ComponentClass(LOGSERVER, properties)
    COMPONENTS.append(instance)

# glue components together
for index, component in enumerate(COMPONENTS):
    if index + 1 < len(COMPONENTS):
        component.output_notifier.add_observer(COMPONENTS[index + 1].input_observer)

# start at component
COMPONENTS[0].start()
