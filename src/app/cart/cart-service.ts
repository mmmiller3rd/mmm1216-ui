import { HttpClient } from "@angular/common/http";
import { CartItem } from "../model/cart-item";
import { RentRequest } from "../model/rentRequest";
import { RentalAgreement } from "../model/rental-agreement";
import { Rental } from "../model/rental";
import { environment } from "src/environments/environment";

export class CartService {
    private cartItems: CartItem[] = []
    private rentalAgreements: RentalAgreement[]
    constructor(private httpClient: HttpClient) {}
    
    addToCart(cartItem: CartItem) {
        const existingItem = this.cartItems.find(item => item.toolCode === cartItem.toolCode && item.checkoutDate === cartItem.checkoutDate && item.rentalDays === cartItem.rentalDays);
        if (existingItem) {
            existingItem.rentalQty+= cartItem.rentalQty
        } else {
            this.cartItems.push(cartItem)
        }
    }

    getCartItems(): CartItem[] {
        return this.cartItems
    }

    async getAllAgreements(): Promise<RentalAgreement[]> {
        return await this.httpClient.get<RentalAgreement[]>(`${environment.toolRentalBackend}/getRentalAgreements`).toPromise()
    }

    async getAllTools(): Promise<Rental[]> {
        return await this.httpClient.get<Rental[]>(`${environment.toolRentalBackend}/getToolsAndCharges`).toPromise()
    }

    async addTool(tool: Rental): Promise<string> {
        return await this.httpClient.post<string>(`${environment.toolRentalBackend}/upsertToolAndCharge`, tool).toPromise()
    }

    getAgreements(): RentalAgreement[] {
        return this.rentalAgreements
    }

    removeItem(cartItem: CartItem) {
        this.cartItems.splice(this.cartItems.findIndex(item => item.toolCode === cartItem.toolCode && item.checkoutDate === cartItem.checkoutDate && item.rentalDays === cartItem.rentalDays), 1)
    }

    async checkout() {
        const request: RentRequest[] = this.createRentRequests()
        this.rentalAgreements = await this.httpClient.post<RentalAgreement[]>(`${environment.toolRentalBackend}/rent`, request).toPromise()
    }

    createRentRequests(): RentRequest[] {
        const rentRequests: RentRequest[] = []
        this.cartItems.forEach((cartItem: CartItem) => {
            const date = cartItem.checkoutDate.split('-')
            rentRequests.push({
                toolCode: cartItem.toolCode,
                checkoutDate: `${date[1]}/${date[2]}/${date[0].substring(0,2)}`,
                rentalDays: cartItem.rentalDays,
                discountPercent: cartItem.discountPercent,
                quantity: cartItem.rentalQty
            })
        })
        return rentRequests
    }
}