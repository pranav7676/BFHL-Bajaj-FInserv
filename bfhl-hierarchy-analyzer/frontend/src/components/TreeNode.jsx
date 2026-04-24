/**
 * Recursively renders a tree node and its children.
 * @param {Object} treeObj - The tree sub-object e.g. { B: { C: {} }, D: {} }
 * @param {number} depth   - Current nesting depth (for indentation/styling)
 */
function TreeNode({ treeObj, depth = 0 }) {
  const entries = Object.entries(treeObj || {});

  return (
    <ul className={`tree-list ${depth === 0 ? 'tree-root-list' : ''}`}>
      {entries.map(([node, children]) => (
        <li key={node} className="tree-item">
          <span className="tree-node-label">{node}</span>
          {Object.keys(children).length > 0 && (
            <TreeNode treeObj={children} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default TreeNode;
