import { createApp } from 'nativescript-vue';
import App from './App.vue';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging';
import { initPushNotifications } from './services/notifications';


const messaging = firebase().messaging();

messaging.onNotificationTap((message: any) => {
    const notificationData = message.data;
    const notificationTitle = message.notification?.title;
    const notificationBody = message.notification?.body;
    console.log('Нажатие на уведомление:', notificationTitle, notificationBody, notificationData);
    // здесь можно перенаправить на нужный экран
});

createApp(App).start();

// Инициализация уведомлений
initPushNotifications().catch(err => console.error('initPushNotifications error', err));
