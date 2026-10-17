"""查询剩余积分"""
import os

from aigo import AigoClient

client = AigoClient(api_key=os.environ["AIGO_API_KEY"])
print(client.balance())
