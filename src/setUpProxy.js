const proxy = require('http-proxy-middleware');
const http = require('http');
var keepAliveAgent = new http.Agent({ keepAlive: true });
module.exports = function(app) {
  app.use(
    proxy( "/server",{     
      target: 'https://demo.bigbeartech.in/',
      changeOrigin: true,
      pathRewrite: {
        '^/server/': '/', // remove base path
        
      },
    })
  );
};
