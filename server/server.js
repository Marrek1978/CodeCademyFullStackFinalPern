import express from 'express';
const app = express();
const port = 3001; // Make sure this port is different from Vite's

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
