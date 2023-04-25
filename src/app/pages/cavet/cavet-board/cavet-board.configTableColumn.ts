import { NzTableFilterFn, NzTableFilterList } from 'ng-zorro-antd/table';

interface ColumnItem {
  key: string;
  name: string;
  hidden: boolean;
  sortFn: boolean;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<any> | null;
}

export var columnsDisplay: ColumnItem[] = [
  {
    name: 'STT',
    key: 'STT',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: false,
  },
  {
    name: 'Mã phương án',
    key: 'code',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
  },
  {
    name: 'Tên khách hàng',
    key: 'customerName',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: false,
  },
  {
    name: 'Chi nhánh',
    key: 'branchName',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
  },
  {
    name: 'Ngày nhận',
    key: 'timeVehicleRegistration',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: false,
  },
  {
    name: 'ĐĐ lấy ĐK xe',
    key: 'locationVehicleRegistration',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: false,
  },

  {
    name: 'Trạng thái',
    key: 'status',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: false,
  },
];
export var listStatusFilter = [
  { status: '0', name: 'Mới' },
  { status: '1', name: 'Chờ xử lý' },
  { status: '2', name: 'Đang xử lý' },
  { status: '3', name: 'Hoàn thành' },
  { status: '4', name: 'Tạm hoãn' },
  { status: '5', name: 'Hủy' },
  { status: '6', name: 'RM đang xử lý' },
  { status: '7', name: 'Bàn giao tỉnh' },
  { status: '8', name: 'Gửi két' },
  { status: '9', name: 'Đã xác nhận' },
];
