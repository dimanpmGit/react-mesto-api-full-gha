/* eslint-disable eol-last */
class NotCardOwnerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = NotCardOwnerError;
