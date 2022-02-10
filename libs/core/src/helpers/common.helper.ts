// Regular expression to check if string is a valid UUID
const uuidRegexExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const isValidUuid = (s: string) => uuidRegexExp.test(s);

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export class RabbitConstants {
  static reportQueueName = 'Similaritypsum.Report';
  static reportExchange = 'Similaritypsum.Exchange';
  static reportRequestRouting = 'Similaritypsum.Report.Request';
  static connectionName = 'connection';
}
