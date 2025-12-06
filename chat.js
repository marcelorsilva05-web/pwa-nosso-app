// Seletores
const messagesContainer = document.getElementById("messages");
const input = document.getElementById("userInput");
const form = document.getElementById("chatForm");

// Adiciona mensagens no chat
function addMessage(text, sender = "user") {
  const div = document.createElement("div");
  div.className = sender === "user" ? "msg user" : "msg bot";
  div.textContent = text;
  messagesContainer.appendChild(div);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Enviar mensagem para a API da Vercel
async function sendMessage(userText) {
  addMessage(userText, "user");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();

    if (!response.ok) {
      addMessage(
        "Desculpa amor, deu um errinho: " + (data.error || "erro desconhecido 💔"),
        "bot"
      );
      return;
    }

    addMessage(data.reply, "bot");

  } catch (e) {
    addMessage("Amor, falhou a conexão: " + e.message, "bot");
  }
}

// Quando enviar o formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;
  input.value = "";
  sendMessage(text);
});
