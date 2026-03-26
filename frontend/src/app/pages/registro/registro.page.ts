import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';

import { PersonaService } from 'src/app/services/persona';

@Component({
selector: 'app-registro',
templateUrl: './registro.page.html',
styleUrls: ['./registro.page.scss'],
standalone: true,
imports: [
CommonModule,
FormsModule,
IonicModule
]
})
export class RegistroPage implements OnInit {

// Objeto vacío que se llenará con el formulario
persona = {
nombre: '',
apellido: '',
edad: null,
correo: '',
telefono: '',
ciudad: ''
};

personas: any[] = []; // Lista de personas cargadas
cargando = false; // Estado del botón

constructor(
private personaService: PersonaService,
private toastCtrl: ToastController,
private loadingCtrl: LoadingController
) { }

ngOnInit() {
this.cargarPersonas();
}

// Cargar personas al abrir la página
cargarPersonas() {
this.personaService.getPersonas().subscribe({
next: (data) => { this.personas = data; },
error: (err) => { console.error('Error al cargar:', err); }
});
}

// Guardar persona al enviar el formulario
async guardar() {
this.cargando = true;

this.personaService.guardarPersona(this.persona).subscribe({
next: async (res) => {
this.cargando = false;
await this.mostrarToast('■ Persona guardada exitosamente', 'success');
this.limpiarFormulario();
this.cargarPersonas(); // Recargar la lista
},

error: async (err) => {
this.cargando = false;
await this.mostrarToast('■ Error al guardar. Revisa la conexión.', 'danger');
console.error(err);
}
});
}

// Limpiar el formulario después de guardar
limpiarFormulario() {
this.persona = {
nombre: '',
apellido: '',
edad: null,
correo: '',
telefono: '',
ciudad: ''
};
}

// Mostrar notificación (Toast)
async mostrarToast(mensaje: string, color: string) {

const toast = await this.toastCtrl.create({
message: mensaje,
duration: 3000,
color: color,
position: 'top'
});

await toast.present();
}

}