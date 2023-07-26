import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from "@angular/material/card"
import { MatDialogModule } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatGridListModule } from "@angular/material/grid-list"

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule
  ]
})
export class AngularMaterialModule { }
