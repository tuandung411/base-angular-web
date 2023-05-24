import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';

const iconSuccess = '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"/></svg>'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  selectedItem: 'GET' | 'HOME' = 'GET';
  checked = false;
  loading = false;
  indeterminate = false;
  listOfCurrentPageData: readonly any[] = [];
  setOfCheckedId = new Set<number>();
  searchMKB: string;
  searchMYT: string;
  searchName: string = '';
  listOfData: any;
  listApi :any;

  constructor(
    private iconService: NzIconService,
    private http: HttpClient
  ) {
    this.iconService.addIconLiteral('ng-zorro:success', iconSuccess);
   }

  async ngOnInit() {
    await this.getListData();
  }

  async getListData(){
    await this.http.get('https://646c8e697b42c06c3b2b826a.mockapi.io/api/product')
    .subscribe((data) => {
    this.listApi = data;
    this.listOfData = this.listApi
  });
  }

  handleOnSelectedHome(){
    if(this.selectedItem == 'HOME'){
      return;
    }
    this.selectedItem = 'HOME';
  }
  handleOnSelectedGet(){
    if(this.selectedItem == 'GET'){
      return;
    }
    this.selectedItem = 'GET';
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  handleOnSearch(){
    if(!this.searchMKB && !this.searchMYT && !this.searchName){
      this.getListData();
      return;
    }
    if(this.searchMKB && !this.searchMYT && !this.searchName){
      this.listOfData = this.fillterItem(this.searchMKB, this.listApi, 'mkb');
    }
    if(!this.searchMKB && this.searchMYT && !this.searchName){
      this.listOfData = this.fillterItem(this.searchMYT, this.listApi, 'myt');
    }
    if(!this.searchMKB && !this.searchMYT && this.searchName){
      this.listOfData = this.fillterItem(this.searchName, this.listApi, 'name');
    }
  }

  fillterItem(value, array, key){
    return array = array.filter(item => item[key].toString().includes(value.trim()))
  }

  async handleOnDelete(data){
    await this.http.delete(`https://646c8e697b42c06c3b2b826a.mockapi.io/api/product/${data.id}`).subscribe(() => {
      console.log('Xoá thành công');
    }, (error) => {
      console.error('Lỗi khi xoá', error);
    });
    this.listOfData = this.listOfData.filter(item => item.id !== data.id)
  }
  async handleOnPrint(){
    const searchKeyword = 'a';
    const apiUrl = `https://646c8e697b42c06c3b2b826a.mockapi.io/api/product?search=${searchKeyword}`;

    await this.http.get(apiUrl)
      .subscribe((response) => {
        console.log('Kết quả tìm kiếm:', response);
      }, (error) => {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
      });
  }
  handleOnEdit(id){
  }

}
