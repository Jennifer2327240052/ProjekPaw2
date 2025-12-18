// src/app/pages/edit-schedule.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Schedule } from '../Services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  imports: [FormsModule]
})
export class EditScheduleComponent implements OnInit {
  schedule: Schedule | undefined = undefined;
  scheduleDay = '';
  scheduleTime = '';
  selectedTeacher = '';
  selectedStudent = '';

  teachers = ['Herna Marlindawati', 'Meiliana Tirtadjaya', 'Umi Muslikhatun'];
  students = ['Mike Celiano Sutanto', 'Giselle Naomi Sutanto'];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  async loadSchedule() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;
    try {
      const s = await this.dataService.getScheduleById(idParam);
      if (!s) return;
      this.schedule = s;
      this.scheduleDay = s.day;
      this.scheduleTime = s.time;
      this.selectedTeacher = s.teacher;
      this.selectedStudent = s.student;
    } catch (err) {
      console.error('Failed to load schedule', err);
    }
  }

  ngOnInit() {
    this.loadSchedule();
  }

  async updateSchedule() {
    if (!this.schedule || !this.scheduleDay || !this.scheduleTime || !this.selectedTeacher || !this.selectedStudent) {
      alert('Please fill all fields');
      return;
    }

    const updatedSchedule: Schedule = {
      ...this.schedule,
      day: this.scheduleDay,
      time: this.scheduleTime,
      teacher: this.selectedTeacher,
      student: this.selectedStudent
    };

    try {
      await this.dataService.updateSchedule(String(this.schedule.id), updatedSchedule as any);
      alert('Schedule updated successfully!');
      this.router.navigate(['/dashboard/schedule-list']);
    } catch (err) {
      console.error('Update schedule failed', err);
      alert('Failed to update schedule.');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/schedule-list']);
  }
}