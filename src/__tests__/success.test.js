const func = require("./../main");

jest.mock("request", () => (url, fn) => {
  const fs = require("fs");
  const __dirname = "src/__tests__";
  const error = {};
  const body = fs.readFileSync(__dirname + "/__data__/success.html").toString();
  const response = {
    body,
    statusCode: 200
  };
  return fn(error, response, body);
});
describe("looool", () => {
  it("content success", () => {
    return func("url").then(res => {
      expect(res.url).toBe("url");
      expect(res.title !== null).toBe(true);
      expect(res.siteName !== null).toBe(true);
      expect(res.image !== null).toBe(true);
      expect(res.imageWidth !== null).toBe(true);
      expect(res.imageHeight !== null).toBe(true);
      expect(res.imageType !== null).toBe(true);
      expect(res.description !== null).toBe(true);
    });
  });
});
