from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain.prompts import MessagesPlaceholder


model = ChatOpenAI(model="gpt-4o-mini", base_url="https://www.dmxapi.com/v1")
parser = StrOutputParser()
prompt_tmpl = ChatPromptTemplate.from_messages([
    ('system', '你是一个乐于助人的助手。用{language}尽你所能回答所有问题。'),
    MessagesPlaceholder(variable_name='my_msg')
])
chain = prompt_tmpl | model | parser

store = {}
def get_session(session_id: str):
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

do_message = RunnableWithMessageHistory(
    chain, get_session, input_messages_key='my_msg'
)

rsp1 = do_message.invoke(
    {
        'my_msg': [HumanMessage(content='你好啊！我是JoJo')],
        'language': '中文'
    },
    config={'configurable': {'session_id': 'zs1234'}}
)
print(rsp1)

rsp2 = do_message.invoke(
    {
        'my_msg': [HumanMessage(content='请问：我的名字是什么？')],
        'language': '中文'
    },
    config={'configurable': {'session_id': 'zs1234'}}
)
print(rsp2)

for token in do_message.stream(
    {
        'my_msg': [HumanMessage(content='给我讲个笑话')],
        'language': '中文'
    },
    config={'configurable': {'session_id': 'zs1234'}}
):
    print(token, end='', flush=True)
