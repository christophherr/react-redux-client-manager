import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from './types';

export const setDisableBalanceOnAdd = () => {
  const localStorageSettings = JSON.parse(
    localStorage.getItem('CH_CLIENT_MANAGER_SETTINGS')
  );

  localStorageSettings.disableBalanceOnAdd = !localStorageSettings.disableBalanceOnAdd;

  localStorage.setItem(
    'CH_CLIENT_MANAGER_SETTINGS',
    JSON.stringify(localStorageSettings)
  );

  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: localStorageSettings.disableBalanceOnAdd
  };
};
export const setDisableBalanceOnEdit = () => {
  const localStorageSettings = JSON.parse(
    localStorage.getItem('CH_CLIENT_MANAGER_SETTINGS')
  );

  localStorageSettings.disableBalanceOnEdit = !localStorageSettings.disableBalanceOnEdit;

  localStorage.setItem(
    'CH_CLIENT_MANAGER_SETTINGS',
    JSON.stringify(localStorageSettings)
  );

  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: localStorageSettings.disableBalanceOnEdit
  };
};
export const setAllowRegistration = () => {
  const localStorageSettings = JSON.parse(
    localStorage.getItem('CH_CLIENT_MANAGER_SETTINGS')
  );

  localStorageSettings.allowRegistration = !localStorageSettings.allowRegistration;

  localStorage.setItem(
    'CH_CLIENT_MANAGER_SETTINGS',
    JSON.stringify(localStorageSettings)
  );

  return {
    type: ALLOW_REGISTRATION,
    payload: localStorageSettings.allowRegistration
  };
};
