import json
import os
from dotenv import load_dotenv
from groq import Groq
from backend.prompts import resume_prompt
import json
load_dotenv()

client=Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def analyze(resume_text):
    prompt=resume_prompt(resume_text)
    response=client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{
            "role":"user",
            "content":prompt
        }]
        

    )
    result = response.choices[0].message.content

    print(result)

    return json.loads(result)