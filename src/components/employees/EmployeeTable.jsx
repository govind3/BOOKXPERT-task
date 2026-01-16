import { useState } from "react";
import ToggleSwitch from "../common/ToggleSwitch";
import ConfirmDialog from "../common/ConfirmDialog";
import { useEmployees } from "../../context/EmployeeContext";

const EmployeeTable = ({ employees, onEdit, openForm }) => {
  const { deleteEmployee, toggleStatus } = useEmployees();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const confirmDelete = (emp) => {
    setSelectedEmployee(emp);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    deleteEmployee(selectedEmployee.id);
    setShowConfirm(false);
    setSelectedEmployee(null);
  };

  if (!employees.length) {
    return <p className="text-center text-gray-500 mt-6">No employees found</p>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Employee ID</th>
              <th className="p-3">Profile</th>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">DOB</th>
              <th className="p-3">State</th>
              <th className="p-3">Active</th>
              <th className="p-3 no-print">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t text-center">
                <td className="p-3">{emp.id}</td>

                <td className="p-3">
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                </td>

                <td className="p-3 text-left">{emp.name}</td>
                <td className="p-3">{emp.gender}</td>
                <td className="p-3">{emp.dob}</td>
                <td className="p-3">{emp.state}</td>

                <td className="p-3">
                  <ToggleSwitch
                    enabled={emp.isActive}
                    onToggle={() => toggleStatus(emp.id)}
                  />
                </td>

                <td className="p-3 no-print">
                  <button
                    onClick={() => {
                      onEdit(emp);
                      openForm(true);
                    }}
                    className="text-blue-600 mr-3"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => confirmDelete(emp)}
                    className="text-red-600 mr-3"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="text-gray-700"
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee?.name}?`}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default EmployeeTable;
