import { api } from '../../../helpers/interceptors/api.interceptor';

export const createPortfolioService = async (formData: FormData) => {
  return await api.post('/portfolio', formData);
}

export const getPortfolioService = async () => {
  return await api.get('/portfolio');
}

export const getPortfolioMainService = async () => {
  return await api.get('/getPortfolio');
}

export const loginService = async (credentials: { username: string; password: string }) => {
  return await api.post('/auth', credentials);
}
