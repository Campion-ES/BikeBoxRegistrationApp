import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlowType } from '@app/_models/flow-type.enum';
import { HeaderSize } from '@app/_models/header-size.enum';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PageWrapperComponent } from '../../_components/page-wrapper/page-wrapper.component';
import { TLangNames } from '@app/_interfaces/interfaces';
import { GKeybLanGlobal as G } from '@app/_globals';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { TranslocoRootModule } from '@app/transloco-root.module';

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
  flowType = FlowType.register;
  headerSize = HeaderSize.big;

  FlowType = FlowType;

  message: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    G.setVisibleKeybToggle(false);
    this.getFlowType();
  }

  getFlowType() {
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe((data) => (this.flowType = data['flowType']));
  }
}
