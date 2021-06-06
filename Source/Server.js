const Global = require('./Configs/globalConfigs.json');

const App = require('./App');

App.set("port", Global.configs['server-port'] || 80);

const Server = App.listen(App.get("port"), () => {
    var Server_Host = (Server.address().address || '127.0.0.1');
    var Server_Port = Server.address().port;

    if (Server_Host === '::') {
        Server_Host = "http://localhost";
    }

    console.log('[Follow] => https://github.com/aguiar-security');
    console.log('[Server] => Listening => %s:%s', Server_Host, Server_Port)
})