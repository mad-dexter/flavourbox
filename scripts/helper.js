import { API_TIMEOUT } from "./configuration.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJsonResponseFromAPI = async function (url) {
  try {
    const resp = await Promise.race([fetch(url), timeout(API_TIMEOUT)]);

    if (!resp.ok) throw new Error(`Invalid Query for food recipe`);

    const respJson = await resp.json();

    return respJson.hits;
  } catch (err) {
    throw new Error(err);
  }
};
