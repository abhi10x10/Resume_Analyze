def resume_prompt(resume_text):

    return f"""
    You are an HR Expert.

    Analyze this resume.

    Resume:

    {resume_text}

    Give

    Summary

    Skills

    Weaknesses

    Suggestions

    OUTPUT:
    Return ONLY valid JSON.
    Do not use markdown.
    Do not write ```json.
    Do not add any explanation.
    you have to give the output in JSON format with keys as summary, skills, weaknesses and suggestions.    
    """