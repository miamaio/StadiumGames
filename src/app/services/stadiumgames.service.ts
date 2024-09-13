import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, pipe } from 'rxjs';
import { Leaguegroup } from '../models/leaguegroup.model'
import { League } from '../models/league.model'
import { Game } from '../models/game.model'
import { WhatIf } from '../models/whatif.model';


@Injectable({
  providedIn: 'root'
})
export class StadiumGamesService {

/* 
  leaguegroupsBaseUrl: string = 'http://localhost:94/LeagueGroups';
  leaguesBaseUrl: string = 'http://localhost:94/Leagues';
  gamesBaseUrl: string = 'http://localhost:94/Games';
  whatIfsBaseUrl: string = 'http://localhost:94/WhatIf';
*/

leaguegroupsBaseUrl: string = 'http://50.159.205.54:94/LeagueGroups';
leaguesBaseUrl: string = 'http://50.159.205.54:94/Leagues';
gamesBaseUrl: string = 'http://50.159.205.54:94/Games';
whatIfsBaseUrl: string = 'http://50.159.205.54:94/WhatIf';


  constructor(private http:HttpClient) { 

  }

  getLeagueGroups(){

    return this.http.get<Leaguegroup[]>(this.leaguegroupsBaseUrl).pipe(
      map ((response: Leaguegroup[]) => {
        console.log(response);

        return response;
      }
    ))
  }

  getLeagues(id: number){

    const url = `${this.leaguesBaseUrl}?id=${id}`;

    return this.http.get<League[]>(url).pipe(
      map ((response: League[]) => {
        console.log(response);

        return response;
      }))
 }

 getGames(id: number){

  const url = `${this.gamesBaseUrl}?id=${id}`;

  return this.http.get<Game[]>(url).pipe(
    map ((response: Game[]) => {
      console.log(response);

      return response;
    }))
  }

  getWhatIfs(idGame: number, 
    vScore: string,
    hScore: string){

    const url = `${this.whatIfsBaseUrl}?idGame=${idGame}&vScore=${vScore}&hScore=${hScore}`;
  
    return this.http.get<WhatIf[]>(url).pipe(
      map ((response: WhatIf[]) => {
        console.log(response);
  
        return response;
      }))
    }

}
