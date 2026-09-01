import { delay, http, HttpResponse } from "msw";
import {
  checkJwt,
  createJwt,
  decodeJwt,
  hashPassword,
  tryJsonStringify,
  verifyPassword,
} from "@saas-dashboard/utils";
import { omit } from "radash";
import { sessionStorage } from "@saas-dashboard/storage";
import { getTemporaryUsers } from "../helpers";
import { createUsersMock } from "../data";
import type {
  ErrorResponse,
  LoginBody,
  LoginResponse,
  RefreshTokenBody,
  RefreshTokenResponse,
  RegisterBody,
  SuccessResponse,
} from "@saas-dashboard/contracts";

const ACCESS_TOKEN_TIME = 3600;
const REFRESH_TOKEN_TIME = 2419200;

export type AuthMockOptions = {
  accessTokenSecret: string;
  refreshTokenSecret: string;
};

const users = createUsersMock();

export const createAuthHandlers = ({ accessTokenSecret, refreshTokenSecret }: AuthMockOptions) => [
  http.post<object, LoginBody, LoginResponse | ErrorResponse>(
    "/api/auth/login",
    async ({ request }) => {
      try {
        await delay(550);

        const body = await request.json();

        let user = users.find((user) => user.email === body?.email);

        if (!user) {
          const temporaryUsers = getTemporaryUsers();

          user = temporaryUsers.find((user) => user.email === body?.email);
        }

        const isValidPassword =
          user?.password && body?.password
            ? await verifyPassword(body.password, user.password)
            : false;

        if (!user || !isValidPassword) {
          return HttpResponse.json({ error: "Неверный логин или пароль" }, { status: 400 });
        }

        const tokenPayload = { sub: user.id, role: user.role };

        const accessToken = await createJwt(tokenPayload, ACCESS_TOKEN_TIME, accessTokenSecret);

        const refreshToken = await createJwt(tokenPayload, REFRESH_TOKEN_TIME, refreshTokenSecret);

        return HttpResponse.json({
          data: {
            accessToken,
            refreshToken,
            user: omit(user, ["password", "username"]),
          },
        });
      } catch (e) {
        if (e instanceof HttpResponse) {
          return e;
        }

        if (e instanceof Error) {
          return HttpResponse.json({ error: e.message }, { status: 500 });
        }

        return HttpResponse.json({ error: "Что-то пошло не так" }, { status: 500 });
      }
    },
  ),
  http.post<object, RegisterBody, SuccessResponse<null> | ErrorResponse>(
    "/api/auth/register",
    async ({ request }) => {
      try {
        await delay(550);

        const { password, privacyAccept, ...body } = await request.json();

        if (!privacyAccept) {
          return HttpResponse.json({ error: "Privacy required" }, { status: 400 });
        }

        const temporaryUsers = getTemporaryUsers();

        const passwordHash = await hashPassword(password);

        const temporaryUsersJson = tryJsonStringify([
          ...temporaryUsers,
          {
            ...body,
            role: "user",
            id: `${Date.now()}`,
            password: passwordHash,
          },
        ]);

        if (temporaryUsersJson.ok) {
          sessionStorage.setItem("demo/vuejs/users", temporaryUsersJson.value);

          return HttpResponse.json({
            data: null,
          });
        }

        return HttpResponse.json({ error: "Что-то пошло не так" }, { status: 500 });
      } catch (e) {
        if (e instanceof HttpResponse) {
          return e;
        }

        if (e instanceof Error) {
          return HttpResponse.json({ error: e.message }, { status: 500 });
        }

        return HttpResponse.json({ error: "Что-то пошло не так" }, { status: 500 });
      }
    },
  ),
  http.post<object, RefreshTokenBody, RefreshTokenResponse | ErrorResponse>(
    "/api/auth/refresh-token",
    async ({ request }) => {
      try {
        await delay(550);

        const body = await request.json();

        if (!body.refreshToken) {
          return HttpResponse.json({ error: "Не передан `refreshToken`" }, { status: 400 });
        }

        const isValidToken = await checkJwt(body.refreshToken, refreshTokenSecret);

        if (!isValidToken) {
          return HttpResponse.json(
            { error: "Токен устарел, авторизуйтесь заново" },
            { status: 400 },
          );
        }

        const { sub, role } = decodeJwt(body.refreshToken);

        const user = users.find((user) => user.id === sub);

        if (!user) {
          return HttpResponse.json({ error: "Пользователь не найден" }, { status: 400 });
        }

        const tokenPayload = { sub, role };

        const accessToken = await createJwt(tokenPayload, 3600, accessTokenSecret);

        const refreshToken = await createJwt(tokenPayload, REFRESH_TOKEN_TIME, refreshTokenSecret);

        return HttpResponse.json({
          data: {
            accessToken,
            refreshToken,
            user: omit(user, ["password", "username"]),
          },
        });
      } catch (e) {
        if (e instanceof HttpResponse) {
          return e;
        }

        if (e instanceof Error) {
          return HttpResponse.json({ error: e.message }, { status: 500 });
        }

        return HttpResponse.json({ error: "Что-то пошло не так" }, { status: 500 });
      }
    },
  ),
];
