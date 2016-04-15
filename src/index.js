import fs from 'fs';
import path from 'path';

import parseBitmap from './parse';

// Read the file
const imagePath = path.join(__dirname, '../test/images/image1.bmp');
fs.readFile(imagePath, (readErr, image) => {
  if (readErr) {
    console.error(readErr);
    process.exit(1);
  }

  try {
    // Parse the file
    const data = parseBitmap(image);

    // Invert the colors
    // Since the image.rawPixels points to the same memory as originalImage
    // it can be modified in place
    for (let index = 0; index < data.rawPixels.length; index++) {
      data.rawPixels[index] = ~data.rawPixels[index];
    }

    // Write the modified image back to a new file
    const outputPath = path.join(__dirname, '../output.bmp');
    fs.writeFile(outputPath, image, (err) => {
      if (err) {
        throw err;
      }

      console.log(`Output image written to ${outputPath}`);
    });
  } catch (err) {
    console.error(err);
  }
});
