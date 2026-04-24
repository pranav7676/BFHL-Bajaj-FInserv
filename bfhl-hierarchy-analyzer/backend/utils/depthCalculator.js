/**
 * Calculates the depth of a tree rooted at `root`.
 *
 * Definition:
 *  Depth = number of nodes in the longest root-to-leaf path.
 *  e.g. A->B->C → depth = 3
 *
 * Only call this for non-cyclic graphs.
 * Uses iterative BFS/DFS via an explicit stack to avoid recursion limits.
 *
 * @param {string} root - The root node.
 * @param {Object.<string, string[]>} adjList - Adjacency list.
 * @returns {number} The depth of the deepest path from root.
 */
function calculateDepth(root, adjList) {
  if (!root) return 0;

  // Iterative DFS: stack holds [node, currentDepth]
  const stack = [[root, 1]];
  let maxDepth = 0;
  const visited = new Set(); // Safety guard

  while (stack.length > 0) {
    const [node, depth] = stack.pop();

    if (visited.has(node)) continue;
    visited.add(node);

    if (depth > maxDepth) {
      maxDepth = depth;
    }

    const children = adjList[node] || [];
    for (const child of children) {
      if (!visited.has(child)) {
        stack.push([child, depth + 1]);
      }
    }
  }

  return maxDepth;
}

module.exports = { calculateDepth };
