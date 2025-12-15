import yearlyModel from "../models/yearlyModel.js";


export const getYearlyReport = async (req, res) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({ error: "Year is required" });
    }

    console.log("Received in the controller year:", year);

    const [
      services,
      expenses,
      advances,
      tagFees,
      lateFees
    ] = await Promise.all([
      yearlyModel.getServicesByYear(year),
      yearlyModel.getExpensesByYear(year),
      yearlyModel.getAdvancesByYear(year),
      yearlyModel.getTagFeesByYear(year),
      yearlyModel.getLateFeesByYear(year)
    ]);

    console.log("Yearly services:", services.length);
    console.log("Yearly expenses:", expenses.length);
    console.log("Yearly advances:", advances.length);
    console.log("Yearly tag fees:", tagFees.length);
    console.log("Yearly late fees:", lateFees.length);

    res.json({
      services,
      expenses,
      advances,
      tagFees,
      lateFees
    });

  } catch (err) {
    console.error("Error fetching yearly report:", err);
    res.status(500).json({ error: "Server error" });
  }
};
