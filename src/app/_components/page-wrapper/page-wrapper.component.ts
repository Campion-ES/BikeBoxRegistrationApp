import { Component, Input, OnInit } from '@angular/core';
import { FlowType } from '@app/_models/flow-type.enum';
import { HeaderSize } from '@app/_models/header-size.enum';
import {
  YELLOW_BACKGROUND,
  TURQUOISE_BACKGROUND,
  PURPLE_BACKGROUND,
} from '@app/_models/background-images.constant';
import { CommonModule } from '@angular/common';
import { TranslocoRootModule } from '@app/transloco-root.module';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslocoRootModule],
})
export class PageWrapperComponent implements OnInit {
  @Input() flowType: FlowType = FlowType.wellcome;
  @Input() headerSize: HeaderSize = HeaderSize.big;
  @Input() playAnimation: boolean = false;
  backgroundImageStyle = '';
  headerHeightStyle = '';
  stripBackgroundSizeStyle = '';
  logoHeightStyle = '';
  contentHeightStyle = '';
  contentPaddingStyle = '';

  ngOnInit(): void {
    let backgroundImageName: string = '';
    let stripBackground: string = '';
    switch (this.flowType) {
      case FlowType.wellcome:
        backgroundImageName = YELLOW_BACKGROUND;
        break;
      case FlowType.register:
        backgroundImageName = TURQUOISE_BACKGROUND;
        break;
      case FlowType.paymentMethod:
        backgroundImageName = PURPLE_BACKGROUND;
        break;
      default:
        break;
    }
    this.backgroundImageStyle = `url(./../../../assets/${backgroundImageName})`;

    switch (this.headerSize) {
      case HeaderSize.small:
        this.headerHeightStyle = '8.13em';
        this.logoHeightStyle = '11em';
        this.contentHeightStyle = 'calc(100vh - 8.4em)';
        this.stripBackgroundSizeStyle = '80em';
        break;
      case HeaderSize.big:
        this.headerHeightStyle = '16.13em';
        this.logoHeightStyle = '22em';
        this.contentHeightStyle = 'calc(100vh - 11em)';
        this.contentPaddingStyle = '11.25em';
        this.stripBackgroundSizeStyle = 'auto';
        break;
      default:
        break;
    }
  }
}
