export const generateRandomString = (length: number): string =>
  Math.random().toString(36).substring(2, length);

// export const generateRandomNumber = (length: number = 100): string =>
//   (Math.random() * length).toString();

export function generateRandomNumber(
  min: number = 1,
  max: number = 1000
): string {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

export const generateRandomPhoneNumber = (): string =>
  Math.random().toString().slice(2, 11);
