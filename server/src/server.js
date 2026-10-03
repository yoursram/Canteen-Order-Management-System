const app = require('./app');
const env = require('./config/env');
const { testConnection } = require('./config/db');

const PORT = env.PORT;

const startServer = async () => {
  // Test MySQL DB Connection
  await testConnection();

  const server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`VJIT Canteen Backend Server running on port ${PORT}`);
    console.log(`Environment: ${env.NODE_ENV}`);
    console.log(`====================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[PORT WARNING] Port ${PORT} is already in use by another process.`);
      console.warn(`[PORT HINT] The backend server is already running!`);
    } else {
      console.error('[SERVER ERROR]', err);
    }
  });
};

startServer();
