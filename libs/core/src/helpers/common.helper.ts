export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export class RabbitConstants {
  static reportQueueName = 'Similaritypsum.Report';
  static reportExchange = 'Similaritypsum.Exchange';
  static reportRequestRouting = 'Similaritypsum.Report.Request';
  static connectionName = 'connection';
}
