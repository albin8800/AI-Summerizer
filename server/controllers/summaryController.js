import Summary from "../models/Summary.js";

const createSummary = async (req, res) => {
    try {
        const { originalText } = req.body;

        if(!originalText)
            return res.status(400).json({ message: "Original text is Required" });

    const summary = "AI summary will be added later";

    const newSummary = await Summary.create({
      user: req.user.id,
      originalText,
      summaryText: summary
    });

    res.status(201).json({
      message: "Summary created successfully",
      data: newSummary
    });

    } catch (error) {
         res.status(500).json({ message: "Server Error" });
    }
}

const getSummaries = async (req, res) => {
    try {
        const summaries = await Summary.find({ user: req.user._id })
        .sort({ createdAt: -1 })

        res.json({
            data: summaries
        })
    } catch (error) {
         res.status(500).json({ message: "Server Error" });
    }
}

export { createSummary, getSummaries }