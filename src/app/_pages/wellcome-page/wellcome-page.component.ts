import { Component, OnInit } from '@angular/core';
import { GKeybLanGlobal as G } from '@app/_globals';
import { delay, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowType } from '@app/_models/flow-type.enum';
import { HeaderSize } from '@app/_models/header-size.enum';

@Component({
  selector: 'app-wellcome-page',
  templateUrl: './wellcome-page.component.html',
  styleUrls: ['./wellcome-page.component.scss'],
})
export class WellcomePageComponent implements OnInit {
  playAnimation: boolean = false;

  flowType = FlowType.wellcome;
  headerSize = HeaderSize.big;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    G.setVisibleKeybToggle(false);
  }

  public goToRegister() {
    this.playAnimation = true;
    of(true)
      .pipe(delay(2000))
      .subscribe(() => {
        this.router.navigate(['/register'], { relativeTo: this.route });
      });
  }

  updatePaymentMethod() {
    this.router.navigate(['/payment-method'], { relativeTo: this.route });
  }
}
