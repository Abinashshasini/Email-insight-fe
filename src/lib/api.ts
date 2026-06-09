const BASE = 'http://localhost:5050';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request<T>(
  method: Method,
  path: string,
  body?: object,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: 'include', // always send cookie
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    // Cookie expired or missing — send to login
    window.location.href = '/login';
    throw new Error('Unauthenticated');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? 'Request failed');
  }

  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: object) => request<T>('POST', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};
