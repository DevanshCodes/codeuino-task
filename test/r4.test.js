const request = require("supertest");
const app = require("../app");

var key;

describe("Delete Key", () => {
  beforeAll(async () => {
    server = app.listen(4000, () => {
      console.log("Example app listening on port 4000!");
    });
    await request(app).get("/generate-key");
  });
  it("Should Get & Delete the Key", async () => {
    const response = await request(app).post("/get-key").send({
      user: "random",
    });
    expect(response.statusCode).toBe(200);
    key = response.body.success;
    const responseDelete = await request(app).delete("/delete-key").send({
      key: key,
    });
    expect(responseDelete.statusCode).toBe(200);
    expect(responseDelete.body).toEqual(
      expect.objectContaining({
        success: key,
      })
    );
  });
  afterAll(async () => {
    await server.close();
  });
});
