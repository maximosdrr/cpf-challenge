export class CPFValidator {
  static isValid(cpf: string): boolean {
    // Remove non-numeric characters from the input CPF
    cpf = cpf.replace(/\D/g, '');

    // Check if the CPF has 11 digits
    if (cpf.length !== 11) {
      return false;
    }

    // Check if all digits are equal (indicating an invalid CPF)
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    // Convert the string of digits to an array of integers
    const digits = cpf.split('').map((digit) => parseInt(digit));

    // Function to calculate a single check digit based on a slice of digits
    const calculateDigit = (slice: number[]) => {
      let sum = 0;
      for (let i = 0; i < slice.length; i++) {
        // Weight each digit based on its position in the slice
        sum += slice[i] * (slice.length + 1 - i);
      }
      // Calculate the remainder of the sum divided by 11
      const remainder = sum % 11;
      // If the remainder is less than 2, the check digit is 0; otherwise, it's 11 minus the remainder
      return remainder < 2 ? 0 : 11 - remainder;
    };

    // Calculate the first and second check digits
    const firstDigit = calculateDigit(digits.slice(0, 9));
    const secondDigit = calculateDigit(digits.slice(0, 10));

    // Check if the calculated check digits match the provided check digits
    return digits[9] === firstDigit && digits[10] === secondDigit;
  }
}
