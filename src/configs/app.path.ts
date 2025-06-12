export const APP_ROUTES = {
  ROOT: { PATH: "/" },

  AUTH: {
    ROOT: { PATH: "/auth", NAME: "auth" },
    LOGIN: { PATH: "/auth/login", NAME: "login" },
    REGISTER: { PATH: "/auth/register", NAME: "register" },
  },

  PROFILE:{ PATH: "/profile", NAME: "profile"}
};
