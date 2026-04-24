/**
 * Identifies root nodes from a graph's node and children sets.
 *
 * Rules:
 *  - A root is any node that never appears as a child.
 *  - Multiple independent trees can each have their own root.
 *  - Edge case: if no natural root exists for a disconnected component (cycle group),
 *    the lexicographically smallest node in that component is selected as the root.
 *
 * @param {Set<string>} allNodes    - Set of every node in the graph.
 * @param {Set<string>} childrenSet - Set of nodes that appear as a child at least once.
 * @param {Object.<string, string[]>} adjList - Adjacency list of the graph.
 * @returns {string[]} Sorted array of root nodes.
 */
function findRoots(allNodes, childrenSet, adjList) {
  const roots = [];

  // 1. Find all natural roots
  for (const node of allNodes) {
    if (!childrenSet.has(node)) {
      roots.push(node);
    }
  }

  // 2. Find all nodes reachable from natural roots
  const reachable = new Set();
  const stack = [...roots];
  while (stack.length > 0) {
    const node = stack.pop();
    if (!reachable.has(node)) {
      reachable.add(node);
      const children = adjList[node] || [];
      for (const child of children) {
        stack.push(child);
      }
    }
  }

  // 3. Find disconnected cycle components
  const unseen = new Set([...allNodes].filter((n) => !reachable.has(n)));

  while (unseen.size > 0) {
    // Pick an arbitrary node from unseen
    const start = Array.from(unseen)[0];

    // Find all nodes reachable in this connected component
    const component = new Set();
    const compStack = [start];

    while (compStack.length > 0) {
      const node = compStack.pop();
      if (!component.has(node)) {
        component.add(node);
        unseen.delete(node);
        const children = adjList[node] || [];
        for (const child of children) {
          if (unseen.has(child)) {
            compStack.push(child);
          }
        }
      }
    }

    // For this disconnected cycle group, pick the lexicographically smallest node
    const compRoot = [...component].sort()[0];
    roots.push(compRoot);
  }

  // Sort final roots for deterministic output
  roots.sort();
  return roots;
}

module.exports = { findRoots };
