// src/app/pages/add-student.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Student } from '../Services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  imports: [FormsModule, CommonModule]
})
export class AddStudentComponent {
  model: Partial<Student> = {};
  isSaving = false;

  constructor(private dataService: DataService, private router: Router) {}
  async submit() {
    if (this.isSaving) return;
    this.isSaving = true;
    // Normalize types
    const studentToAdd: Omit<Student, 'id'> = {
      name: (this.model.name || '').trim(),
      grade: this.model.grade ? Number(this.model.grade) : undefined,
      email: this.model.email || '',
      address: this.model.address || '',
      phone: this.model.phone || '',
      level: this.model.level || '',
      status: this.model.status || '',
      dob: this.model.dob || '',
      registrationDate: this.model.registrationDate || '',
      type: this.model.type || '',
      school: this.model.school || '',
      // user removed: handled server-side or not required
    };

    try {
      await this.dataService.addStudent(studentToAdd as any);
      this.router.navigate(['/dashboard/student-list']);
    } catch (err: any) {
      console.error('Add student failed', err);
      alert('Failed to save student: ' + (err?.message || err));
    } finally {
      this.isSaving = false;
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/student-list']);
  }
}
