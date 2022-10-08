export function getErrorMessage(err: unknown) {
  // https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
  let message;
  if (err instanceof Error) message = err.message;
  else message = String(err);

  return message;
}
