import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Game, Score } from '../../models/game.model';
//import { DIALOG_DATA } from '@angular/cdk/dialog';


@Component({
  selector: 'app-whatif',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],  templateUrl: './whatif.component.html',
  styleUrl: './whatif.component.scss'
})
export class WhatIfComponent {

  datax: Score = {
    vScore: '0',
    hScore: '0'
  }

  readonly dialogRef = inject(MatDialogRef<WhatIfComponent>);
  readonly data = inject<Game>(MAT_DIALOG_DATA);
  //readonly animal = model(this.data.animal);
  readonly vScore = model('0');
  readonly hScore = model('0');
//  readonly score = model()  

  onCancelClick(): void {
    this.dialogRef.close(this.data);    
  }
}

