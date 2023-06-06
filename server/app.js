const express = require('express');

const userRouer = require('./routes/user.routes');
const corsMiddleware = require('./middleware/cors.middleware');

const HOST = '127.0.0.1';
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use('/api/user', userRouer);


app.listen(PORT, HOST, () => {
  console.log(`server started on port ${HOST}:${PORT}`);
});