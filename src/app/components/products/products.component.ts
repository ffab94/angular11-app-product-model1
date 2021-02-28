import { Component, OnInit } from '@angular/core';
import {ProductServices} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionTypes} from '../../state/product.state.ps';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>>| null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService: ProductServices, private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState:  DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  // tslint:disable-next-line:typedef
  onGetSelectedProducts() {
     this.products$ = this.productService.getSelectedProducts().pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState:  DataStateEnum.ERROR, errorMessage: err.message}))
        );
  }

  // tslint:disable-next-line:typedef
  onGetAvailableProducts() {
      this.products$ = this.productService.getAvailableProducts().pipe(
            map(data => ({dataState: DataStateEnum.LOADED, data})),
            startWith({dataState: DataStateEnum.LOADING}),
            catchError(err => of({dataState:  DataStateEnum.ERROR, errorMessage: err.message}))
            );
    }

  // tslint:disable-next-line:typedef
    onSearch(dataForm: any) {
    this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState:  DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  // tslint:disable-next-line:typedef
  onSelect(p: Product) {
  this.productService.selectProduct(p)
    .subscribe(data => {
      p.selected = data.selected;
    });
  }

  // tslint:disable-next-line:typedef
  onDelete(p: Product) {
    const conf = confirm('Etes-vous sûr ?');
    if (conf === true) {
      this.productService.deleteProduct(p)
        .subscribe(data => {
          this.onGetAllProducts();
      });
    }
  }

  // tslint:disable-next-line:typedef
  onGetNewProduct() {
  this.router.navigateByUrl('/newProduct');
  }

  // tslint:disable-next-line:typedef
  onEdit(p: Product) {
    this.router.navigateByUrl('/editProduct/' + p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionTypes.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
      case ProductActionTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
      case ProductActionTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts(); break;
      case ProductActionTypes.SEARCH_PRODUCTS: this.onSearch($event.payload); break;
      case ProductActionTypes.NEW_PRODUCT: this.onGetNewProduct(); break;
      case ProductActionTypes.SELECT_PRODUCT: this.onSelect($event.payload); break;
      case ProductActionTypes.EDIT_PRODUCT: this.onEdit($event.payload); break;
      case ProductActionTypes.DELETE_PRODUCT: this.onDelete($event.payload); break;
    }
  }
}
