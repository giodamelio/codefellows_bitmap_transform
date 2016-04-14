 For this assignment you will be building a Bitmap reader and transformer. It will read a Bitmap in from disk, run one or more color transforms on the bitmap and then write it out to a new file. This project will require the use of node buffers in order to manipulate binary data. Your project should include tests, as well as a Gulpfile and package.json file. Make sure to run all your code through jshint or eslint. The process will look something like this:
1. open file using fs and read it into a buffer

2. convert buffer header data into a Javascript Object

3. Run a transform on the buffer directly

4. Write the buffer to a new file. 

The wikipedia article found here (Links to an external site.) describes the byte specification of a "windows bitmap file." We'll be working the simplest version, meaning no compression. Your project should be able to take a transform as a callback that will be run once the bitmap file has been read into a buffer. Your project should include at least one transform. This is a difficult assignment so make sure to come to me with questions early. Ideas for easy transformations:

* invert the colors (essentially subtract every color value from the max color value which is 255),

* Grayscale the colors, multiply each color value by a constant, just make sure your values don't go over 255.

* (red|green|blue)scale the colors, same as above but only multiply one of the colors.
