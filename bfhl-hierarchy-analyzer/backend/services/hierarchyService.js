const { detectCycle } = require('../utils/cycleDetector');
const { buildTree } = require('../utils/treeBuilder');
const { calculateDepth } = require('../utils/depthCalculator');

/**
 * Core engine: builds a hierarchy object for every root.
 *
 * Cycle detection runs PER ROOT (per component), so a cycle in one
 * component (e.g. X→Y→Z→X) does NOT contaminate other trees.
 *
 * Each hierarchy object follows:
 *  - No cycle:  { root, tree, depth }
 *  - Has cycle: { root, tree: {}, has_cycle: true }
 *
 * @param {Object.<string, string[]>} adjList - Adjacency list.
 * @param {string[]}                  roots   - Array of root nodes.
 * @returns {Array<Object>}
 */
function buildHierarchies(adjList, roots) {
  return roots.map((root) => {
    // Detect cycle only within this root's reachable component
    const hasCycle = detectCycle(adjList, root);

    if (hasCycle) {
      return {
        root,
        tree: {},
        has_cycle: true,
      };
    }

    const tree = buildTree(root, adjList, false);
    const depth = calculateDepth(root, adjList);

    return {
      root,
      tree,
      depth,
    };
  });
}

module.exports = { buildHierarchies };
