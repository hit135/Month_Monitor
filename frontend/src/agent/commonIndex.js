// export const API_ROOT = 'http://localhost:8081/api';    // 로컬
export const API_ROOT = 'http://1.223.40.19:30081/api/';

// export const filePathName = "http://localhost:8081/localImgstore/";
export const filePathName = "http://1.223.40.19:30081/imgstore/";

export const numCommaFormat = value =>
  (Math.abs(parseInt(value)) >= 1000) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : value;

export const convertPhoneNumber = str => {
  str = str.replace(/[^0-9]/g, '');

  if (str.length < 4)
    return str;
  else if (str.length < 7)
    return `${str.substr(0, 3)}-${str.substr(3)}`;
  else if (str.length < 11)
    return `${str.substr(0, 3)}-${str.substr(3, 3)}-${str.substr(6)}`;
  else
    return `${str.substr(0, 3)}-${str.substr(3, 4)}-${str.substr(7)}`;

  return str;
};

export const handleChangePhoneNumber = e => {
  e = e || window.e;
  e.target.value = convertPhoneNumber(e.target.value.trim());
};

export const getInputValue = e => (e.target.type === 'checkbox') ? (e.target.checked ? 'Y' : 'N') : e.target.value;

export let getValidInput = (errKey, keyVal, check) =>
  errKey && "is-invalid form-control" || (!errKey && keyVal !== check) && "form-control is-valid" || (!errKey && keyVal === check) && "form-control";

export const formatDate = (date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}
