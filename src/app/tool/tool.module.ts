import { NgModule } from '@angular/core';
import { ToolComponent } from "./tool.component";
import { CommonModule } from '@angular/common';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ToolComponent
    ],
    imports: [CommonModule,
      MatCardModule,
    MatTabsModule,
    FormsModule
    ],
    providers: [],
    bootstrap: [ToolComponent],
    exports: [ToolComponent]
  })
export class ToolModule {}