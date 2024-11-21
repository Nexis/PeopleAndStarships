import {Injectable, OnDestroy} from '@angular/core';
import {StarWarsApiService} from './star-wars-api.service';
import {catchError, Observable, Subject, take, takeUntil, zip} from 'rxjs';
import {Player} from '../models/player';
import {CardInfo, CardType} from '../models/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardsService implements OnDestroy {

  private starshipOptions?: number[];
  private peopleOptions?: number[];

  private serviceOptionsReady$ = new Subject<boolean>;
  private destroy$ = new Subject<void>;

  constructor(private starWarsApiService: StarWarsApiService) {
    this.initServiceOptions();
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  serviceOptionsReady(): Observable<boolean> {
    return this.serviceOptionsReady$.asObservable();
  }

  getCardFor(player: Player): Observable<CardInfo> {
    let type = player.selectedType === CardType.RANDOM ? this.getRandomCardType() : player.selectedType;

    if (type === CardType.PERSON && this.peopleOptions) {
      return this.starWarsApiService.getPeople(this.getRandomUidFromTable(this.peopleOptions)).pipe(take(1), takeUntil(this.destroy$));
    } else if (type === CardType.STARSHIP && this.starshipOptions) {
      return this.starWarsApiService.getStarships(this.getRandomUidFromTable(this.starshipOptions)).pipe(take(1), takeUntil(this.destroy$));
    } else {
      throw new Error("No cards of asked type");
    }
  }

  private initServiceOptions() {
    let getStarshipOptions$ = this.starWarsApiService.getStarshipOptions();
    let getPeopleOptions$ = this.starWarsApiService.getPeopleOptions();
    zip(getStarshipOptions$, getPeopleOptions$).pipe(take(1), takeUntil(this.destroy$)).subscribe(([starshipOptions, peopleOptions]) => {
      this.starshipOptions = starshipOptions.map(option => option.uid);
      this.peopleOptions = peopleOptions.map(option => option.uid);
      this.serviceOptionsReady$.next(true);
    })
  }

  private getRandomCardType(): CardType {
    return this.getRandomNumber(2) === 1 ? CardType.PERSON : CardType.STARSHIP;
  }

  private getRandomUidFromTable(optionsTable: number[]) {
    return optionsTable[this.getRandomNumber(optionsTable.length)];
  }

  private getRandomNumber(limit: number) {
    return Math.floor(Math.random() * limit);
  }

}
