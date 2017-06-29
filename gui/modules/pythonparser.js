var fs = require('fs');

module.exports = {
    parse: function(file){
        var classes = new Array();
        var content = fs.readFileSync(file);
        var pythonClass = new RegExp(/^class\s(\w*)\(Component\):$/gm);
        var className = pythonClass.exec(content.toString());
        while (className !== null) {
            var jsonClass = {
                name: className[1]
            };
            className = pythonClass.exec(content.toString());
            var pythonDescription = new RegExp(/^GUI-DESCRIPTION([\S\s]+?)"""$/gm);
            var description = pythonDescription.exec(content.toString());
            if(description !== null){
                jsonClass.description = JSON.parse(description[1]);
            }
            classes.push(jsonClass);
        }

        return classes;
    }
};