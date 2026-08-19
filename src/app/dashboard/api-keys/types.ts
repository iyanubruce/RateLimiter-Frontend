export interface RateLimitOverride {
  requestsPerSecond?: number;
  burstSize?: number;
  windowMs?: number;
  strategy?: "token-bucket" | "sliding-window" | "fixed-window";
  endpoints?: Record<string, { requestsPerSecond: number; burstSize?: number }>;
  priority?: number;
  expiresAt?: string;
  meta?: Record<string, any>;
}

// Full DB model
export interface ApiKey {
  id: number;
  keyHash: string;
  keyPrefix: string;
  userId: number;
  tenantId: string;
  name: string;
  description: string | null;
  scopes: string[] | null;
  rateLimitOverride: RateLimitOverride | null;
  expiresAt: string | null;
  lastUsedAt: string | null;
  revokedAt: string | null;
  ipAllowlist: string[] | null;
  metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface ListApiKeysResponse {
  keys: ApiKey[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    hasMore: boolean;
    nextPage: number | null;
    totalPages: number;
  };
}

export interface CreateKeyInput {
  tenantId?: number | null;
  keyPrefix: string;
  name: string;
  description?: string;
  scopes?: string[];
  rateLimitOverride?: RateLimitOverride;
  ipAllowlist?: string[];
  expiresAt?: string;
  metadata?: any;
}
