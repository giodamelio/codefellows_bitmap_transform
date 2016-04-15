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
  output.size = data.readInt32LE(2);

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

  return output;
}
