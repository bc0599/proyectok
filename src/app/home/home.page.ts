import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from '../../../shared/route.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Routes: any = [];

  constructor(
    private routeService: RouteService,
    private router: Router
  ) {
    this.routeService.home().subscribe(
      data=> console.log(data),
      error=> this.router.navigate(['/login'])
    )
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.routeService.getRouteList().subscribe((res) => {
      console.log(res)
      this.Routes = res;
    })
  }

  deleteRoute(Route, i) {
    if (window.confirm('Do you want to delete route?')) {
      this.routeService.deleteRoute(Route._id)
        .subscribe(() => {
          this.Routes.splice(i, 1);
          console.log('Route deleted!')
        }
        )
    }
  }

  logout(){
    this.routeService.logout().subscribe(
      data=>{ console.log(data); this.router.navigate(['/login'])},
      error=> console.error(error)
      )
      
  }

  addRoute(){
    this.routeService.addRoutes().subscribe(
      data=>{ console.log(data); this.router.navigate(['/addroutes'])},
      error=> console.error(error)
      )
      
  }
}
