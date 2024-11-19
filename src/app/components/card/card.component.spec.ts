import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardComponent} from './card.component';
import {CardType} from '../../models/card.interface';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.cardInfo = {
      uid: 1,
      description: 'Card description',
      properties: {
        height: '123',
        mass: 30,
        hair_color: 'brown',
        skin_color: 'brown',
        eye_color: 'blue',
        birth_year: '1234',
        gender: 'woman',
        name: 'John',
        homeworld: 'World'
      },
      type: CardType.RANDOM
    }
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return properties as key, value arrays', () => {
    fixture.detectChanges();
    expect(component.getPropertiesAsPairs()).toEqual([
      ['height','123'],
      ['mass',30],
      ['hair_color','brown'],
      ['skin_color','brown'],
      ['eye_color','blue'],
      ['birth_year','1234'],
      ['gender','woman'],
      ['name','John'],
      ['homeworld','World'],
    ]);
  });


});
