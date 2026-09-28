const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function getCollectionUrl(collection) {
  return `${API_BASE_URL}/api/${encodeURIComponent(collection)}/`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  for (const key of ['results', 'items', 'records', 'data']) {
    const value = payload[key];
    if (Array.isArray(value)) {
      return value;
    }
    if (value && typeof value === 'object') {
      const nestedRecords = normalizeCollection(value);
      if (nestedRecords.length > 0 || Object.keys(value).length === 0) {
        return nestedRecords;
      }
    }
  }

  return [];
}

export async function fetchCollection(collection, { signal } = {}) {
  const response = await fetch(getCollectionUrl(collection), {
    headers: { Accept: 'application/json' },
    signal,
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error('The API returned an unreadable response.');
  }

  if (!response.ok) {
    throw new Error(payload?.error || payload?.message || `Request failed (${response.status}).`);
  }

  return normalizeCollection(payload);
}
