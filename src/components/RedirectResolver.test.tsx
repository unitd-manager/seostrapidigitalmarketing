import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RedirectResolver from "./RedirectResolver";

const Where = () => <div data-testid="where">{useLocation().pathname + useLocation().search}</div>;

const renderAt = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <RedirectResolver>
        <Routes>
          <Route path="*" element={<Where />} />
        </Routes>
      </RedirectResolver>
    </MemoryRouter>
  );

describe("RedirectResolver", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.resetModules();
    vi.stubEnv("VITE_STRAPI_URL", "http://strapi.test");
  });

  it("redirects an old URL to the new one, keeping the query string", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: [{ source: "/old", destination: "/new", statusCode: 301 }] }),
      })
    );
    renderAt("/old?utm=1");
    await waitFor(() => expect(screen.getByTestId("where").textContent).toBe("/new?utm=1"));
  });

  it("renders normally when there is no redirect", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: [] }) }));
    renderAt("/about");
    await waitFor(() => expect(screen.getByTestId("where").textContent).toBe("/about"));
  });

  it("fails open when Strapi is down", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    renderAt("/about");
    await waitFor(() => expect(screen.getByTestId("where").textContent).toBe("/about"));
  });
});
