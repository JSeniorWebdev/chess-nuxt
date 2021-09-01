import { isEmail, isPhoneNumber } from "~/utils/common";

export default {
  data() {
    return {
      password: "",
      repeatPassword: "",
      rules: {
        required: (value) => !!value || "This field is required",
        max_32: (value) => value.length <= 32 || "Max 32 characters",
        max_24: (value) => value.length <= 24 || "Max 24 characters",
        min_2: (value) => value.length >= 2 || "Min 2 characters",
        onlyNumbers: (value) =>
          /^[0-9 ]+$/.test(value) || "Only numbers are allowed",
        passwordMatch: (value) =>
          this.password === value || "Passwords not match",
        email: (value) => isEmail(value) || "Invalid e-mail",
        phone: (value) => isPhoneNumber(value) || "Invalid phone number",
      },
    };
  },
};
