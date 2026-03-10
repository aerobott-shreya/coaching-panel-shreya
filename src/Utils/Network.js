import axios from "axios";

// export const base_url = "http://13.233.101.193:8000";
// 13.126.122.16
export const base_url = "https://prod-api.brainhap.com/";

// const getToken = () => {
//     var token = ``;
//     if (localStorage.getItem("coaching_user_cred_context")) {
//         let valueVar = localStorage.getItem("coaching_user_cred_context");
//         let parseValue = JSON.parse(valueVar);
//         token = parseValue.token.access;
//     }
//     return token
// }

export const _access_token = localStorage.getItem("token_coaching");
var _headers =
  _access_token === null || _access_token === undefined
    ? {
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_access_token}`,
      };

export var api_open = axios.create({
  baseURL: base_url,
  timeout: 300000000,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    function (data, headers) {
      return JSON.stringify(data);
    },
  ],
});

export var api_token = axios.create({
  baseURL: base_url,
  timeout: 300000000,
  headers: _headers,
  transformRequest: [
    function (data, headers) {
      return JSON.stringify(data);
    },
  ],
});

export function setToken(_token) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem("token_coaching", _token);
      api_token = axios.create({
        baseURL: base_url,
        timeout: 300000000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${_token}`,
          accept:
            "application/json;version=2, text/plain, */*, application/json, text/plain, */*",
        },
        transformRequest: [
          function (data, headers) {
            return JSON.stringify(data);
          },
        ],
      });

      resolve("Successfully set ed5 token.");
    } catch {
      reject("Error to ser ed5 token");
    }
  });
}

export async function formDataApi(
  apiName = "",
  formData,
  patch = false,
  apiUrl = "external/v1/"
) {
  let data = {};
  const token = JSON.parse(localStorage.getItem("token_coaching"));
  if (patch)
    await axios
      .patch(base_url + apiUrl + apiName, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "content-type": "multipart/form-data",
        },
        validateStatus: (status) => status < 500,
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201)
          return (data = response.data.data);
        return (data = response.data);
      })
      .catch((error) => console.log(error));
  else
    await axios
      .post(base_url + apiUrl + apiName, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "content-type": "multipart/form-data",
        },
        validateStatus: (status) => status < 500,
      })
      .then((response) => {
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.data.data
        )
          return (data = response.data.data);
        return (data = response.data);
      })
      .catch((error) => console.log(error));
  return data;
}
