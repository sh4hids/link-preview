const func = require("./../main");

jest.mock("request", () => (url, fn) => {
  const fs = require("fs");
  const __dirname = "src/__tests__";
  const error = "page not found";
  const body = fs.readFileSync(__dirname + "/__data__/fail.html").toString();
  const response = {
    body,
    statusCode: 404
  };
  return fn(error, response, body);
});
describe("looool", () => {
  it("content fail", () => {
    func("url")
      .then(() => {
        expect(true).tiBe(false);
      })
      .catch(res => {
        expect(res.error).toBe("page not found");
        expect(res.statusCode).toBe(404);
      });
  });
});
