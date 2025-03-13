from dotenv import load_dotenv

load_dotenv()

from langchain.chat_models import init_chat_model

llm = init_chat_model("gpt-4o-mini", model_provider="openai", base_url="https://www.dmxapi.com/v1")

from typing import Optional

from pydantic import BaseModel, Field

class Joke(BaseModel):
    """Joke to tell user."""

    setup: str = Field(description="The setup of the joke")
    punchline: str = Field(description="The punchline to the joke")
    rating: Optional[int] = Field(
        default=None, description="How funny the joke is, from 1 to 10"
    )

structured_llm = llm.with_structured_output(Joke)
rsp = structured_llm.invoke('tell me a joke about pig')
print(rsp)