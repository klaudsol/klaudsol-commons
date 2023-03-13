import { COMMUNICATION_LINKS_FAILURE, UNAUTHORIZED } from "./HttpStatuses";

export const slsFetch = async (url, params, extra) => {
  const { retry = 0, unauthorized = null } = extra ?? {};
  const response = await fetch(url, params);
  if (response.status >= 200 && response.status <= 299) {
    return response;
  } else if (response.status === COMMUNICATION_LINKS_FAILURE) {
    if (retry >= 20) {
      throw new Error(`Exceeded retry limit: ${retry}`);
    } else {
      console.error("Contacting server...");
      return await new Promise((resolve, reject) => {
        setTimeout(
          () =>
            resolve(slsFetch(url, params, { retry: retry + 1, unauthorized })),
          500 * Math.pow(2, retry - 1)
        );
      });
    }
  } else if (response.status === UNAUTHORIZED) {
    if (unauthorized) unauthorized();
    return null;
  } else {
    const responseJson = await response.json();

    if (responseJson.message) {
      //Frontend can parse response of backend
      throw new Error(responseJson.message);
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  }
};
