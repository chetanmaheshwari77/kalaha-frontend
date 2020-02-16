import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PitScoreResponse } from './models/pit-score-response.model';

@Injectable()
export class CommunicationService {
    gameId:string="";
    configUrl = "http://localhost:9090";

    constructor(private http: HttpClient) { }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }  

    // initialization new game
    initializeNewGame() {
      //return this.http.get<any>("assets/mockJson/init-game.json");
      return this.http.post<PitScoreResponse>(this.configUrl + '/games/', this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    )
    }

    initGameScore() {
      console.log("gameId:", this.gameId);
      //return this.http.get(`${this.configUrl}/faculty/${userId}/verifyOTP/true/true`);
      return this.http.get<PitScoreResponse>(this.configUrl + '/games/' + this.gameId, this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    )
     // return this.http.get<any>("assets/mockJson/init-score.json");
    }

    // game score details
    getGameScoreDetails(pitId) {
       // console.log("pitId:", pitId)
      //  return this.http.get<any>("assets/mockJson/updated-score.json");
      console.log("gameId:", this.gameId);
      return this.http.put<PitScoreResponse>(this.configUrl + '/games/' + this.gameId +'/pits/'+pitId, this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
      )
    }

    setGameId(newGameId) {
      this.gameId = newGameId;
    }

    getGameId() {
      return this.gameId;
    }

    handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
   }
}