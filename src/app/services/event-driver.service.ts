import {Injectable} from '@angular/core';
import {ActionEvent, ProductActionTypes} from '../state/product.state.ps';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventDriverService {

  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  sourceEventSubject2: Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjectObservable2 = this.sourceEventSubject2.asObservable();

  constructor() { }

  publishEvent(event: ActionEvent){
    switch (event.type){
      case ProductActionTypes.PRODUCT_ADDED:
        this.sourceEventSubject2.next(event); break;
      case ProductActionTypes.PRODUCT_UPDATED:
        this.sourceEventSubject2.next(event); break;
      case ProductActionTypes.PRODUCT_DELETED:
        this.sourceEventSubject2.next(event); break;
      default:
        this.sourceEventSubject.next(event); break
    }



  }
}
