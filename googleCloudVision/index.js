const googleKey = require('/Users/gregpereirapereira/Desktop/keys/googleVisionKey/mvp-project-214622-ff01357cd09e.json');
const vision = require('@google-cloud/vision').v1p3beta1;
const fs = require('fs');
 
// Creates a client
const client = new vision.ImageAnnotatorClient({
  'keyFilename': "/Users/gregpereirapereira/Desktop/keys/googleVisionKey/mvp-project-214622-ff01357cd09e.json"
});
 
// Performs label detection on the image file
let textDetector = (filename) => {
  const fileName = `/Users/gregpereirapereira/Desktop/projects/mvp/uploads/${filename}.jpg`;
  const request = {
    image: {
      content: fs.readFileSync(fileName),
    },
    feature: {
      languageHints: ['en-t-i0-handwrit'],
    },
  };
  client
    .documentTextDetection(request)
    .then(results => {
      
      const fullTextAnnotation = results[0].fullTextAnnotation;
      // console.log(`Full text: ${fullTextAnnotation.text} line 25`);
      fs.writeFile(`./uploads/${filename}.txt`, fullTextAnnotation.text, (err) => {
        if (err) {
          throw err;
        } else {
          console.log('data saved to file')
        }
      })
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

module.exports.textDetector = textDetector;
