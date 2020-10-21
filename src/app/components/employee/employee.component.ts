import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employeeService.employees = res;
      },
      err => console.log(err)
    );
  }

  addEmployee(form: NgForm){
    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe(
        (res) => {
          console.log(res);
          this.getEmployees();
          form.reset();
        },
        (err) => console.log(err)
      )
    } else {
        this.employeeService.createEmployee(form.value).subscribe(
          res => {
            console.log(res);
            this.getEmployees();
            form.reset();
          },
          err => console.log(err)
        );
    }
  }

  deleteEmployee(_id: string){
    if(confirm("Are you sure to delete this employee"))
    {
      this.employeeService.deleteEmployee(_id).subscribe(
        res => {
          console.log(res);
          this.getEmployees();
        },
        err => console.log(err)
      );
    }
  }

  editEmployee(employee: Employee){  
    this.employeeService.employeeForm = employee;
  }

  resetForm(form: NgForm){
    form.reset();
  }

}
