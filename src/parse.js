import { Buffer } from 'buffer';

export default function parse(data) {
  // The output data
  const output = {};

  // Parse file header ------------------------------------
  // Check for magic constant 0x42 0x4d
  if (data.slice(0, 2).compare(new Buffer([0x42, 0x4d])) !== 0) {
    throw new Error('Invalid bitmap header');
  }

  // Get the size of the bmp file
  output.fileSize = data.readInt32LE(2);

  // Get the offset of the pixel array
  output.offset = data.readInt32LE(10);

  // Parse DIB header -------------------------------------
  const DIBHeaderTypes = {
    108: 'BITMAPV4HEADER',
  };

  // Check to see if we can parse the DIB header
  const DIBHeaderType = data.readInt32LE(14);
  if (!DIBHeaderTypes.hasOwnProperty(DIBHeaderType)) {
    throw new Error('Invalid DIB header');
  } else {
    output.DIBType = DIBHeaderTypes[DIBHeaderType];
  }

  // Parse height and width
  output.width = data.readInt32LE(18);
  output.height = data.readInt32LE(22);

  // Parse color depth(bits per pixel)
  output.depth = data.readInt16LE(28);

  // Parse compression type (and error if anything but uncompressed)
  if (data.readInt32LE(30) !== 0) {
    throw new Error('Compression not supported');
  }

  // Parse the size of the raw bitmap data
  output.bitmapSize = data.readInt32LE(34);

  return output;
}
