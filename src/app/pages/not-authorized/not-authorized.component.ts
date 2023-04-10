import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Location } from '@angular/common';
@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.css'],
})
export class NotAuthorizedComponent implements OnInit {
  constructor(private msg: NzMessageService, private location: Location) {}

  ngOnInit(): void {
    this.msg.warning('Bạn không có quyền để truy cập chức năng này');
  }
  directBack() {
    this.location.back();
  }
}
