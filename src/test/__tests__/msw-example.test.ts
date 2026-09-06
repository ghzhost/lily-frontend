import { http, HttpResponse } from 'msw';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { server } from '../server';

describe('MSW fetch mocking', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('intercepts fetch and returns mocked response', async () => {
    server.use(
      http.get('https://api.example.com/health', () => {
        return HttpResponse.json({ status: 'ok' });
      }),
    );

    const res = await fetch('https://api.example.com/health');
    const data = await res.json();

    expect(res.ok).toBe(true);
    expect(data).toEqual({ status: 'ok' });
  });
});
