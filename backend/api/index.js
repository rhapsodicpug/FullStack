import app from '../server.js';

// Vercel serverless function handler
// Export both default and named export for compatibility
const handler = (req, res) => {
  return app(req, res);
};

export default handler;
export { handler };

