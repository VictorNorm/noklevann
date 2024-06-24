export function divideTextIntoSections(text, targetSectionLength = 100) {
  const sections = [];
  let currentSection = "";

  // Split the text by spaces to get words.
  const words = text.split(" ");

  words.forEach((word) => {
    // Check if adding the next word would make the length exceed the target length.
    if ((currentSection + word).length > targetSectionLength) {
      // Look for a period in the last part of the current section to ensure we don't split mid-sentence.
      const lastPeriodIndex = currentSection.lastIndexOf(".");

      if (
        lastPeriodIndex !== -1 &&
        currentSection.length - lastPeriodIndex < targetSectionLength / 2
      ) {
        // If there's a period close to the end of the section, split at the period.
        const sectionUpToLastPeriod = currentSection.substring(
          0,
          lastPeriodIndex + 1
        );
        const remainderAfterLastPeriod = currentSection.substring(
          lastPeriodIndex + 1
        );

        // Add the section up to the last period to the sections array.
        sections.push(sectionUpToLastPeriod.trim());

        // Start a new section with the remainder, plus the current word.
        currentSection = remainderAfterLastPeriod + " " + word;
      } else {
        // If the current section is too long and no suitable period is found,
        // just push the current section and start a new one.
        sections.push(currentSection.trim());
        currentSection = word;
      }
    } else {
      // If the current section plus the next word is under the limit, just add the word.
      currentSection += (currentSection.length > 0 ? " " : "") + word;
    }
  });

  // Add any remaining text as the last section.
  if (currentSection.trim().length > 0) {
    sections.push(currentSection.trim());
  }

  return sections;
}

// Example usage:
const longText =
  "Your very long text here. It should be split appropriately into sections. Make sure it is readable and nicely formatted.";
const sections = divideTextIntoSections(longText, 100); // Adjust the second parameter to change the target length of sections.

console.log(sections);
