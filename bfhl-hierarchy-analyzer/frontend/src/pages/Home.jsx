import { useState } from 'react';
import { analyzeHierarchy } from '../services/api';
import TreeNode from '../components/TreeNode';

const Home = () => {
  const [rawInput, setRawInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setResult(null);

    const data = rawInput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (data.length === 0) {
      setError('Please enter edges to analyze.');
      return;
    }

    setLoading(true);
    try {
      const response = await analyzeHierarchy(data);
      setResult(response);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section text-center animate-slide-down">
        <h1 className="hero-title">BFHL Hierarchy Analyzer</h1>
        <p className="hero-subtitle">Analyze • Visualize • Understand Graph Structures</p>
      </section>

      {/* Main 2-Column Dashboard Layout */}
      <div className="dashboard-layout">
        {/* LEFT COLUMN: INPUT */}
        <div className="dashboard-sidebar">
          <section className="card input-card shadow-hover animate-fade-in">
            <h2 className="card-title">
              <span className="step-badge">1</span> Input Edges
            </h2>
            <p className="input-hint">
              Enter one edge per line (e.g. <code>A-&gt;B</code>). <br/>
              Press <kbd>Ctrl+Enter</kbd> to analyze.
            </p>
            <textarea
              id="edgeInput"
              className="edge-textarea"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={"A->B\nA->C\nB->D"}
              spellCheck={false}
            />
            <div className="input-actions">
              <button
                id="submitBtn"
                className={`btn-primary full-width ${loading ? 'loading' : ''}`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <span className="spinner"></span> : "Analyze →"}
              </button>
              {result && (
                <button className="btn-secondary" onClick={() => { setResult(null); setError(null); setRawInput(''); }}>
                  Clear
                </button>
              )}
            </div>
            {error && (
              <div className="alert-error-premium mt-4">
                <span>❌</span> {error}
              </div>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN: RESULTS */}
        <div className="dashboard-main">
          {!result && !loading && !error && (
            <div className="empty-state-premium animate-fade-in">
              <div className="empty-state-content">
                <span className="empty-icon">📊</span>
                <p>Enter edges to analyze and see results here.</p>
              </div>
            </div>
          )}

          {result && (
            <div className="results-container animate-fade-in">
              {/* Summary Card */}
              <section className="card shadow-hover summary-card-premium">
                <h2 className="card-title">
                  <span className="step-badge">2</span> Summary
                </h2>
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-icon">🌳</span>
                    <span className="stat-value text-green">{result.summary?.total_trees ?? 0}</span>
                    <span className="stat-label">Trees</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">🔁</span>
                    <span className="stat-value text-red">{result.summary?.total_cycles ?? 0}</span>
                    <span className="stat-label">Cycles</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">🏆</span>
                    <span className="stat-value text-accent">{result.summary?.largest_tree_root || '—'}</span>
                    <span className="stat-label">Largest Root</span>
                  </div>
                </div>
              </section>

              {/* Hierarchies */}
              <section className="card shadow-hover result-card-premium">
                <h2 className="card-title">
                  <span className="step-badge">3</span> Hierarchies
                </h2>
                <div className="hierarchy-scroll-area">
                  {result.hierarchies && result.hierarchies.length > 0 ? (
                    result.hierarchies.map((h, i) => (
                      <div key={i} className={`hierarchy-item-premium ${h.has_cycle ? 'cycle-border' : ''}`}>
                        <div className="item-header">
                          <span className="root-label">Root: <strong className="text-white">{h.root}</strong></span>
                          {h.has_cycle ? (
                            <span className="badge badge-red">🔁 Cycle Detected</span>
                          ) : (
                            <span className="badge badge-green">Depth: {h.depth}</span>
                          )}
                        </div>
                        {!h.has_cycle && (
                          <div className="tree-render-container mt-3">
                            <TreeNode treeObj={h.tree} />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="empty-text">No hierarchies found.</p>
                  )}
                </div>
              </section>

              {/* Invalid & Duplicates Grid */}
              <div className="grid-2-col">
                <section className="card shadow-hover mini-card">
                  <h3 className="card-title-mini">❌ Invalid Entries</h3>
                  <div className="tag-cloud mt-3">
                    {result.invalid_entries?.length > 0 ? (
                      result.invalid_entries.map((e, i) => (
                        <span key={i} className="tag tag-red">{e || '(empty)'}</span>
                      ))
                    ) : (
                      <span className="empty-text">None</span>
                    )}
                  </div>
                </section>
                <section className="card shadow-hover mini-card">
                  <h3 className="card-title-mini">⚠️ Duplicate Edges</h3>
                  <div className="tag-cloud mt-3">
                    {result.duplicate_edges?.length > 0 ? (
                      result.duplicate_edges.map((e, i) => (
                        <span key={i} className="tag tag-yellow">{e}</span>
                      ))
                    ) : (
                      <span className="empty-text">None</span>
                    )}
                  </div>
                </section>
              </div>

              {/* Raw JSON Console */}
              <section className="card shadow-hover raw-json-card-premium">
                <h2 className="card-title">
                  <span className="step-badge">4</span> Raw Response
                </h2>
                <div className="console-wrapper mt-3">
                  <pre className="console-code">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
