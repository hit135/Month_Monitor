export const API_ROOT = 'http://localhost:8081/api';    // 로컬
// export const API_ROOT = 'http://1.223.40.19:30081/api/';

// export const filePathName = "http://localhost:8081/localImgstore/";
export const filePathName = "http://1.223.40.19:30081/imgstore/";

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
}

export const numCommaFormat = value => (Math.abs(parseInt(value)) >= 1000) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : value;
