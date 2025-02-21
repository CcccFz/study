from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import StrOutputParser


model = ChatOpenAI(model="gpt-4o-mini", base_url="https://www.dmxapi.com/v1")
parser = StrOutputParser()
chain =  model | parser

question = [
    SystemMessage(content="请将以下信息内容翻译成英语"),
    HumanMessage(content="你好，大佬？"),
]

print(chain.invoke(question))
