import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs — RateLimitr",
  description: "Documentation for RateLimitr API and WebSocket streams.",
};

// --- Reusable UI Components ---

function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  return (
    <div className="relative group my-6">
      <div className="absolute top-3 right-4 text-[11px] text-white/30 uppercase tracking-wider font-medium select-none pointer-events-none">
        {language}
      </div>
      <pre className="bg-[#1A1A2E] text-[#F7F5F0] rounded-lg p-5 pt-10 overflow-x-auto text-[13px] font-mono leading-relaxed border border-[#1A1A2E]/20">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function DocsTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto border border-[#1A1A2E]/10 rounded-lg my-6 bg-[#F7F5F0]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#1A1A2E]/[0.03]">
            {headers.map((h) => (
              <th
                key={h}
                className="text-[12px] font-medium text-[#1A1A2E]/50 uppercase tracking-wider px-4 py-3 border-b border-[#1A1A2E]/10"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#1A1A2E]/5 last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`text-[14px] px-4 py-3 align-top leading-relaxed ${
                    j === 0
                      ? "font-mono text-[13px] text-[#1A1A2E] font-medium"
                      : "text-[#1A1A2E]/70"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function H1({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h1
      id={id}
      className="text-[32px] font-bold text-[#1A1A2E] tracking-[-0.03em] leading-tight mb-4 mt-16 first:mt-0 scroll-mt-8"
    >
      {children}
    </h1>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[20px] font-semibold text-[#1A1A2E] tracking-[-0.02em] leading-tight mb-3 mt-10 scroll-mt-8"
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] text-[#1A1A2E]/60 leading-[1.7] mb-4 tracking-[-0.01em]">
      {children}
    </p>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-[#1A1A2E]/5 text-[#1A1A2E] px-1.5 py-0.5 rounded text-[13px] font-mono border border-[#1A1A2E]/5">
      {children}
    </code>
  );
}

// --- Sidebar ---

const navGroups = [
  {
    title: "Overview",
    links: [{ label: "Getting Started", href: "#getting-started" }],
  },
  {
    title: "API Reference",
    links: [
      { label: "Rate Limit Check", href: "#rate-limit-check" },
      { label: "WebSocket Stream", href: "#websocket-stream" },
      { label: "Strategies", href: "#strategies" },
      { label: "API Keys", href: "#api-keys" },
      { label: "Rate Limit Headers", href: "#headers" },
      { label: "Errors", href: "#errors" },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="w-[280px] shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-[#1A1A2E]/10 bg-[#F7F5F0] hidden md:block">
      <div className="p-6">
        <Link
          href="/"
          className="font-semibold text-[#1A1A2E] tracking-[-0.02em] text-[15px] mb-8 block"
        >
          Ratelimitr Docs
        </Link>

        <nav className="space-y-8">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="text-[11px] text-[#1A1A2E]/30 uppercase tracking-[0.1em] font-medium mb-3">
                {group.title}
              </div>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[#1A1A2E]/50 hover:text-[#1A1A2E] transition-colors tracking-[-0.01em] block py-1.5 px-2 -mx-2 rounded-md hover:bg-[#1A1A2E]/[0.03]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// --- Page Content ---

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex">
      <Sidebar />

      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden border-b border-[#1A1A2E]/10 p-4 sticky top-0 bg-[#F7F5F0]/90 backdrop-blur-md z-40">
          <Link
            href="/"
            className="font-semibold text-[#1A1A2E] tracking-[-0.02em] text-[15px]"
          >
            Ratelimitr Docs
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-12 md:px-12">
          {/* 1. Getting Started */}
          <H1 id="getting-started">Getting Started</H1>
          <P>
            Sign up at{" "}
            <a
              href="https://ratelimitr.com"
              className="text-[#1A1A2E] underline underline-offset-2 decoration-[#1A1A2E]/20 hover:decoration-[#1A1A2E]/50 transition-colors"
            >
              ratelimitr.com
            </a>
            , verify your email, and you'll get a tenant ID and can create your
            first API key from the dashboard.
          </P>
          <P>
            Every request uses your API key in the{" "}
            <InlineCode>x-api-key</InlineCode> header — all rate limits are
            scoped to your account.
          </P>
          {/* 2. Rate Limit Check */}
          <H1 id="rate-limit-check">Rate Limit Check</H1>
          <P>
            <InlineCode>POST https://api.ratelimitr.com/v1/check</InlineCode>
          </P>
          <H2 id="check-headers">Headers</H2>
          <CodeBlock language="http">
            {`x-api-key: rl_key_abc123def456
Content-Type: application/json`}
          </CodeBlock>
          <H2 id="check-body">Request Body</H2>
          <DocsTable
            headers={["Field", "Type", "Required", "Description"]}
            rows={[
              [
                "identifier",
                "string",
                "yes",
                "Unique ID for the entity you're rate-limiting (user ID, IP address, session token, etc.)",
              ],
              [
                "tenantId",
                "string",
                "yes",
                "Your tenant ID from the dashboard",
              ],
              [
                "endpoint",
                "string",
                "no",
                "The endpoint being accessed (e.g., /api/users) — logged for analytics",
              ],
              ["method", "string", "no", "HTTP method — logged for analytics"],
              [
                "strategy",
                "string",
                "no",
                "Override strategy: fixed_window, token_bucket, leaky_bucket, or sliding_window. Defaults to your plan's strategy",
              ],
              [
                "weight",
                "integer",
                "no",
                "Cost of this request (default: 1). Set to 5 for expensive operations",
              ],
            ]}
          />
          <H2 id="check-responses">Responses</H2>
          <P>
            <InlineCode>200 — Allowed</InlineCode>
          </P>
          <CodeBlock language="json">
            {`{
  "allowed": true,
  "remaining": 42,
  "resetAt": 1718000000,
  "limit": 100,
  "strategy": "token_bucket"
}`}
          </CodeBlock>
          <P>
            <InlineCode>429 — Rate Limited</InlineCode>
          </P>
          <CodeBlock language="json">
            {`{
  "allowed": false,
  "remaining": 0,
  "resetAt": 1718000060,
  "limit": 100,
  "strategy": "token_bucket",
  "retryAfter": 45
}`}
          </CodeBlock>
          <H2 id="check-examples">Examples</H2>
          <P>cURL</P>
          <CodeBlock language="bash">
            {`curl -X POST https://api.ratelimitr.com/v1/check \\
  -H "x-api-key: rl_key_abc123def456" \\
  -H "Content-Type: application/json" \\
  -d '{
    "identifier": "user:123",
    "tenantId": "tenant_abc",
    "endpoint": "/api/resource"
  }'`}
          </CodeBlock>
          <P>JavaScript (with retry-with-backoff)</P>
          <CodeBlock language="javascript">
            {`async function checkWithRetry(identifier, tenantId) {
  let attempt = 0;
  const maxRetries = 3;

  while (attempt < maxRetries) {
    const res = await fetch('https://api.ratelimitr.com/v1/check', {
      method: 'POST',
      headers: {
        'x-api-key': 'rl_key_abc123def456',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, tenantId })
    });

    if (res.status === 429) {
      const { retryAfter } = await res.json();
      const delay = (retryAfter || Math.pow(2, attempt)) * 1000;
      console.log(\`Rate limited. Retrying in \${delay}ms...\`);
      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
    } else {
      return await res.json();
    }
  }
  throw new Error('Max retries exceeded');
}`}
          </CodeBlock>
          <P>Python</P>
          <CodeBlock language="python">
            {`import requests

response = requests.post(
    'https://api.ratelimitr.com/v1/check',
    headers={
        'x-api-key': 'rl_key_abc123def456',
        'Content-Type': 'application/json'
    },
    json={
        'identifier': 'user:123',
        'tenantId': 'tenant_abc',
        'endpoint': '/api/resource'
    }
)

print(response.json())`}
          </CodeBlock>
          {/* 3. WebSocket Live Stream */}
          <H1 id="websocket-stream">WebSocket Live Stream</H1>
          <P>
            <InlineCode>wss://api.ratelimitr.com/ws</InlineCode>
          </P>
          <P>
            Connect, authenticate with your API key, then subscribe to real-time
            channels.
          </P>
          <H2 id="ws-flow">Connection Flow</H2>
          <P>On connect, server responds:</P>
          <CodeBlock language="json">
            {`{ "type": "connected", "availableChannels": ["events", "metrics", "alerts", "blocks"] }`}
          </CodeBlock>
          <P>Authenticate:</P>
          <CodeBlock language="json">
            {`{ "type": "authenticate", "apiKey": "rl_key_abc123def456" }`}
          </CodeBlock>
          <P>Response:</P>
          <CodeBlock language="json">
            {`{ "type": "authenticated", "timestamp": 1718000000 }`}
          </CodeBlock>
          <P>Subscribe to channels:</P>
          <CodeBlock language="json">
            {`{ "type": "subscribe", "channels": ["events", "metrics"] }`}
          </CodeBlock>
          <P>Response:</P>
          <CodeBlock language="json">
            {`{ "type": "subscribed", "channels": ["events", "metrics"], "timestamp": 1718000000 }`}
          </CodeBlock>
          <P>Unsubscribe:</P>
          <CodeBlock language="json">
            {`{ "type": "unsubscribe", "channels": ["events"] }`}
          </CodeBlock>
          <P>Ping / Pong (keepalive):</P>
          <CodeBlock language="json">
            {`{ "type": "ping" }  →  { "type": "pong", "timestamp": 1718000000 }`}
          </CodeBlock>
          <H2 id="ws-channels">Channels</H2>
          <P>Real-time events come through on subscribed channels:</P>
          <P>
            <InlineCode>events</InlineCode> channel — every rate limit decision:
          </P>
          <CodeBlock language="json">
            {`{
  "type": "block",
  "data": {
    "identifier": "user:123",
    "endpoint": "/api/resource",
    "strategy": "token_bucket",
    "remaining": 0
  },
  "timestamp": 1718000000
}`}
          </CodeBlock>
          <P>
            <InlineCode>metrics</InlineCode> channel — every 5 seconds:
          </P>
          <CodeBlock language="json">
            {`{
  "type": "metrics",
  "data": {
    "connectedClients": 12,
    "usedMemory": "2.5M",
    "totalCommandsProcessed": 104200,
    "instantaneousOpsPerSec": 340,
    "uptime": 7
  },
  "timestamp": 1718000000
}`}
          </CodeBlock>
          <H2 id="ws-example">JavaScript Example</H2>
          <CodeBlock language="javascript">
            {`const ws = new WebSocket('wss://api.ratelimitr.com/ws');

ws.onopen = () => {
  console.log('Connected to RateLimitr');
};

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  
  if (msg.type === 'connected') {
    ws.send(JSON.stringify({ 
      type: 'authenticate', 
      apiKey: 'rl_key_abc123def456' 
    }));
  } 
  else if (msg.type === 'authenticated') {
    ws.send(JSON.stringify({ 
      type: 'subscribe', 
      channels: ['events', 'metrics'] 
    }));
  } 
  else if (msg.type === 'subscribed') {
    console.log('Subscribed to:', msg.channels);
  } 
  else {
    console.log('Incoming event:', msg);
  }
};`}
          </CodeBlock>
          {/* 4. Rate Limiting Strategies */}
          <H1 id="strategies">Rate Limiting Strategies</H1>
          <DocsTable
            headers={["Strategy", "Plans", "Behavior"]}
            rows={[
              [
                "fixed_window",
                "Free, Pro, Enterprise",
                "Counts requests in a fixed time window (e.g., 1000 per minute). Resets at the boundary. Simple and predictable.",
              ],
              [
                "token_bucket",
                "Pro, Enterprise",
                "Tokens refill at a steady rate. Allows bursts up to bucket capacity. Smooths traffic over time.",
              ],
              [
                "leaky_bucket",
                "Pro, Enterprise",
                "Processes requests at a constant rate. Excess is queued and processed as capacity frees up.",
              ],
              [
                "sliding_window",
                "Enterprise",
                "Evaluates request count over a rolling time window using data from the previous window. No traffic spikes at boundaries.",
              ],
            ]}
          />
          <P>
            <strong className="text-[#1A1A2E] font-medium">
              Strategy resolution order:
            </strong>{" "}
            ① request body's <InlineCode>strategy</InlineCode> field, ② per-key
            override (set in dashboard), ③ your plan's default strategy.
          </P>
          {/* 5. API Keys */}
          <H1 id="api-keys">API Keys</H1>
          <P>
            Create and manage keys from the dashboard at{" "}
            <InlineCode>/dashboard/api-keys</InlineCode>. Each key can have:
          </P>
          <ul className="list-disc list-inside text-[15px] text-[#1A1A2E]/60 leading-[1.7] mb-4 tracking-[-0.01em] space-y-1 ml-2">
            <li>
              <strong className="text-[#1A1A2E] font-medium">Scopes:</strong>{" "}
              read, write, admin
            </li>
            <li>
              <strong className="text-[#1A1A2E] font-medium">
                Rate limit override:
              </strong>{" "}
              Custom limits per key (requests/second, burst, window, strategy)
            </li>
            <li>
              <strong className="text-[#1A1A2E] font-medium">
                Per-endpoint limits:
              </strong>{" "}
              Different limits for different routes
            </li>
            <li>
              <strong className="text-[#1A1A2E] font-medium">
                Expiration:
              </strong>{" "}
              Auto-revoke after a set date
            </li>
          </ul>
          <P>Keys can also be managed programmatically:</P>
          <DocsTable
            headers={["Method", "Path", "Description"]}
            rows={[
              [
                "POST",
                "/api-keys/keys",
                "Create key: { name, scopes?, rateLimitOverride?, expiresAt? }",
              ],
              [
                "GET",
                "/api-keys/keys",
                "List keys: ?limit&offset&status&search",
              ],
              ["PATCH", "/api-keys/keys/:keyId", "Update key"],
              ["DELETE", "/api-keys/keys/:keyId", "Revoke key"],
            ]}
          />
          {/* 6. Rate Limit Headers */}
          <H1 id="headers">Rate Limit Headers</H1>
          <P>Every response from the check endpoint includes:</P>
          <DocsTable
            headers={["Header", "Description"]}
            rows={[
              ["X-RateLimit-Limit", "Max requests in the current window"],
              ["X-RateLimit-Remaining", "Requests remaining in this window"],
              ["X-RateLimit-Reset", "Unix timestamp when the window resets"],
              ["Retry-After", "Seconds to wait (only on 429 responses)"],
            ]}
          />
          {/* 7. Error Codes */}
          <H1 id="errors">Error Codes</H1>
          <DocsTable
            headers={["Code", "Meaning"]}
            rows={[
              ["400", "Invalid request — check your body fields"],
              ["401", "Bad or missing API key — check your x-api-key header"],
              ["429", "Rate limit exceeded — use Retry-After to back off"],
            ]}
          />
          <div className="h-24" /> {/* Bottom spacing */}
        </div>
      </main>
    </div>
  );
}
