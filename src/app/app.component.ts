import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Rental } from './model/rental';
import { CartItem } from './model/cart-item';
import { CartService } from './cart/cart-service';
import { RentalAgreement } from './model/rental-agreement';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tools: Rental[]
  addVisible: boolean = false
  checkoutTool: Rental
  rentalDays: number = 1
  rentalDaysInvalid: boolean = false
  rentalQtyInvalid: boolean = false
  checkoutDateInvalid: boolean = false
  rentalQty: number = 1
  startDate: string
  cartVisible: boolean = false
  agreementsVisible: boolean = false
  toolVisible: boolean = false
  constructor(private cartService: CartService) {}

  async ngOnInit(): Promise<void> {
      this.tools = await this.cartService.getAllTools()
  }

  showAdd(tool: Rental) {
    this.checkoutTool = tool
    setTimeout(() => {
      this.addVisible = true;
    }, 100);
  }

  async closeCard(event?) {
    this.addVisible = false
    this.cartVisible = false
    this.agreementsVisible = false
    this.toolVisible = false
    if (event === 'refresh') {
      this.cartVisible = true
    }
    if (event === 'addedTool') {
      this.tools = await this.cartService.getAllTools()
    }
  }
  updateRentalDays(event) {
    this.rentalDays = Number.parseFloat(event)
  }

  updateStartDate(event) {
    this.startDate = event
  }

  updateRentalQty(event) {
    this.rentalQty = Number.parseFloat(event)
  }

  addToCart() {
    if (this.verifyItem()) {
      const item: CartItem = {
        toolCode: this.checkoutTool.toolCode,
        brand: this.checkoutTool.brand,
        checkoutDate: this.startDate,
        dailyRentalCharge: this.checkoutTool.dailyCharge,
        rentalDays: this.rentalDays,
        rentalQty: this.rentalQty,
        discountPercent: 0
      }
      this.cartService.addToCart(item)
      this.addVisible = false
    }
  }

  verifyItem(): boolean {
    this.rentalDaysInvalid = this.rentalDays < 1
    this.rentalQtyInvalid = this.rentalQty < 1
    this.checkoutDateInvalid = !this.startDate
    if (this.rentalDaysInvalid) {
      document.getElementById('rentalDays').classList.add('notvalid')
    }
    if (this.rentalQtyInvalid) {
      document.getElementById('rentalQty').classList.add('notvalid')
    }
    if (this.checkoutDateInvalid) {
      document.getElementById('startDate').classList.add('notvalid')
    }
    return !this.rentalDaysInvalid && !this.rentalQtyInvalid && !this.checkoutDateInvalid 
  }

  showCart() {
    this.cartVisible = true
  }

  checkout() {
    this.cartService.checkout()
  }

  receiptRecieved() {
    this.agreementsVisible = true
  }
  addTool() {
    this.toolVisible = true
  }
}
