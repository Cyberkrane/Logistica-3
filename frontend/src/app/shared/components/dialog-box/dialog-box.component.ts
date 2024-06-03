import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  @Input() confirmationDialog = false;
  @Input() idProduct = '0';
  @Output() deleteHero: EventEmitter<boolean> = new EventEmitter();
  @Output() cancela: EventEmitter<boolean> = new EventEmitter();

  confirmo(){
    this.confirmationDialog = false;
    console.log(`La tarjeta N°: ${this.idProduct} ha sido eliminada.`);
    return this.deleteHero.emit();
  } 
  
  cancelo(){
    this.confirmationDialog = false;
    console.log(`Se ha cancelado la eliminación de la tarjeta N°: ${this.idProduct}`);
    return this.cancela.emit();
  } 
}
