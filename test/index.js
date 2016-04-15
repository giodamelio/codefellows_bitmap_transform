import fs from 'fs';
import path from 'path';

import parseBitmap from '../src/parse';

// Load some example data
const image1 = fs.readFileSync(path.join(__dirname, 'image1.bmp'));
const invalidHeader = fs.readFileSync(path.join(__dirname, 'invalidHeader.bmp'));

describe('Parser', () => {
  describe('Header', () => {
    it('should parse valid header', () => {
      (() => {
        parseBitmap(image1);
      }).should.not.throw();
    });

    it('should error on invalid header', () => {
      (() => {
        parseBitmap(invalidHeader);
      }).should.throw('Invalid bitmap header');
    });

    it('should read the image size in bytes', () => {
      const image = parseBitmap(image1);
      image.size.should.equal(786554);
    });

    it('should read the offset of the pixel array', () => {
      const image = parseBitmap(image1);
      image.offset.should.equal(122);
    });
  });
});
