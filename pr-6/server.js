const express = require('express');
const ConnectDb = require('./config/db');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000; // Use environment variable for port
const app = express();
const path = require('path')
ConnectDb().catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1); 
});


app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(cookieParser())
app.use(express.static('public'));
app.use('/', require('./routes/indexRoute'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});
