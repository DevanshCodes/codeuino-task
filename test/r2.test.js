const request = require("supertest");
const app = require("../app");

const user = {
  user: "randomNigga",
};

describe("Get Key", () => {
  beforeAll(async () => {
    server = app.listen(4000, () => {
      console.log("Example app listening on port 4000!");
    });
  });
  beforeEach(async () => {
    await request(app).get("/generate-key");
  });

  it("Should get the Generated Key", async () => {
    const response = await request(app).post("/get-key").send(user);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: expect.any(String),
      })
    );
    expect(response.statusCode).toBe(200);
  });
  afterAll(async () => {
    await server.close();
  });
});
