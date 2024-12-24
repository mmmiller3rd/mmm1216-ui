import { NgModule } from '@angular/core';
import { CartComponent } from "./cart.component";
import { CommonModule } from '@angular/common';
import { CartService } from './cart-service';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      CartComponent
    ],
    imports: [CommonModule,
      MatCardModule,
    MatTabsModule,
    FormsModule
    ],
    providers: [CartService],
    bootstrap: [CartComponent],
    exports: [CartComponent]
  })
export class CartModule {}