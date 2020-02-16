import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class CommunicationService {
    gameId:string="";
    configUrl = "https://unkob0dyk4.execute-api.ap-northeast-1.amazonaws.com/dev";

    constructor(private http: HttpClient) { }

    // initialization new game
    initializeNewGame() {
      return this.http.get<any>("assets/mockJson/init-game.json");
    }

    initGameScore() {
      console.log("gameId:", this.gameId);
      //return this.http.get(`${this.configUrl}/faculty/${userId}/verifyOTP/true/true`);
      return this.http.get<any>("assets/mockJson/init-score.json");
    }

    // game score details
    getGameScoreDetails(pitId) {
      console.log("pitId:", pitId)
        return this.http.get<any>("assets/mockJson/updated-score.json");
    }

    setGameId(newGameId) {
      this.gameId = newGameId;
    }

    getGameId() {
      return this.gameId;
    }
}