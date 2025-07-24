const express = require('express');
const cors = require('cors');
const path = require('path');
const photoRoutes = require('./routes/photoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/photos', photoRoutes);
app.use('/api/authRoutes', authRoutes); 


app.get('/', (req, res) => {
  res.send('Photo Album API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
