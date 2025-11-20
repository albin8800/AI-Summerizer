import Summary from "../models/Summary.js";
import generateSummary from '../utils/aiSummarizer.js'

 const createSummary = async (req, res) => {
  try {
    const { originalText, tone } = req.body;

    if (!originalText)
      return res.status(400).json({ message: "Original text is required" });

    const selectedTone = tone || "neutral"; 

   
    const summaryText = await generateSummary(originalText, selectedTone);

    
    const newSummary = await Summary.create({
      user: req.user.id,
      originalText,
      summaryText
    });

    res.status(201).json({
      message: "Summary generated",
      data: newSummary
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI Summarization failed" });
  }
};

const getSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      data: summaries
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


export { createSummary, getSummaries };
