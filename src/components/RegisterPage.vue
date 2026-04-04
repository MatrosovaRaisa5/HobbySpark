<template>
  <Page actionBarHidden="true" class="page-gradient">
    <GridLayout rows="auto, *">
      <StackLayout row="0" class="white-header">
        <GridLayout columns="auto, *" class="header-content">
          <Image col="0" src="res://back" width="24" height="24" @tap="goBack" />
          <Label col="1" text="Регистрация" class="header-title" />
        </GridLayout>
        <Label text="Добро пожаловать в HobbySpark!" class="header-subtitle" textWrap="true" />
      </StackLayout>

      <ScrollView row="1" class="form-scroll">
        <StackLayout class="form-container">
          <TextField v-model="login" hint="Логин" class="input" />
          <TextField v-model="password" hint="Пароль" secure="true" class="input" />
          <TextField v-model="name" hint="Ваше имя" class="input" />
          <Button @tap="doRegister" text="Зарегистрироваться" class="button" />
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { $navigateBack } from 'nativescript-vue'
import { Dialogs, ApplicationSettings } from '@nativescript/core'
import { api } from '~/services/api'

const login = ref('')
const password = ref('')
const name = ref('')

async function doRegister() {
  if (!login.value || !password.value || !name.value) {
    await Dialogs.alert('Заполните все поля')
    return
  }
  try {
    await api.signup(login.value, password.value, name.value)
    ApplicationSettings.setString('reg_name', name.value)
    ApplicationSettings.setString('reg_login', login.value)
    await Dialogs.alert('Регистрация успешна! Теперь войдите.')
    $navigateBack()
  } catch (err: any) {
    await Dialogs.alert('Ошибка: ' + err.message)
  }
}

function goBack() { $navigateBack() }
</script>

<style scoped>
.page-gradient {
  background: linear-gradient(155.78deg, #8e5eed8d 0%, #fa9938a2 100%);
}

.white-header {
  background-color: white;
  padding: 30px 20px 20px 20px;
  margin-bottom: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.header-content {
  align-items: center;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  font-family: 'Nunito', sans-serif;
  text-align: center;
  padding-right: 40px;
}

.header-subtitle {
  font-size: 16px;
  color: #242424;
  text-align: center;
  margin-top: 8px;
  font-family: 'Nunito Sans', sans-serif;
}

.form-scroll {
  background-color: transparent;
}

.form-container {
  padding: 40px;
}

.textbox {
  margin-bottom: 80px;
}

.input {
  width: 90%;
  height: 140px;
  padding: 20px;
  font-size: 16px;
  font-family: 'Nunito Sans', sans-serif;
  background-color: white;
  border-width: 6px;
  border-color: #8b60e0;
  border-radius: 50px;
  margin-bottom: 30px;
}

.info-text {
  font-size: 15px;
  color: #333333;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 30px;
  font-family: 'Nunito Sans', sans-serif;
}

.button {
  width: 75%;
  height: 140px;
  background-color: #854ef3;
  color: white;
  font-size: 18px;
  font-family: 'Nunito Sans', sans-serif;
  border-radius: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 80px;
  padding: 0;
}

.button:active {
  background-color: #5116C8;
}

.phone-container {
  width: 90%;
  margin-bottom: 30px;
  align-items: stretch;
}

.phone-prefix {
  font-size: 16px;
  font-family: 'Nunito Sans', sans-serif;
  color: #363645;
  background-color: white;
  border-width: 6px;
  border-color: #8b60e0;
  border-right-width: 0;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding: 0 20px;
  text-align: center;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
}

.phone-input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: 0;
  width: 100%;
}
</style>