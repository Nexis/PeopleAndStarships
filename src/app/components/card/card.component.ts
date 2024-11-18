import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {CardInfo} from '../../models/response.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardHeader],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({required:true}) cardInfo!:CardInfo;

}
