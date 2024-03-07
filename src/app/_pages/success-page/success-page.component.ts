import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlowType } from '@app/_models/flow-type.enum';
import { HeaderSize } from '@app/_models/header-size.enum';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PageWrapperComponent } from '../../_components/page-wrapper/page-wrapper.component';
import { TLangNames } from '@app/_interfaces/interfaces';
import {
  ISuccessPageFieldsData,
  SUCCESS_PAGE_DATA_MULTI,
} from './success-page.data';
import { GKeybLanGlobal as G } from '@app/_globals';

@UntilDestroy()
@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
  standalone: true,
  imports: [CommonModule, PageWrapperComponent],
})
export class SuccessPageComponent implements OnInit {
  flowType = FlowType.register;
  headerSize = HeaderSize.big;

  flds!: ISuccessPageFieldsData;

  message: string = '';

  public set Lang(v: TLangNames) {
    // if( v != this._Lang){
    this._Lang = v;
    this._onLangChange(v);
    // }
  }

  private _Lang: TLangNames = G.Lang;
  public get Lang(): TLangNames {
    return this._Lang;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    G.setVisibleKeybToggle(false);
    this.getFlowType();
    G.Lang$.pipe(untilDestroyed(this)).subscribe((lang) => (this.Lang = lang));
  }

  getFlowType() {
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe((data) => (this.flowType = data['flowType']));
  }

  private _onLangChange(v: TLangNames) {
    this.flds = SUCCESS_PAGE_DATA_MULTI[this._Lang] as ISuccessPageFieldsData;
    this.message =
      this.flowType === FlowType.register
        ? this.flds.registerMessage
        : this.flds.paymentMethodMessage;
  }
}
