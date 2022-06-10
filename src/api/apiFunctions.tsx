import { tokenKey } from "../constants/constants";

export const fetchAnonymous = () => {
  return fetch("https://thebetter.bsgroup.eu/Authorization/SignIn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Device: {
        PlatformCode: "WEB",
        Name: "7a6a86e5-356f-4795-8998-305e1b205531",
      },
    }),
  }).then((res) => res.json());
};

export const fetchLogged = (login: string, password: string) => {
  return fetch("https://thebetter.bsgroup.eu/Authorization/SignIn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Username: login,
      Password: password,
      Device: {
        PlatformCode: "WEB",
        Name: "7a6a86e5-356f-4795-8998-305e1b205531",
      },
    }),
  }).then((res) => res.json());
};

export const fetchMovie = (logged: boolean, id: string) => {
  return fetch("https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem(tokenKey) as string
      )}`,
    },
    body: logged
      ? JSON.stringify({
          MediaId: Number(id),
          StreamType: "MAIN",
        })
      : JSON.stringify({
          MediaId: Number(id),
          StreamType: "TRIAL",
        }),
  }).then((res) => res.json());
};

export const fetchMovies = (MediaListId: number) => {
  return fetch("https://thebetter.bsgroup.eu/Media/GetMediaList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem(tokenKey) as string
      )}`,
    },
    body: JSON.stringify({
      MediaListId: MediaListId,
      IncludeCategories: false,
      IncludeImages: true,
      IncludeMedia: true,
      PageNumber: 1,
      PageSize: 15,
    }),
  }).then((res) => res.json());
};
