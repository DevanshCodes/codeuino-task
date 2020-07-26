const request = require("supertest");
const app = require("../app");

describe("Generate Key", () => {
  beforeAll(async () => {
    server = app.listen(4000, () => {
      console.log("Example app listening on port 4000!");
    });
  });
  it("Should Generate a Key", async () => {
    const response = await request(app).get("/generate-key");
    expect(response.statusCode).toBe(200);
  });
  afterAll(async () => {
    await server.close();
  });
});
