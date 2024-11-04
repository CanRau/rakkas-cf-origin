import cloudflareWorkersAdapter from "@hattip/adapter-cloudflare-workers";
import type { Request, ExecutionContext } from "@cloudflare/workers-types";
import hattipHandler from "./entry-hattip";

interface Env {
  RAKKAS_BUILD_TYPE: string;
}

export default {
  fetch: fetchHandler,
};

async function fetchHandler(
  req: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  console.log("Rakkas-Proxy", req.url);

  // if (!globalThis.process?.env) {
  //   globalThis.process = globalThis.process || {};
  //   globalThis.process.env = new Proxy(
  //     {},
  //     {
  //       get(_, key) {
  //         if (typeof env[key] === "string") {
  //           return env[key];
  //         }
  //         return undefined;
  //       },
  //     },
  //   );
  // }

  // if (!handler) {
  //   const hattipHandler = await import("./entry-hattip");
  //   console.log("hattipHandler.default", hattipHandler.default);
  //   handler = cloudflareWorkersAdapter(hattipHandler.default);
  //   console.log("handler", handler);
  // }

  // console.log("req", JSON.stringify(req, null, 2));
  // console.log("env", JSON.stringify(env, null, 2));
  // console.log("ctx", JSON.stringify(ctx, null, 2));

  return cloudflareWorkersAdapter(hattipHandler)(req, env, ctx);
}
