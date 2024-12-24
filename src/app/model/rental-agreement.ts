export interface RentalAgreement {
    toolCode: string
    toolType: string
    brand: string
    rentalDays: number
    checkoutDate: string
    dueDate: string
    dailyRentalCharge: number
    chargeDays: number
    preDiscountCharge: number
    discountPercent: number
    discountAmount: number
    finalCharge: number
    quantity: number
}