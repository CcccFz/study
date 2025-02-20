from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate



# 连接模型
model = ChatOpenAI(model="gpt-4o-mini", base_url="https://www.dmxapi.com/v1")

# 数据解析器
parser = StrOutputParser()

# 定义提示模板
prompt_tmpl = ChatPromptTemplate.from_messages([
    ('system', '请将下面的内容翻译成{language}'),
    ('user', '{text}')
])

# 得到链
chain = prompt_tmpl | model | parser

# # 准备prompt
# question = [
#     SystemMessage(content="请将以下信息内容翻译成英语"),
#     HumanMessage(content="你好，大佬？"),
# ]

# # 执行链
# print(chain.invoke(question))

# print(chain.invoke({'language': 'English', 'text': '我下午要去约会，不能去上班了'}))



# 创建fastapi应用
from fastapi import FastAPI
# from langserve import server
from langserve import add_routes

app = FastAPI(title='My Langchain Service', version='1.0', description='使用langchain翻译内容')
add_routes(app, chain, path='')

# langserve_app = LangServe(app)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8000)