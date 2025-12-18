// src/app/pages/edit-student.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Student } from '../Services/data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  imports: [FormsModule, CommonModule]
})
export class EditStudentComponent implements OnInit {
  model: Partial<Student> = {};
  id: string | null = null;
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.router.navigate(['/dashboard/student-list']);
      return;
    }
    const s = await this.dataService.getStudentById(idParam);
    if (s) {
      this.id = String(s.id);
      this.model = { ...s };
    } else {
      this.router.navigate(['/dashboard/student-list']);
    }
  }

  async submit(form?: NgForm) {
    if (form && !form.valid) {
      form.control.markAllAsTouched();
      return;
    }
    if (this.id === null) return;
    const updated: Student = {
      id: this.id,
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
      user: this.model.user || ''
    };

    try {
      await this.dataService.updateStudent(this.id, updated);
      this.successMessage = 'Student updated successfully.';
      setTimeout(() => this.router.navigate(['/dashboard/student-list']), 900);
    } catch (err) {
      console.error('Update student failed', err);
      alert('Failed to update student.');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/student-list']);
  }
}
