/**
 * Generates a summary object from an array of hierarchy objects.
 *
 * @param {Array<{
 *   root: string,
 *   tree: Object,
 *   depth?: number,
 *   has_cycle?: boolean
 * }>} hierarchies
 *
 * @returns {{
 *   total_trees: number,
 *   total_cycles: number,
 *   largest_tree_root: string
 * }}
 */
function generateSummary(hierarchies) {
  let totalTrees = 0;
  let totalCycles = 0;
  let largestTreeRoot = '';
  let maxDepth = -1;

  for (const h of hierarchies) {
    if (h.has_cycle) {
      totalCycles++;
    } else {
      totalTrees++;

      const depth = h.depth ?? 0;

      // largest_tree_root: max depth wins; ties → lexicographically smaller root
      if (
        depth > maxDepth ||
        (depth === maxDepth && h.root < largestTreeRoot)
      ) {
        maxDepth = depth;
        largestTreeRoot = h.root;
      }
    }
  }

  return {
    total_trees: totalTrees,
    total_cycles: totalCycles,
    largest_tree_root: largestTreeRoot,
  };
}

module.exports = { generateSummary };
