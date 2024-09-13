import { Component, OnInit, inject, model, signal } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StadiumGamesService } from '../../services/stadiumgames.service';
import { Leaguegroup } from '../../models/leaguegroup.model';
import { League } from '../../models/league.model';
import { Game, Score } from '../../models/game.model';
import { GameFunction } from '../../models/gamefunction.model';
import { WhatIf } from '../../models/whatif.model';
import { WhatIfComponent } from '../../dialogs/whatif/whatif.component';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTable} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { catchError, map } from 'rxjs';


//import {MatTableModule} from '@angular/material/table';
//import {ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatTable, MatTableModule, MatDividerModule, MatProgressBarModule, WhatIfComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
  //encapsulation: ViewEncapsulation.None
})
export class GamesComponent implements OnInit {

  displayedWhatIfColumns: string[] = ['betType', 'graded', 'gradedHandle', 'gradedHold', 'holdPct', 'ungraded', 'ungradedHandle'];  

  readonly dialog = inject(MatDialog);
  //readonly animal = signal('');
  readonly vScore = model('0');
  readonly hScore = model('0');

  leaguegroups: Leaguegroup[] = [];
  leagues: League[] = [];
  games: Game[] = [];
  gameFunctions: GameFunction[] = [{ 
    idGameFunction: 1, description: 'What If?'
  }, {
    idGameFunction: 2, description: 'Action'
  }, {
    idGameFunction: 3, description: 'Wagers on a Game'
  }];
  whatIfs: WhatIf[] = [];

  isLeagueDisabled: boolean = true; 
  nullLeagueSelect: any = null;
  isGameDisabled: boolean = true; 
  nullGameSelect: any = null;
  isGameFunctionDisabled: boolean = true; 
  nullGameFunctionSelect: any = null;
  selectedGame?: Game; 
  isReportTableHidden: boolean = true; 
  isReportTableLoading: boolean = false; 
  

  constructor(private stadiumGamesService: StadiumGamesService) { 
  }

  ngOnInit(): void {
    
    this.stadiumGamesService.getLeagueGroups()
    .subscribe({
      next: (res:Leaguegroup[]) => {
        console.log(res);
        this.leaguegroups = res;
      }, 
      error: (error) => {
        console.log(error.message)
      },
      complete: () => {
      },
    })
    
  }
  
  onLeaguegroupChange(value:any){

    console.log('value= ' + value);

    this.stadiumGamesService.getLeagueGroups()
    .subscribe({
      next: (res:Leaguegroup[]) => {
        console.log(res);
        this.leaguegroups = res;

        // populate Leagues dropdown
        this.stadiumGamesService.getLeagues(value)
        .subscribe({
          next: (res:League[]) => {
            console.log(res);
            this.leagues = res;
          }, 
          error: (error) => {
            console.log(error.message)
          },
          complete: () => {
            //this.isFetching.set(false);
            this.isLeagueDisabled = false;
            this.nullLeagueSelect = null;
            this.isGameDisabled = true;
            this.nullGameSelect = null;
            this.isGameFunctionDisabled = true;
            this.nullGameFunctionSelect = null;
          },
        })
      }, 
      error: (error) => {
        console.log(error.message)
      },
      complete: () => {
        //this.isFetching.set(false);
      },
    })
  }

  onLeagueChange(value:any){

    console.log('league value= ' + value);

    // populate Games dropdown
    this.stadiumGamesService.getGames(value)
    .subscribe({
      next: (res:Game[]) => {
        console.log(res);
        this.games = res;
      }, 
      error: (error) => {
        console.log(error.message)
      },
      complete: () => {
        //this.isFetching.set(false);
        this.isGameDisabled = false;
        this.nullGameSelect = null;
        this.isGameFunctionDisabled = true;
        this.nullGameFunctionSelect = null;
      },
    })
  }

  onGameChange(value:any){

    console.log('game value = ' + value);

    this.selectedGame = this.games.find(x => x.idGame === value);
    this.isGameFunctionDisabled = false;
    this.nullGameFunctionSelect = null;
  }

  onGameFunctionChange(value:any){

    console.log('gameFunction value = ' + value);

    if (value !== 1){
      return;
    }

    /*
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;   // makes it modal?
    dialogConfig.autoFocus = true;
    */

    const dialogRef = this.dialog.open(WhatIfComponent, {
      data: {
        vTeam: this.selectedGame?.vTeam, 
        hTeam: this.selectedGame?.hTeam
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        const scores = result as Score;
        console.log('result was not undefined')
        console.log('vscore = ' + scores.vScore)
        console.log('hscore = ' + scores.hScore)

        this.isReportTableLoading = true;

        // populate WhatIf table
        this.stadiumGamesService.getWhatIfs(this.selectedGame!.idGame, scores.vScore, scores.hScore)
        .subscribe({
          next: (res:WhatIf[]) => {
            console.log(res);
            this.whatIfs = res;
          }, 
          error: (error) => {
            console.log(error.message);
            this.isReportTableLoading = false;
          },
          complete: () => {
            this.isReportTableHidden = false;          
            this.isReportTableLoading = false;
          },
        })
      }
    });
  }
}