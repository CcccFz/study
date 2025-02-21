from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from fastapi import FastAPI
from langserve import add_routes
import uvicorn

model = ChatOpenAI(model="gpt-4o-mini", base_url="https://www.dmxapi.com/v1")
parser = StrOutputParser()
prompt_tmpl = ChatPromptTemplate.from_messages([
    ('system', '请将下面的内容翻译成{language}'),
    ('user', '{text}')
])
chain = prompt_tmpl | model | parser

app = FastAPI(title='My Langchain Service', version='1.0', description='使用langchain翻译内容')
add_routes(app, chain, path='')

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8000)
