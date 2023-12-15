import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

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
  const [waiting, setWiting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    setWiting(true);
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
    <>
      {!waiting ? (
        <>
          <div className="min-h-screen bg-[#ddd0fd] p-0 sm:p-12">
            <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
              <h1 className="text-2xl font-bold mb-8" id="benim">
                Cover Letter Generator
              </h1>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full">
                  <div className="relative z-0 w-full mb-5">
                    <label>Your Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                  </div>
                  <div className="relative z-0 w-full mb-5">
                    <label>Company's Name:</label>
                    <input
                      type="text"
                      name="company"
                      value={company}
                      onChange={handleInputChange}
                      className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                  </div>
                  <div className="relative z-0 w-full mb-5">
                    <label>Company's Industry:</label>
                    <input
                      type="text"
                      name="industry"
                      value={industry}
                      onChange={handleInputChange}
                      className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                  </div>
                  <div className="relative z-0 w-full mb-5">
                    <label>The Position You're Applying For:</label>
                    <input
                      type="text"
                      name="position"
                      value={position}
                      onChange={handleInputChange}
                      className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                  </div>
                  <div className="relative z-0 w-full mb-5">
                    <label>Enter your skills:</label>
                    <textarea
                      type="text"
                      name="technologies"
                      value={technologies}
                      onChange={handleInputChange}
                      className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                  </div>
                  <div className="relative z-0 w-full mb-5">
                    <label>
                      Enter your previous expreince and explain them in short
                    </label>
                    <textarea
                      type="text"
                      name="background"
                      value={background}
                      onChange={handleInputChange}
                      className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                  </div>
                  <div className="relative z-0 w-full mb-5">
                    <label>Anything you want to add extra</label>
                    <textarea
                      type="text"
                      name="extra"
                      value={extra}
                      onChange={handleInputChange}
                      className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                  </div>
                  <button
                    onClick={handleOpenAIRequest}
                    className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-[#562fbb] hover:bg-[#2a1c4e] hover:shadow-lg focus:outline-none"
                  >
                    Generate Cover Letter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div>
          {!response ? (
            <div className="loadingScreen">
              <Loading />{" "}
            </div>
          ) : (
            <>{response}</>
          )}
        </div>
      )}
    </>
  );
}

export default Generate;
