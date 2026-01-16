import { createContext, useContext, useEffect, useState } from "react";
import employeesData from "../data/employees";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(employeesData);
  }, []);

  const addEmployee = (emp) => {
    setEmployees([...employees, { ...emp, id: Date.now() }]);
  };

  const updateEmployee = (emp) => {
    setEmployees(employees.map((e) => (e.id === emp.id ? emp : e)));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const toggleStatus = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
      )
    );
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        toggleStatus,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
