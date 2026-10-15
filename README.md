<div align="center">

# AIgo 🤖

**AI 平台 · 对话 / 视觉 / 出图 / 联网搜索 / 技能市场 / AI 管家**

[![Website](https://img.shields.io/badge/🌐_在线体验-site.pianam.cn-blue)](https://site.pianam.cn)
[![Free](https://img.shields.io/badge/🎁_注册-免费送体验积分-success)](https://site.pianam.cn)
[![API](https://img.shields.io/badge/⚡_OpenAI-兼容接口-orange)](#-开发者-api)

</div>

---

## ✨ 功能特性

| | |
|---|---|
| 💬 **AI 对话** | 5 档模型矩阵（Qwen Flash / Plus / QwQ 深度推理），按量计费，1 积分起 |
| 👁 **视觉理解** | 图片 + 视频问答，看图说话 |
| 🎨 **AI 出图** | 通义万相文生图，生成结果永久可访问 |
| 🔍 **真联网搜索** | 实时搜索增强，答案带来源 |
| 🛒 **技能市场** | 社区技能一键调用；开发者可上架技能，30/70 分成 |
| 🏠 **AI 管家** | 多专家智能体（写作 / 编程 / 调研 / 办事 / 画画…），工具调用 + 跨会话记忆 |
| 🔑 **BYOK** | 自带 API Key 模式，0.5 积分/次服务费 |
| 📱 **全端覆盖** | Web / PWA / Android APP |

## 🛠 开发者 API

OpenAI 兼容接口，把 base_url 换成 AIgo 即可：

```bash
curl https://site.pianam.cn/api/v1/open/chat/completions \
  -H "Authorization: Bearer qk_你的开发者Key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-flash",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

**模型档位**（1 元 = 100 积分）：

| 模型 | 积分/次 | 适用 |
|---|---|---|
| `qwen-flash` | 1 | 极速问答 |
| `qwen-plus` | 5 | 写作 / 代码主力 |
| `qwq-plus` | 8 | 深度推理 |
| `qwen-vl-plus` | 5 | 图片理解 |
| `qwen-vl-max` | 8 | 图片+视频理解 |

> 🛡 上游故障自动换档：单档故障时自动切换备胎模型，多退少补，用户无感。

## 🇬🇧 English

**AIgo** is an AI platform with chat (5-tier Qwen models), vision understanding, image generation, real-time web search, a skills marketplace (30/70 revenue share for developers) and a butler agent. OpenAI-compatible developer API. **Free credits on sign-up** at [site.pianam.cn](https://site.pianam.cn).

---

<div align="center">

**🎁 [现在注册，免费领体验积分 →](https://site.pianam.cn)**

</div>
