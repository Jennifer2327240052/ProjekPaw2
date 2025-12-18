// src/app/pages/teacher-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Teacher } from '../Services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  imports: [FormsModule, CommonModule]
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];
  allTeachers: Teacher[] = [];
  searchQuery: string = '';

  constructor(private dataService: DataService, public router: Router) {}

  ngOnInit() {
    this.loadTeachers();
  }

  async loadTeachers() {
    this.allTeachers = await this.dataService.getTeachers();
    this.teachers = [...this.allTeachers];
  }

  searchTeachers() {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      this.teachers = [...this.allTeachers];
    } else {
      this.teachers = this.allTeachers.filter(t => t.name.toLowerCase().includes(q));
    }
  }

  addNewTeacher() {
    this.router.navigate(['/dashboard/add-teacher']);
  }

  editTeacher(id: number) {
    this.router.navigate(['/dashboard/edit-teacher', id]);
  }

  deleteTeacher(id: number) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.dataService.deleteTeacher(id).then(() => this.loadTeachers());
    }
  }
}
