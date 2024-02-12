import parseTitle from "./parseTitle";

it("should trim the title", () => {
  expect(parseTitle(`#    Lots of space     `).title).toBe("Lots of space");
});
it("should extract first title", () => {
  expect(parseTitle(`# Title one\n# Title two`).title).toBe("Title one");
});
it("should parse emoji if first character", () => {
  const parsed = parseTitle(`# 😀 Title`);
  expect(parsed.title).toBe("😀 Title");
  expect(parsed.emoji).toBe("😀");
});
it("should not parse emoji if not first character", () => {
  const parsed = parseTitle(`# Title 🌈`);
  expect(parsed.title).toBe("Title 🌈");
  expect(parsed.emoji).toBe(undefined);
});
