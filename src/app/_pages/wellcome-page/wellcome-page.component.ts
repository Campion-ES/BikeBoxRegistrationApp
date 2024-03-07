import { Component, OnInit } from '@angular/core';
import { TLangNames } from '@app/_interfaces/interfaces';
import { IWellcomePageLangData, WELLCOME_DATA_MULTI } from './wellcome.data';
import { ILANG_DESCR } from '@app/keyboard/keyb-data/keyb.data';
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
  flds!: IWellcomePageLangData;
  playAnimation: boolean = false;

  flowType = FlowType.wellcome;
  headerSize = HeaderSize.big;

  public set Lang(v: TLangNames) {
    // if( v != this._Lang){
    this._Lang = v;
    this._onLangChange(v);
    // }
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    G.setVisibleKeybToggle(false);
    G.Lang$.subscribe((lang) => (this.Lang = lang));
    this.Lang = G.Lang;
  }

  public goToRegister() {
    this.playAnimation = true;
    of(true)
      .pipe(delay(2000))
      .subscribe(() => {
        this.router.navigate(['/register'], { relativeTo: this.route });
      });
  }

  private _onLangChange(v: TLangNames) {
    this.flds = WELLCOME_DATA_MULTI[this._Lang] as IWellcomePageLangData;
    console.log(`Set Lang ${v}:${ILANG_DESCR[v].name}`);
  }

  private _Lang: TLangNames = G.Lang;
  public get Lang(): TLangNames {
    return this._Lang;
  }
}
