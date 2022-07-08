import { message } from "antd";
import { User } from "Types/user";
import { HttpClient } from "./httpClient";

export default class AuthorizationApi extends HttpClient {
  static login(email: string, password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await AuthorizationApi.post("/login", {
          user: { email, password },
        });

        let authorization = response.headers["authorization"];

        if (!authorization) {
          const reason = "Failed to get Authorization token!";
          message.error(reason);
          reject(new Error(reason));
          return;
        }

        resolve(authorization);
      } catch (err) {
        reject(err);
      }
    });
  }

  static me(accessToken: string): Promise<User> {
    return new Promise((resolve, reject) => {
      try {
        const user: User = {
          id: "5e86809283e28b96d2d38537",
          avatar: "/static/mock-images/avatars/avatar-jane_rotanson.png",
          email: "demo@demo.com",
          name: "Ahsan Ali Mansoor",
          password: "Password123!",
          plan: "Premium",
        };

        resolve(user);
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  static register(
    email: string,
    name: string,
    password: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Find the user
        resolve("accessToken");
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  static get authorization_token(): string {
    return `${window.localStorage.getItem("accessToken")}`;
  }
}
