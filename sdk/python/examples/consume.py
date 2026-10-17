"""扣减积分示例（幂等）"""
import os
import uuid

from aigo import AigoClient

client = AigoClient(api_key=os.environ["AIGO_API_KEY"])
print(client.consume(amount=1, idempotency_key=str(uuid.uuid4())))
