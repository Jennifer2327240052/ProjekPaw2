
import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/Login.component';
import { DashboardComponent } from './Pages/dashboard.component';



import { BillListComponent } from './Pages/bill-list.component';
import { AddBillComponent } from './Pages/add-bill.component';
import { EditBillComponent } from './Pages/edit-bill.component';
import { ScheduleListComponent } from './Pages/schedule-list.component';
import { AddScheduleComponent } from './Pages/add-schedule.component';
import { DashboardHomeComponent } from './Pages/dashboard-home.component';
import { StudentListComponent } from './Pages/student-list.component';
import { AddStudentComponent } from './Pages/add-student.component';
import { EditStudentComponent } from './Pages/edit-student.component';
import { TeacherListComponent } from './Pages/teacher-list.component';
import { AddTeacherComponent } from './Pages/add-teacher.component';
import { EditTeacherComponent } from './Pages/edit-teacher.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'bill-list', component: BillListComponent },
      { path: 'add-bill', component: AddBillComponent },
      { path: 'edit-bill/:id', component: EditBillComponent },
      { path: 'schedule-list', component: ScheduleListComponent },
      { path: 'student-list', component: StudentListComponent },
      { path: 'add-student', component: AddStudentComponent },
      { path: 'edit-student/:id', component: EditStudentComponent },
      { path: 'teacher-list', component: TeacherListComponent },
      { path: 'add-teacher', component: AddTeacherComponent },
      { path: 'edit-teacher/:id', component: EditTeacherComponent },
      { path: 'add-schedule', component: AddScheduleComponent },
      // tambahkan child routes lain jika perlu
    ]
  }
];
