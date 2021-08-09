import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';

const MaterialModules = [
  CommonModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatTableModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatToolbarModule,
  MatSelectModule
]

@NgModule({
  imports: [
    MaterialModules
  ],
  exports: [
    MaterialModules
  ],
  declarations: [],
})
export class MaterailsModule { }
