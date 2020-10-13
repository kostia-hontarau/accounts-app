import { actionType as actionTypeEnum } from "../constants";

const getActionTypeFullName = (actionType, asyncActionState) =>
  [actionType, asyncActionState].join("_");

const getActionTypesFullNames = (asyncActionStates = []) =>
  Object.values(actionTypeEnum).reduce((acc, actionType) => {
    asyncActionStates.forEach((asyncActionState) => {
      if (asyncActionState) {
        acc.push(getActionTypeFullName(actionType, asyncActionState));
      } else {
        acc.push(actionType);
      }
    });

    return acc;
  }, []);

export default {
  getActionTypesFullNames,
  getActionTypeFullName,
};
