# langchain v0.2

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import StrOutputParser

# 连接模型
model = ChatOpenAI(model="gpt-4o-mini", base_url="https://www.dmxapi.com/v1")

# 数据解析器
parser = StrOutputParser()

# 得到链
chain = model | parser

# 准备prompt
question = [
    SystemMessage(content="请将以下信息内容翻译成英语"),
    HumanMessage(content="你好，大佬？"),
]

# 执行链
print(chain.invoke(question))
