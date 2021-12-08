const exp = require('constants');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const object = {
    "name": "Begzat"
};
 
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

app.get('/', (req, res) => {
    console.log("Render Working");
    res.render('Home');
});

app.listen(PORT, err => {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});