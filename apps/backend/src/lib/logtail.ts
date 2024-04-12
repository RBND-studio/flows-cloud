import { Logtail } from "@logtail/node";

export const logtail = new Logtail(process.env.BACKEND_LOGTAIL_TOKEN);
