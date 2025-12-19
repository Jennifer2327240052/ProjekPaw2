import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {

  totalStudents = 0;
  totalTeachers = 0;
  totalSchedules = 0;
  totalBills = 0;

  currentTime = '';
  currentDate = '';

  private timeInterval: any;

  constructor(private dataService: DataService) {}

  async ngOnInit() {
    await this.loadDashboardData();
    this.updateTime();

    // Update jam setiap 1 detik
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy() {
    // Hentikan interval saat pindah halaman
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  async loadDashboardData() {
    try {
      const students = await this.dataService.getStudents();
      const teachers = await this.dataService.getTeachers();
      const schedules = await this.dataService.getSchedules();
      const bills = await this.dataService.getBills();

      this.totalStudents = students.length;
      this.totalTeachers = teachers.length;
      this.totalSchedules = schedules.length;
      this.totalBills = bills.length;
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    }
  }

updateTime() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // JAM dengan detik → HH.mm:ss
  this.currentTime = `${hours}.${minutes}:${seconds}`;

  // TANGGAL
  this.currentDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
}
