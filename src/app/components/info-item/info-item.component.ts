import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ButtonConfig } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
})
export class InfoItemComponent implements OnInit {
  @Input() key!: string;
  @Input() value!: string;
  @Output() click = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
