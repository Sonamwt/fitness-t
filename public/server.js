const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve all static files (HTML, CSS, JS) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Confirm server is running
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
