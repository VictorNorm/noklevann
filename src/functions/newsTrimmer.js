export function newsTrimmer(str, maxLength = 130) {
  if (str.length <= maxLength) return str;

  let trimmedString = str.substr(0, maxLength + 1);

  let lastSpace = trimmedString.lastIndexOf(" ");

  if (lastSpace === -1 || str.charAt(maxLength + 1).match(/\s/)) {
    trimmedString = str.substr(0, maxLength);
  } else {
    trimmedString = str.substr(0, lastSpace);
  }

  return trimmedString + "...";
}
