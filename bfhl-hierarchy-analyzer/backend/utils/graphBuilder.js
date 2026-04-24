/**
 * Builds a directed graph from a list of unique edges.
 *
 * Rules:
 *  - Each edge is "Parent->Child".
 *  - Multi-parent rule: if a node already has a parent, subsequent parent
 *    assignments are silently ignored (first-seen parent wins).
 *  - No duplicate children in adjacency list.
 *  - Insertion order is preserved.
 *
 * @param {string[]} edges - Array of unique, valid edge strings (e.g., ["A->B", "A->C"])
 * @returns {{
 *   adjList: Object.<string, string[]>,
 *   allNodes: Set<string>,
 *   childrenSet: Set<string>
 * }}
 */
function buildGraph(edges) {
  // adjList: parent -> [children]
  const adjList = {};
  // Tracks which node has already been assigned a parent (multi-parent guard)
  const parentMap = new Map();
  // Set of all nodes (parents + children)
  const allNodes = new Set();
  // Set of nodes that appear as a child at least once
  const childrenSet = new Set();

  for (const edge of edges) {
    const [parent, child] = edge.split('->');

    // Register nodes
    allNodes.add(parent);
    allNodes.add(child);

    // Multi-parent rule: skip if child already has a parent
    if (parentMap.has(child)) {
      continue;
    }

    // Assign parent to child
    parentMap.set(child, parent);
    childrenSet.add(child);

    // Add to adjacency list (avoid duplicate children via Set internally)
    if (!adjList[parent]) {
      adjList[parent] = [];
    }

    // Guard against duplicates in children list (shouldn't occur after
    // processDuplicates, but defensive check)
    if (!adjList[parent].includes(child)) {
      adjList[parent].push(child);
    }
  }

  return {
    adjList,
    allNodes,
    childrenSet,
  };
}

module.exports = { buildGraph };
