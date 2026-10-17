# AIgo SDK

**AIgo** 平台官方 SDK（Python / Node.js）—— 一套 API Key，接入 OpenAI 兼容对话、AI 网页解析与积分计费。

## 特性

- ✅ **OpenAI 兼容**：`chat/completions` 端点，支持流式（SSE）
- ✅ **双语言 SDK**：Python + Node.js，Python 仅依赖 requests
- ✅ **AI 网页解析**：给 URL / HTML / 文本，抽取结构化信息
- ✅ **积分计费**：余额查询、幂等扣减
- ✅ **多模型**：Qwen Flash / Plus / QwQ 深度推理 / VL 视觉

## 安装

Python：

```bash
pip install git+https://github.com/boy-373/quantoken-sdk.git#subdirectory=python
```

Node.js：

```bash
git clone https://github.com/boy-373/quantoken-sdk.git
cd quantoken-sdk/node && npm install
```

## 快速开始（Python）

```python
from aigo import AigoClient

client = AigoClient(api_key="qk_xxx")   # Key 在 https://trade.pianam.cn 控制台获取

# 对话
resp = client.chat([{"role": "user", "content": "你好"}])
print(resp["choices"][0]["message"]["content"])

# 流式
for chunk in client.stream([{"role": "user", "content": "讲个笑话"}]):
    delta = chunk.get("choices", [{}])[0].get("delta", {}).get("content", "")
    print(delta, end="", flush=True)

# 余额
print(client.balance())

# 网页解析
print(client.extract(url="https://example.com", question="页面主要内容？"))
```

### 直接用 OpenAI SDK 也可以

服务端完全兼容 OpenAI 协议，`X-API-Key` 与 `Bearer` 双鉴权：

```python
from openai import OpenAI

client = OpenAI(
    api_key="qk_xxx",
    base_url="https://trade.pianam.cn/api/v1/open",
)
resp = client.chat.completions.create(
    model="qwen-flash",
    messages=[{"role": "user", "content": "你好"}],
)
```

> 旧版 `quantoken` 包用户：升级后 `from aigo import AigoClient`，`QuantumTokenClient` 别名保留兼容。

## 快速开始（Node.js）

```javascript
const { AigoClient } = require("./index");

const client = new AigoClient("qk_xxx");
const resp = await client.chat([{ role: "user", content: "你好" }]);
console.log(resp.choices[0].message.content);
```

## 模型与价格（1 元 = 100 积分）

| 模型 | 积分/次 | 说明 |
|------|---------|------|
| qwen-flash | 1 | 轻量快速 |
| qwen-plus | 5 | 高性能 |
| qwq-plus | 8 | 深度推理 |
| qwen-vl-plus | 5 | 视觉理解 |
| qwen-vl-max | 8 | 视觉（旗舰） |
| AI 生图 | 40 起/张 | 1440×1440 |
| 网页解析 | 1 / 2 / 5 | 按复杂度 |

调用失败自动退积分。

## AIgo CLI 广场

不想写代码？用命令行：[aigo-cli](https://github.com/boy-373/quantoken-cli)

```bash
pip install git+https://github.com/boy-373/quantoken-cli.git
aigo chat "你好"
```

也可以直接打开 **AIgo 工作台**使用：https://site.pianam.cn

## 溯源说明

AIgo 平台对 AI 生成内容嵌入零宽字符水印，可用于内容溯源验证。

## 定位声明

AIgo 为自研 AI 聚合服务平台，上游模型服务来自阿里云百炼等持牌服务商。

## 相关链接

- 平台控制台：https://trade.pianam.cn
- API 文档：https://trade.pianam.cn/docs
- OpenAPI Schema：https://trade.pianam.cn/openapi.json
- CLI：https://github.com/boy-373/quantoken-cli

## License

MIT — 商务合作：biz@pianam.cn
