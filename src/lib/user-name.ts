export const MAX_NAME_LENGTH = 40;

export function capitalizeNameWords(value: string): string {
  return value.replace(/(^|\s)(\S)/g, (_, space: string, character: string) =>
    `${space}${character.toLocaleUpperCase()}`,
  );
}

export function getProfileInitials(name?: string | null): string {
  return (
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toLocaleUpperCase())
      .join('') || 'U'
  );
}

export function getProfileDisplayName(name?: string | null): string {
  return capitalizeNameWords(name?.trim().split(/\s+/).slice(0, 2).join(' ') || '');
}
