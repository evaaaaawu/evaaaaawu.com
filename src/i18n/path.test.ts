import { describe, expect, it } from "vitest";
import { getLocalizedPath, getSwitcherTarget } from "./path";

describe("getLocalizedPath", () => {
  it("adds /zh-tw/ prefix when switching from EN to ZH-TW", () => {
    expect(getLocalizedPath("/", "zh-tw")).toBe("/zh-tw/");
    expect(getLocalizedPath("/articles/", "zh-tw")).toBe("/zh-tw/articles/");
    expect(getLocalizedPath("/articles/some-post/", "zh-tw")).toBe(
      "/zh-tw/articles/some-post/"
    );
  });

  it("removes /zh-tw/ prefix when switching from ZH-TW to EN", () => {
    expect(getLocalizedPath("/zh-tw/", "en")).toBe("/");
    expect(getLocalizedPath("/zh-tw/articles/", "en")).toBe("/articles/");
    expect(getLocalizedPath("/zh-tw/articles/some-post/", "en")).toBe(
      "/articles/some-post/"
    );
  });
});

describe("getSwitcherTarget", () => {
  const existingPaths = new Set([
    "/",
    "/articles/",
    "/articles/react-hooks/",
    "/zh-tw/",
    "/zh-tw/articles/",
  ]);

  it("returns the counterpart path when it exists", () => {
    const result = getSwitcherTarget("/articles/", "zh-tw", existingPaths);

    expect(result).toEqual({
      path: "/zh-tw/articles/",
      needsToast: false,
    });
  });

  it("returns target home with toast when counterpart does not exist", () => {
    const result = getSwitcherTarget(
      "/articles/react-hooks/",
      "zh-tw",
      existingPaths
    );

    expect(result).toEqual({
      path: "/zh-tw/",
      needsToast: true,
    });
  });

  it("switches from ZH-TW to EN with fallback when no counterpart", () => {
    const result = getSwitcherTarget("/zh-tw/articles/", "en", existingPaths);

    expect(result).toEqual({
      path: "/articles/",
      needsToast: false,
    });
  });
});
