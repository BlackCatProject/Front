import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";

@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './produtos-form.component.html',
  styleUrl: './produtos-form.component.scss'
})
export class ProdutosFormComponent {

}
