export async function makeAskRequest(question) {
  const url = "http://localhost:11434/api/generate";
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  const body = JSON.stringify({
    model: "gemma:2b",
    prompt: question,
    stream: false  // Asegurando que se incluya el campo 'stream' como en el ejemplo original
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body
    });

    if (!response.ok) {
      const errorData = await response.json();  // Asumiendo que la API devuelve un JSON con detalles del error
      const error = new Error(`Error ${errorData.code}: ${errorData.description}`);
      throw error;
    }

    const data = await response.json();  // Asumiendo éxito, se parsea la respuesta JSON
    return data;  // Retornar los datos JSON parseados
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;  // Re-lanzar el error para manejo externo
  }
}




export function markdown(input: string): string {
  return input
    .replace(
      /(```|~~~)(\w*)([\s\S]+?)\1/g,
      (_1, _2, lang: string, raw: string) => {
        const code = raw
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/`/g, "&#96;");
        const classes = lang ? ` class="language-${lang}"` : "";
        return `<pre><code${classes}>${code.trim()}</code></pre>`;
      }
    )
    .replace(/`([^`\n]*)`/g, (_1, raw) => {
      return raw
        ? `<code>${raw.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`
        : "";
    })
    .replace(/\*\*(.*?)\*\*/g, (_2, raw) => `<b>${raw}</b>`)
    .replace(/\*(.*?)\*/g, (_3, raw) => `<em>${raw}</em>`);
}

