import {TestBed} from '@angular/core/testing';

import {CardsService} from './cards.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {Player} from '../models/player';
import {CardInfo, CardType} from '../models/card.interface';
import {StarWarsApiService} from './star-wars-api.service';
import {of} from 'rxjs';

describe('CardsService', () => {
  let service: CardsService;
  let starWarsService: StarWarsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideHttpClient()]
    });
    TestBed.inject(HttpClient);
    service = TestBed.inject(CardsService);
    starWarsService = TestBed.inject(StarWarsApiService);
    TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getStarships method when player has "Starship" type selected', () => {
    const mockPlayer: Player = {
      id: 'LeftPlayer',
      points: 0,
      selectedType: CardType.STARSHIP,
    }
    service['starshipOptions'] = [1];
    spyOn(starWarsService, 'getStarships').and.returnValue(of());
    service.getCardFor(mockPlayer);
    expect(starWarsService.getStarships).toHaveBeenCalled();
  });
  it('should call getPeople method when player has "Person" type selected', () => {
    const mockPlayer: Player = {
      id: 'LeftPlayer',
      points: 0,
      selectedType: CardType.PERSON,
    }
    service['peopleOptions'] = [1];
    spyOn(starWarsService, 'getPeople').and.returnValue(of());
    service.getCardFor(mockPlayer);
    expect(starWarsService.getPeople).toHaveBeenCalled();
  });
  it('should throw error when player has "Person" type selected and the peopleOptions list is empty', () => {
    const mockPlayer: Player = {
      id: 'LeftPlayer',
      points: 0,
      selectedType: CardType.PERSON,
    }
    service['starshipOptions'] = [1];
    service['peopleOptions'] = undefined;
    expect(() => service.getCardFor(mockPlayer)).toThrow(new Error("No cards of asked type"));
  });
  it('should throw error when player has "Starships" type selected and the starshipsOptions list is empty', () => {
    const mockPlayer: Player = {
      id: 'LeftPlayer',
      points: 0,
      selectedType: CardType.STARSHIP,
    }
    service['starshipOptions'] = undefined;
    service['peopleOptions'] = [1];
    expect(() => service.getCardFor(mockPlayer)).toThrow(new Error("No cards of asked type"));
  });
});
