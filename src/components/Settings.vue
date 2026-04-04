<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="auto, *">
      <StackLayout row="0" class="header-section">
        <GridLayout columns="auto, *" class="header-content">
          <Image
            col="0"
            src="res://back"
            width="27"
            height="27"
            class="back-button"
            @tap="goBack"
          />
          <Label col="1" text="Настройки" class="header-title" />
        </GridLayout>
      </StackLayout>
      <ScrollView row="1" class="content-scroll">
        <StackLayout class="content-container">
          <StackLayout class="settings-block">
            <Label text="Основные" class="block-title" />

            <GridLayout columns="*, auto" class="settings-card" @tap="goToPersonalData">
              <StackLayout col="0" class="card-text-container">
                <Label text="Личные данные" class="card-main-text" />
                <Label text="Управляйте вашей учетной записью и профилем" class="card-sub-text" textWrap="true" />
              </StackLayout>
              <Image col="1" src="res://next" width="20" height="20" class="card-arrow" />
            </GridLayout>

            <GridLayout columns="*, auto" class="settings-card" @tap="goToLanguage">
              <StackLayout col="0" class="card-text-container">
                <Label text="Язык" class="card-main-text" />
                <Label text="Измените язык интерфейса приложения" class="card-sub-text" textWrap="true" />
              </StackLayout>
              <Image col="1" src="res://next" width="20" height="20" class="card-arrow" />
            </GridLayout>
          </StackLayout>

          <StackLayout class="settings-block">
            <Label text="Уведомления" class="block-title" />

            <GridLayout columns="*, auto" class="settings-card" @tap="toggleNotifications">
              <StackLayout col="0" class="card-text-container">
                <Label text="Разрешить все уведомления" class="card-main-text" />
                <Label text="Получайте все уведомления: ваши искры и достижения" class="card-sub-text" textWrap="true" />
              </StackLayout>
              <StackLayout col="1" class="checkbox" :class="{ 'checkbox-enabled': notificationsEnabled, 'checkbox-disabled': !notificationsEnabled }">
                <Label text="✓" class="checkbox-tick" />
              </StackLayout>
            </GridLayout>
          </StackLayout>

          <StackLayout class="settings-block">
            <Label text="Аккаунт" class="block-title" />

            <GridLayout columns="*, auto" class="settings-card">
              <StackLayout col="0" class="card-text-container">
                <Label text="Выход из аккаунта" class="card-main-text" />
                <Label text="Завершить текущий сеанс" class="card-sub-text" textWrap="true" />
              </StackLayout>
              <Button col="1" text="Выйти" class="action-button logout-button" @tap="logout" />
            </GridLayout>

            <GridLayout columns="*, auto" class="settings-card">
              <StackLayout col="0" class="card-text-container">
                <Label text="Удаление данных" class="card-main-text" />
                <Label text="Удалить все данные и аккаунт" class="card-sub-text" textWrap="true" />
              </StackLayout>
              <Button col="1" text="Удалить" class="action-button delete-button" @tap="deleteAccount" />
            </GridLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'nativescript-vue'
import { $navigateBack, $navigateTo } from 'nativescript-vue'
import { ApplicationSettings, Dialogs } from '@nativescript/core'
import LoginPage from './LoginPage.vue'
import PersonalDataPage from './PersonalDataPage.vue'

const notificationsEnabled = ref(true)

function toggleNotifications() {
  notificationsEnabled.value = !notificationsEnabled.value
  ApplicationSettings.setBoolean('notifications_enabled', notificationsEnabled.value)
}

function goBack() { $navigateBack() }
function goToPersonalData() { $navigateTo(PersonalDataPage) }
function goToLanguage() { console.log('Переход к языку') }

function logout() {
  ApplicationSettings.remove('access_token')
  ApplicationSettings.remove('refresh_token')
  ApplicationSettings.remove('user_name')
  ApplicationSettings.remove('user_login')
  ApplicationSettings.remove('pending_user_name')
  $navigateTo(LoginPage, { clearHistory: true })
}

function deleteAccount() {
  Dialogs.confirm('Удалить аккаунт? Это необратимо.').then(async (ok) => {
    if (ok) {
      await Dialogs.alert('Функция удаления пока не реализована на сервере')
    }
  })
}

onMounted(() => {
  const saved = ApplicationSettings.getBoolean('notifications_enabled', true)
  notificationsEnabled.value = saved
})
</script>

<style scoped>
.page {
  background-color: white;
  margin: 40px;
}

.header-section {
  background-color: white;
  padding: 20px 20px 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
}

.header-content {
  align-items: center;
}

.back-button {
  margin-right: 17px;
}

.header-title {
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #181820;
  margin-top: 27px;
  margin-left: 20px;
  margin-bottom: 40px;
}

.content-scroll {
  background-color: white;
}

.content-container {
  padding: 0 24px 20px 24px;
}

.block-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #181820;
  margin-top: 24px;
  margin-bottom: 16px;
}

.settings-card {
  background-color: white;
  border-radius: 25px;
  padding: 15px 20px;
  margin-bottom: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.133);
  align-items: center;
}

.card-text-container {
  padding-right: 16px;
}

.card-main-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #181820;
  margin-bottom: 20px;
}

.card-sub-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #363645;
  margin-bottom: 20px;
}

.card-arrow {
  margin-left: auto;
}

.checkbox {
  width: 85px;
  height: 85px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.checkbox-enabled {
  background-color: #8E5EED;
}

.checkbox-disabled {
  background-color: #9b9ea3;
}

.checkbox-tick {
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}

.action-button {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 90px;
  width: 280px;
  border-radius: 35px;
  padding: 0 12px;
  margin-left: 16px;
}

.logout-button {
  background-color: white;
  color: #181820;
  border-width: 1px;
  border-color: #E0E0E6;
}

.delete-button {
  background-color: #E05269;
  color: white;
  border-width: 0;
}
</style>