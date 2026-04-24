const { validateInput } = require('../utils/validator');
const { processDuplicates } = require('../utils/duplicateHandler');
const { buildGraph } = require('../utils/graphBuilder');
const { findRoots } = require('../utils/rootFinder');
const { buildHierarchies } = require('../services/hierarchyService');
const { generateSummary } = require('../utils/summary');

/**
 * POST /bfhl
 *
 * Pipeline:
 *  1. Validate input
 *  2. Handle duplicates
 *  3. Build graph
 *  4. Find roots
 *  5. Build hierarchies (cycle detection + tree + depth inside)
 *  6. Generate summary
 *  7. Return final response
 */
const processBFHL = (req, res) => {
  try {
    const { data } = req.body;

    // ── 1. Validate input ────────────────────────────────────────────────
    if (!Array.isArray(data)) {
      return res.status(400).json({
        error: '"data" field must be a non-empty array of strings.',
      });
    }

    const { validEdges, invalidEntries } = validateInput(data);

    // ── 2. Duplicate handling ────────────────────────────────────────────
    const { uniqueEdges, duplicateEdges } = processDuplicates(validEdges);

    // ── 3. Build graph ───────────────────────────────────────────────────
    const { adjList, allNodes, childrenSet } = buildGraph(uniqueEdges);

    // ── 4. Find roots ────────────────────────────────────────────────────
    const roots = findRoots(allNodes, childrenSet, adjList);

    // ── 5. Build hierarchies ─────────────────────────────────────────────
    let hierarchies = [];
    if (roots.length > 0) {
      hierarchies = buildHierarchies(adjList, roots);
    }

    // ── 6. Generate summary ──────────────────────────────────────────────
    const summary = generateSummary(hierarchies);

    // ── 7. Send response ─────────────────────────────────────────────────
    return res.status(200).json({
      user_id: process.env.USER_ID || 'yourname_ddmmyyyy',
      email_id: process.env.EMAIL_ID || 'your_email@example.com',
      college_roll_number: process.env.ROLL_NUMBER || 'your_roll_number',
      hierarchies,
      invalid_entries: invalidEntries,
      duplicate_edges: duplicateEdges,
      summary,
    });
  } catch (error) {
    console.error('[BFHL Controller Error]', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { processBFHL };
