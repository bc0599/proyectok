import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../shared/route.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-modifyroutes',
  templateUrl: './modifyroutes.page.html',
  styleUrls: ['./modifyroutes.page.scss'],
})
export class ModifyroutesPage implements OnInit {

  updateRouteForm: FormGroup;
  id: any;


  constructor(
    private songAPI: RouteService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getRouteData(this.id);
    this.updateRouteForm = this.fb.group({
      route_name: [''],
      id: ['']
    })
  }

  getRouteData(id) {
    this.songAPI.getRoute(id).subscribe(res => {
      this.updateRouteForm.setValue({
        route_name: res['route_name'],
        id: res['id']
      });
    });
  }

  updateForm() {
    if (!this.updateRouteForm.valid) {
      return false;
    } else {
      this.songAPI.updateRoute(this.id, this.updateRouteForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateRouteForm.reset();
          this.router.navigate(['/home']);
        })
    }
  }

}
