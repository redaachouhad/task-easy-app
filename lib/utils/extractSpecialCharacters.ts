export function extractSpecialCharacters(input: string): string[] {
  const regex = /[!@#$%^&*(),.?":{}|<>\[\]\\\/]/g;
  // Use regex to find all matches in the input string
  const matches = input.match(regex);
  // Filter out duplicate special characters
  const uniqueMatches = matches ? Array.from(new Set(matches)) : [];
  return uniqueMatches;
}
