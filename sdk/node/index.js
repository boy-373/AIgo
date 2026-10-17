const fetch = require("node-fetch");

class AigoClient {
  constructor(apiKey, baseUrl = "https://trade.pianam.cn") {
    if (!apiKey) throw new Error("apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  _headers() {
    return {
      "X-API-Key": this.apiKey,
      "Authorization": "Bearer " + this.apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json",
      "User-Agent": "aigo-node-sdk/1.0",
    };
  }

  async _request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      ...options,
      headers: { ...this._headers(), ...options.headers },
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) throw new Error(JSON.stringify({ status: res.status, body }));
    return body;
  }

  async balance() {
    return this._request("/api/v1/open/quota");
  }

  async consume(amount = 1, idempotencyKey) {
    const payload = { amount };
    if (idempotencyKey) payload.idempotency_key = idempotencyKey;
    return this._request("/api/v1/open/quota/consume", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  /**
   * POST /api/v1/open/chat/completions (OpenAI compatible).
   * Models (credits/call): qwen-flash=1, qwen-plus=5, qwq-plus=8,
   * qwen-vl-plus=5, qwen-vl-max=8.
   */
  async chat(messages, {
    model = "qwen-flash",
    maxTokens = 512,
    temperature,
    topP,
    stop,
    requestId,
  } = {}) {
    const payload = { model, messages, max_tokens: maxTokens };
    if (temperature !== undefined) payload.temperature = temperature;
    if (topP !== undefined) payload.top_p = topP;
    if (stop !== undefined) payload.stop = stop;
    if (requestId !== undefined) payload.request_id = requestId;
    return this._request("/api/v1/open/chat/completions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  /**
   * Streaming chat (SSE). Yields OpenAI chunk objects, ends on data: [DONE].
   */
  async *stream(messages, {
    model = "qwen-flash",
    maxTokens = 512,
  } = {}) {
    const payload = {
      model,
      messages,
      max_tokens: maxTokens,
      stream: true,
    };
    const res = await fetch(`${this.baseUrl}/api/v1/open/chat/completions`, {
      method: "POST",
      headers: this._headers(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(JSON.stringify({ status: res.status, body }));
    }
    let buffer = "";
    for await (const piece of res.body) {
      buffer += piece.toString("utf-8");
      let idx;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, idx).trim();
        buffer = buffer.slice(idx + 1);
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (data === "[DONE]") return;
        try {
          yield JSON.parse(data);
        } catch (e) {
          /* skip malformed chunk */
        }
      }
    }
  }

  /**
   * POST /api/v1/open/extract - scraper AI extraction.
   * Provide one of { html, text, url } and one of { fields, question }.
   */
  async extract({
    html, text, url, fields, question,
    model = "qwen-flash",
    maxTokens = 1024,
    requestId,
  } = {}) {
    const payload = { model, max_tokens: maxTokens };
    if (html !== undefined) payload.html = html;
    if (text !== undefined) payload.text = text;
    if (url !== undefined) payload.url = url;
    if (fields !== undefined) payload.fields = fields;
    if (question !== undefined) payload.question = question;
    if (requestId !== undefined) payload.request_id = requestId;
    return this._request("/api/v1/open/extract", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async openapiSchema() {
    return this._request("/openapi.json");
  }
}

// 向后兼容别名（原 quantoken 用户无痛迁移）
const QuantumTokenClient = AigoClient;

module.exports = { AigoClient, QuantumTokenClient };
