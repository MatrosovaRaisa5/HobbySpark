import { isAndroid, isIOS, Utils } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';
import { request as requestPermission } from '@nativescript-community/perms';

declare const android: any;

export class LocalNotificationService {
    static async requestPermissions(): Promise<boolean> {
        try {
            if (isAndroid) {
                const apiLevel = android.os.Build.VERSION.SDK_INT;
                if (apiLevel >= 33) {
                    console.log('Android 13+: Запрашиваем разрешение POST_NOTIFICATIONS');
                    const result = await requestPermission('notification', ['alert', 'badge', 'sound']);
                    const isGranted = result === 'authorized' || result === 'limited';
                    console.log(`Результат: ${result} - ${isGranted ? '✅' : '❌'}`);
                    if (isGranted) {
                        this.createNotificationChannel();
                    }
                    return isGranted;
                } else {
                    const has = await LocalNotifications.hasPermission();
                    if (!has) return await LocalNotifications.requestPermission();
                    return true;
                }
            } else if (isIOS) {
                return await LocalNotifications.requestPermission();
            }
            return false;
        } catch (err) {
            console.error('Ошибка запроса разрешений:', err);
            return false;
        }
    }

    private static createNotificationChannel() {
        if (isAndroid && android.os.Build.VERSION.SDK_INT >= 26) {
            const context = Utils.android.getApplicationContext();
            const manager = context.getSystemService(android.content.Context.NOTIFICATION_SERVICE);
            const channelId = 'hobbyspark_channel';
            const channel = new android.app.NotificationChannel(
                channelId,
                'HobbySpark Уведомления',
                android.app.NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription('Уведомления о челленджах и достижениях');
            manager.createNotificationChannel(channel);
            console.log('✅ Канал уведомлений создан');
        }
    }

    static async schedule(options: {
        id: number;
        title: string;
        body: string;
        at?: Date;
        sound?: string;
        badge?: number;
    }): Promise<void> {
        if (isAndroid && android.os.Build.VERSION.SDK_INT >= 33) {
            await this.scheduleNativeAndroid(options);
        } else if (isAndroid) {
            // Для старых версий используем плагин, но добавим иконку
            await LocalNotifications.schedule([{
                id: options.id,
                title: options.title,
                body: options.body,
                at: options.at,
                sound: options.sound,
                badge: options.badge,
                icon: 'drawable://ic_stat_star_half',   // ← ваша иконка
            }]);
        } else if (isIOS) {
            await LocalNotifications.schedule([{
                id: options.id,
                title: options.title,
                body: options.body,
                at: options.at,
                sound: options.sound,
                badge: options.badge,
            }]);
        }
    }

    private static async scheduleNativeAndroid(options: {
        id: number;
        title: string;
        body: string;
        at?: Date;
        sound?: string;
    }): Promise<void> {
        const context = Utils.android.getApplicationContext();
        const manager = context.getSystemService(android.content.Context.NOTIFICATION_SERVICE);
        const channelId = 'hobbyspark_channel';

        const builder = new android.app.Notification.Builder(context, channelId);
        builder.setContentTitle(options.title);
        builder.setContentText(options.body);
        // Загружаем вашу иконку через ресурсы
        const iconResId = context.getResources().getIdentifier(
            'ic_stat_star_half', 'drawable', context.getPackageName()
        );
        if (iconResId !== 0) {
            builder.setSmallIcon(iconResId);
            console.log('✅ Иконка уведомления загружена');
        } else {
            // fallback — стандартная иконка, если ваша не найдена
            builder.setSmallIcon(android.R.drawable.ic_dialog_info);
            console.warn('⚠️ Иконка ic_stat_star_half не найдена, используется стандартная');
        }
        builder.setAutoCancel(true);
        if (options.sound) {
            builder.setDefaults(android.app.Notification.DEFAULT_SOUND);
        }

        const notification = builder.build();
        const notificationId = options.id;

        if (options.at && options.at.getTime() > Date.now()) {
            const delay = options.at.getTime() - Date.now();
            const handler = new android.os.Handler(android.os.Looper.getMainLooper());
            handler.postDelayed(() => {
                manager.notify(notificationId, notification);
                console.log(`Уведомление показано через ${delay} мс`);
            }, delay);
        } else {
            manager.notify(notificationId, notification);
            console.log('✅ Уведомление показано немедленно');
        }
    }

    // ТЕСТОВОЕ УВЕДОМЛЕНИЕ – отправляется сразу (без задержки)
    static async scheduleTestEveryMinute() {
        await this.cancelAll();
        if (isAndroid && android.os.Build.VERSION.SDK_INT >= 33) {
            await this.schedule({
                id: 999,
                title: '🌟 Поставь искру сегодня!',
                body: 'Не пропусти задание в челлендже',
                sound: 'default',
            });
            console.log('✅ Тестовое уведомление отправлено немедленно (нативный API)');
        } else if (isAndroid) {
            await LocalNotifications.schedule([{
                id: 999,
                title: '🌟 Поставь искру сегодня!',
                body: 'Не пропусти задание в челлендже',
                at: new Date(Date.now() + 1000),
                sound: 'default',
                badge: 1,
                icon: 'drawable://ic_stat_star_half',
            }]);
            console.log('✅ Тестовое уведомление запланировано (плагин)');
        } else if (isIOS) {
            const fireDate = new Date(Date.now() + 3000);
            await LocalNotifications.schedule([{
                id: 999,
                title: '🌟 Поставь искру сегодня!',
                body: 'Не пропусти задание в челлендже',
                at: fireDate,
                sound: 'default',
            }]);
            console.log('✅ Тестовое уведомление запланировано на iOS');
        }
    }

    static async scheduleDailyReminder() {
        await this.cancelAll();
        const now = new Date();
        let target = new Date();
        target.setHours(10, 0, 0, 0);
        if (now >= target) target.setDate(target.getDate() + 1);
        await this.schedule({
            id: 1,
            title: '🌟 Поставь искру сегодня!',
            body: 'Не пропусти задание в челлендже',
            at: target,
            sound: 'default',
        });
        console.log(`✅ Ежедневное уведомление запланировано на ${target.toLocaleString()}`);
    }

    static async cancelAll() {
        if (isAndroid && android.os.Build.VERSION.SDK_INT >= 33) {
            const context = Utils.android.getApplicationContext();
            const manager = context.getSystemService(android.content.Context.NOTIFICATION_SERVICE);
            manager.cancelAll();
            console.log('✅ Все нативные уведомления отменены');
        } else {
            await LocalNotifications.cancelAll();
            console.log('✅ Все уведомления (плагин) отменены');
        }
    }
}