import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
 
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css'
})
export class MarcasComponent {
  mostrarMensaje: boolean = false;
  originalProducts: any = []; // Array original de productos
  products: any = []; // Aquí se almacenarán los productos filtrados por marca
  brandId: number | undefined;

  constructor(private productService: ProductService,private readonly cs :CartService,private readonly router: Router) { }

  ngOnInit(): void {
    // Llamar al método sin ID al inicio
    this.__obtener_productos();
  }

  __obtener_productos() {
    this.productService.__getProducts().subscribe((rest: any) => {
      if (rest.isSuccess) {
        this.originalProducts = rest.data;
        this.products = [...this.originalProducts]; // Copia los productos originales al array de productos filtrados
        console.log(this.products);
      }
    });
  }

  onSelectBrand(brandId: number): void {
    this.brandId = brandId;  
    this.filterProducts();  
  }

  filterProducts(): void {
    if (this.brandId) {
      this.products = this.originalProducts.filter((p: any) => p.brandId === this.brandId); 
      console.log(this.products);
    } else {
      this.products = [...this.originalProducts]; // Restaurar los productos originales si no hay filtro
    }
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
