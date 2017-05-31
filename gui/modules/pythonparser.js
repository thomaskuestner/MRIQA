var fs = require('fs');

module.exports = {
    parse: function(file){
        var classes = new Array();
        var content = fs.readFileSync(file);
        var pythonClass = new RegExp(/^class\s(\w*)\(Component\):$/gm);
        var className = pythonClass.exec(content.toString());
        while (className !== null) {
            classes.push(className[1]);
            className = pythonClass.exec(content.toString());
        }
        return classes;
    }
};