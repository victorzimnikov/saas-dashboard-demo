import { delay, http, HttpResponse } from "msw";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USERS } from "@/constants";
import {
  checkJwt,
  createJwt,
  decodeJwt,
  hashPassword,
  tryJsonStringify,
  verifyPassword,
} from "@/utils";
import type { ErrorResponse, SuccessResponse } from "@/queries";
import type {
  LoginBody,
  LoginResponse,
  RefreshTokenBody,
  RefreshTokenResponse,
  RegisterBody,
} from "@/auth";
import { omit } from "radash";
import { sessionStorage } from "@/storage";
import { getTemporaryUsers } from "./helpers";

const ACCESS_TOKEN_TIME = 3600;
const REFRESH_TOKEN_TIME = 2419200;

export const authHandlers = [
  http.post<object, LoginBody, SuccessResponse<LoginResponse> | ErrorResponse>(
    "/api/auth/login",
    async ({ request }) => {
      try {
        await delay(550);

        const body = await request.json();

        let user = USERS.find((user) => user.email === body?.email);

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

        const accessToken = await createJwt(tokenPayload, ACCESS_TOKEN_TIME, ACCESS_TOKEN_KEY);

        const refreshToken = await createJwt(tokenPayload, REFRESH_TOKEN_TIME, REFRESH_TOKEN_KEY);

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
  http.post<object, RefreshTokenBody, SuccessResponse<RefreshTokenResponse> | ErrorResponse>(
    "/api/auth/refresh-token",
    async ({ request }) => {
      try {
        await delay(550);

        const body = await request.json();

        if (!body.refreshToken) {
          return HttpResponse.json({ error: "Не передан `refreshToken`" }, { status: 400 });
        }

        const isValidToken = await checkJwt(body.refreshToken, REFRESH_TOKEN_KEY);

        if (!isValidToken) {
          return HttpResponse.json(
            { error: "Токен устарел, авторизуйтесь заново" },
            { status: 400 },
          );
        }

        const { sub, role } = decodeJwt(body.refreshToken);

        const user = USERS.find((user) => user.id === sub);

        if (!user) {
          return HttpResponse.json({ error: "Пользователь не найден" }, { status: 400 });
        }

        const tokenPayload = { sub, role };

        const accessToken = await createJwt(tokenPayload, 3600, ACCESS_TOKEN_KEY);

        const refreshToken = await createJwt(tokenPayload, REFRESH_TOKEN_TIME, REFRESH_TOKEN_KEY);

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
