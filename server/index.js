const express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var busboy = require('connect-busboy');
var parser = require('body-parser')
const path = require('path');
const fs = require('fs');
let textDetector = require('../googleCloudVision/index.js').textDetector;


const app = express();
app.set('port', 3000);
app.use(express.static(__dirname + '/../public'));
app.use(parser.json());
app.use(busboy());

let fileName = '';

app.use(function(req, res) {
  if (req.busboy) {
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      fileName = filename;
      file.pipe(fs.createWriteStream(`./uploads/${fileName}.jpg`));
    });
    req.busboy.on('finish', () => {
      res.writeHead(303, {connection: 'close', Location: '/'});
      res.send(textDetector(fileName));
    })
    return req.pipe(req.busboy);
  }

});


app.listen(app.get('port'), ()=> {
  console.log('connected, listening on port number 3000');
})


app.post('/image', (req, res) => {
  console.log('this endpoint was hit');
  
})

app.get('/image', (req, res)=> {
  // console.log(req.params, req.body, req.data)
})
app.get('/image/:searchTerm', (req, res) => {

})