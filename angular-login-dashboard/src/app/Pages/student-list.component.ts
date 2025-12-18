// src/app/pages/student-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Student } from '../Services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  imports: [FormsModule, CommonModule]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  allStudents: Student[] = [];
  searchQuery: string = '';

  constructor(private dataService: DataService, public router: Router) {}

  ngOnInit() {
    this.loadStudents();
  }

  async loadStudents() {
    this.allStudents = await this.dataService.getStudents();
    this.students = [...this.allStudents];
  }

  searchStudents() {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      this.students = [...this.allStudents];
    } else {
      this.students = this.allStudents.filter(s => s.name.toLowerCase().includes(q));
    }
  }

  editStudent(id: any) {
    this.router.navigate(['/dashboard/edit-student', id]);
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.dataService.deleteStudent(id).then(() => this.loadStudents());
    }
  }

  addNewStudent() {
    this.router.navigate(['/dashboard/add-student']);
  }
}
