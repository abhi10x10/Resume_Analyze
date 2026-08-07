import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setAnalysis(data.analysis);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <h1>Resume Analyzer</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <p>
        Selected File: {file ? file.name : "No file selected"}
      </p>

      <button onClick={handleUpload}>
        Analyze Resume
      </button>

      {analysis && (
      <div>
        <h2>Resume Analysis</h2>

        <h3>Summary</h3>
        <p>{analysis.summary}</p>

        <h3>Technical Skills</h3>
        <ul>
          {analysis.skills.technical.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <h3>Soft Skills</h3>
        <ul>
          {analysis.skills.soft.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <h3>Weaknesses</h3>
        <ul>
          {analysis.weaknesses.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Suggestions</h3>
        <ul>
          {analysis.suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    )}
    </div>
  );
}

export default App;