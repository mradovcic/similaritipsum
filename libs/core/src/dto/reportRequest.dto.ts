export class ReportBaseRequest {
  id: string;
}

export class CreateReportRequest extends ReportBaseRequest {
  firstText: string;
  secondText: string;
}
