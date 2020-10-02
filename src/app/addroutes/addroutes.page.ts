import { Component, OnInit, NgZone } from '@angular/core';
import { RouteService } from '../../../shared/route.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-addroutes',
  templateUrl: './addroutes.page.html',
  styleUrls: ['./addroutes.page.scss'],
})
export class AddroutesPage implements OnInit {

  routeForm: FormGroup;

  constructor(
    private songAPI: RouteService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone
  ) {
    this.routeForm = this.fb.group({
      route_name: [''],
      id: ['']
    })
  }

  ngOnInit() {
  }

  onFormSubmit() {
    if (!this.routeForm.valid) {
      return false;
    } else {
      this.songAPI.addRoute(this.routeForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.routeForm.reset();
            this.router.navigate(['/home']);
          })
        });
    }
  }
}
