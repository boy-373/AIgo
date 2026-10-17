# AIgo CLI（aigo 命令）

**AIgo CLI 广场**官方命令行工具：**AI 对话 / 联网问答 / AI 出图 / 网页解析 / 余额查询**，一行命令搞定。零依赖，Windows / macOS / Linux 通吃。

## 安装

```bash
pip install git+https://github.com/boy-373/quantoken-cli.git
```

升级：

```bash
pip install -U git+https://github.com/boy-373/quantoken-cli.git
```

> 老版本用户：升级后 `aigo` 和 `qt` 两个命令都可用，登录状态自动继承。

## 快速开始

```bash
# 1. 登录（API Key 在 https://trade.pianam.cn 控制台获取）
aigo login qk_xxxxxxxxxxxx

# 2. 查余额
aigo balance

# 3. 看模型和价格
aigo models
```

## 命令一览

### AI 对话（纯文本，1-8 积分/次）

```bash
aigo chat "用一句话介绍量子计算"
aigo chat "写个爬虫思路" -m qwen-plus        # 换模型
```

### 智能体问答（自动联网搜索）

```bash
aigo ask "北船重工最近有什么新闻？"
aigo ask "搜索一下今天 A 股热点板块"
```

### AI 出图（40 积分/张起，1440×1440）

```bash
aigo image "深蓝色夜空下的灯塔，海面波光粼粼，电影感"
aigo image "赛博朋克猫咪" -o cat.png          # 保存本地
```

### 网页/文本 AI 解析（1-5 积分/次）

```bash
aigo extract --url https://example.com/article --question "这篇文章讲了什么？"
aigo extract --url https://example.com/job --question "提取职位名、薪资、城市"
```

## API Key 配置方式（二选一）

```bash
aigo login qk_xxx                    # 方式1：保存到 ~/.aigocli/config.json
export AIGO_API_KEY=qk_xxx           # 方式2：环境变量（优先级更高）
```

> 兼容旧环境变量 `QUANTOKEN_API_KEY` 与旧配置目录 `~/.qtcli/`，无缝迁移。

## 计费说明

**1 元 = 100 积分**，调用失败自动退积分。

| 能力 | 价格 |
|------|------|
| 对话 qwen-flash | 1 积分/次 |
| 对话 qwen-plus | 5 积分/次 |
| 对话 qwq-plus（深度推理） | 8 积分/次 |
| 视觉 qwen-vl-plus / qwen-vl-max | 5 / 8 积分/次 |
| 智能体问答 | 对话积分 + 联网搜索 2 积分 |
| AI 出图 | 40 积分/张起 |
| 网页解析 | 1 / 2 / 5 积分/次 |

## 相关接口与链接

- OpenAI 兼容端点：`POST https://trade.pianam.cn/api/v1/open/chat/completions`
- 完整 API 文档：https://trade.pianam.cn/docs
- Python / Node SDK：https://github.com/boy-373/quantoken-sdk
- AIgo 工作台（CLI 广场同步展示）：https://site.pianam.cn

## 一起推广

觉得 AIgo 好用？给本仓库点个 **Star**，分享给朋友 —— 朋友在 [trade.pianam.cn](https://trade.pianam.cn) 注册后即可免费领取体验积分，开箱即用。

## License

MIT
