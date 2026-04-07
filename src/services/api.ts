import { Http } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';

const BASE_URL = 'http://10.88.211.11:8080';

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
      content: body ? JSON.stringify(body) : undefined,
    };
    const response = await Http.request(options);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.content) {
        try { return response.content.toJSON(); } catch { return response.content.toString(); }
      }
      return null;
    } else {
      let errorMsg = `Ошибка ${response.statusCode}`;
      if (response.content) {
        try { const err = response.content.toJSON(); errorMsg = err.message || errorMsg; } catch {}
      }
      throw new Error(errorMsg);
    }
  },

  // Аутентификация
  signup(login: string, password: string, name: string) {
    return this.request('/auth/signup', 'POST', { login, password, name }, false);
  },
  login(login: string, password: string) {
    return this.request('/auth/login', 'POST', { login, password }, false);
  },
  getProfile() {
    return this.request('/users/me', 'GET');
  },
  updateProfile(data: { name?: string; avatar_url?: string | null; bio?: string | null }) {
    return this.request('/users/me', 'PUT', data);
  },

  // Интересы
  getAllInterests() {
    return this.request('/interests/all', 'GET', undefined, false); // без авторизации
  },
  getMyInterests() {
    return this.request('/interests/me', 'GET');
  },
  updateMyInterests(interestNames: string[]) {
    return this.request('/interests/me', 'PUT', { interestNames });
  },

  // Челленджи
  getChallenges(page = 1, size = 10) {
    return this.request(`/challenges?page=${page}&size=${size}`, 'GET', undefined, false);
  },
  getChallengeById(id: number | string) {
    return this.request(`/challenges/${id}`, 'GET', undefined, false);
  },

  // Прогресс
  startChallenge(challengeId: string) {
    return this.request('/progress/start', 'POST', { challengeId });
  },
  completeDay(challengeId: string, day: number, note: string, mood: string) {
    return this.request('/progress/complete-day', 'POST', { challengeId, day, note, mood });
  },
  getMyProgress() {
    return this.request('/progress/me', 'GET');
  },
};