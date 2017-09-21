const func = require("./../main");

jest.mock("request", () => (url, fn) => {
  const fs = require("fs");
  const __dirname = "src/__tests__";
  const error = {};
  const body = fs.readFileSync(__dirname + "/__data__/fail.html").toString();
  const response = {
    body,
    statusCode: 200
  };
  return fn(error, response, body);
});
describe("looool", () => {
  it("content fail", () => {
    func("url").then(res => {
      expect(res.meta.url).toBe("url");
      expect(res.meta.title === null).toBe(true);
      expect(res.meta.siteName === null).toBe(true);
      expect(res.meta.image === null).toBe(true);
      expect(res.meta.imageWidth === null).toBe(true);
      expect(res.meta.imageHeight === null).toBe(true);
      expect(res.meta.imageType === null).toBe(true);
      expect(res.meta.description === null).toBe(true);
    });
  });
});
