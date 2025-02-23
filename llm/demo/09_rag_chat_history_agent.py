from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain.tools.retriever import create_retriever_tool
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain import hub
import bs4


model = ChatOpenAI(model="gpt-4o-mini", base_url="https://www.dmxapi.com/v1")
parser = StrOutputParser()

from datetime import datetime
print(1, datetime.now())

loader = WebBaseLoader(
    web_paths=['https://lilianweng.github.io/posts/2023-06-23-agent'],
    bs_kwargs={'parse_only': bs4.SoupStrainer(
        class_=('post-header', 'post-title', 'post-content'))}
)
docs = loader.load()
print(2, datetime.now())
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=200, add_start_index=True)
splites = splitter.split_documents(docs)
vector_store = Chroma.from_documents(
    documents=splites,
    embedding=OpenAIEmbeddings(base_url='https://www.dmxapi.com/v1'),
)
print(3, datetime.now())
retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 6}
)

print(4, datetime.now())
### Build retriever tool ###
tool = create_retriever_tool(
    retriever,
    "blog_post_retriever",
    "Searches and returns excerpts from the Autonomous Agents blog post.",
)
tools = [tool]

memory = MemorySaver()
agent_executor = create_react_agent(model, tools, checkpointer=memory)
print(5, datetime.now())


for s in agent_executor.stream(
    {"messages": [HumanMessage(content="Hi! I'm bob")]},
    config={"configurable": {"thread_id": "abc123"}},
):
    print(s)
    print("----")
print(6, datetime.now())
for s in agent_executor.stream(
    {"messages": [HumanMessage(content="What is Task Decomposition?")]},
    config={"configurable": {"thread_id": "abc123"}},
):
    print(s)
    print("----")
print(7, datetime.now())
for s in agent_executor.stream(
    {"messages": [HumanMessage(content="What according to the blog post are common ways of doing it? redo the search")]},
    # {"messages": [HumanMessage(content="What are common ways of doing it?")]},
    config={"configurable": {"thread_id": "abc123"}}
):
    print(s)
    print("----")
print(8, datetime.now())
