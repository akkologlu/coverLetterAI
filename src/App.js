import React, { useState } from "react";
import axios from "axios";

function App() {
  const [response, setResponse] = useState("");
  const openaiApiKey = "API_KEY_HERE";

  const handleOpenAIRequest = async () => {
    try {
      const endpoint = "https://api.openai.com/v1/chat/completions";

      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair.",
          },
          {
            role: "user",
            content:
              "Compose a poem that explains the concept of recursion in programming.",
          },
        ],
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      };

      const result = await axios.post(endpoint, requestBody, { headers });
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error("Error making OpenAI request:", error);
    }
  };

  return (
    <div>
      <button onClick={handleOpenAIRequest}>Make OpenAI Request</button>
      <p>OpenAI Response: {response}</p>
    </div>
  );
}

export default App;
