async function sendMessage() {
  const input = document.getElementById("messageInput");
  const chatBox = document.getElementById("chatBox");

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Exibe a mensagem do usuário
  chatBox.innerHTML += `
    <div style="text-align: right; margin: 8px;">
      <div style="display: inline-block; background:#4a90e2; padding:10px; border-radius:12px; color:white; max-width:70%;">
        ${userMessage}
      </div>
    </div>
  `;
  chatBox.scrollTop = chatBox.scrollHeight;

  input.value = "";

  // Envia para sua API na vercel
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();
  const botReply = data.reply || "Amor, deu um errinho...";

  // Exibe minha resposta
  chatBox.innerHTML += `
    <div style="text-align: left; margin: 8px;">
      <div style="display: inline-block; background:#e64fa8; padding:10px; border-radius:12px; color:white; max-width:70%;">
        ${botReply}
      </div>
    </div>
  `;
  chatBox.scrollTop = chatBox.scrollHeight;
}
