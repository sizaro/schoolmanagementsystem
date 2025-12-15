import dailyModel from '../models/dailyModel.js';



export async function getDailyReport(req, res) {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Missing date" });

    const getDayRangeUG = (dateString) => {
      console.log("incoming date string", dateString)
  const start = new Date(`${dateString}T00:00:00+03:00`);
  const end   = new Date(`${dateString}T23:59:59.999+03:00`);
  return { start, end };
};


    const { start, end } = getDayRangeUG(date);
    console.log("start is", start)
    console.log("end is", end)

    const [
      services,
      expenses,
      advances,
      clockings,
      tagFees,
      lateFees,
      employees
    ] = await Promise.all([
      dailyModel.getServicesByDay(start.toISOString(), end.toISOString()),
      dailyModel.getExpensesByDay(start.toISOString(), end.toISOString()),
      dailyModel.getAdvancesByDay(start.toISOString(), end.toISOString()),
      dailyModel.getClockingsByDay(start.toISOString(), end.toISOString()),
      dailyModel.getTagFeesByDay(start.toISOString(), end.toISOString()),
      dailyModel.getLateFeesByDay(start.toISOString(), end.toISOString()),
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