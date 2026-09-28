export const API_PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${API_PORT}`;