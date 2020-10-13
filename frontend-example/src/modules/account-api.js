import get from "lodash/get";
import omitBy from "lodash/omitBy";
import isEmpty from "lodash/isEmpty";
import axios from "axios";
import ClientFriendlyError from "../state/models/client-friendly-error";

const httpClient = axios.create({
  withCredentials: true,
});
const apiUrl = `${process.env.REACT_APP_ACCOUNT_API}/api/v1/`;

const session = async () => {
  const { data: response } = await httpClient.get(`${apiUrl}account`);

  return {
    account: get(response, "data", null),
  };
};

const login = async (authenticationRequest) => {
  const response = await httpClient.post(`${apiUrl}account/login`, {
    email: authenticationRequest.email,
    password: authenticationRequest.password,
  });

  return {
    account: get(response.data, "data", null),
  };
};

const logout = async () => {
  await httpClient.post(`${apiUrl}account/logout`);
};

const register = async (registrationRequest) => {
  const { data: response } = await httpClient.post(`${apiUrl}account`, {
    name: registrationRequest.name,
    surname: registrationRequest.surname,
    email: registrationRequest.email,
    city: registrationRequest.city,
    phone: registrationRequest.phone,
    postalCode: registrationRequest.postalCode,
    password: registrationRequest.password,
  });

  return {
    account: get(response, "data", null),
  };
};

const update = async (updateRequest) => {
  const normalizedUpdateRequest = omitBy(updateRequest, isEmpty);

  const { data: response } = await httpClient.patch(
    `${apiUrl}account`,
    normalizedUpdateRequest
  );

  return {
    account: get(response, "data", null),
  };
};

const throwClientFriendlyError = (error) => {
  const status = get(error.response, "status", "");
  const requestId = get(error.response, "data.requestId", null);
  const errorMessage = get(error.response, "data.data.error", error.message);

  if (status.toString().startsWith("5") || status.toString().startsWith("4")) {
    throw new ClientFriendlyError(errorMessage, requestId);
  }

  throw new ClientFriendlyError(`Unexpected error: ${errorMessage}`, requestId);
};
const withClientFriendlyError = (asyncFunc) => async (...args) => {
  try {
    return await asyncFunc(...args);
  } catch (error) {
    return throwClientFriendlyError(error);
  }
};

export default {
  session: withClientFriendlyError(session),
  login: withClientFriendlyError(login),
  logout: withClientFriendlyError(logout),
  register: withClientFriendlyError(register),
  update: withClientFriendlyError(update),
};
