const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;
if (process.env.NODE_ENV !== 'test')
{
  server.listen(PORT);
}

module.exports = server;