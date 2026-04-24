const { validateInput } = require('../utils/validator');

const analyzeHierarchy = (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data) {
      return res.status(400).json({ error: 'Missing "data" field in request body.' });
    }

    const validationResult = validateInput(data);

    res.status(200).json({
      success: true,
      data: validationResult
    });
  } catch (error) {
    console.error('Error analyzing hierarchy:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  analyzeHierarchy
};
