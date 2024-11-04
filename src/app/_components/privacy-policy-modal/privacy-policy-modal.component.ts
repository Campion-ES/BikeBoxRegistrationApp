import {
  Component,
  EventEmitter,
  inject,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

@Component({
  selector: 'privacy-policy-modal',
  standalone: true,
  template: `
    <ng-container *transloco="let t">
      <ng-template #content let-modal>
        <div
          class="modal-header"
          [style.direction]="t('privacyPolicy.direction')"
        >
          <h4 class="modal-title" id="modal-basic-title">
            {{ t('privacyPolicy.title') }}
          </h4>
        </div>
        <div
          class="modal-body"
          [style.direction]="t('privacyPolicy.contentDirection')"
        >
          <div innerHTML="{{ t('privacyPolicy.content') }}"></div>
        </div>
        <div
          class="modal-footer"
          [style.direction]="t('privacyPolicy.direction')"
        >
          <button
            type="button"
            class="btn btn-outline-primary"
            (click)="modal.close(); onClose.emit()"
          >
            {{ t('privacyPolicy.agreeButton') }}
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            (click)="modal.close();"
          >
          {{ t('privacyPolicy.closeButton') }}
          </button>
        </div>
      </ng-template>
      <hr />
    </ng-container>
  `,
  styles: [
    `
      ::ng-deep {
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      }
    `,
  ],
  imports: [TranslocoRootModule],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'privacy-policy', multi: true },
  ],
})
export class PrivacyPolicyModalComponent {
  @ViewChild('content') content!: TemplateRef<any>;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  private modalService = inject(NgbModal);
  closeResult = '';

  open() {
    this.modalService
      .open(this.content, {
        ariaLabelledBy: 'modal-basic-title',
        scrollable: true,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
