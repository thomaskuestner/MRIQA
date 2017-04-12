import QtQuick 2.3
import QtQuick.Controls 1.4

ApplicationWindow{
    width: 800
    height: 400

    TextArea{
        width: parent.width
        height: parent.height
        objectName:"log_text_area"
        readOnly: true
    }
}