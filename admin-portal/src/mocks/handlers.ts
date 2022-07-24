import { rest } from "msw";

export const handlers = [
  rest.get("/medicalneeds", (req, res, ctx) => {
    return res(
      ctx.json({
        need: "test",
      })
    );
  }),
];
