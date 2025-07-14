const baseOfEight = 100000000;

const baseOfTwelve = 1000000000000;

// Convert to BigInt e8s format to human readable
export const e8sToHuman = (bigIntValue: any) => {
  try {
    const value = Number(bigIntValue) / baseOfEight;
    return value;
  } catch (error) {
    console.log(error);
  }
};

// Convert to BigInt e12s format to human readable
export const e12sToHuman = (bigIntValue: any) => {
  try {
    const value = Number(bigIntValue) / baseOfTwelve;
    return value;
  } catch (error) {
    console.log(error);
  }
};

// Convert human readable number to e8s format in BigInt
export const humanToE8s = (numberValue: number) => {
  try {
    const value = BigInt(numberValue * baseOfEight);
    return value;
  } catch (error) {
    console.log(error);
  }
};

// Convert human readable number to e12s format in BigInt
export const humanToE12s = (numberValue: number) => {
  try {
    const value = BigInt(numberValue * baseOfTwelve);
    return value;
  } catch (error) {
    console.log(error);
  }
};
