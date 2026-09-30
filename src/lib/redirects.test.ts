import { describe, expect, it } from "vitest";
import { buildRedirectMap, resolveRedirect, normalizePath } from "./redirects";

const map = buildRedirectMap([
  { source: "/Old-A", destination: "/new-a", statusCode: 301 },
  { source: "/new-a", destination: "/final", statusCode: 301 },
  { source: "/ext", destination: "https://other.com/x", statusCode: 302 },
  { source: "/loop-1", destination: "/loop-2", statusCode: 301 },
  { source: "/loop-2", destination: "/loop-1", statusCode: 301 },
]);

describe("redirects", () => {
  it("normalizes paths", () => {
    expect(normalizePath("/Foo/Bar/?x=1#y")).toBe("/foo/bar");
    expect(normalizePath("foo//bar/")).toBe("/foo/bar");
    expect(normalizePath("/")).toBe("/");
  });

  it("matches case-insensitively and ignores trailing slash / query", () => {
    expect(resolveRedirect("/old-a/", map)?.destination).toBe("/final");
    expect(resolveRedirect("/OLD-A", map)?.destination).toBe("/final");
  });

  it("follows chains to the final destination", () => {
    expect(resolveRedirect("/old-a", map)).toMatchObject({ destination: "/final", external: false });
  });

  it("flags external destinations", () => {
    expect(resolveRedirect("/ext", map)).toMatchObject({
      destination: "https://other.com/x",
      external: true,
      statusCode: 302,
    });
  });

  it("returns null when there is no redirect", () => {
    expect(resolveRedirect("/nothing", map)).toBeNull();
  });

  it("does not hang on a redirect loop", () => {
    expect(resolveRedirect("/loop-1", map)).not.toBeUndefined();
  });
});
