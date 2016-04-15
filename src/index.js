import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';

import _ from 'lodash';

import parseBitmap from './parse';
import { findNeighbors } from './util';

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
    transformCallback(transformedPixels, originalImageData);

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

const imagePath = path.join(__dirname, '../test/images/lena.bmp');

// Invert the image
transform(imagePath, 'inverted.bmp', (data) => {
  for (let index = 0; index < data.length; index++) {
    data[index] = ~data[index];
  }
});

// Convert to greyscale via desaturation
transform(imagePath, 'greyscale.bmp', (data) => {
  for (let index = 0; index < data.length; index += 3) {
    const R = data[index];
    const G = data[index + 1];
    const B = data[index + 2];
    const average = (Math.max(R, G, B) + Math.min(R, G, B)) / 2;
    data[index] = average;
    data[index + 1] = average;
    data[index + 2] = average;
  }
});

// Blur the image with a simple box blur
transform(imagePath, 'box_blur.bmp', (data, headerData) => {
  // Convert the buffer into an array of pixels
  const pixelArray = _.chunk(data, 3);

  // Blur 3 times
  for (let i = 0; i < 3; i++) {
    // Calculate averages
    for (let index = 0; index < pixelArray.length; index++) {
      // Get all the neighboring pixels
      const neighbors = findNeighbors(index, headerData.width, pixelArray);

      // Average all the pixels together
      neighbors.push(pixelArray[index]);
      let [rAverage, gAverage, bAverage] = [0, 0, 0];
      for (const pixel of neighbors) {
        rAverage += pixel[0];
        gAverage += pixel[1];
        bAverage += pixel[2];
      }
      rAverage /= neighbors.length;
      gAverage /= neighbors.length;
      bAverage /= neighbors.length;

      pixelArray[index] = [
        Math.floor(rAverage),
        Math.floor(gAverage),
        Math.floor(bAverage),
      ];
    }
  }

  // Copy new data into buffer
  Buffer.from(_.flatten(pixelArray)).copy(data);
});
