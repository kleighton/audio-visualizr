import open from 'open';
import express from 'express';
import path from 'path';

const app = express();
const port = 3003;

app.use(express.static(__dirname + '../../'));
app.use(express.static(__dirname + '../../index.js'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname,'index.html'));
});
app.get('index.html', function (req, res) {
    res.sendFile(path.resolve(__dirname,'index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});