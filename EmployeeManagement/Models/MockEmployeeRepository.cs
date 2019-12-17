using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Models
{
    public class MockEmployeeRepository : IEmployeeRepository
    {
        private List<Employee> _employeeList;
        public MockEmployeeRepository()
        {
            _employeeList = new List<Employee>()
            {
                new Employee() {ID = 1 , Name = "Mahmoud" , Email ="Mahmoud.nouh@must.edu.eg",Department = Dept.IT},
                new Employee() {ID = 2 , Name = "Emad" , Email ="Emad@must.edu.eg",Department = Dept.Payroll},
                new Employee() {ID = 3 , Name = "Mustafa" , Email ="Mustafa@must.edu.eg",Department = Dept.HR},
            };
        }

        public Employee Add(Employee employee)
        {
            employee.ID = _employeeList.Max(r => r.ID) + 1;
            _employeeList.Add(employee);
            return employee;
        }

        public Employee Delete(int ID)
        {
            Employee employee = _employeeList.FirstOrDefault(r => r.ID == ID);
            if(employee != null)
            {
                _employeeList.Remove(employee);
            }
            return employee;
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            return _employeeList;
        }

        public Employee GetEmployee(int id)
        {
            return _employeeList.FirstOrDefault(r => r.ID == id);
        }

        public Employee Update(Employee employeeChanges)
        {
            Employee employee = _employeeList.FirstOrDefault(r => r.ID == employeeChanges.ID);
            if (employee != null)
            {
                employee.Department = employeeChanges.Department;
                employee.Email = employeeChanges.Email;
                employee.Name = employeeChanges.Name;
            }
            return employee;
        }
    }
}
