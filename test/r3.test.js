const request = require("supertest");
const app = require("../app");

const user = {
  user: "random",
};

var key = "";

describe("Block and Unblock Key", () => {
  beforeAll(async () => {
    server = app.listen(4000, () => {
      console.log("Example app listening on port 4000!");
    });
    await request(app).get("/generate-key");
  });
  it("Should block a Key", async () => {
    const response = await request(app).post("/get-key").send(user);
    expect(response.statusCode).toBe(200);
    key = response.body.success;
  });
  it("Should unblock the Blocked key", async () => {
    const response = await request(app).put("/unblock-key").send({
      key: key,
    });
  });
  it("Should Return the Key, as Key is unblocked.", async () => {
    const response = await request(app).post("/get-key").send(user);
    expect(response.statusCode).toBe(200);
  })
  afterAll(async () => {
    await server.close();
  });
});
