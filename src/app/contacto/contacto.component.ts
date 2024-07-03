import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  constructor(
    private fb: FormBuilder
  ) { }

  contactusForm = this.fb.group({
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    correo: ["", [Validators.required, Validators.email]],
    comentario: ["", Validators.required]
  })

  Submit() {
    if (this.contactusForm.valid) {
      console.log(this.contactusForm.value)
    } else {
      alert("Formulario no valido")
    }
  }
}