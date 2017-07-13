module.exports = function(app){
    // start a pipeline
    app.sendLog = function(message, logLevel = 'INFO'){
        var date = new Date();
        var messageStructure = {
            component: 'LogServer',
            data: {
                log_level: logLevel,
                log_message: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDay()).slice(-2)} ${('0' + date.getUTCHours()).slice(-2)}:${('0' + date.getUTCMinutes()).slice(-2)}:${('0' + date.getUTCSeconds()).slice(-2)} ${message.toString().replace(/'|"|\n/g, '')}`
            }
        };
        if(app.ws_client_gui !== null){
            app.ws_client_gui.send(JSON.stringify(messageStructure));
        }
    };
};