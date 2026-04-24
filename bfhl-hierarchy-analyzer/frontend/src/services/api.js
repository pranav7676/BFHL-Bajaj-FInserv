const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * POST /bfhl
 * Sends edge data to the backend for analysis.
 *
 * @param {string[]} data - Array of edge strings e.g. ["A->B", "A->C"]
 * @returns {Promise<Object>} Parsed JSON response from backend
 * @throws {Error} On network failure or non-2xx HTTP status
 */
export async function analyzeHierarchy(data) {
  const response = await fetch(`${API_BASE_URL}/bfhl`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    let errorMessage = `Server error: ${response.status}`;
    try {
      const errorBody = await response.json();
      if (errorBody.error) errorMessage = errorBody.error;
    } catch {
      // ignore JSON parse error on error body
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
