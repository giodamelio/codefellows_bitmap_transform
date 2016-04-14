import { Buffer } from 'buffer';

export default function parse(data) {
  // The output data
  const output = {};

  // Check for a valid bitmap header
  if (data.slice(0, 2).compare(new Buffer([0x42, 0x4d])) !== 0) {
    throw new Error('Invalid bitmap header');
  }

  // Get the size of the bmp file
  output.size = data.readInt32LE(2);

  return output;
}
