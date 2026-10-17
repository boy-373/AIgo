"""AIgo 对话示例：普通调用 + 流式输出"""
import os

from aigo import AigoClient

client = AigoClient(api_key=os.environ["AIGO_API_KEY"])

resp = client.chat([{"role": "user", "content": "用一句话介绍量子计算"}])
print(resp["choices"][0]["message"]["content"])

print("\n--- 流式输出 ---")
for chunk in client.stream([{"role": "user", "content": "写一句夜景描写"}]):
    delta = chunk.get("choices", [{}])[0].get("delta", {}).get("content") or ""
    if delta:
        print(delta, end="", flush=True)
print()
