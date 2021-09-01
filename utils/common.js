// String Date Convert
import { convertCamelToSnake } from "~/utils/convertCamelToSnake";
import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const fromStringToDate = (date) => {
  const explodeDate = date.split(" ");
  if (explodeDate.length) {
    return {
      day: explodeDate[0],
      month: explodeDate[1],
      year: explodeDate[2],
    };
  }
};

// Email Validation as per RFC2822 standards
export const isEmail = (str) =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    str
  );

export const isPhoneNumber = (str) =>
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/.test(
    str
  );

export const apiFunctions = {
  formData(data, files) {
    const apiData = convertSnakeToCamel(data);
    const formData = new FormData();
    if (apiData) {
      Object.keys(apiData).forEach((key) => {
        formData.append(key, apiData[key]);
      });
    }
    if (files) {
      Object.keys(files).forEach((item) =>
        formData.append(convertCamelToSnake(item), files[item])
      );
    }

    return formData;
  },
  filesHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
  },
};
