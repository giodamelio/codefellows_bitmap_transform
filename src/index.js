import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';

import parseBitmap from './parse';

// Clone a buffer
function cloneBuffer(oldBuffer) {
  const newBuffer = Buffer.alloc(oldBuffer.length);
  oldBuffer.copy(newBuffer);
  return newBuffer;
}

// Run a transform on an image
function transform(inputPath, outputPath, transformCallback) {
  // Read the file
  fs.readFile(inputPath, (readErr, image) => {
    if (readErr) {
      console.error(readErr);
      process.exit(1);
    }

    // Parse the file
    let originalImageData;
    try {
      originalImageData = parseBitmap(image);
    } catch (parseError) {
      throw parseError;
    }

    // Copy the pixel data so we don't clobber the original
    const transformedPixels = cloneBuffer(originalImageData.rawPixels);

    // Run the transform
    transformCallback(transformedPixels);

    // Copy the transformed pixels back into the original image
    transformedPixels.copy(image, originalImageData.pixelArrayOffset);

    // Write the modified image back to a new file
    fs.writeFile(outputPath, image, (err) => {
      if (err) {
        throw err;
      }

      console.log(`Image written to ${outputPath}`);
    });
  });
}

const imagePath = path.join(__dirname, '../test/images/image1.bmp');

// Invert the image
transform(imagePath, 'inverted.bmp', (data) => {
  for (let index = 0; index < data.length; index++) {
    data[index] = ~data[index];
  }
});
