import QtQuick 2.3
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.3

ApplicationWindow {
    width: 800
    height: 400

    GridLayout {
        width: parent.width
        height: parent.height
        columns: 1
        rows:2
        GroupBox {
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