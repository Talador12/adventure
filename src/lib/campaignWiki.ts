// campaignWiki - localStorage-backed wiki for campaign lore.
// CRUD + search + markdown export. Keyed by roomId.

export interface WikiPage {
  id: string;
  title: string;
  content: string;
  category: 'lore' | 'npc' | 'location' | 'item' | 'quest';
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

function storageKey(roomId: string): string {
  return `adventure:wiki:${roomId}`;
}

export function getWikiPages(roomId: string): WikiPage[] {
  try {
    const raw = localStorage.getItem(storageKey(roomId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWikiPage(roomId: string, page: WikiPage): WikiPage[] {
  const pages = getWikiPages(roomId);
  const idx = pages.findIndex((p) => p.id === page.id);
  if (idx >= 0) {
    pages[idx] = { ...page, updatedAt: Date.now() };
  } else {
    pages.push({ ...page, createdAt: page.createdAt || Date.now(), updatedAt: Date.now() });
  }
  try {
    localStorage.setItem(storageKey(roomId), JSON.stringify(pages));
  } catch { /* storage full */ }
  return pages;
}

export function deleteWikiPage(roomId: string, pageId: string): WikiPage[] {
  const pages = getWikiPages(roomId).filter((p) => p.id !== pageId);
  try {
    localStorage.setItem(storageKey(roomId), JSON.stringify(pages));
  } catch { /* storage full */ }
  return pages;
}

export function searchWiki(roomId: string, query: string): WikiPage[] {
  if (!query.trim()) return getWikiPages(roomId);
  const q = query.toLowerCase();
  return getWikiPages(roomId).filter((p) =>
    p.title.toLowerCase().includes(q) ||
    p.content.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q)) ||
    p.category.includes(q)
  );
}

export function formatWikiPage(page: WikiPage): string {
  const tagLine = page.tags.length > 0 ? `\nTags: ${page.tags.join(', ')}` : '';
  return [
    `# ${page.title}`,
    `*Category: ${page.category}*${tagLine}`,
    `*Last updated: ${new Date(page.updatedAt).toLocaleDateString()}*`,
    '',
    page.content || '*No content yet.*',
  ].join('\n');
}

// Bulk sync - replace all pages for a room (used for campaign load/broadcast)
export function setAllWikiPages(roomId: string, pages: WikiPage[]): void {
  try {
    localStorage.setItem(storageKey(roomId), JSON.stringify(pages));
  } catch { /* storage full */ }
}
