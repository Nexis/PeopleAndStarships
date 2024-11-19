import {TestBed} from '@angular/core/testing';

import {StarWarsApiService} from './star-wars-api.service';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {CardInfo, CardType} from '../models/card.interface';
import {of} from 'rxjs';

describe('StarWarsApiService', () => {
  let service: StarWarsApiService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(),provideHttpClientTesting()]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(StarWarsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add Starship type to CardInfo when getStarships is called',async  () => {
    spyOn(httpClient,'get').and.returnValue(of());

  service.getStarships(1).subscribe(result=>
    expect(result).toBe({type:CardType.STARSHIP} as CardInfo)
    );
  });
  it('should add Person type to CardInfo when getPeople is called',async  () => {
    spyOn(httpClient,'get').and.returnValue(of());

    service.getPeople(1).subscribe(result=>
      expect(result).toBe({type:CardType.PERSON} as CardInfo)
    );
  });

});
