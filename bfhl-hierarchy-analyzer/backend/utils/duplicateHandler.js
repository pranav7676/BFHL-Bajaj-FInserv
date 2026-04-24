/**
 * Processes an array of valid edges to detect duplicates.
 *
 * Rules:
 *  - First occurrence of an edge is treated as unique.
 *  - Any subsequent occurrence is recorded once in duplicateEdges.
 *  - Order of first occurrence is preserved in uniqueEdges.
 *
 * @param {string[]} validEdges - Array of validated edge strings (e.g., ["A->B", "A->C"])
 * @returns {{ uniqueEdges: string[], duplicateEdges: string[] }}
 */
function processDuplicates(validEdges) {
  const seenEdges = new Set();
  const duplicateSet = new Set();
  const uniqueEdges = [];

  for (const edge of validEdges) {
    if (seenEdges.has(edge)) {
      // Record duplicate only once
      duplicateSet.add(edge);
    } else {
      seenEdges.add(edge);
      uniqueEdges.push(edge);
    }
  }

  return {
    uniqueEdges,
    duplicateEdges: Array.from(duplicateSet),
  };
}

module.exports = { processDuplicates };
