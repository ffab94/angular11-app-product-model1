
import { Injectable } from "@angular/core";
import {Product} from '../model/product.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({providedIn:"root"})
export class ProductServices {
  constructor(private http: HttpClient) {}

  getAllProducts():Observable<Product[]> {
    let rnd = Math.random();
    console.log(rnd)
    //let host = (rnd>0.2)?environment.host:environment.unreachableHost;
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products");
  }

  getSelectedProducts():Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products?selected=true");
  }

  getAvailableProducts():Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products?available=true");
  }

  searchProducts(keyword:string):Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products?name_like=" + keyword);
  }

  selectProduct(product:Product):Observable<Product> {
    let host = environment.host;
    product.selected = !product.selected;
    return this.http.put<Product>(host + "/products/" + product.id, product);
  }

  deleteProduct(product:Product):Observable<void> {
    let host = environment.host;
    return this.http.delete<void>(host + "/products/" + product.id);
  }

  saveProduct(product:Product):Observable<Product> {
    let host = environment.host;
    return this.http.post<Product>(host + "/products", product);
  }

  getProduct(id:number):Observable<Product> {
    let host = environment.host;
    return this.http.get<Product>(host + "/products/" + id);
  }

  updateProduct(product:Product):Observable<Product> {
    let host = environment.host;
    return this.http.put<Product>(host + "/products/" + product.id, product);
  }

}
