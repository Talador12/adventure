// Minimal markdown renderer — converts basic markdown to HTML.
// Zero dependencies. Handles: headers, bold, italic, links, lists, code, blockquotes.

export function renderMarkdown(md: string): string {
  let html = md
    // Escape HTML first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers (### → h3, ## → h2, # → h1)
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-bold text-white mt-3 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-bold text-white mt-3 mb-1">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-lg font-bold text-white mt-3 mb-1">$1</h1>')
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="text-[10px] bg-slate-800 px-1 py-0.5 rounded text-emerald-300">$1</code>')
    // Links [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-teal-400 underline" target="_blank" rel="noopener">$1</a>')
    // Blockquotes
    .replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-2 border-slate-600 pl-2 text-slate-400 italic">$1</blockquote>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-3">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (match) => `<ul class="list-disc list-inside space-y-0.5">${match}</ul>`)
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="border-slate-700 my-2" />')
    // Paragraphs (double newlines)
    .replace(/\n\n/g, '</p><p class="mt-1.5">')
    // Single newlines → br
    .replace(/\n/g, '<br/>');

  return `<p class="mt-1.5">${html}</p>`;
}
