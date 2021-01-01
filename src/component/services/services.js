import { api } from './apiServices';
const model = 'todos';
export const service = {
  login: token => {
    return api.invoke('POST', `${model}/login`, { token });
  }
};
