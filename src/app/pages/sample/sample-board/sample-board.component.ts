import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Router } from '@angular/router';
import {
  columnsDisplay,
  listStatusFilter,
} from './sample-board.configTableColumn';
import { CavetService } from 'src/app/@core/mock/sample.service';

const warningIcon =
  '<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="56" height="56" rx="28" fill="#F25B60" fill-opacity="0.1"/><rect x="8" y="8" width="40" height="40" rx="20" fill="#EB2D4B"/><path d="M35.5099 21.85L29.5699 18.42C28.5999 17.86 27.3999 17.86 26.4199 18.42L20.4899 21.85C19.5199 22.41 18.9199 23.45 18.9199 24.58V31.42C18.9199 32.54 19.5199 33.58 20.4899 34.15L26.4299 37.58C27.3999 38.14 28.5999 38.14 29.5799 37.58L35.5199 34.15C36.4899 33.59 37.0899 32.55 37.0899 31.42V24.58C37.0799 23.45 36.4799 22.42 35.5099 21.85ZM27.2499 23.75C27.2499 23.34 27.5899 23 27.9999 23C28.4099 23 28.7499 23.34 28.7499 23.75V29C28.7499 29.41 28.4099 29.75 27.9999 29.75C27.5899 29.75 27.2499 29.41 27.2499 29V23.75ZM28.9199 32.63C28.8699 32.75 28.7999 32.86 28.7099 32.96C28.5199 33.15 28.2699 33.25 27.9999 33.25C27.8699 33.25 27.7399 33.22 27.6199 33.17C27.4899 33.12 27.3899 33.05 27.2899 32.96C27.1999 32.86 27.1299 32.75 27.0699 32.63C27.0199 32.51 26.9999 32.38 26.9999 32.25C26.9999 31.99 27.0999 31.73 27.2899 31.54C27.3899 31.45 27.4899 31.38 27.6199 31.33C27.9899 31.17 28.4299 31.26 28.7099 31.54C28.7999 31.64 28.8699 31.74 28.9199 31.87C28.9699 31.99 28.9999 32.12 28.9999 32.25C28.9999 32.38 28.9699 32.51 28.9199 32.63Z" fill="white"/></svg>';

@Component({
  selector: 'app-sample-board',
  templateUrl: './sample-board.component.html',
  styleUrls: ['./sample-board.component.scss'],
})
export class SampleBoardComponent implements OnInit {
  loading = false;
  total: number = 1;
  idCase: any = null;
  isConfirmLoading = false;
  pageSize: number = 10;
  pageIndex: number = 1;
  listColumnsDisplay = [...columnsDisplay];
  columnsDisplay = columnsDisplay;
  listStatusFilter = listStatusFilter;
  listOfData: any[] = [];
  listOfDisplayData: readonly any[] = [];
  searchValue = '';
  searchText = '';
  statusFilter = '';
  isVisibleModal = false;
  constructor(
    private router: Router,
    private iconService: NzIconService,
    private message: NzMessageService
  ) {
    this.iconService.addIconLiteral('ng-zorro:warning', warningIcon);
  }

  ngOnInit(): void {}

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    this.pageIndex = pageIndex;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'id';
    const sortOrder = (currentSort && currentSort.value) || 'ASC';
    const sortString = sortOrder === 'ascend' ? 'ASC' : 'DESC';
  }
  filterStatus(status: any) {
    if (status) {
      this.listOfDisplayData = this.listOfData.filter(
        (e) => e.status == status
      );
    } else {
      this.listOfDisplayData = this.listOfData;
    }
  }
  directToEdit(taskId: string) {
    this.router.navigateByUrl(`/user/sample/${taskId}`);
  }
  directToNew() {
    this.router.navigateByUrl(`/user/sample/add`);
  }

  deleteCase() {
    this.isConfirmLoading = true;
  }
  handleSearch(value: any) {
    this.listOfDisplayData = this.listOfData.filter((e) => {
      return (
        e.optionCode.toLowerCase().includes(value.toLowerCase()) ||
        e.branchName.toLowerCase().includes(value.toLowerCase()) ||
        e.customerName.toLowerCase().includes(value.toLowerCase())
      );
    });
  }
  changeCheckBox(event: Event) {
    event.preventDefault();
  }

  showModalDelete(id: string) {
    this.isVisibleModal = true;
    this.idCase = id;
  }
  handleCancel() {
    this.isVisibleModal = false;
  }
}
