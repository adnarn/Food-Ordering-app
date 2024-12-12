let orderIndex = 1;

const generateCustomRefId = () => {
  const currentYear = new Date().getFullYear(); // Get the current year
  const timestamp = Math.floor(Date.now() / 1000); // Get the current time in seconds
  const paddedIndex = String(orderIndex).padStart(3, '0'); // Ensure index is 3 digits, e.g., 001, 002, etc.

  // Create the reference ID in the desired format
  const referenceId = `${currentYear}-${timestamp}-${paddedIndex}`;

  // Increment the index for the next order (reset or modify as needed)
  orderIndex += 1;

  return referenceId;
};

// Example usage
const referenceId = generateCustomRefId();
console.log(referenceId);  // Output: 2024-1635781320-001
