import {Starship} from './starship.interface';
import {Person} from './person.interface';

export enum CardType {
  STARSHIP = 'Starship',
  PERSON = 'Person',
  RANDOM = 'Random'
}

export interface CardInfo {
  uid: number;
  description: string;
  properties: Starship | Person;
  type: CardType;
}
