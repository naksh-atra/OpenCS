export interface ConversionStep {
  description: string;
  intermediate: string;
  highlight: string;
}

export interface ConversionState {
  inputValue: string;
  inputBase: number;
  outputBase: number;
  outputValue: string;
  steps: ConversionStep[];
  currentStep: number;
  message: string;
}

export interface IEEE754State {
  value: number;
  sign: number;
  exponent: number;
  fraction: number;
  binary32: string;
  hex: string;
  steps: string[];
}

export type NumberBase = 2 | 8 | 10 | 16;

export const BASE_LABELS: Record<NumberBase, string> = {
  2: 'Binary',
  8: 'Octal',
  10: 'Decimal',
  16: 'Hexadecimal',
};

export const BASE_PREFIXES: Record<NumberBase, string> = {
  2: '0b',
  8: '0o',
  10: '',
  16: '0x',
};

// --- Conversion Operations ---

export function createConversionState(
  inputValue: string = '',
  inputBase: number = 10,
  outputBase: number = 2
): ConversionState {
  return {
    inputValue,
    inputBase,
    outputBase,
    outputValue: '',
    steps: [],
    currentStep: -1,
    message: 'Enter a value and select bases to convert',
  };
}

export function convertNumber(
  value: string,
  fromBase: number,
  toBase: number
): { result: string; steps: ConversionStep[] } {
  if (!value.trim()) return { result: '', steps: [] };

  const steps: ConversionStep[] = [];

  // Step 1: Convert from source base to decimal
  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) {
    return { result: 'Invalid input', steps: [{ description: 'Error', intermediate: '', highlight: 'Invalid input for selected base' }] };
  }

  if (fromBase === 10) {
    steps.push({
      description: `Input in decimal`,
      intermediate: `${decimal}`,
      highlight: `${decimal} in base 10`,
    });
  } else {
    // Show expansion for non-decimal to decimal
    const digits = value.split('');
    const expansions: string[] = [];
    const reversedDigits = [...digits].reverse();
    reversedDigits.forEach((digit, i) => {
      const digitVal = parseInt(digit, fromBase);
      expansions.unshift(`${digitVal} × ${fromBase}^${i}`);
    });
    steps.push({
      description: `Convert from base ${fromBase} to decimal`,
      intermediate: expansions.join(' + '),
      highlight: `= ${decimal} in base 10`,
    });
  }

  // Step 2: Convert from decimal to target base
  if (toBase === 10) {
    steps.push({
      description: `Already in decimal`,
      intermediate: `${decimal}`,
      highlight: `${decimal} in base 10`,
    });
  } else {
    // Show division steps
    let n = decimal;
    const remainders: string[] = [];
    const divisions: string[] = [];
    while (n > 0) {
      const remainder = n % toBase;
      const remainderStr = remainder >= 10 ? String.fromCharCode(65 + remainder - 10) : String(remainder);
      divisions.push(`${n} ÷ ${toBase} = ${Math.floor(n / toBase)} remainder ${remainderStr}`);
      remainders.unshift(remainderStr);
      n = Math.floor(n / toBase);
    }
    steps.push({
      description: `Convert from decimal to base ${toBase}`,
      intermediate: divisions.join('\n'),
      highlight: `Read remainders bottom-up: ${remainders.join('')}`,
    });
  }

  const result = decimal.toString(toBase).toUpperCase();
  steps.push({
    description: `Result`,
    intermediate: `${result} in base ${toBase}`,
    highlight: `${value} (base ${fromBase}) = ${result} (base ${toBase})`,
  });

  return { result, steps };
}

export function decimalToBinary(decimal: number): { result: string; steps: ConversionStep[] } {
  return convertNumber(String(decimal), 10, 2);
}

export function binaryToDecimal(binary: string): { result: string; steps: ConversionStep[] } {
  return convertNumber(binary, 2, 10);
}

export function decimalToHex(decimal: number): { result: string; steps: ConversionStep[] } {
  return convertNumber(String(decimal), 10, 16);
}

// --- IEEE 754 Operations ---

export function ieee754Encode(value: number): IEEE754State {
  const buffer = new ArrayBuffer(4);
  const floatView = new Float32Array(buffer);
  const intView = new Uint32Array(buffer);
  floatView[0] = value;
  const bits = intView[0];

  const sign = (bits >>> 31) & 0x1;
  const exponent = (bits >>> 23) & 0xff;
  const fraction = bits & 0x7fffff;

  const binary32 = bits.toString(2).padStart(32, '0');
  const hex = '0x' + bits.toString(16).toUpperCase().padStart(8, '0');

  const actualExponent = exponent - 127;
  const actualValue = value === 0 ? 0 : (1 + fraction / Math.pow(2, 23)) * Math.pow(2, actualExponent) * (sign ? -1 : 1);

  const steps = [
    `Input: ${value}`,
    `Sign: ${sign} (${sign ? 'negative' : 'positive'})`,
    `Exponent bits: ${exponent.toString(2).padStart(8, '0')} = ${exponent} (biased)`,
    `Actual exponent: ${exponent} - 127 = ${actualExponent}`,
    `Fraction bits: ${fraction.toString(2).padStart(23, '0')}`,
    `Binary32: ${binary32.slice(0, 1)} ${binary32.slice(1, 9)} ${binary32.slice(9)}`,
    `Hex: ${hex}`,
  ];

  return { value, sign, exponent, fraction, binary32, hex, steps };
}

export function ieee754Decode(binary32: string): number {
  const bits = parseInt(binary32, 2);
  const buffer = new ArrayBuffer(4);
  const intView = new Uint32Array(buffer);
  const floatView = new Float32Array(buffer);
  intView[0] = bits;
  return floatView[0];
}

export function isValidForBase(value: string, base: number): boolean {
  if (!value.trim()) return false;
  const validChars: Record<number, string> = {
    2: '01',
    8: '01234567',
    10: '0123456789',
    16: '0123456789ABCDEFabcdef',
  };
  const valid = validChars[base] || '';
  return value.split('').every(c => valid.includes(c));
}
