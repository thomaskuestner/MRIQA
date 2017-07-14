"""
DICOM Input
"""
import os
import dicom
import dicom_numpy
from core.component import Component

class DicomInput(Component):
    """
    Class for DICOM Input
    """
    def __init__(self, options):
        super(DicomInput, self).__init__(options)
        self.__folder_path = ""
        self.folder_path = self.properties['folder_path']

    @property
    def folder_path(self):
        """
        getter of folder_path
        """
        return self.__folder_path

    @folder_path.setter
    def folder_path(self, value):
        self.__folder_path = value

    @staticmethod
    def get_parameters():
        """
        return all parameters of the component
        """
        for key, value in DicomInput.__dict__.items():
            if isinstance(value, property):
                print(key)

    def start(self):
        """
        open a file and sends notifier
        """
        super(DicomInput, self).start()
        datasets = [dicom.read_file(os.path.join(self.folder_path, f)) \
            for f in os.listdir(self.folder_path)]
        try:
            voxel_ndarray, _ = dicom_numpy.combine_slices(datasets)
        except dicom_numpy.DicomImportException:
            # invalid DICOM data
            raise
        self.package['data'] = voxel_ndarray
        self.log_line('read dicom files')
        self.output_notifier.notify_observers(self.package)
