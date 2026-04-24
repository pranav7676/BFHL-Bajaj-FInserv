require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const hierarchyRoutes = require('./routes/hierarchy.routes');
const bfhlRoutes = require('./routes/bfhlRoutes');

app.use('/api/hierarchy', hierarchyRoutes);
app.use('/bfhl', bfhlRoutes);

app.get('/', (req, res) => {
  res.send('Backend API is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
