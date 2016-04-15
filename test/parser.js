import fs from 'fs';
import path from 'path';

import parseBitmap from '../src/parse';

// Load some example data
const image1 = fs.readFileSync(path.join(__dirname, 'images/image1.bmp'));
const invalidHeader = fs.readFileSync(path.join(__dirname, 'images/invalidHeader.bmp'));
const invalidDIBHeader = fs.readFileSync(path.join(__dirname, 'images/invalidDIBHeader.bmp'));
const compressionEnabled = fs.readFileSync(path.join(__dirname, 'images/compressionEnabled.bmp'));
const colorPaletteEnabled = fs.readFileSync(path.join(__dirname, 'images/colorPaletteEnabled.bmp'));

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

    it('should read the image file size in bytes', () => {
      const image = parseBitmap(image1);
      image.fileSize.should.equal(786554);
    });

    it('should read the offset of the pixel array', () => {
      const image = parseBitmap(image1);
      image.pixelArrayOffset.should.equal(122);
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

    it('should error if image is compressed', () => {
      (() => {
        parseBitmap(compressionEnabled);
      }).should.throw('Compression not supported');
    });

    it('should parse raw bitmap data length', () => {
      const image = parseBitmap(image1);
      image.bitmapSize.should.equal(786432);
    });

    it('should parse image resolution', () => {
      const image = parseBitmap(image1);
      image.horizontalResolution.should.equal(2835);
      image.verticalResolution.should.equal(2835);
    });

    it('should error if the length of the color pallet is not 0', () => {
      (() => {
        parseBitmap(colorPaletteEnabled);
      }).should.throw('Color table is not supported');
    });
  });

  it('should add pixel data buffer', () => {
    const image = parseBitmap(image1);
    image.rawPixels.length.should.equal(786432);
  });
});
