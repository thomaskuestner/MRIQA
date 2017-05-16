import QtQuick 2.3
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.3
import QtQuick.Dialogs 1.2

ApplicationWindow {
    width: 800
    height: 400

    menuBar: MenuBar {
        Menu {
            title: "File"
            MenuItem { 
                text: "File open ..."
                onTriggered: fileDialog.open()
            }
        }
        Menu {
            title: "View"
            MenuItem { 
                text: "Log"
                checkable: true
                checked: true
                onTriggered: {
                    log.visible = !log.visible;
                }
            }
        }
    }

    FileDialog {
        id: fileDialog
        signal file_selected(string file_name)
        objectName: "mriqa_file_dialog"
        title: "Select MRIQA-Pipeline file"
        nameFilters: [ "MRIQA-Pipeline file (*.xml)"]
        onAccepted: {
            fileDialog.visible = false
            file_selected(fileDialog.fileUrl)
        }
    }

    GridLayout {
        width: parent.width
        height: parent.height
        columns: 1
        rows:2
        GridLayout {
            width: parent.width
            height: parent.height
            columns: 3
            rows:1
            GroupBox {
                id: "components"
                title: "Components"
                Layout.fillHeight: true
                TextInput {
                    text:"search components"
                }
            }
            GroupBox {
                anchors.left: components.right
                anchors.right: settings.left
                Layout.fillWidth: true
                Layout.fillHeight: true
            }
            GroupBox {
                id: "settings"
                title: "Settings"
                Layout.fillHeight: true
            }
        }
        GroupBox {
            id: log
            title: "Log"
            anchors.bottom: parent.bottom
            Layout.fillWidth: true
            TextArea {
                width: parent.width
                height: parent.height
                objectName:"log_text_area"
                readOnly: true
            }
        }
    }
}