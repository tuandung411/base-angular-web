import 'moment/locale/pt-br';
import { PERMISSION, permissionRoles } from '../constant/var';
import { UntypedFormControl } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import regex from '../constant/regex';

export let testEmailAddress = (emailToTest) => {
  var at = emailToTest.indexOf('@');
  var dot = emailToTest.lastIndexOf('.');
  return (
    emailToTest.length > 0 &&
    at > 0 &&
    dot > at + 1 &&
    dot < emailToTest.length &&
    emailToTest[at + 1] !== '.' &&
    emailToTest.indexOf(' ') === -1 &&
    emailToTest.indexOf('..') === -1
  );
};
export let testCurrency = (value: string) => {
  const listCharacter = '.,0123456789';
  for (let i = 0; i < value.length; i++) {
    if (!listCharacter.includes(value[i])) {
      return false;
    }
  }
  return true;
};
export var formatStringToCurrency = (value: any) => {
  value = value.toString().replaceAll('.', '');
  value = value.toString().replaceAll(',', '');
  return Intl.NumberFormat('vi-VN').format(value);
};
export let testPhone = (phone) => {
  let pattern = '';
  for (let i = 0; i < phone.length; i++) {
    if (isNaN(phone[i]) && [')', '(', '+', '-'].indexOf(phone[i]) < 0) {
      return false;
    }
    pattern += phone[i] >= '0' && phone[i] <= '9' ? 'x' : phone[i];
  }

  return (
    [
      'xxx-xxx-xxxx',
      'xxxxxxxxx',
      'xxxxxxxxxx',
      '(xxx)xxxxxxx',
      '(xxx)xxx-xxxx',
      '(+xx)xxxxxxxxx',
    ].indexOf(pattern) >= 0
  );
};

export var removeAscent = (str: string) => {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
};
export const convertTotalTime = (mins: number) => {
  var hours = Math.trunc(mins / 60);
  var minutes = mins % 60;
  if (hours == 0 && minutes == 0) {
    return `0`;
  } else {
    return `${hours} giờ ${minutes} phút`;
  }
};

export const getUserInfo = () => {
  return localStorage.getItem('userInfo');
};

export const decodeJWT = () => {
  if (localStorage.getItem('userToken')) {
    let decoded = jwtDecode(String(localStorage.getItem('userToken')));
    return decoded;
  } else {
    window.location.href = '/auth/login';
    return null;
  }
};

export const phoneNumberValidator = (
  control: UntypedFormControl
): { [s: string]: boolean } => {
  if (control.value && !testPhone(control.value)) {
    return { validated: true, error: true };
  }
  return null;
};

export const convertTime = (dateString: string): string => {
  if (dateString) {
    let date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  } else {
    return '';
  }
  // format dateString to '25/03/2015'
};

export var emailValidator = (
  control: UntypedFormControl
): { [s: string]: boolean } => {
  if (control.value && !testEmailAddress(control.value)) {
    return { validated: true, error: true };
  }
  return null;
};
export var currencyValidator = (
  control: UntypedFormControl
): { [s: string]: boolean } => {
  if (control.value && !testCurrency(control.value)) {
    return { validated: true, error: true };
  }
  return null;
};

export var disabledDate = (selectValue: Date): boolean => {
  var today = new Date();
  return (
    selectValue.getTime() <
    new Date(today.setDate(today.getDate() - 1)).getTime()
  );
};

export const hasPermission = (permission: PERMISSION): boolean => {
  let hasPermission = null;
  let allRoles = Array.from(permissionRoles);
  let currentRoles =
    localStorage.getItem('roles') != null
      ? localStorage.getItem('roles').split(',') || []
      : [];
  if (currentRoles != null) {
    let rolesHasPermission = allRoles
      .filter((e) => e.permissions.includes(permission))
      .map((p) => p.name.toString());
    hasPermission = currentRoles.some((e) => rolesHasPermission.includes(e));
  }

  return hasPermission;
};
