import { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeFilters from "../components/employees/EmployeeFilters";

const Dashboard = () => {
  const { employees, deleteEmployee } = useEmployees();

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const filteredEmployees = employees.filter((emp) => {
    const matchName = emp.name.toLowerCase().includes(search.toLowerCase());

    const matchGender = gender ? emp.gender === gender : true;

    const matchStatus =
      status === "" ? true : status === "active" ? emp.isActive : !emp.isActive;

    return matchName && matchGender && matchStatus;
  });

  const activeCount = employees.filter((e) => e.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-start sm:items-center mb-4 flex-col sm:flex-row">
          <h1 className="text-2xl font-semibold text-gray-800">
            Employee Dashboard
          </h1>
          <div className=" flex gap-4 flex-wrap">
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg "
            >
              Add Employee
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Print Employees
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Total: {employees.length} | Active: {activeCount}
        </p>

        <div className="no-print">
          <EmployeeFilters
            search={search}
            setSearch={setSearch}
            gender={gender}
            setGender={setGender}
            status={status}
            setStatus={setStatus}
          />
        </div>

        {showForm && (
          <EmployeeForm
            close={() => {
              setShowForm(false);
              setEditData(null);
            }}
            editData={editData}
          />
        )}

        <EmployeeTable
          employees={filteredEmployees}
          onEdit={setEditData}
          openForm={setShowForm}
          deleteEmployee={deleteEmployee}
        />
      </div>
    </div>
  );
};

export default Dashboard;
