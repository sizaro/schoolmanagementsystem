import { Routes, Route } from "react-router-dom";
import EmployeeSidebar from "../sidebars/EmployeeSidebar.jsx";

import EmployeeDashboard from "../../pages/employee/EmployeeDashboard.jsx";
import EmployeeIncomeReport from "../../pages/employee/EmployeeIncomeReport.jsx";

const EmployeeLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <EmployeeSidebar />

      <main className="flex-1 p-6 overflow-y-auto w-full mt-15 ml-0 md:ml-64 sm:mt-6">
        <Routes>
          <Route index element={<EmployeeDashboard />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="income-report" element={<EmployeeIncomeReport />} />
        </Routes>
      </main>
    </div>
  );
};

export default EmployeeLayout;
