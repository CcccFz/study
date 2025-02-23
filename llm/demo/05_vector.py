from langchain_core.documents import Document
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser


model = ChatOpenAI(model="gpt-4o-mini", base_url="https://www.dmxapi.com/v1")
parser = StrOutputParser()

documents = [
  Document(page_content="狗是伟大的伴侣，以其忠诚和友好而闻名。", metadata={"source": "哺乳动物宠物文档"}),
  Document(page_content="猫是独立的宠物，通常喜欢自己的空间。", metadata={"source": "哺乳动物宠物文档"}),
  Document(page_content="金鱼是初学者的流行宠物，需要相对简单的护理。", metadata={"source": "鱼类宠物文档"}),
  Document(page_content="鹦鹉是聪明的鸟类，能够仿人类的语言。", metadata={"source": "鸟类宠物文档"}),
  Document(page_content="兔子是社交动物，需要足够的空间跳跃。", metadata={"source": "哺乳动物宠物文档"}),
]

# 实例向量空间
vector_store = Chroma.from_documents(
    documents,
    embedding=OpenAIEmbeddings(base_url='https://www.dmxapi.com/v1'),
)

# 相似度查询，且返回相似度分数，分数越低相似度越高
# print(vector_store.similarity_search_with_score('咖啡猫'))

# 检索器
# retriever = RunnableLambda(vector_store.similarity_search).bind(k=1)
retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 1},
)

# print(retriever.batch(['咖啡猫', '鲨鱼']))

msg = """
使用提供的上下文仅回答这个问题。
{question}
上下文:
{context}
"""

prompt_tmpl = ChatPromptTemplate.from_messages([
    ('human', msg)
])

# RunnablePassthrough允许将问题之后再传给prompt模板和model
chain = {'question': RunnablePassthrough(), 'context': retriever} | prompt_tmpl | model | parser

print(chain.invoke('请介绍一下猫？'))