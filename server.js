const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/server-info', (req, res) => {
  const serverInfo = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    platform: os.platform(),
    hostname: os.hostname(),
    nodeVersion: process.version,
    memory: process.memoryUsage(),
    cpus: os.cpus().length
  };
  
  res.set({
    'X-Server-Name': 'Simple-Client-Server',
    'X-Custom-Header': 'Lab01-Implementation'
  });
  
  res.json(serverInfo);
});

app.get('/api/name', (req, res) => {
  res.json({
    name: 'Trần Minh Hiếu',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/echo', (req, res) => {
  res.json({
    message: 'Echo response',
    receivedData: req.body,
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`,
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Static files served from: ${path.join(__dirname, 'public')}`);
});