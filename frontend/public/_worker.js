export { onRequest } from '../src/main.tsx';
export async function onRequest(context) {
  return new Response("Hello from Pages!");
}
