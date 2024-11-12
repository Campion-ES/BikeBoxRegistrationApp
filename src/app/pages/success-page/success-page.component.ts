import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { map, timer } from 'rxjs';
import { PageWrapperComponent } from '@app/components/page-wrapper';
import { FlowType, HeaderSize } from '@app/models';
import { Keyboard } from '@app/utils/keyb-lang.global';

@UntilDestroy()
@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
  standalone: true,
  imports: [CommonModule, PageWrapperComponent, TranslocoRootModule],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'success-page', multi: true },
  ],
})
export class SuccessPageComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  flowType = FlowType.register;
  headerSize = HeaderSize.big;
  FlowType = FlowType;
  message: string = '';

  ngOnInit() {
    Keyboard.setVisibleKeybToggle(false);
    this.getFlowType();
    timer(60 * 1000)
      .pipe(
        untilDestroyed(this),
        map(() => this.router.navigate(['/wellcome']))
      )
      .subscribe();
  }

  getFlowType() {
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe((data) => (this.flowType = data['flowType']));
  }
}
