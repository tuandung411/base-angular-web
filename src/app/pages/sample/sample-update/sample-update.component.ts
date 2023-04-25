import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location, ViewportScroller } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';

import {
  phoneNumberValidator,
  emailValidator,
  disabledDate,
} from 'src/app/helper/common.helper';

@Component({
  selector: 'app-sample-update',
  templateUrl: './sample-update.component.html',
  styleUrls: ['./sample-update.component.scss'],
})
export class SampleUpdateComponent implements OnInit {
  @ViewChild('autoFocus') autoFocus: ElementRef;
  dateFormat = 'dd/MM/yyyy HH:mm:ss';
  idCase = '';
  formCase!: FormGroup;
  isLoadingSpin = false;
  section: string = '';

  constructor(
    private fb: FormBuilder,
    private scroller: ViewportScroller,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private router: Router,
    private location: Location
  ) {}
  ngAfterContentInit(): void {
    setTimeout(() => {
      this.autoFocus?.nativeElement.focus();
    }, 200);
  }
  ngOnInit(): void {
    this.idCase = this.route.snapshot.params['id'];

    this.formCase = this.fb.group({
      id: [null],
      code: [null, [Validators.required]],
      customerCode: [null, [Validators.required]],
      customerName: [null, Validators.compose([Validators.required])],
      customerPhone: [
        null,
        Validators.compose([Validators.required, phoneNumberValidator]),
      ],
      customerEmail: [
        null,
        Validators.compose([Validators.required, emailValidator]),
      ],
    });
  }

  toggleSpin() {
    this.isLoadingSpin = !this.isLoadingSpin;
  }

  submitForm(): void {
    if (this.formCase.valid) {
      var formatData = {};
      console.log(formatData);
      // Chuyển typeName từ id=> name

      if (this.idCase == 'add') {
        this.toggleSpin();
      } else {
        this.toggleSpin();
      }
    } else {
      Object.values(this.formCase.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });

          let controlFormArray = control as FormArray;
          if (controlFormArray && controlFormArray.controls) {
            Object.values((control as FormArray).controls).forEach(
              (childControl) => {
                Object.values((childControl as FormGroup).controls).forEach(
                  (child) => {
                    child.markAsDirty();
                    child.updateValueAndValidity({ onlySelf: true });
                  }
                );
              }
            );
          }
        }
      });
    }
  }

  disabledDate = disabledDate;
  goSection(section: string) {
    this.scroller.scrollToAnchor(section);
    this.section = section;
  }
  directToBoard() {
    this.router.navigateByUrl(`/user/sample`);
  }
  directBack() {
    this.location.back();
  }
}
