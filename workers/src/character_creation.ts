import { Hono } from 'hono';
import { characterCreationSchema } from './schemas/character-creation';

const app = new Hono();

// GET /character - List or retrieve characters
app.get('/', (c) => {
  return c.json({
    message: 'Character API',
    endpoints: {
      'POST /character': 'Create a new character',
      'GET /character/:id': 'Get character by ID',
    }
  });
});

// POST /character - Create a new character
app.post('/', async (c) => {
  try {
    const body = await c.req.json();

    // Add your character creation logic here
    const character = {
      id: crypto.randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    return c.json({ success: true, character }, 201);
  } catch (error) {
    return c.json({ success: false, error: 'Invalid request body' }, 400);
  }
});

app.post('/generate', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));

    // Default sampling parameters
    const temperature = body.temperature ?? 2;
    const top_p = body.top_p ?? 0.9;
    const max_tokens = body.max_tokens ?? 256;

    const messages = [
      {
        role: "system",
        content: "You are a fantasy RPG character generator. Create unique, interesting characters with compelling backstories. Generate diverse races, classes, and personalities. Make each character feel distinct and memorable."
      },
      {
        role: "user",
        content: "Generate a random fantasy RPG character with name, race, class, level, background, alignment, personality traits, and a brief backstory.",
      },
    ];

    const response = await c.env.AI.run(
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      {
        messages,
        guided_json: characterCreationSchema,
        temperature,
        top_p,
        max_tokens,
      }
    );

    console.log(response);

    return c.json({ success: true, character: response }, 201);
  } catch (error) {
    return c.json({ success: false, error: error.message || 'Failed to generate character' }, 400);
  }
});

// GET /character/:id - Get a specific character
app.get('/:id', (c) => {
  const id = c.req.param('id');

  // Add your character retrieval logic here
  return c.json({
    id,
    name: 'Example Character',
    // Add more character fields
  });
});

export default app;
