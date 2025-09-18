import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  // Titulo principal de la pantalla
  @Input() title: string = ''; // === El decorador @Input() permite que una propiedad de un componente hijo reciba un valor desde su componente padre.

  // Subtitulo de la pantalla o descripcion secundaria
  @Input() subtitle: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
