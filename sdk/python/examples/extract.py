"""AIgo 网页/文本 AI 解析示例"""
import os

from aigo import AigoClient

client = AigoClient(api_key=os.environ["AIGO_API_KEY"])

result = client.extract(
    url="https://example.com/article",
    question="这篇文章讲了什么？",
)
print(result)
