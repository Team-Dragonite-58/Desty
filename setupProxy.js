const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Change '/api' to the base URL of your API
    createProxyMiddleware({
      target: 'http://your-api-server.com', // Replace this with your API server URL
      changeOrigin: true,
    })
  );
};