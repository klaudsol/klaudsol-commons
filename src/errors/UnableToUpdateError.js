export default class UnableToUpdate extends Error {
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnableToUpdate);
    }

    const { message } = params[0];

    this.name = 'UnableToUpdate';
    this.message = message;
  }
}

