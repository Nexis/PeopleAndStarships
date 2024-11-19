import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {CardInfo, CardType} from '../models/card.interface';

interface ResponseFormat{
  message: string;
  result: CardInfo;
}

interface OptionsResponseFormat{
  message: string;
  results: OptionsResponse[];
}

interface OptionsResponse {
  uid: number;
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  private readonly SWAPI_URL: string = "https://www.swapi.tech/api";


  constructor(private httpClient: HttpClient) {
  }

  getStarshipOptions(): Observable<OptionsResponse[]> {
    return this.httpClient.get<OptionsResponseFormat>(`${this.SWAPI_URL}/starships`).pipe(map(response=>{
      return response.results}));
  }

  getPeopleOptions(): Observable<OptionsResponse[]> {
    return this.httpClient.get<OptionsResponseFormat>(`${this.SWAPI_URL}/people`).pipe(map(response=> response.results));
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
