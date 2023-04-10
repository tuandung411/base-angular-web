import { ActivatedRoute, Router } from '@angular/router';
import { Asset, AssetType } from 'src/app/@core/data/asset';
import JSONbig from 'bigint-json-native';
import { AssetCode, assetList } from 'src/app/constant/asset-list';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location, ViewportScroller } from '@angular/common';

import { AppGroup } from 'src/app/@core/data/group';
import { AppUser } from 'src/app/@core/data/user';
import { Branch } from 'src/app/@core/data/branch';
import { NotarizeCompositeService } from 'src/app/@core/mock/notarize-composite.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Province } from 'src/app/model/province';
import { UserService } from 'src/app/@core/mock/user.service';
import { AssetCavet } from 'src/app/model/asset-cavet';
import { CavetService } from 'src/app/@core/mock/cavet.service';
import {
  phoneNumberValidator,
  emailValidator,
  disabledDate,
  formatStringToCurrency,
  currencyValidator,
} from 'src/app/helper/common.helper';

@Component({
  selector: 'app-cavet-update',
  templateUrl: './cavet-update.component.html',
  styleUrls: ['./cavet-update.component.scss'],
})
export class CavetUpdateComponent implements OnInit {
  @ViewChild('autoFocus') autoFocus: ElementRef;
  dateFormat = 'dd/MM/yyyy HH:mm:ss';
  idCase = '';
  currentCase: any = {};
  branchId: any = '';
  branchCode: any = '';
  branchName: any = '';
  branch: Branch = new Branch(0n, '', '', '', '', 0, 0, '', 0n, '');

  listLocationRegistration: any[] = [];
  listCustomers: any[] = [];
  listStaff: any[] = [];
  listProvince: Province[] = [];
  listBranch: any[] = [];
  listUserBranch: any[] = [];
  assetList: AssetCode[] = assetList.filter(
    (e) =>
      e.typeId == 301 ||
      e.typeId == 302 ||
      e.typeId == 303 ||
      e.typeId == 304 ||
      e.typeId == 305
  );
  listAssetType: AssetType[] = [];
  listGroupStaff: AppGroup[] = [];
  listCustomerType = [
    { id: 0, name: 'Cá nhân' },
    { id: 1, name: 'Doanh nghiệp' },
  ];
  selectedProvince: BigInt = -1n;
  userId = localStorage.getItem('userId') || '';
  user: any = [];
  staff: any = { id: '', email: '', jobTitleId: '' };
  formCase!: FormGroup;
  idStaff = '';
  switchOwnerAsset = false;
  isLoadingSpin = false;
  branchVehicleRegistrationId = '';
  customerCode = '';
  section: string = '';
  listStaffAsset: AppUser[][] = [];
  listCurrency = ['VNĐ', 'USD'];

  get assets(): FormArray {
    return this.formCase.get('assets') as FormArray;
  }

  constructor(
    private notarizeService: NotarizeCompositeService,
    private cavetService: CavetService,
    private userService: UserService,
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
    this.branchCode = localStorage.getItem('branchCode');
    this.branchId = localStorage.getItem('branchId');
    this.idCase = this.route.snapshot.params['id'];

    this.staff = { id: '', email: '', jobTitleId: '' };
    if (this.idCase) this.fetchCase();

    this.fetchBranchByBranchId(this.branchId);
    this.fetchListBranchByHub();
    this.fetchGroupByBranch(this.branchCode);
    this.fetchProvinces();
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
      rmName: [null, Validators.compose([Validators.required])],
      rmPhone: [
        null,
        Validators.compose([Validators.required, phoneNumberValidator]),
      ],
      optionCode: ['123'],
      optionT24Code: ['123'],
      branchCode: [this.branchCode],
      branchCodeHub: [null, [Validators.required]],
      branchName: [null],
      currentUserId: [null],
      currentGroupId: [null],
      parentId: [null],
      finishPrintingTime: [null],
      locationVehicleRegistration: [null],
      timeVehicleRegistration: [null],
      status: [0],
      timeAssign: [null],
      timeConfirmCustomer: [null],
      assignTimes: [null],
      branchVehicleRegistrationId: [null, [Validators.required]],
      customerType: [null, Validators.required],
      isAssigned: [false],
      latitude: [null],
      longtitude: [null],
      assignRM: [null],
      assets: this.fb.array([]),
      notes: [null],
      assetOwner: [null],
      assetOwnerPhone: [null, [phoneNumberValidator]],
      elseAssetOwner: [false],
    });
    if (this.idCase == 'add') {
      this.addAsset(null);
    }
  }

  addAsset(asset: AssetCavet | any) {
    asset = asset || {};
    this.assets.push(
      this.fb.group({
        id: [asset.id],
        targetId: [asset.targetId],
        code: [asset.code],
        name: [asset.name],
        assetOwner: [asset.assetOwner],
        assetOwnerPhone: [asset.assetOwnerPhone],

        typeId: [Number(asset.typeId), [Validators.required]],
        typeName: [asset.typeName],
        value: [
          asset.value ? formatStringToCurrency(asset.value) : null,
          [Validators.required, currencyValidator],
        ],
        isSpilit: [asset.isSpilit],
        type: [asset.type || 3],
        locationVehicleRegistration: [asset.locationVehicleRegistration],
        timeVehicleRegistration: [asset.timeVehicleRegistration],
        currentUserId: [asset.currentUserId],
        onSecureTransaction: [asset.onSecureTransaction || false, ,],
        onSecureTransactionOnline: [
          asset.onSecureTransactionOnline || false,
          ,
        ],
        currentGroupId: [asset.currentGroupId],
        currencyType: [asset.currencyType, [Validators.required]],
        legalPaperType: [asset.legalPaperType, [Validators.required]],
      })
    );
    this.listStaffAsset.push([]);
  }
  removeAsset(idx: number) {
    this.assets.removeAt(idx);
  }

  fetchCase() {
    this.cavetService.fetchCase(this.idCase).subscribe(
      (res) => {
        res = JSONbig.parse(res);
        this.currentCase = res;
        this.setProvinceByLocation(res.locationVehicleRegistration);
        if (res.branchCodeHub) {
          this.formCase.controls['branchCodeHub']?.setValue(res.branchCodeHub);

          this.setBranchCodeHub(res.branchCodeHub);
        } else {
          this.formCase.controls['branchCodeHub']?.setValue(res.branchCode);
          this.setBranchCodeHub(res.branchCode);
        }
        this.fetchBranchRegistration(res.branchVehicleRegistrationId);
        this.formCase.get('id')?.setValue(res.id);
        this.formCase.controls['code']?.setValue(res.code);
        this.formCase.controls['status']?.setValue(res.status);
        this.formCase.controls['customerCode']?.setValue(res.customerCode);
        this.formCase.controls['customerName']?.setValue(res.customerName);
        this.formCase.controls['customerPhone']?.setValue(res.customerPhone);
        this.formCase.controls['customerEmail']?.setValue(res.customerEmail);
        this.formCase.controls['customerType']?.setValue(res.customerType);
        this.formCase.controls['branchName']?.setValue(res.branchName);
        this.formCase.controls['rmName']?.setValue(res.rmName);
        this.formCase.controls['rmPhone']?.setValue(res.rmPhone);
        this.formCase.controls['locationVehicleRegistration']?.setValue(
          res.locationVehicleRegistration
        );
        this.formCase.controls['branchVehicleRegistrationId']?.setValue(
          res.branchVehicleRegistrationId.toString()
        );
        this.formCase.controls['currentGroupId']?.setValue(
          res.currentGroupId.toString()
        );
        this.formCase.controls['currentUserId']?.setValue(res.currentUserId);
        if (res.timeVehicleRegistration) {
          this.formCase.controls['timeVehicleRegistration']?.setValue(
            res.timeVehicleRegistration
          );
        }

        this.formCase.controls['assetOwner']?.setValue(res.assetOwner);
        this.formCase.controls['assetOwnerPhone']?.setValue(
          res.assetOwnerPhone
        );

        var elseAssetOwner = res.assetOwner ? true : false;
        this.formCase.controls['elseAssetOwner']?.setValue(elseAssetOwner);

        const assetItems = res.assets as AssetCavet[];
        assetItems.forEach((item, index) => {
          this.addAsset(item);
          this.listStaffAsset.push([]);
        });
      },
      (error) => {}
    );
  }
  setBranchCodeHub(value: any) {
    if (value) {
      this.branch = this.listBranch.find((e) => e.branchCode == value);
    }
  }
  fetchListBranchByHub() {
    this.notarizeService
      .fetchBranchesOfSameHubByBranch(this.branchCode)
      .subscribe(
        (res) => {
          res = JSONbig.parse(res);
          this.listBranch = res;
          this.formCase.get('branchCodeHub')?.setValue(res[0]?.branchCode);
          this.branch = res[0];
        },
        (e) => {
          this.message.warning(
            `Không lấy được danh sách chi nhánh của HUB. (Mã lỗi: ${e.status})`
          );
        }
      );
  }

  fetchAssetType() {
    this.notarizeService.fetchAccessType().subscribe((res) => {
      res = JSON.parse(res, (key, value) => {
        if (key === 'id') {
          return BigInt(value);
        }
        return value;
      });
      this.listAssetType = res;
    });
  }
  setProvinceByLocation(id: string) {
    this.cavetService.getLocationById(id).subscribe((res) => {
      res = JSON.parse(res, (key, value) => {
        if (key === 'id') {
          return BigInt(value).toString();
        }
        return value;
      });
      this.selectedProvince = res.provinceId.toString();

      this.fetchLocationRegistrationByProvince(res.provinceId.toString());
    });
  }
  fetchProvinces() {
    this.notarizeService.fetchProvinces().subscribe((res) => {
      res = JSON.stringify(res);
      res = JSON.parse(res, (key, value) => {
        if (key === 'id') {
          return BigInt(value).toString();
        }
        return value;
      });

      this.listProvince = res;
      this.listProvince = this.listProvince.sort((i1, i2) =>
        i1.name.localeCompare(i2.name)
      );
    });
  }
  changeBranchVehicle(value: string, isMain: boolean = true) {
    if (isMain)
      this.formCase.get('branchVehicleRegistrationId')?.setValue(value);
    let currentLocation = this.listLocationRegistration.find(
      (x) => x.id.toString() === value
    );

    this.formCase
      .get('locationVehicleRegistration')
      ?.setValue(currentLocation?.location);
  }
  fetchGroupByBranch(branchCode: string) {
    if (branchCode) {
      this.userService.fetchGroupByBranch(branchCode).subscribe((res) => {
        res = JSONbig.parse(res);

        this.listGroupStaff = res.map((e) => {
          return { ...e, id: e.id.toString() };
        });

        if (this.listGroupStaff.length > 0 && !this.currentCase.currentGroupId)
          this.formCase
            .get('currentGroupId')
            .setValue(this.listGroupStaff[0].id);
      });
    }
  }

  changeProvince(value: BigInt) {
    if (value) this.fetchLocationRegistrationByProvince(value.toString());
    else {
      this.listLocationRegistration = [];
    }
  }
  changeGroup(value: BigInt) {
    if (value) this.fetchUserByGroup(value);
  }
  changeGroupAsset(value: BigInt, index: number) {
    if (value) {
      this.fetchUserByGroupForAsset(value, index);
    }
  }
  fetchLocationRegistrationByProvince(provinceId: string) {
    this.cavetService
      .getLocationRegistrationByProvince(provinceId)
      .subscribe((res) => {
        res = JSON.parse(res, (key, value) => {
          if (key === 'id') {
            return BigInt(value).toString();
          }
          return value;
        });

        this.listLocationRegistration = res;
      });
  }
  fetchBranchRegistration(branchId: string) {
    if (branchId) {
      this.cavetService.fetchBranchByBranchId(branchId).subscribe((res) => {
        res = JSONbig.parse(res);
        // this.branch = res;
        this.selectedProvince = res.provinceId;

        if (this.selectedProvince) this.changeProvince(this.selectedProvince);
      });
    }
  }
  fetchUserByGroupForAsset(groupId: BigInt, index: number) {
    this.userService
      .fetchCurrentUserByGroupId(groupId.toString())
      .subscribe((res) => {
        res = JSON.parse(res, (key, value) => {
          if (key === 'id') {
            return BigInt(value).toString();
          }
          return value;
        });
        this.listStaffAsset[index] = res;
        if (!res || res.length == 0) {
          this.message.create('warn', 'Không tìm thấy người dùng thuộc group');
        }
      });
  }

  fetchUserByGroup(groupId: BigInt) {
    this.userService
      .fetchCurrentUserByGroupId(groupId.toString())
      .subscribe((res) => {
        res = JSON.parse(res, (key, value) => {
          if (key === 'id') {
            return BigInt(value).toString();
          }
          return value;
        });
        this.listStaff = res;
        if (!this.listStaff || this.listStaff.length == 0) {
          this.message.create('warn', 'Không tìm thấy người dùng thuộc group');
        }
      });
  }
  toggleSpin() {
    this.isLoadingSpin = !this.isLoadingSpin;
  }
  fetchBranchByBranchId(branchId: string) {
    if (branchId) {
      this.cavetService.fetchBranchByBranchId(branchId).subscribe((res) => {
        res = JSONbig.parse(res);
        // this.branch = res;
        this.formCase.controls['branchCode']?.setValue(res.branchCode);
        this.formCase.controls['branchName']?.setValue(res.branchName);
        this.selectedProvince = res.provinceId;

        if (this.selectedProvince) this.changeProvince(this.selectedProvince);
      });
    }
  }
  submitForm(): void {
    if (this.formCase.valid) {
      var formatData = {
        ...this.currentCase,
        ...this.formCase.value,
        branchCodeHub: this.branch.branchCode,
        branchHubName: this.branch.branchName,
        branchCode: this.listBranch[0].branchCode,
      };
      console.log(formatData);
      // Chuyển typeName từ id=> name
      formatData.assets.forEach((e) => {
        e.value = e.value.replaceAll(',', '');
        e.value = e.value.replaceAll('.', '');
        e.typeName = this.assetList.filter(
          (p) => p.typeId == e.typeId
        )[0]?.typeName;
        if (this.formCase.get('assetOwner')?.value) {
          e.assetOwner = this.formCase.get('assetOwner')?.value;
          e.assetOwnerPhone = this.formCase.get('assetOwnerPhone')?.value;
        } else {
          e.assetOwner = this.formCase.get('customerName')?.value;
          e.assetOwnerPhone = this.formCase.get('customerPhone')?.value;
        }

        e.locationVehicleRegistration = this.formCase.get(
          'locationVehicleRegistration'
        )?.value;

        e.locationVehicleRegistration = this.formCase.get(
          'timeVehicleRegistration'
        )?.value;
      });

      var { elseAssetOwner: ss, ...formatData } = formatData;

      if (formatData.assets?.length == 0) {
        this.message.create('error', 'Chưa có thông tin tài sản');
        return;
      }

      if (this.idCase == 'add') {
        this.toggleSpin();

        this.cavetService.createCase(formatData).subscribe(
          (res) => {
            this.toggleSpin();
            this.message.create('success', 'Thêm tác vụ lấy cà vẹt thành công');
            this.router.navigateByUrl(`/user/cavet`);
          },
          (error) => {
            this.toggleSpin();
            this.message.create(
              'error',
              `Đã xảy ra lỗi, vui lòng thử lại. (Mã lỗi: ${error.status})`
            );
          }
        );
      } else {
        this.toggleSpin();
        this.cavetService.updateCase(formatData).subscribe(
          (res) => {
            this.toggleSpin();
            this.message.create(
              'success',
              'Cập nhật thông tin tác vụ thành công'
            );
            this.directToBoard();
          },
          (error) => {
            this.toggleSpin();
            this.message.create(
              'error',
              `Đã xảy ra lỗi, vui lòng thử lại. (Mã lỗi: ${error.status})`
            );
          }
        );
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
  changeValueAsset(value: any, idx: number) {
    this.assets
      .get(`${idx}.value`)
      ?.setValue(formatStringToCurrency(value.target.value));
  }
  disabledDate = disabledDate;
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
