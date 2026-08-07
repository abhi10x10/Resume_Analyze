from fastapi import FastAPI
from fastapi import FastAPI, UploadFile, File
from backend.config import UPLOAD_DIR
from fastapi import HTTPException
from backend.pdf_reader import extract_text
from backend.llm import analyze
from fastapi.middleware.cors import CORSMiddleware
import shutil
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://resume-analyze-fw002.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {
        "message": "Welcome to Resume Analyzer"
    }

@app.post("/upload")
async def upload_resume(resume: UploadFile = File(...)):
    if resume.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )
    file_path = UPLOAD_DIR / resume.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    try:
        text = extract_text(file_path)

        analysis = analyze(text)

        return {
        "filename": resume.filename,
        "analysis": analysis
        }

    except Exception as e:
        print(e)
        raise
    