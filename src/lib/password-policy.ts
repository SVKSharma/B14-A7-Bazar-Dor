export const PASSWORD_POLICY = {
  minLength: 8,
  minDigits: 1,
  minSymbols: 1,
};

export interface PasswordRequirement {
  id: string;
  label: string;
  isMet: boolean;
}

export function getPasswordRequirements(password: string): PasswordRequirement[] {
  const digitCount = (password.match(/\d/g) ?? []).length;
  const symbolCount = (password.match(/[^\dA-Za-z\s]/g) ?? []).length;

  return [
    {
      id: 'length',
      label: `কমপক্ষে ${PASSWORD_POLICY.minLength} অক্ষর`,
      isMet: password.length >= PASSWORD_POLICY.minLength,
    },
    {
      id: 'digit',
      label: `কমপক্ষে ${PASSWORD_POLICY.minDigits}টি সংখ্যা`,
      isMet: digitCount >= PASSWORD_POLICY.minDigits,
    },
    {
      id: 'symbol',
      label: `কমপক্ষে ${PASSWORD_POLICY.minSymbols}টি বিশেষ চিহ্ন`,
      isMet: symbolCount >= PASSWORD_POLICY.minSymbols,
    },
  ];
}

export function isPasswordStrong(password: string): boolean {
  return getPasswordRequirements(password).every((requirement) => requirement.isMet);
}
