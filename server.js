const express = require('express');
const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
  res.json({ 
    message: "Welcome to my Webora Tec Internship Backend API!" 
  });
});


app.get('/about', (req, res) => {
  res.json({
    name: "Rumman", 
    role: "Backend Development Intern",
    company: "Webora Tec",
    description: "This is a simple API built with Node.js and Express as part of my internship Task 1."
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});