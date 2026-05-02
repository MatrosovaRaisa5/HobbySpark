import { Http } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';

const BASE_URL = 'http://10.43.180.61:8080/api';

export const api = {
    async request(endpoint: string, method: string, body?: any, needAuth = true, isMultipart = false) {
        const headers: any = {};
        if (!isMultipart) {
            headers['Content-Type'] = 'application/json';
        }
        if (needAuth) {
            const token = ApplicationSettings.getString('access_token');
            if (token) headers['Authorization'] = `Bearer ${token}`;
        }

        const options: any = {
            url: `${BASE_URL}${endpoint}`,
            method,
            headers,
        };
        if (body) {
            options.content = isMultipart ? body : JSON.stringify(body);
        }

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
                    errorMsg = err.message || errorMsg;
                } catch { /* ignore */ }
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

    // Профиль
    getProfile() {
        return this.request('/user/profile', 'GET');
    },
    updateProfile(data: { name?: string }) {
        return this.request('/user/profile', 'PUT', { name: data.name });
    },
    deleteAccount() {
        return this.request('/user', 'DELETE');
    },

    // Интересы
    getAllInterests() {
        return this.request('/interests', 'GET', undefined, false);
    },
    saveInterests(interestIds: number[]) {
        return this.request('/interests', 'POST', { interestIds });
    },

    // Челленджи
    getChallenges() {
        return this.request('/challenges', 'GET');
    },
    getChallengeById(id: number) {
        return this.request(`/challenges/${id}`, 'GET');
    },

    // Прогресс
    startChallenge(challengeId: number) {
        return this.request(`/challenges/${challengeId}/start`, 'POST');
    },
    getDayTask(challengeId: number, day: number) {
        return this.request(`/challenges/${challengeId}/days/${day}`, 'GET');
    },
    async completeDay(challengeId: number, day: number, mood?: number, note?: string, photoBase64?: string) {
        const body: any = {};
        if (mood !== undefined && mood !== null) body.mood = mood;
        if (note) body.note = note;
        if (photoBase64) body.photoBase64 = photoBase64;
        return this.request(`/challenges/${challengeId}/days/${day}/complete`, 'POST', body);
    },

    // Пользовательские челленджи
    getActiveChallenge(): Promise<{ challengeId: number; title: string; currentDay: number; totalDays: number; completed: boolean } | null> {
        return this.request('/user/challenges', 'GET');
    },
    getNotes() {
        return this.request('/user/notes', 'GET');
    },

    // Приглашение
    getInvite() {
        return this.request('/invite', 'GET', undefined, false);
    },
};