import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location, ViewportScroller } from '@angular/common';
import { JSONbig } from 'bigint-json-native';
import { Asset } from 'src/app/@core/data/asset';
import { Branch } from 'src/app/@core/data/branch';
import { FormBuilder } from '@angular/forms';
import { NotarizeCompositeService } from 'src/app/@core/mock/notarize-composite.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/@core/mock/user.service';
import { SecureTransactionCompositeService } from 'src/app/@core/mock/secure-transaction-composite.service';
import { CavetService } from 'src/app/@core/mock/cavet.service';

@Component({
  selector: 'app-cavet-view',
  templateUrl: './cavet-view.component.html',
  styleUrls: ['./cavet-view.component.scss'],
})
export class CavetViewComponent implements OnInit {
  dateFormat = 'dd/MM/yyyy HH:mm:ss';
  idCase = '';
  currentCase: any = {};

  branch: any = {};
  customer: any = {};
  listLocationNotarization: Branch[] = [];
  listCustomers: any[] = [];
  listAsset: Asset[] = [];
  userId = localStorage.getItem('userId') || '';
  user: any = null;
  staff: any = null;
  isLoadingSpin = false;
  section: string = 'Chung';
  constructor(
    private cavetService: CavetService,
    private userService: UserService,
    private scroller: ViewportScroller,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    // document.querySelector('#my-checkbox').addEventListener('click', (e) => {
    //   e.preventDefault();
    // });
  }
  ngOnInit(): void {
    this.idCase = this.route.snapshot.params['id'];
    this.staff = {
      id: '',
      email: '',
      jobTitleId: '',
      fullname: '',
      phoneNumber: '',
      jobTitle: '',
    };
    this.fetchCase();

    // this.fetchCustomers();
  }

  fetchCase() {
    this.cavetService.fetchCase(this.idCase).subscribe(
      (res) => {
        res = JSON.parse(res, (key, value) => {
          if (key.includes('Id') || key.includes('id')) {
            return value !== null ? BigInt(value).toString() : null;
          }
          return value;
        });
        this.currentCase = res;

        this.fetchStaff(res.currentUserId);
      },
      (error) => {}
    );
  }

  fetchBranchByBranchId(branchId: string) {
    this.cavetService.fetchBranchByBranchId(branchId).subscribe((res) => {
      res = JSON.parse(res, (key, value) => {
        if (key.includes('provinceId') || key.includes('id')) {
          return value !== null ? BigInt(value).toString() : null;
        }
        return value;
      });
      this.branch = res;
    });
  }

  fetchStaff(userId: string) {
    this.userService.fetchUser(userId).subscribe(
      (res) => {
        res = JSONbig.parse(res);
        this.staff = res;
      },
      (error) => {}
    );
  }
  changeCheckBox(value: any) {
    return false;
  }
  toggleSpin() {
    this.isLoadingSpin = !this.isLoadingSpin;
  }

  goSection(section: string) {
    this.scroller.scrollToAnchor(section);
    this.section = section;
  }
  directToBoard() {
    this.router.navigateByUrl(`/user/cavet`);
  }
  directBack() {
    this.location.back();
  }
}
