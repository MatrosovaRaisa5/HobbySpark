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

            <GridLayout columns="*, auto" class="settings-card">
                <StackLayout col="0" class="card-text-container">
                <Label text="Разрешить все уведомления" class="card-main-text" />
                <Label text="Получайте все уведомления: ваши искры и достижения" class="card-sub-text" textWrap="true" />
                </StackLayout>

                <GridLayout col="1"
                            class="switch-container"
                            @tap="toggleNotifications"
                            :backgroundColor="notificationsEnabled ? '#8E5EED' : '#BDC1CA'">
                <GridLayout :col="notificationsEnabled ? 1 : 0"
                            width="20" height="20"
                            borderRadius="10"
                            backgroundColor="white"
                            margin="2" />
                </GridLayout>
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
  import { ref } from 'nativescript-vue'
  import { $navigateBack } from 'nativescript-vue'

  const notificationsEnabled = ref(true)

  function toggleNotifications() {
    notificationsEnabled.value = !notificationsEnabled.value
  }

  function goBack() {
    $navigateBack()
  }

  function goToPersonalData() {
    console.log('Переход к личным данным')
  }

  function goToLanguage() {
    console.log('Переход к настройкам языка')
  }

  function logout() {
    console.log('Выход из аккаунта')
  }

  function deleteAccount() {
    console.log('Удаление аккаунта')
  }
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

  .switch-container {
  width: 44;
  height: 24;
  border-radius: 12;
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