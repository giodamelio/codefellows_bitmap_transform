import fs from 'fs';
import path from 'path';

import parseBitmap from '../src/parse';

// Load some example data
const image1 = fs.readFileSync(path.join(__dirname, 'image1.bmp'));
const invalidHeader = fs.readFileSync(path.join(__dirname, 'invalidHeader.bmp'));
const invalidDIBHeader = fs.readFileSync(path.join(__dirname, 'invalidDIBHeader.bmp'));

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

  describe('DIB Header', () => {
    it('should parse valid DIB type', () => {
      const image = parseBitmap(image1);
      image.DIBType.should.equal('BITMAPV4HEADER');
    });

    it('should error on invalid header', () => {
      (() => {
        parseBitmap(invalidDIBHeader);
      }).should.throw('Invalid DIB header');
    });

    it('should parse width and height', () => {
      const image = parseBitmap(image1);
      image.width.should.equal(512);
      image.height.should.equal(512);
    });

    it('should parse color depth', () => {
      const image = parseBitmap(image1);
      image.depth.should.equal(24);
    });
  });
});
