import express from 'express';
import open from 'open';
import path from 'path';

const port = process.env.PORT || 4005;
const app = express();

app.use(express.static('../../'));
app.use(express.static('../../index.js'));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../index.html'));
});
app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname,'../index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});