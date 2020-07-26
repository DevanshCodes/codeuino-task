const request = require("supertest");
const app = require("../app");

describe("Unblock after 1 Minute", () => {
  beforeAll(async () => {
    server = app.listen(4000, () => {
      console.log("Example app listening on port 4000!");
    });
    jest.useFakeTimers();
    jest.clearAllTimers();
    await request(app).get("/generate-key");
  });
  it("Unblocked for use again after 1 minute", async () => {
    const response = await request(app).post("/get-key").send({
      user: "randomNigga",
    });
    expect(response.statusCode).toBe(200);
    const responsebefore1 = await request(app).post("/get-key").send({
      user: "randomNigga",
    });
    expect(responsebefore1.statusCode).toBe(404);

    jest.advanceTimersByTime(1000 * 60 * 2);
    const responseafter1 = await request(app).post("/get-key").send({
      user: "newNigga",
    });
    expect(responseafter1.statusCode).toBe(200);
  });
  afterAll(async () => {
    await server.close();
  });
});
