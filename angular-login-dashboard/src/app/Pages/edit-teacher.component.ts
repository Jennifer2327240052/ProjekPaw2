// src/app/pages/edit-teacher.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Teacher } from '../Services/data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  imports: [FormsModule, CommonModule]
})
export class EditTeacherComponent implements OnInit {
  model: Partial<Teacher> = {};
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
      this.router.navigate(['/dashboard/teacher-list']);
      return;
    }
    const t = await this.dataService.getTeacherById(idParam);
    if (t) {
      this.id = String(t.id);
      this.model = { ...t };
    } else {
      this.router.navigate(['/dashboard/teacher-list']);
    }
  }

  async submit(form?: NgForm) {
    if (form && !form.valid) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.id === null) return;
    const updated: Teacher = {
      id: this.id,
      name: (this.model.name || '').trim(),
      dob: this.model.dob || '',
      phone: this.model.phone || '',
      email: this.model.email || '',
      address: this.model.address || '',
      subject: this.model.subject || '',
      education: this.model.education || '',
      position: this.model.position || '',
      user: this.model.user || ''
    };
    try {
      await this.dataService.updateTeacher(this.id, updated);
      this.successMessage = 'Teacher updated successfully.';
      setTimeout(() => this.router.navigate(['/dashboard/teacher-list']), 900);
    } catch (err) {
      console.error('Update teacher failed', err);
      alert('Failed to update teacher.');
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/teacher-list']);
  }
}
