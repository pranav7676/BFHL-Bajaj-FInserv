/**
 * Builds a nested hierarchical tree from a root node and adjacency list.
 *
 * Rules:
 *  - If hasCycle is true → return {}
 *  - Otherwise, recurse into children and build nested objects.
 *  - A visited set guards against any accidental infinite recursion.
 *
 * @param {string} root       - The root node to start building from.
 * @param {Object.<string, string[]>} adjList - Adjacency list of the graph.
 * @param {boolean} hasCycle  - Whether the graph contains a cycle.
 * @returns {Object} Nested tree object, e.g. { A: { B: { C: {} } } }
 */
function buildTree(root, adjList, hasCycle) {
  if (hasCycle) return {};

  /**
   * Recursive helper that builds the sub-tree for a given node.
   * @param {string} node
   * @param {Set<string>} visited - Guards against revisiting (safety net).
   * @returns {Object}
   */
  function buildSubTree(node, visited) {
    const subtree = {};
    const children = adjList[node] || [];

    for (const child of children) {
      if (visited.has(child)) {
        // Defensive guard — should not occur in a verified acyclic graph
        continue;
      }
      visited.add(child);
      subtree[child] = buildSubTree(child, visited);
    }

    return subtree;
  }

  const visited = new Set([root]);
  const tree = {};
  tree[root] = buildSubTree(root, visited);

  return tree;
}

module.exports = { buildTree };
