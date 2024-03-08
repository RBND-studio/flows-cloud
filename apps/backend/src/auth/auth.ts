import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator, UnauthorizedException } from "@nestjs/common";
import { verify } from "jsonwebtoken";

export type Auth = {
  userId: string;
  email?: string;
};

const verifyJwt = (authorization: string): Auth | null => {
  try {
    const token = authorization.split("Bearer ").pop();
    if (!token) throw new Error();
    const user = verify(token, process.env.BACKEND_JWT_SECRET) as { sub: string; email?: string };
    return { userId: user.sub, email: user.email };
  } catch (err) {
    return null;
  }
};

export const Authorization = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ headers: { authorization?: string } }>();
  const authorization = request.headers.authorization;
  if (!authorization) throw new UnauthorizedException();
  const auth = verifyJwt(authorization);
  if (!auth) throw new UnauthorizedException();
  return auth;
});
