import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css"; // You can choose any theme
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/xml/xml"; // For HTML

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCode(""); // Clear the code when changing language
  };

  const executeCode = () => {
    try {
      if (language === "javascript") {
        // Execute JavaScript code
        new Function(code)();
      } else if (language === "python") {
        // For Python, you would typically use a server-side execution or a library like Brython
        alert("Python code execution is not supported in the browser.");
      } else if (language === "html") {
        // For HTML, you can create a new window/tab
        const newWindow = window.open();
        newWindow.document.write(code);
        newWindow.document.close();
      }
    } catch (error) {
      console.error("Error executing code:", error);
      alert("Error executing code: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <select onChange={handleLanguageChange} value={language} style={{ marginBottom: "10px" }}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <CodeMirror
        value={code}
        options={{
          mode: language === "javascript" ? "javascript" : language === "python" ? "python" : "xml",
          theme: "material", // Change this to any theme you prefer
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        style={{ height: "300px" }} // Adjust height as needed
      />
      <button
        onClick={executeCode}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        Run Code
      </button>
    </div>
  );
};

export default CodeEditor;
