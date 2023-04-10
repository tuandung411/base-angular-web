import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-status-tag',
  templateUrl: './status-tag.component.html',
  styleUrls: ['./status-tag.component.scss'],
})
export class StatusTagComponent implements OnInit {
  @Input() status: string;

  constructor() {}
  ngOnInit(): void {}
}
