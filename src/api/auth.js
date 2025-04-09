import {ENV} from "../utils";
const {BASE_PATH, API_ROUTES} = ENV;

export class Auth{
    async signIn(data){
        const response = await fetch(`${ENV.BASE_API}${API_ROUTES.SIGNIN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log(response);
    }

    async signInVerify(data) {
        const response = await fetch(
          `${ENV.BASE_API}${API_ROUTES.SIGNINVERIFY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.message || "Verification failed");
        }
        return response.json();
      }
};

export const auth = new Auth();