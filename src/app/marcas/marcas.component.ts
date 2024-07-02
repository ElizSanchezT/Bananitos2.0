import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css'
})
export class MarcasComponent {
  
  originalProducts: any = []; // Array original de productos
  products: any = []; // Aquí se almacenarán los productos filtrados por marca
  brandId: number | undefined;

  constructor(private productService: ProductService) { }

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

}
