import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {
 
  mostrarMensaje: boolean = false;
  products: any = []; // Aquí se almacenarán los productos filtrados por marca
  

  constructor(private productService: ProductService,private readonly cs :CartService) { }

  ngOnInit(): void {
    // Llamar al método sin ID al inicio
    this.__obtener_productos();
  }

  __obtener_productos(){
    this.productService.__getProducts().subscribe((response: any) => {
      if (response.isSuccess) {
        // Filtrar productos donde discount no es null
        this.products = response.data.filter((product: any) => product.discount !== null);
      }
    });
  }


  __agregar_producto(productId: number): void {
    console.log(productId);
    this.cs.__addProduct(productId, 35, 1).subscribe((rest: any) => {
      if (rest.isSuccess) {
        console.log('Producto agregado al carrito exitosamente');
        this.mostrarMensaje = true; // Mostrar el mensaje
        setTimeout(() => {
          this.mostrarMensaje = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000); // Ocultar después de 3 segundos (ajusta según sea necesario)
      } else {
        console.error('Error al agregar producto al carrito');
      }
    });
  }
   
}
