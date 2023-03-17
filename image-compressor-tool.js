const express = require('express');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    
 const imagePath = 'img.png';
 const outputDir = 'image-compressor-tool/output';

 const imageName = path.parse(imagePath).name;
// Compression settings
const compressionSettings = {
  quality: 80 // The quality setting is a value between 1 and 100
};

// Read the input image file
fs.readFile(imagePath, (err, data) => {
  if (err) throw err;

  // Use Sharp to resize and compress the image
  sharp(data)
    .jpeg(compressionSettings)
    .toBuffer((err, compressedData) => {
      if (err) throw err;

      // Save the compressed image to a new file
      fs.writeFile(`${outputDir}/${imageName}-min.jpg`, compressedData, (err) => {
        if (err) throw err;

        console.log(`${imageName} Image compressed successfully!`);
      });
    });
});
  });


app.listen(3000, ()=>{
    console.log('Server started on port 3000');
} );
