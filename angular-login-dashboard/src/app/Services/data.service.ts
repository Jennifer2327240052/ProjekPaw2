// src/app/services/data.service.ts

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface Schedule {
  id: number;
  day: string;
  time: string;
  teacher: string;
  student: string;
}

export interface Bill {
  id: number;
  student: string;
  price: number;
  month: string;
  status: string;
}

export interface Student {
  id?: any;
  name: string;
  grade?: number;
  email?: string;
  address?: string;
  phone?: string;
  level?: string;
  status?: string;
  dob?: string; // date of birth
  registrationDate?: string;
  type?: string;
  school?: string;
  user?: string;
}

export interface Teacher {
  id?: any;
  name: string;
  dob?: string;
  phone?: string;
  email?: string;
  address?: string;
  subject?: string;
  education?: string;
  position?: string;
  user?: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private api: ApiService) {}

  // Schedules (use API when available)
  async getSchedules(): Promise<Schedule[]> {
    const res = await this.api.getSchedules();
    return res.map((s, i) => ({ id: s._id || s.id || i + 1, day: s.day, time: s.time, teacher: s.teacher, student: s.student }));
  }

  async getScheduleById(id: string): Promise<Schedule | undefined> {
    const s = await this.api.getSchedules();
    const found = s.find((x: any) => x._id === id || x.id === id);
    return found ? { id: found._id || found.id, day: found.day, time: found.time, teacher: found.teacher, student: found.student } : undefined;
  }

  async addSchedule(schedule: Omit<Schedule, 'id'>): Promise<any> {
    return this.api.addSchedule(schedule);
  }

  async updateSchedule(id: string, schedule: Partial<Schedule>): Promise<any> {
    return this.api.updateSchedule(id, schedule);
  }

  async deleteSchedule(id: string): Promise<any> {
    return this.api.deleteSchedule(id);
  }

  // Bills
  async getBills(): Promise<Bill[]> {
    const res = await this.api.getBills();
    return res.map((b: any, i: number) => ({ id: b._id || b.id || i + 1, student: b.student, price: b.price, month: b.month, status: b.status }));
  }

  async getBillById(id: string): Promise<Bill | undefined> {
    const res = await this.api.getBills();
    const found = res.find((b: any) => b._id === id || b.id === id || String(b.id) === String(id));
    if (!found) return undefined;
    return { id: found._id || found.id, student: found.student, price: found.price, month: found.month, status: found.status };
  }

  async addBill(bill: Omit<Bill, 'id'>): Promise<any> {
    return this.api.addBill(bill);
  }

  async updateBill(id: string, bill: Bill): Promise<any> {
    return this.api.updateBill(id, bill);
  }

  async deleteBill(id: string): Promise<any> {
    return this.api.deleteBill(id);
  }

  // Students
  async getStudents(): Promise<Student[]> {
    const res = await this.api.getStudents();
    return res.map((s: any, i: number) => ({ id: s._id || s.id || i + 1, name: s.name, grade: s.grade, email: s.email, address: s.address, phone: s.phone, level: s.level, status: s.status, dob: s.dob, registrationDate: s.registrationDate, type: s.type, school: s.school, user: s.user }));
  }

  async getStudentById(id: string): Promise<Student | undefined> {
    const s = await this.api.getStudentById(id);
    if (!s) return undefined;
    return { id: s._id || s.id, name: s.name, grade: s.grade, email: s.email, address: s.address, phone: s.phone, level: s.level, status: s.status, dob: s.dob, registrationDate: s.registrationDate, type: s.type, school: s.school, user: s.user };
  }

  async addStudent(student: Omit<Student, 'id'>): Promise<any> {
    return this.api.addStudent(student);
  }

  async updateStudent(id: any, updatedStudent: Student): Promise<any> {
    return this.api.updateStudent(String(id), updatedStudent);
  }

  async deleteStudent(id: any): Promise<any> {
    return this.api.deleteStudent(String(id));
  }

  // Teachers
  async getTeachers(): Promise<Teacher[]> {
    const res = await this.api.getTeachers();
    return res.map((t: any, i: number) => ({ id: t._id || t.id || i + 1, name: t.name, dob: t.dob, phone: t.phone, email: t.email, address: t.address, subject: t.subject, education: t.education, position: t.position, user: t.user }));
  }

  async getTeacherById(id: string): Promise<Teacher | undefined> {
    const t = await this.api.getTeacherById(id);
    if (!t) return undefined;
    return { id: t._id || t.id, name: t.name, dob: t.dob, phone: t.phone, email: t.email, address: t.address, subject: t.subject, education: t.education, position: t.position, user: t.user };
  }

  async addTeacher(teacher: Omit<Teacher, 'id'>): Promise<any> {
    return this.api.addTeacher(teacher);
  }

  async updateTeacher(id: any, teacher: Teacher): Promise<any> {
    return this.api.updateTeacher(String(id), teacher);
  }

  async deleteTeacher(id: any): Promise<any> {
    return this.api.deleteTeacher(String(id));
  }
}