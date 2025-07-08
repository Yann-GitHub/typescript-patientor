/**
 * Helper function for exhaustive type checking
 * Informe if we had already implemented handling that type in our code because existing type is not assignable to 'never'
 * or if we forgot to handle it and it should throw an error.
 *
 * @param value - The value to check
 *
 * @returns - Throws an error if the value is not of type 'never'
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
