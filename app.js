const serverConfig = require('./config/server');
require('./config/database');
require('./config/routes')(serverConfig);
