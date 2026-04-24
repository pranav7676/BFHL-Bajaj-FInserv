function validateInput(data) {
  const validEdges = [];
  const invalidEntries = [];

  if (!Array.isArray(data)) {
    return { validEdges, invalidEntries };
  }

  const regex = /^[A-Z]->[A-Z]$/;

  for (const entry of data) {
    if (typeof entry !== 'string') {
      invalidEntries.push(String(entry));
      continue;
    }

    const trimmedEntry = entry.trim();

    if (!regex.test(trimmedEntry)) {
      invalidEntries.push(trimmedEntry);
      continue;
    }

    const parts = trimmedEntry.split('->');
    if (parts[0] === parts[1]) {
      // Reject self-loop
      invalidEntries.push(trimmedEntry);
      continue;
    }

    validEdges.push(trimmedEntry);
  }

  return { validEdges, invalidEntries };
}

module.exports = { validateInput };
