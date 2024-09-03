import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

@Component({
  selector: 'app-api-error-message',
  templateUrl: './api-error-message.component.html',
  styleUrls: ['./api-error-message.component.scss'],
  standalone: true,
  imports: [NgIf, TranslocoRootModule],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'status-code-errors', multi: true },
  ],
})
export class ApiErrorMessageComponent implements OnChanges {
  @Input() statusCode = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['statusCode']){
      setTimeout(() => this.statusCode = '', 3000);
    }
  }
}
