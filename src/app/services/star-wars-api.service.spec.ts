import { TestBed } from '@angular/core/testing';

import { StarWarsApiService } from './star-wars-api.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('StarWarsApiService', () => {
  let service: StarWarsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(),provideHttpClientTesting()]
    });
    service = TestBed.inject(StarWarsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
