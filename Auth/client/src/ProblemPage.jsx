import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const problems = {
  1: {
    title: "Two Sum",
    difficulty: "Easy",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    sampleInput: "5\n2 7 11 15 1\n9",
    sampleOutput: "0 1"
  },
  2: {
    title: "Valid Parentheses",
    difficulty: "Easy",
    statement: "Determine if the input string containing '(', ')', '{', '}', '[' and ']' is valid.",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only"
    ],
    sampleInput: "()[]{}",
    sampleOutput: "true"
  }
};

const codeTemplates = {
  cpp: `// C++ Template
#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`,
  c: `// C Template
#include <stdio.h>

int main() {
    // Write your code here
    return 0;
}`
};

const getDifficultyBadge = (diff) => {
  switch (diff) {
    case "Easy": return "success";
    case "Medium": return "warning";
    case "Hard": return "danger";
    default: return "secondary";
  }
};

const normalize = (str) =>
  str.trim().replace(/\r/g, '').replace(/\s+/g, ' '); // normalize for verdict match

const ProblemPage = () => {
  const { id } = useParams();
  const problem = problems[id];

  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(codeTemplates['cpp']);
  const [input, setInput] = useState('');
  const [desiredOutput, setDesiredOutput] = useState('');
  const [actualOutput, setActualOutput] = useState('');
  const [verdict, setVerdict] = useState('');

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(codeTemplates[lang]);
  };

  const runCode = async () => {
    setVerdict("Running...");
    try {
      const res = await fetch("http://localhost:3001/api/judge/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, input, language })
      });

      const data = await res.json();
      const output = data.output || '';
      setActualOutput(output);

      if (output.toLowerCase().includes("error")) {
        setVerdict("Error");
      } else {
        const normalizedOutput = normalize(output);
        const normalizedExpected = normalize(desiredOutput);
        setVerdict(normalizedOutput === normalizedExpected ? "Accepted" : "Wrong Answer");
      }
    } catch (err) {
      setVerdict("Server error");
      setActualOutput(err.message);
    }
  };

  if (!problem) return <div className="container mt-4">Problem not found.</div>;

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>{problem.title}</h3>
          <span className={`badge bg-${getDifficultyBadge(problem.difficulty)} px-3 py-2`}>
            {problem.difficulty}
          </span>
        </div>

        <p><strong>Problem:</strong> {problem.statement}</p>

        <h5>Constraints:</h5>
        <ul>
          {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

        <div className="row mb-4">
          <div className="col-md-6">
            <h6>Sample Input:</h6>
            <pre className="bg-light p-2 rounded">{problem.sampleInput}</pre>
          </div>
          <div className="col-md-6">
            <h6>Sample Output:</h6>
            <pre className="bg-light p-2 rounded">{problem.sampleOutput}</pre>
          </div>
        </div>

        <div className="mb-3">
          <label><strong>Select Language:</strong></label>
          <select className="form-select w-25" value={language} onChange={handleLanguageChange}>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>
        </div>

        <div className="mb-3">
          <label><strong>Your Code:</strong></label>
          <textarea
            className="form-control"
            rows="12"
            style={{ fontFamily: 'monospace' }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label><strong>Custom Input:</strong></label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter input..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label><strong>Desired Output:</strong></label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter expected output..."
              value={desiredOutput}
              onChange={(e) => setDesiredOutput(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-primary px-4" onClick={runCode}>Run</button>
        </div>

        <div className="mb-3">
          <label><strong>Actual Output:</strong></label>
          <pre className="bg-light p-2 rounded">{actualOutput}</pre>
        </div>

        {verdict && (
          <div className={`alert ${verdict === "Accepted" ? 'alert-success' : verdict === 'Wrong Answer' ? 'alert-danger' : 'alert-warning'}`}>
            Verdict: {verdict}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemPage;
