/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";

// Cloudflare Work URL
const workerURL = 'https://gtx-loreal-project.japiotras.workers.dev/';

/* Handle form submit */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = userInput.value;
  if (!userMessage) return;

  // Display user message
  const userMessageElement = document.createElement("div");
  userMessageElement.textContent = `You: ${userMessage}`;
  userMessageElement.classList.add("user-message");
  chatWindow.appendChild(userMessageElement);

  // Clear input field
  userInput.value = "";

  // Display loading message
  const loadingMessageElement = document.createElement("div");
  loadingMessageElement.textContent = "Chatbot is typing...";
  loadingMessageElement.classList.add("loading-message");
  chatWindow.appendChild(loadingMessageElement);

  try {
    // Fetch response from OpenAI API
    const response = await fetch(workerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages,
      }),
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    // Display chatbot response
    const botMessageElement = document.createElement("div");
    botMessageElement.textContent = `Bot: ${botMessage}`;
    botMessageElement.classList.add("bot-message");
    chatWindow.replaceChild(botMessageElement, loadingMessageElement);
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    loadingMessageElement.textContent =
      "Failed to get a response. Please try again.";
  }
});
