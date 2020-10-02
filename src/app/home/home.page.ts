import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../shared/route.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Routes: any = [];

  constructor(
    private RouteService: RouteService
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.RouteService.getRouteList().subscribe((res) => {
      console.log(res)
      this.Routes = res;
    })
  }

  deleteRoute(Route, i) {
    if (window.confirm('Do you want to delete route?')) {
      this.RouteService.deleteRoute(Route._id)
        .subscribe(() => {
          this.Routes.splice(i, 1);
          console.log('Route deleted!')
        }
        )
    }
  }
}
