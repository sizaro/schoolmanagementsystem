import monthlyModel from "../models/monthlyModel.js";

// Controller to handle requests for monthly reports


export const getMonthlyReport = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ error: "Year and month are required" });
    }

    console.log("Received in controller → year:", year, "month:", month);

    const [services, expenses, advances, tagFees, lateFees] = await Promise.all([
      monthlyModel.getServicesByMonth(year, month),
      monthlyModel.getExpensesByMonth(year, month),
      monthlyModel.getAdvancesByMonth(year, month),
      monthlyModel.getTagFeesByMonth(year, month),
      monthlyModel.getLateFeesByMonth(year, month)
    ]);

    res.json({
      services,
      expenses,
      advances,
      tagFees,
      lateFees
    });

  } catch (err) {
    console.error("Error fetching monthly report:", err);
    res.status(500).json({ error: "Server error" });
  }
};

