import { Buffer } from 'buffer';

export default function parse(data) {
  // Check for a valid bitmap header
  if (data.slice(0, 2).compare(new Buffer([0x42, 0x4d])) !== 0) {
    throw new Error('Invalid bitmap header');
  }
}
