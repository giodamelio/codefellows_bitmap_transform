import fs from 'fs';
import path from 'path';

import parseBitmap from './parse';

// Read the file
fs.readFile(path.join(__dirname, '../test/image1.bmp'), (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  try {
    const file = parseBitmap(data);
    console.log(file);
  } catch (err) {
    console.error(err);
  }
});
