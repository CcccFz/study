from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.prebuilt import create_react_agent, chat_agent_executor


model = ChatOpenAI(model="gpt-4o-mini", base_url="https://www.dmxapi.com/v1")
parse = StrOutputParser()
chain = model | parse

search = TavilySearchResults(max_results=2)

# model_with_tool = model.bind_tools([search])

# ret = model_with_tool.invoke([HumanMessage(content='中国的首都是哪个城市？')])
# print(f'model result contentt: {ret.content}')
# print(f'tool result contentt: {ret.tool_calls}')

# ret = model_with_tool.invoke([HumanMessage(content='成都今天天气怎么样？')])
# print(f'model result contentt: {ret.content}')
# print(f'tool result contentt: {ret.tool_calls}')

agent_executor = create_react_agent(model, [search]) # 可用 chat_agent_executor
res = agent_executor.invoke({'messages': [HumanMessage(content='中国的首都是哪个城市？')]})
print('res1:\n', res['messages'])
res = agent_executor.invoke({'messages': [HumanMessage(content='成都今天天气怎么样？')]})
print('res2:\n', res['messages'][2].content)
