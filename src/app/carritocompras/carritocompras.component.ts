import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-carritocompras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carritocompras.component.html',
  styleUrl: './carritocompras.component.css'
})
export class CarritocomprasComponent {
  constructor(private readonly cs: CartService) {}
  products : any = [];
  subtotal : number = 0;

  __obtener_carrito() {
    this.cs.__getCart(1).subscribe((rest: any) => {
      this.products = rest.data.products; 
      this.subtotal = rest.data.products.reduce((sum : number, product: any) => {
        return sum + product.price * product.units;
      }, 0);     
    })
  }

  __eliminar_producto(productId: number){
    this.cs.__removeProduct(1, productId).subscribe((rest: any) => {
        if(rest.isSuccess){
          window.location.reload();
        } 
    })
  }

  ngOnInit(): void {
    this.__obtener_carrito();
  }  

}
