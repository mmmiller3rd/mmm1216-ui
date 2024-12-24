import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CartService } from "../cart/cart-service";
import { Rental } from "../model/rental";

@Component({
    selector: 'tool',
    templateUrl: './tool.component.html',
    styleUrls: ['./tool.component.scss']
  })

export class ToolComponent implements OnInit {
    @Output()
    closeToolEvent = new EventEmitter<string>()
    addToolCode: string
    addTypeCode: string
    addBrand: string
    addDailyCharge: number
    addWeekdayCharged: boolean = false
    addWeekendCharged: boolean = false
    addHolidayCharged: boolean = false
    validTool: boolean = false
    tools: Rental[]

    constructor(private cartService: CartService) {}

    async ngOnInit(): Promise<void> {
        this.tools = await this.cartService.getAllTools()
    }

    close(message?: string) {
        this.closeToolEvent.emit(message)
    }

    async addTool() {
        if (this.validTool) {
            const tool: Rental = {
                toolCode: this.addToolCode,
                toolType: this.addTypeCode,
                brand: this.addBrand,
                dailyCharge: this.addDailyCharge,
                weekdayCharge: this.addWeekdayCharged ? 'Yes' : 'No',
                weekendCharge: this.addWeekendCharged ? 'Yes' : 'No',
                holidayCharge: this.addHolidayCharged ? 'Yes' : 'No'
            }
            console.log(tool)
            await this.cartService.addTool(tool)
            this.close('addedTool')
        }
    }

    updateToolCode(event) {
        const existingCode = this.tools.find(tool => tool.toolCode === event)
        this.addToolCode = event
        if (existingCode) {
            document.getElementById('addToolCode').classList.add('notvalid')
            this.validTool = false
        } else {
            document.getElementById('addToolCode').classList.remove('notvalid')
            this.validTool = true
        }
    }

    updateToolType(event: string) {
        if (!event || event.trim().length === 0) {
            document.getElementById('addToolType').classList.add('notvalid')
            this.validTool = false
        } else {
            document.getElementById('addToolType').classList.remove('notvalid')
            this.validTool = true
        }
        this.addTypeCode = event
    }

    updateBrand(event: string) {
        if (!event || event.trim().length === 0) {
            document.getElementById('addBrand').classList.add('notvalid')
            this.validTool = false
        } else {
            document.getElementById('addBrand').classList.remove('notvalid')
            this.validTool = true
        }
        this.addBrand = event
    }
    
    updateDailyCharge(event: number) {
        if (!event || event <= 0) {
            document.getElementById('addDailyCharge').classList.add('notvalid')
            this.validTool = false
        } else {
            document.getElementById('addDailyCharge').classList.remove('notvalid')
            this.validTool = true
        }
        this.addDailyCharge = event
    }

    updateWeekdayCharged(event) {
        this.addWeekdayCharged = event
    }
    
    updateWeekendCharged(event) {
        this.addWeekendCharged = event
    }
    
    updateHolidayCharged(event) {
        this.addHolidayCharged = event
    }
}