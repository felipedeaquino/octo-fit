import { startServer } from './index.js';
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const publicUrl = codespaceName
    ? `https://${codespaceName}-${PORT}.app.github.dev`
    : `http://localhost:${PORT}`;
console.log(`Server listening on ${publicUrl}`);
void startServer();
//# sourceMappingURL=server.js.map