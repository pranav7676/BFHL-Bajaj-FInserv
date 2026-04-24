/**
 * Detects cycles in a directed graph using iterative DFS with 3-state coloring,
 * starting from a SINGLE root node (per-component scope).
 *
 * States:
 *  0 = unvisited
 *  1 = visiting (currently in DFS stack)
 *  2 = visited  (fully processed, no cycle from here)
 *
 * By scoping to one root, independent components are checked independently —
 * a cycle in X→Y→Z→X won't contaminate A's tree.
 *
 * @param {Object.<string, string[]>} adjList  - Adjacency list of the graph.
 * @param {string}                   startNode - Root node to begin traversal from.
 * @returns {boolean} true if a cycle is reachable from startNode.
 */
function detectCycle(adjList, startNode) {
  // color: Map<node, 0|1|2>
  const color = new Map();

  /**
   * Iterative DFS using an explicit stack to avoid call-stack overflow.
   * Each stack frame is [node, indexOfNextChildToVisit].
   */
  function dfs(start) {
    const stack = [[start, 0]];
    color.set(start, 1); // Mark as visiting

    while (stack.length > 0) {
      const frame = stack[stack.length - 1];
      const [node, childIdx] = frame;
      const children = adjList[node] || [];

      if (childIdx >= children.length) {
        // All children processed — mark fully visited and pop
        color.set(node, 2);
        stack.pop();
      } else {
        frame[1]++;
        const child = children[childIdx];
        const childColor = color.get(child) ?? 0;

        if (childColor === 1) {
          // Back edge found → cycle detected
          return true;
        }
        if (childColor === 0) {
          // Unvisited — push and mark visiting
          color.set(child, 1);
          stack.push([child, 0]);
        }
        // childColor === 2 → already fully explored, safe to skip
      }
    }
    return false;
  }

  return dfs(startNode);
}

module.exports = { detectCycle };
