export const InitialExtractor = input => {
  let parts = (input || "")
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split("@")[0]
    .split(" ");
  if (parts.length === 1) parts = parts[0].split(".");
  if (parts.length === 1) parts = parts[0].split("_");
  if (parts.length > 1) {
    return parts[0][0] + parts[1][0];
  }
  if (parts[0].length > 1) return parts[0].substring(0, 2);
  return parts[0];
};
