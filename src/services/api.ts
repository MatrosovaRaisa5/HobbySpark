import { Http, ApplicationSettings } from '@nativescript/core';

const BASE_URL = 'https://api.bruhnet.caravanlabs.ru';

export const api = {
  async request(endpoint: string, method: string, body?: any, needAuth = true) {
    const headers: any = { 'Content-Type': 'application/json' };
    if (needAuth) {
      const token = ApplicationSettings.getString('access_token');
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    const options: any = {
      url: `${BASE_URL}${endpoint}`,
      method,
      headers,
    };
    if (body) options.content = JSON.stringify(body);

    const response = await Http.request(options);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.content) {
        try {
          return response.content.toJSON();
        } catch {
          return response.content.toString();
        }
      }
      return null;
    } else {
      let errorMsg = `Ошибка ${response.statusCode}`;
      if (response.content) {
        try {
          const err = response.content.toJSON();
          errorMsg = err.detail?.[0]?.msg || err.message || errorMsg;
        } catch {}
      }
      throw new Error(errorMsg);
    }
  },

  signup(login: string, password: string, name: string) {
    return this.request('/users/signup', 'POST', { login, password, name }, false);
  },

  login(login: string, password: string) {
    return this.request('/users/login', 'POST', { login, password }, false);
  },

  updateProfile(data: { name: string; avatar_url?: string | null; bio?: string | null }) {
    return this.request('/users/me', 'PUT', data, true);
  },
};