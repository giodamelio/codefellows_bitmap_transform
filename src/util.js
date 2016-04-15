// Find the neighbor in a flattened 2d array
export function findNeighbors(index, width, inputArray) {
  const neighbors = [];

  // Check if it is on an edge
  const notInTopRow = index - width + 1 > 0;
  const notInBottomRow = index + width + 1 <= inputArray.length;
  const notInLeftCol = index % width !== 0;
  const notInRightCol = (index % width) + 1 !== width;

  // Top left
  if (notInTopRow && notInLeftCol) {
    neighbors.push(inputArray[index - width - 1]);
  }

  // Top
  if (notInTopRow) {
    neighbors.push(inputArray[index - width]);
  }

  // Top right
  if (notInTopRow && notInRightCol) {
    neighbors.push(inputArray[index - width + 1]);
  }

  // Left
  if (notInLeftCol) {
    neighbors.push(inputArray[index - 1]);
  }

  // Right
  if (notInRightCol) {
    neighbors.push(inputArray[index + 1]);
  }

  // Bottom left
  if (notInBottomRow && notInLeftCol) {
    neighbors.push(inputArray[index + width - 1]);
  }

  // Bottom
  if (notInBottomRow) {
    neighbors.push(inputArray[index + width]);
  }

  // Bottom right
  if (notInBottomRow && notInRightCol) {
    neighbors.push(inputArray[index + width + 1]);
  }

  return neighbors;
}
