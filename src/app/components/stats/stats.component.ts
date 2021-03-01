import { Component, OnInit } from '@angular/core';
import {EventDriverService} from '../../services/event-driver.service';
import {ActionEvent} from '../../state/product.state.ps';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  counter: number = 0;
  counter2: number = 0;

  constructor(private eventDriverService: EventDriverService) { }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent: ActionEvent) => {
      ++this.counter;
    });
    this.eventDriverService.sourceEventSubjectObservable2.subscribe((actionEvent: ActionEvent) => {
      ++this.counter2;
    });
  }
}
