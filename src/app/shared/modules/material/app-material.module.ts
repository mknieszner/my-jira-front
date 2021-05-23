import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule, MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule, MatSortModule, MatPaginatorModule, MatSnackBarModule
} from "@angular/material";

const MATERIAL_MODULES = [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
];

@NgModule({
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES]
})
export class AppMaterialModule {
}
