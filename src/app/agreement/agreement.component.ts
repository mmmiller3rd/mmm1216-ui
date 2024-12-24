import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CartService } from "../cart/cart-service";
import { RentalAgreement } from "../model/rental-agreement";

@Component({
    selector: 'agreements',
    templateUrl: './agreement.component.html',
    styleUrls: ['./agreement.component.scss']
  })

export class AgreementComponent implements OnInit {
    @Output()
    closeAgreementsEvent = new EventEmitter<void>()
    agreements: RentalAgreement[]
    agreement: RentalAgreement
    agreementVisible: boolean = false

    constructor(private cartService: CartService) {}

    async ngOnInit(): Promise<void> {
        this.agreements = await this.cartService.getAllAgreements()
    }

    closeAgreements() {
        this.closeAgreementsEvent.emit()
    }
    closeAgreement() {
        this.agreementVisible = false
    }
    showAgreement(agreement: RentalAgreement) {
        this.agreement = agreement
        this.agreementVisible = true
    }
}