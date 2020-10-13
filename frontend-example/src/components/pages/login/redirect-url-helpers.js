import get from "lodash/get";
import queryString from "query-string";
import routes from "../../../routes";

const getProtectedReturnUrl = (location) => {
  const from = get(location, "state.from", null);

  return from ? encodeURI(from.pathname + from.search) : null;
};

const getRedirectUrl = (location) => {
  if (location.search) {
    const queryStringParsed = queryString.parse(location.search);

    if (queryStringParsed.returnUrl) {
      return decodeURI(queryStringParsed.returnUrl);
    }
  }

  const protectedReturnUrl = getProtectedReturnUrl();

  return protectedReturnUrl
    ? encodeURI(protectedReturnUrl.pathname + protectedReturnUrl.search)
    : routes.dashboard.root;
};

export { getRedirectUrl, getProtectedReturnUrl };
