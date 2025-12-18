// src/app/pages/bill-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Bill } from '../Services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  imports: [FormsModule, CommonModule]
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [];
  allBills: Bill[] = [];
  searchQuery: string = '';

  constructor(private dataService: DataService, public router: Router) {}

  ngOnInit() {
    this.loadBills();
  }

  loadBills() {
    this.loadAllBills();
  }

  async loadAllBills() {
    this.allBills = await this.dataService.getBills();
    this.bills = [...this.allBills];
  }

  searchBills() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.bills = [...this.allBills];
    } else {
      this.bills = this.allBills.filter(bill => bill.student.toLowerCase().includes(query));
    }
  }

  editBill(id: any) {
    this.router.navigate(['/dashboard/edit-bill', id]);
  }

  async deleteBill(id: any) {
    if (confirm('Are you sure you want to delete this bill?')) {
      await this.dataService.deleteBill(String(id));
      await this.loadAllBills(); // Refresh list
    }
  }

  addNewBill() {
    this.router.navigate(['/dashboard/add-bill']);
  }
}