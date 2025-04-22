const express = require('express');
const cors = require('cors');
require('dotenv').config();

const stringRoutes = require('./routes/stringRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', stringRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});