from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import PromptTemplate
from langchain import hub
import bs4


model = ChatOpenAI(model="gpt-4o-mini", base_url="https://www.dmxapi.com/v1")
parser = StrOutputParser()

loader = WebBaseLoader(
    web_paths=['https://lilianweng.github.io/posts/2023-06-23-agent'],
    bs_kwargs={'parse_only': bs4.SoupStrainer(class_=('post-header', 'post-title', 'post-content'))}
)
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, add_start_index=True)
splites = splitter.split_documents(docs)
vector_store = Chroma.from_documents(
    documents=splites,
    embedding=OpenAIEmbeddings(base_url='https://www.dmxapi.com/v1'),
)
retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 6}
)

# prompt = hub.pull("rlm/rag-prompt")
template = """Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.
Always say "thanks for asking!" at the end of the answer.

{context}

Question: {question}

Helpful Answer:"""

custom_rag_prompt = PromptTemplate.from_template(template)

def format_docs(docs):
    return '\n\n'.join(doc.page_content for doc in docs)


rag_chain = (
    {'context': retriever | format_docs, 'question': RunnablePassthrough() }
    | custom_rag_prompt | model | parser
)

for chunk in rag_chain.stream("What is Task Decomposition?"):
    print(chunk, end="", flush=True)
