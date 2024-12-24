import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AgreementModule } from './agreement/agreement.module';
import { ToolModule } from './tool/tool.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CartModule,
    AgreementModule,
    ToolModule,
    CommonModule,
    MatCardModule,
    MatTabsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
