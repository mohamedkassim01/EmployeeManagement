using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Models
{
    public class SQLEmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext db;
        public SQLEmployeeRepository(AppDbContext db)
        {
            this.db = db;
        }
        public Employee Add(Employee employee)
        {
            db.Employees.Add(employee);
            db.SaveChanges();
            return employee;
        }

        public Employee Delete(int ID)
        {
            var employee = db.Employees.FirstOrDefault(r => r.ID == ID);
            if (employee != null)
            {
                db.Employees.Remove(employee);
                db.SaveChanges();
            }
            return employee;
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            return db.Employees;
        }

        public Employee GetEmployee(int id)
        {
            return db.Employees.FirstOrDefault(r => r.ID == id);
        }

        public Employee Update(Employee employeeChanges)
        {
            var employee = db.Employees.Attach(employeeChanges);
            employee.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            db.SaveChanges();
            return employeeChanges;
        }
    }
}
