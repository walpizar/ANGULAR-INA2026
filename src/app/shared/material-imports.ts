// Angular core/common
import { CommonModule } from '@angular/common';

// Angular Material - Buttons
import { MatButtonModule } from '@angular/material/button';

// Angular Material - Forms
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Angular Material - Layout & Navigation
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

// Angular Material - Indicators
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Angular Material - Data Table
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Angular Material - Cards & Lists
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

// Angular Material - Dialogs & Popups
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Angular Material - Date & Time
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Angular Material - Expansion Panels
import { MatExpansionModule } from '@angular/material/expansion';

// Angular Material - Chips
import { MatChipsModule } from '@angular/material/chips';

// Angular Material - Divider
import { MatDividerModule } from '@angular/material/divider';

// Angular Material - Stepper
import { MatStepperModule } from '@angular/material/stepper';

// Angular Material - Autocomplete
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Angular Material - Grid List
import { MatGridListModule } from '@angular/material/grid-list';

// Angular Material - Slider
import { MatSliderModule } from '@angular/material/slider';

// Angular Material - Tree
import { MatTreeModule } from '@angular/material/tree';

// Angular Material - Button Toggle
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Angular Material - Ripple
import { MatRippleModule } from '@angular/material/core';

// Angular Material - CDK (opcional pero útil)
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

// =======================
// EXPORT CENTRALIZADO
// =======================

export const MATERIAL_IMPORTS = [
  CommonModule,

  // Buttons
  MatButtonModule,

  // Forms
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSlideToggleModule,

  // Layout & Navigation
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatTabsModule,

  // Indicators
  MatIconModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,

  // Data Table
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,

  // Cards & Lists
  MatCardModule,
  MatListModule,

  // Dialogs & Popups
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,

  // Date & Time
  MatDatepickerModule,
  MatNativeDateModule,

  // Expansion
  MatExpansionModule,

  // Chips
  MatChipsModule,

  // Divider
  MatDividerModule,

  // Stepper
  MatStepperModule,

  // Autocomplete
  MatAutocompleteModule,

  // Grid
  MatGridListModule,

  // Slider
  MatSliderModule,

  // Tree
  MatTreeModule,

  // Button Toggle
  MatButtonToggleModule,

  // Ripple
  MatRippleModule,

  // CDK
  DragDropModule,
  ScrollingModule,
];
