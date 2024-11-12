import { Component, OnInit } from '@angular/core';
import { delay, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowType, HeaderSize } from '@app/models';
import { Keyboard } from '@app/utils/keyb-lang.global';

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
    Keyboard.setVisibleKeybToggle(false);
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
