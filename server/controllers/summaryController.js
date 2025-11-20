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

const deleteSummary = async (req, res) => {
  try {
    const summaryId = req.params.id;

    
    const summary = await Summary.findById(summaryId);

    if (!summary)
      return res.status(404).json({ message: "Summary not found" });

    
    if (summary.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Summary.findByIdAndDelete(summaryId);

    res.json({ message: "Summary deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



export { createSummary, getSummaries, deleteSummary };
