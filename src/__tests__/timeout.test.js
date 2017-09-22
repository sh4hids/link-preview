const func = require("./../main");

jest.mock("request", () => (url, fn) => {
  setTimeout(() => {
    const fs = require("fs");
    const __dirname = "src/__tests__";
    const error = {};
    const body = fs
      .readFileSync(__dirname + "/__data__/success.html")
      .toString();
    const response = {
      body,
      statusCode: 200
    };
    return fn(error, response, body);
  }, 3000);
});
describe("success", () => {
  it("content success", () => {
    return func("http://url.com", 1000).then(res => {
      expect(res.url).toBe("http://url.com");
      expect(!res.title).toBe(true);
      expect(!res.siteName).toBe(true);
      expect(!res.image).toBe(true);
      expect(!res.imageWidth).toBe(true);
      expect(!res.imageHeight).toBe(true);
      expect(!res.imageType).toBe(true);
      expect(!res.description).toBe(true);
    });
  });
});
