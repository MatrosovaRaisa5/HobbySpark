import { ApplicationSettings } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging';
import { LocalNotifications } from '@nativescript/local-notifications';
import { api } from './api';
import { isAndroid } from '@nativescript/core';
import { LocalNotificationService } from './local-notifications';

export async function initPushNotifications() {
    try {
        // Запрашиваем разрешение через сервис
        const permissionGranted = await LocalNotificationService.requestPermissions();
        if (!permissionGranted) {
            console.log('❌ Разрешение на уведомления не получено');
            return;
        }
        console.log('✅ Разрешение на уведомления получено');

        // Инициализируем Firebase
        await firebase().initializeApp();
        const messaging = firebase().messaging();

        // iOS дополнительный запрос
        if (!isAndroid) {
            const pushGranted = await messaging.requestPermission();
            if (!pushGranted) {
                console.log('❌ Push-разрешение не получено');
                return;
            }
        }

        // Получаем FCM токен
        const token = await messaging.getToken();
        console.log('📱 FCM Token:', token);

        // Отправляем на сервер
        const authToken = ApplicationSettings.getString('access_token');
        if (authToken) {
            await api.registerPushToken(token);
            console.log('✅ Токен зарегистрирован на сервере');
        }
        ApplicationSettings.setString('fcm_token', token);

        // Обработка сообщений
        messaging.onMessage((message: any) => {
            console.log('📨 Получено сообщение:', message);
            if (message.notification) {
                LocalNotifications.schedule([{
                    id: Date.now(),
                    title: message.notification.title || 'HobbySpark',
                    body: message.notification.body || '',
                    at: new Date(Date.now() + 1000),
                    sound: "default",
                }]);
            }
        });

    } catch (err) {
        console.error('❌ Ошибка инициализации push:', err);
    }
}