import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {CardInfo} from '../../models/card.interface';
import {NgForOf} from '@angular/common';
import {CdkScrollable} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardHeader, NgForOf, CdkScrollable],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({required: true}) cardInfo!: CardInfo;

  getPropertiesAsPairs(): [string, any][] {
    return Object.entries(this.cardInfo.properties);
  }
}
