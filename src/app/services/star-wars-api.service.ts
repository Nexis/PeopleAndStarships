import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {CardInfo, CardType} from '../models/response.interface';

interface ResponseFormat {
  message: string;
  result: CardInfo;
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  private readonly SWAPI_URL: string = "https://www.swapi.tech/api";

  constructor(private httpClient: HttpClient) {
  }

  getStarships(uid: number): Observable<CardInfo> {
    return this.httpClient.get<ResponseFormat>(`${this.SWAPI_URL}/starships/${uid}`).pipe(map(result => {
      return {
        ...result.result,
        type: CardType.STARSHIP
      }
    }));
  }

  getPeople(uid: number): Observable<CardInfo> {
    return this.httpClient.get<ResponseFormat>(`${this.SWAPI_URL}/people/${uid}`).pipe(map(result => {
      return {
        ...result.result,
        type: CardType.PERSON
      }
    }));
  }
}
