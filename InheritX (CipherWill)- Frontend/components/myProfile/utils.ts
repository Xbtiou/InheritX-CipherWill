import { userDetailsArgs } from "@/declarations/will/will.did";

export function validateFirstNames(value: string) {
  let error;
  const pattern = /[^a-zA-Z0-9,]/g;

  if (!value) {
    error = "First Name is required";
  } else if (value.toLowerCase().includes(" ")) {
    (error = "Jeez! Spaces Not allowed, use "), " 😱";
  } else if (pattern.test(value)) {
    error =
      "Only Names are separated by comma(,) \n No other characters are allowed";
  }
  return error;
}

export function validateLastName(lastName: string) {
  let error;

  const pattern = /^[A-Za-z]+$/; // Matches one or more letters (uppercase or lowercase)

  if (!pattern.test(lastName)) {
    error = "Last Name should be a single string";
  }
  return error;
}
export function validateBirthDate(date: string) {
  let error;

  const pattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD pattern

  if (!pattern.test(date)) {
    error = "Incorrct Date Format";
  }
  return error;
}

export function validateBirthLocationCode(birthLocationCode: string) {
  let error;

  const pattern = /^\d+$/; // Matches one or more digits

  if (birthLocationCode.length !== 5) {
    error = "Code should be of length 5";
  } else if (!pattern.test(birthLocationCode)) {
    error = "Non-numeric characters are not allowed";
  }
  return error;
}

export function validateSex(sex: string) {
  let error;

  const pattern = /^[MF]$/; // Matches 'M' or 'F'

  if (!pattern.test(sex)) {
    error = "Please enter M or F";
  }
  return error;
}

function transferFormFirstNames(firstNames: string): string[] {
  if (!firstNames.includes(",")) {
    return [firstNames];
  } else {
    return firstNames.split(",");
  }
}
function transformDate(date: string): string {
  return date.replace(/-/g, "");
}

export function transformData(data: any): userDetailsArgs {
  const firstNames: string[] = transferFormFirstNames(data.firstNames);
  const lastName: string = data.lastName;
  const sex: string = data.sex;
  const birthDate = transformDate(data.birthDate);
  const birthLocationCode = data.birthLocationCode;

  return {
    firstNames,
    lastName,
    sex,
    birthDate,
    birthLocationCode,
  };
}
