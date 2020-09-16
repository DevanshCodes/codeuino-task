const request = require("supertest");
const app = require("../app");

var key;

describe("Refresh the Key Token", () => {
  beforeAll(async () => {
    server = app.listen(4000, () => {
      console.log("Example app listening on port 4000!");
    });
  });
  beforeEach(async () => {
    jest.useFakeTimers();
    jest.clearAllTimers();
    await request(app).get("/generate-key");
  });

  it("Refresh the Key Token and key deleted after 5 minutes", async () => {
    const response = await request(app).post("/get-key").send({
      user: "random",
    });
    expect(response.statusCode).toBe(200);
    key = response.body.success;

    // const responseN = await request(app).post("/get-key").send({
    //   user: "Random",
    // });
    // expect(response.statusCode).toBe(404);

    jest.advanceTimersByTime(1000 * 60 * 2);
    expect(setTimeout).toBeCalled();

    const responseRefresh = await request(app).post("/refresh-key").send({
      user: "random",
      key: key,
    });
    expect(responseRefresh.statusCode).toBe(200);
    expect(responseRefresh.body).toEqual(
      expect.objectContaining({
        Success: "Refresh successfull after the time",
      })
    );

    jest.advanceTimersByTime(1000 * 60 * 5);
    expect(setTimeout).toBeCalled();

    const responseRefreshafter5 = await request(app).post("/refresh-key").send({
      user: "random",
      key: key,
    });
    expect(responseRefreshafter5.statusCode).toBe(400);
    expect(responseRefreshafter5.body).toEqual(
      expect.objectContaining({
        failed: "key not found",
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        success: expect.any(String),
      })
    );
    expect(response.statusCode).toBe(200);
  });
  afterAll(async () => {
    await server.close();
    jest.clearAllTimers();
  });
});
