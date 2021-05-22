const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);

export const emailValidator = (value: string) =>
  !value
    ? "Email field is required."
    : emailRegex.test(value)
    ? ""
    : "Email is not in a valid format.";

export const passwordValidator = (value: string) =>
  !value
    ? "Password field is required."
    : value.length < 6
    ? "Password must be at least 6 character"
    : "";

export const phoneValidator = (value: string) =>
  !value
    ? "Phone number is required."
    : phoneRegex.test(value)
    ? ""
    : "Not a valid phone number.";

export const nameValidator = (value: string) =>
  !value
    ? "Full Name is required"
    : value.length < 3
    ? "Full Name should be at least 3 characters long."
    : "";
