import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { BannerComoajudarComponent } from '../banner-comoajudar/banner-comoajudar.component';
import { ListaComponent } from '../lista/lista.component';
import { CardDoepixComponent } from '../card-doepix/card-doepix.component';
import { ParceirosComponent } from '../parceiros/parceiros.component';
import { FooterComponent } from '../footer/footer.component';
<<<<<<< HEAD
import { ComoAjudarComponent } from '../como-ajudar/como-ajudar.component';
import { MapaComponent } from '../mapa/mapa.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
=======
import { ComoAjudarComponent } from "../como-ajudar/como-ajudar.component";
import { MapaComponent } from "../mapa/mapa.component";
import { ComentariosComponent } from '../comentarios/comentarios.component';


>>>>>>> 2be5452d5dfb2f1e5606ec2cc7ed16dc56839c8a

@Component({
  selector: 'app-pagina-comoajudar',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComoajudarComponent,
    ListaComponent,
    CardDoepixComponent,
    ParceirosComponent,
    FooterComponent,
    ComoAjudarComponent,
    MapaComponent,
    DashboardComponent
  ],
  templateUrl: './pagina-comoajudar.component.html',
  styleUrls: ['./pagina-comoajudar.component.css']
})
export class PaginaComoajudarComponent {}