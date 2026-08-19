export interface OverviewData {
  totalRequests: number;
  blockedRequests: number;
  blockRate: number;
  avgResponseTimeMs: number;
}

export interface AnalyticsEvent {
  time: string;
  tenantId: string;
  apiKeyId: number;
  ipAddress: string;
  endpoint: string;
  method: string;
  userAgent: string;
  statusCode: number;
  requestDurationMs: number;
  responseSize: number;
  isBlocked: boolean;
  remainingQuota: number;
}

export interface GetEventsResponse {
  events: AnalyticsEvent[];
  total: number;
  limit: number;
  offset: number;
}

export interface TimeseriesData {
  time: string;
  totalRequests: string;
  blockedRequests: string;
  avgDuration: string;
}

export interface TimeseriesResponse {
  interval: string;
  buckets: number;
  timeseries: TimeseriesData[];
}

export interface TopBlockedItem {
  ipAddress: string;
  endpoint: string;
  blockCount: string;
  firstBlock: string;
  lastBlock: string;
}

export interface GetTopBlockedResponse {
  topBlocked: TopBlockedItem[];
}

export interface PatternsData {
  totalUniqueIps: number;
  suspiciousPatterns: Array<{
    ipAddress: string;
    blockRate: number;
    totalRequests: number;
    reason: string;
  }>;
  burstPatterns: Array<{
    ipAddress: string;
    endpointsHit: number;
    blockRate: number;
    timeWindow: string;
  }>;
  topTalkers: Array<{
    ipAddress: string;
    totalRequests: number;
    blockedRequests: number;
    blockRate: number;
    avgDuration: number;
  }>;
}

export interface StatusCodeData {
  statusCode: number;
  count: number;
  blocked: number;
}

export interface GetStatusCodesResponse {
  statusCodes: StatusCodeData[];
}

export interface EndpointData {
  endpoint: string;
  method: string;
  totalRequests: number;
  blockedRequests: number;
  blockRate: number;
  avgDuration: number;
}

export interface GetEndpointsResponse {
  endpoints: EndpointData[];
}

export interface DateRange {
  startDate: string;
  endDate: string;
  interval?: string;
}
