const clientConfig = require('./cfg/webpack.client.config'),
      serverConfig = require('./cfg/webpack.server.config')
// тут используем не объект а массив
module.exports = [clientConfig, serverConfig]
