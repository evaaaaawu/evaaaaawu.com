import { describe, it, expect } from "vitest";
import { articleSchema, streamSchema } from "./schemas";

describe("articleSchema", () => {
  it("accepts a valid article frontmatter", () => {
    const valid = {
      title: "Getting Started with React Hooks",
      creationDate: new Date("2026-03-01"),
      updateDate: new Date("2026-03-05"),
      topics: ["React", "JavaScript", "Tips"],
      featured: true,
      slug: "getting-started-with-react-hooks",
    };

    const result = articleSchema.safeParse(valid);

    expect(result.success).toBe(true);
  });

  it("rejects an article missing a required field (title)", () => {
    const invalid = {
      creationDate: new Date("2026-03-01"),
      updateDate: new Date("2026-03-05"),
      topics: ["React"],
      featured: false,
      slug: "no-title",
    };

    const result = articleSchema.safeParse(invalid);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes("title"))).toBe(
        true
      );
    }
  });
});

describe("streamSchema", () => {
  it("accepts a minimal valid stream post with optional fields omitted", () => {
    const valid = {
      bluesky_id: "3lbxyz00001",
      date: new Date("2026-04-10T09:32:00Z"),
      tags: ["What I've done", "evaaaaawu.com"],
    };

    const result = streamSchema.safeParse(valid);

    expect(result.success).toBe(true);
  });

  it("accepts a stream post with all optional fields populated", () => {
    const valid = {
      bluesky_id: "3lbxyz00099",
      date: new Date("2026-04-12T21:04:00Z"),
      tags: ["What I read", "Life"],
      featured: true,
      notes: "re-read of an old favourite",
      images: ["assets/stream/cover.jpg"],
      quoted_post: "https://bsky.app/profile/someone/post/abc",
    };

    const result = streamSchema.safeParse(valid);

    expect(result.success).toBe(true);
  });

  it("rejects a stream post whose featured field is not a boolean", () => {
    const invalid = {
      bluesky_id: "3lbxyz00010",
      date: new Date("2026-04-10T09:32:00Z"),
      tags: ["Thoughts"],
      featured: "yes",
    };

    const result = streamSchema.safeParse(invalid);

    expect(result.success).toBe(false);
  });

  it("preserves optional fields in the parsed output", () => {
    const input = {
      bluesky_id: "3lbxyz00011",
      date: new Date("2026-04-10T09:32:00Z"),
      tags: ["Thoughts"],
      notes: "kept through parse",
      images: ["a.jpg", "b.jpg"],
    };

    const result = streamSchema.parse(input);

    expect(result.notes).toBe("kept through parse");
    expect(result.images).toEqual(["a.jpg", "b.jpg"]);
  });

  it("rejects a stream post missing bluesky_id", () => {
    const invalid = {
      date: new Date("2026-04-10T09:32:00Z"),
      tags: ["Thoughts"],
    };

    const result = streamSchema.safeParse(invalid);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.includes("bluesky_id"))
      ).toBe(true);
    }
  });
});
