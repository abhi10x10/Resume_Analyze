import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);

    try {
      const response = await fetch(
        "https://resume-analyze-os45.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        alert(data.detail);
        return;
      }
      const data = await response.json();

      setAnalysis(data.analysis);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Resume Analyzer</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <p>
        <strong>Selected File:</strong>{" "}
        {file ? file.name : "No file selected"}
      </p>

      <button onClick={handleUpload}>
        Analyze Resume
      </button>

      {loading && <h2>⏳ Analyzing Resume...</h2>}

      {analysis && (
        <div className="analysis">

          <h2>📄 Summary</h2>
          <p>{analysis.summary}</p>

          <hr />

          <h2>💻 Technical Skills</h2>
          <ul>
            {analysis.skills?.technical?.map((skill, index) => (
              <li key={index}>✅ {skill}</li>
            ))}
          </ul>

          <hr />

          <h2>🤝 Soft Skills</h2>
          <ul>
            {analysis.skills?.soft?.map((skill, index) => (
              <li key={index}>✅ {skill}</li>
            ))}
          </ul>

          <hr />

          <h2>⚠️ Weaknesses</h2>
          <ul>
            {analysis.weaknesses?.map((item, index) => (
              <li key={index}>❌ {item}</li>
            ))}
          </ul>

          <hr />

          <h2>🚀 Suggestions</h2>
          <ol>
            {analysis.suggestions?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>

          {analysis.rating && (
            <>
              <hr />
              <h2>⭐ Overall Rating</h2>
              <h3>{analysis.rating}/10</h3>
            </>
          )}

          {analysis.recommendation && (
            <>
              <hr />
              <h2>🎯 Recommendation</h2>
              <p>{analysis.recommendation}</p>
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default App;