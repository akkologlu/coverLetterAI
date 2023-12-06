import React, { useState } from "react";
import axios from "axios";

function Generate() {
  const [response, setResponse] = useState("");
  const openaiApiKey = process.env.REACT_APP_API_KEY;
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [position, setPosition] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [background, setBackground] = useState("");
  const [extra, setExtra] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  const handleOpenAIRequest = async () => {
    try {
      const endpoint = "https://api.openai.com/v1/chat/completions";

      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a cover letter writer who specializes in writing cover letters for candidates who will apply for a job or internship. But do not write it like a regular cover letter. Start the letter directly with dear. Write it without including the previous date, name, address and parts like that.",
          },
          {
            role: "user",
            content: `Hi GPT! My name is ${name}. I will apply for a position at ${company} company. I will apply for the ${position} position. Technologies I know: ${technologies}. You can mention these. Expreiencer that I have : ${background}. And I have add this as a extra for your knowledge to use them in the letter: ${extra} Write a cover letter using this information.`,
          },
        ],
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: openaiApiKey,
      };

      const result = await axios.post(endpoint, requestBody, { headers });
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error("Error making OpenAI request:", error);
    }
  };

  const handleInputChange = (e) => {
    // Update the state based on the input name
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "company":
        setCompany(e.target.value);
        break;
      case "industry":
        setIndustry(e.target.value);
        break;
      case "position":
        setPosition(e.target.value);
        break;
      case "technologies":
        setTechnologies(e.target.value);
        break;
      case "background":
        setBackground(e.target.value);
        break;
      case "extra":
        setExtra(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>Enter your name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
          <label>Enter the company's name</label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={handleInputChange}
          />
          <label>Enter the company's industry</label>
          <input
            type="text"
            name="industry"
            value={industry}
            onChange={handleInputChange}
          />
          <label>Enter the position you are applying for</label>
          <input
            type="text"
            name="position"
            value={position}
            onChange={handleInputChange}
          />
          <label>Enter your skills</label>
          <textarea
            type="text"
            name="technologies"
            value={technologies}
            onChange={handleInputChange}
          />
          <label>Enter your previous expreince and explain them in short</label>
          <textarea
            type="text"
            name="background"
            value={background}
            onChange={handleInputChange}
          />
          <label>Anything you want to add extra</label>
          <textarea
            type="text"
            name="extra"
            value={extra}
            onChange={handleInputChange}
          />
          <button onClick={handleOpenAIRequest} onSubmit={handleSubmit}>
            Make OpenAI Request
          </button>
        </form>
      </div>

      <p>OpenAI Response: {response}</p>
    </div>
  );
}

export default Generate;
