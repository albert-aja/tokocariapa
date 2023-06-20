class ErrorHandler extends Error {
  constructor(pesan, kodeStatus) {
    super(pesan);
    this.kodeStatus = kodeStatus;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
