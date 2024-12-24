import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from './cart-service';
import { CartItem } from '../model/cart-item';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  @Output()
  closeCartEvent = new EventEmitter<string>()
  @Output()
  receiptEvent = new EventEmitter<void>()
  cartItems: CartItem[]
  removeItem: boolean = false
  itemToRemove: CartItem
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
      this.cartItems = this.cartService.getCartItems()
  }

  closeCard() {
    this.closeCartEvent.emit()
  }

  calculateTotal(item: CartItem) {
    return item.rentalDays * item.rentalQty * item.dailyRentalCharge
  }

  removeFromCart(item: CartItem) {
    this.removeItem = true
    this.itemToRemove = item
  }

  updateDiscountPercent(event, item: CartItem) {
    item.discountPercent = event
    if (event < 0 || event > 100) {
      document.getElementById('discountPercent').classList.add('notvalid')
    } else {
      document.getElementById('discountPercent').classList.remove('notvalid')
    }
  }

  cancel() {
    this.itemToRemove = null
    this.removeItem = false
  }

  remove() {
    this.cartService.removeItem(this.itemToRemove)
    this.removeItem = false
    this.closeCartEvent.emit('refresh')
  }
  async checkout() {
    this.receiptEvent.emit()
  }
}
