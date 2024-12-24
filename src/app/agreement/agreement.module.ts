import { NgModule } from '@angular/core';
import { AgreementComponent } from "./agreement.component";
import { CommonModule } from '@angular/common';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AgreementComponent
    ],
    imports: [CommonModule,
      MatCardModule,
    MatTabsModule,
    FormsModule
    ],
    providers: [],
    bootstrap: [AgreementComponent],
    exports: [AgreementComponent]
  })
export class AgreementModule {}