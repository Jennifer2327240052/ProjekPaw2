import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService, Teacher, Student } from '../Services/data.service';

@Component({
  standalone: true,
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  imports: [FormsModule, CommonModule]
})
export class AddScheduleComponent implements OnInit {

  scheduleDay = '';
  scheduleTime = '';

  selectedTeacher: Teacher | null = null;
  selectedStudent: Student | null = null;

  teachers: Teacher[] = [];
  students: Student[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.teachers = await this.dataService.getTeachers();
    this.students = await this.dataService.getStudents();
  }

  async createSchedule() {
    if (
      !this.scheduleDay.trim() ||
      !this.scheduleTime ||
      !this.selectedTeacher ||
      !this.selectedStudent
    ) {
      alert('Please fill all fields');
      return;
    }

    await this.dataService.addSchedule({
      day: this.scheduleDay.trim(),
      time: this.scheduleTime,
      teacher: this.selectedTeacher.name,
      student: this.selectedStudent.name
    });

    alert('Schedule created');
    this.router.navigate(['/dashboard/schedule-list']);
  }
}
