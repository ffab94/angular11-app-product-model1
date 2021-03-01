import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../model/product.model';
import {ActionEvent, ProductActionTypes} from '../../../../state/product.state.ps';
import {EventDriverService} from '../../../../services/event-driver.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product?: Product;
  // @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor(private eventDriverService: EventDriverService) { }

  ngOnInit(): void {

  }

  onSelect(product: Product) {
    // this.productEventEmitter.emit({type: ProductActionTypes.SELECT_PRODUCT, payload: product});
    this.eventDriverService.publishEvent({type: ProductActionTypes.SELECT_PRODUCT, payload: product});
  }

  onEdit(product: Product) {
    // this.productEventEmitter.emit({type: ProductActionTypes.EDIT_PRODUCT, payload: product});
    this.eventDriverService.publishEvent({type: ProductActionTypes.EDIT_PRODUCT, payload: product});
  }

  onDelete(product: Product) {
    // this.productEventEmitter.emit({type: ProductActionTypes.DELETE_PRODUCT, payload: product});
    this.eventDriverService.publishEvent({type: ProductActionTypes.DELETE_PRODUCT, payload: product});
  }
}
