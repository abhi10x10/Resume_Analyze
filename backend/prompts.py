def resume_prompt(resume_text):
    return f"""
You are an expert HR recruiter and ATS resume reviewer.

Analyze the following resume.

Resume:
{resume_text}

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT write ```json.
Do NOT add explanations.
Do NOT write anything outside the JSON.

The response MUST exactly follow this structure:

{{
  "summary": "A short professional summary.",
  "skills": {{
    "technical": [
      "Skill 1",
      "Skill 2"
    ],
    "soft": [
      "Skill 1",
      "Skill 2"
    ]
  }},
  "weaknesses": [
    "Weakness 1",
    "Weakness 2"
  ],
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2"
  ],
  "rating": 8.5,
  "recommendation": "One sentence hiring recommendation."
}}

Important rules:

- technical must ALWAYS be an array.
- soft must ALWAYS be an array.
- weaknesses must ALWAYS be an array.
- suggestions must ALWAYS be an array.
- rating must be a number between 1 and 10.
- recommendation must be a string.

Return ONLY JSON.
"""