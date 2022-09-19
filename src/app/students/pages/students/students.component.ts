import { Student } from './../../model/student';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, AfterViewInit {
  studentData: Student;

  isEditMode: boolean = false;
  dataSource: MatTableDataSource<any>;

  @ViewChild('studentForm', { static: false })
  studentForm!: NgForm;

  //tenemos que inicializar el studendata en el constructor o arriba para que no salga error
  constructor(private studentService: StudentsService) {
    this.studentData = {} as Student;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  editItem(element: Student) {}

  deleteItem(element: Student) {}

  cancelEdit() {
    this.isEditMode = false;
    this.studentForm.resetForm();
  }

  onSubmit() {
    if (this.studentForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        //this.updateStudent();
      } else {
        console.log('about to add');
        //this.addStudent();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
