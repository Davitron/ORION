class ApplicationError extends Error {
  code: string;
  status: number;
  field: string;
  constructor(message: string, code: string, status: number, field: string) {
    super();
    this.name = 'Application Error';
    this.message = message;
    this.code = code;
  }
}

export default ApplicationError;
