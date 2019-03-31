import express from 'express';
// import open from 'open';
import path from 'path';
import compression from 'compression';

process.env.NODE_ENV = 'production';
const port = process.env.PORT || 4005;
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname,'../src')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../index.html'));
});
 
// app.listen(port, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         open('http://localhost:' + port);
//     }
// });