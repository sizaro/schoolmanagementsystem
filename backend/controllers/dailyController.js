import dailyModel from '../models/dailyModel.js';



export async function getDailyReport(req, res) {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Missing date" });


    const [
      services,
      expenses,
      advances,
      clockings,
      tagFees,
      lateFees,
      employees
    ] = await Promise.all([
      dailyModel.getServicesByDay(date),
      dailyModel.getExpensesByDay(date),
      dailyModel.getAdvancesByDay(date),
      dailyModel.getClockingsByDay(date),
      dailyModel.getTagFeesByDay(date),
      dailyModel.getLateFeesByDay(date),
      dailyModel.fetchAllEmployees()
    ]);

    
    console.log("✅ Daily Report Generated:", {
      date,
      servicesCount: services,
      expensesCount: expenses,
      advancesCount: advances,
      clockingsCount: clockings,
      tagFeesCount: tagFees,
      lateFeesCount: lateFees
    });


    res.json({
      services,
      expenses,
      advances,
      clockings,
      tagFees,
      lateFees,
      employees
    });

  } catch (error) {
    console.error("❌ Error fetching daily report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}