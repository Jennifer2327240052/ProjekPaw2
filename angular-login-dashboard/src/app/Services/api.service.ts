// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getSchedules(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/schedules`));
  }

  addSchedule(schedule: any): Promise<any> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/schedules`, schedule));
  }

  getScheduleById(id: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/schedules/${id}`));
  }

  updateSchedule(id: string, schedule: any): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/schedules/${id}`, schedule));
  }

  deleteSchedule(id: string): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.baseUrl}/schedules/${id}`));
  }

  // Students
  getStudents(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/students`));
  }

  getStudentById(id: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/students/${id}`));
  }

  addStudent(student: any): Promise<any> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/students`, student));
  }

  updateStudent(id: string, student: any): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/students/${id}`, student));
  }

  deleteStudent(id: string): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.baseUrl}/students/${id}`));
  }

  // Teachers
  getTeachers(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/teachers`));
  }

  getTeacherById(id: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/teachers/${id}`));
  }

  addTeacher(teacher: any): Promise<any> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/teachers`, teacher));
  }

  updateTeacher(id: string, teacher: any): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/teachers/${id}`, teacher));
  }

  deleteTeacher(id: string): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.baseUrl}/teachers/${id}`));
  }

  // Bills
  getBills(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/bills`));
  }

  addBill(bill: any): Promise<any> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/bills`, bill));
  }

  updateBill(id: string, bill: any): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/bills/${id}`, bill));
  }

  deleteBill(id: string): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.baseUrl}/bills/${id}`));
  }
}