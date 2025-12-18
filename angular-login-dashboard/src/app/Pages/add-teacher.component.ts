// src/app/pages/add-teacher.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Teacher } from '../Services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  imports: [FormsModule, CommonModule]
})
export class AddTeacherComponent {
  model: Partial<Teacher> = {};
  isSaving = false;

  constructor(private dataService: DataService, private router: Router) {}
  async submit() {
    if (this.isSaving) return;
    this.isSaving = true;
    const teacherToAdd: Omit<Teacher, 'id'> = {
      name: (this.model.name || '').trim(),
      dob: this.model.dob || '',
      phone: this.model.phone || '',
      email: this.model.email || '',
      address: this.model.address || '',
      education: this.model.education || '',
      position: this.model.position || '',
      // subject and user removed from payload per UI change
    };

    try {
      await this.dataService.addTeacher(teacherToAdd);
      this.router.navigate(['/dashboard/teacher-list']);
    } catch (err: any) {
      console.error('Add teacher failed', err);
      alert('Failed to save teacher: ' + (err?.message || err));
    } finally {
      this.isSaving = false;
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/teacher-list']);
  }
}
