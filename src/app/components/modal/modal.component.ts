import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { NzIconService } from 'ng-zorro-antd/icon';
import { warningIcon } from 'src/app/constant/var';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnChanges {
  @Input() type!: string;
  @Input() idCase!: string;
  @Input() onOk: any;
  @Input() onCancel: any;
  @Output() click = new EventEmitter<any>();
  // @Input() isVisible: boolean;
  isVisibleChild = true;
  warningIcon = warningIcon;
  constructor(private iconService: NzIconService) {
    this.iconService.addIconLiteral('ng-zorro:warning', this.warningIcon);
  }

  ngOnChanges(): void {
    // this.isVisible = this.isVisible;
    // console.log(`onChange ${this.isVisible}`);
  }

  hiddenModal() {
    this.onCancel();

    // this.isVisible = false;
    // // alert(this.isVisible);
    // this.onCancel;
  }
}
