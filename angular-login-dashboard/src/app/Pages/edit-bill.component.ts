// src/app/pages/edit-bill.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Bill } from '../Services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  imports: [FormsModule]
})
export class EditBillComponent implements OnInit {
  bill: Bill | undefined = undefined;
  selectedStudent = '';
  price = 0;
  month = '';
  status = 'PAID';

  students = ['Giselle Naomi Sutanto', 'Mike Celiano Sutanto'];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBill();
  }

  async loadBill() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;
    try {
      const b = await this.dataService.getBillById(idParam);
      if (!b) return;
      this.bill = b;
      this.selectedStudent = b.student;
      this.price = b.price;
      this.month = b.month;
      this.status = b.status;
    } catch (err) {
      console.error('Failed to load bill', err);
    }
  }

  async updateBill() {
    if (!this.bill || !this.selectedStudent || this.price <= 0 || !this.month) {
      alert('Please fill all required fields');
      return;
    }

    const updatedBill: Bill = {
      ...this.bill,
      student: this.selectedStudent,
      price: this.price,
      month: this.month,
      status: this.status
    };

    try {
      await this.dataService.updateBill(String(this.bill.id), updatedBill as any);
      alert('Bill updated successfully!');
      this.router.navigate(['/dashboard/bill-list']);
    } catch (err) {
      console.error('Update bill failed', err);
      alert('Failed to update bill.');
    }
  }

  backToBills() {
    this.router.navigate(['/dashboard/bill-list']);
  }

  cancel() {
    this.router.navigate(['/dashboard/bill-list']);
  }
}