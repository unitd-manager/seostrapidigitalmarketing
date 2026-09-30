import { beforeEach, describe, expect, it, vi } from "vitest";

describe("trackNotFound", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("VITE_STRAPI_URL", "http://strapi.test");
  });

  it("posts the path once per page load and never throws", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const { trackNotFound } = await import("./notFound");

    trackNotFound("/missing", "https://google.com");
    trackNotFound("/missing", "https://google.com");
    trackNotFound("/other");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://strapi.test/api/not-found-logs/track");
    expect(JSON.parse(init.body)).toEqual({ path: "/missing", referrer: "https://google.com" });
  });

  it("swallows network errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const { trackNotFound } = await import("./notFound");
    expect(() => trackNotFound("/x")).not.toThrow();
  });
});
