<template>
  <Page actionBarHidden="true" class="page-gradient">
    <GridLayout rows="auto, *">
      <StackLayout row="0" class="white-header">
        <GridLayout columns="auto, *" class="header-content">
          <Image
            col="0"
            src="res://back"
            width="24"
            height="24"
            @tap="goBack"
          />
          <Label col="1" text="Вход" class="header-title" />
        </GridLayout>
        <Label
          text="Добро пожаловать в HobbySpark!"
          class="header-subtitle"
          textWrap="true"
        />
      </StackLayout>

      <ScrollView row="1" class="form-scroll">
        <StackLayout class="form-container">
          <GridLayout columns="auto, *" class="phone-container">
            <Label col="0" text="+7" class="phone-prefix" />
            <TextField
              col="1"
              hint=""
              keyboardType="phone"
              class="input phone-input"
            />
          </GridLayout>

          <Label
            text="Мы отправим код подтверждения на ваш номер телефона"
            class="info-text"
            textWrap="true"
          />

          <Button
            @tap="requestCode"
            text="Получить код"
            class="button"
          />

          <!-- Поле для кода (появляется после нажатия "Получить код") -->
          <StackLayout v-if="codeRequested" class="textbox">
            <TextField
              hint="Код подтверждения"
              keyboardType="number"
              class="input"
            />
          </StackLayout>

          <!-- Кнопка входа (появляется после запроса кода) -->
          <Button
            v-if="codeRequested"
            @tap="login"
            text="Войти"
            class="button"
          />
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { $navigateBack } from 'nativescript-vue'

const codeRequested = ref(false)

function requestCode() {
  codeRequested.value = true
}

function login() {
  console.log('Вход выполнен')
  // Здесь добавить логику проверки кода и входа
}

function goBack() {
  $navigateBack()
}
</script>

<style scoped>
.page-gradient {
  background: linear-gradient(155.78deg, #8e5eedba 0%, #fa9938c6 100%);
}

.white-header {
  background-color: white;
  padding: 40px;
  margin-bottom: 70px;
}

.header-content {
  align-items: center;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  font-family: 'Nunito', sans-serif;
  text-align: center;
  padding-right: 80px;
}

.header-subtitle {
  font-size: 16px;
  color: #242424;
  text-align: center;
  margin-top: 15px;
  font-family: 'Nunito Sans', sans-serif;
}

.form-scroll {
  background-color: transparent;
}

.form-container {
  padding: 27px;
}

.textbox {
  margin-bottom: 80px;
}

.input {
  width: 95%;
  height: 150px;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 16px;
  font-family: 'Nunito Sans', sans-serif;
  background-color: white;
  border-width: 9px;
  border-color: #8b60e0;
  border-radius: 50px;
}

.info-text {
  font-size: 15px;
  color: #333333;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 70px;
  font-family: 'Nunito Sans', sans-serif;
}

.button {
  width: 70%;
  height: 150px;
  background-color: #854ef3;
  color: white;
  font-size: 16px;
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
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 80px;
  align-items: stretch;
}

.phone-prefix {
  font-size: 16px;
  font-family: 'Nunito Sans', sans-serif;
  color: #363645;
  background-color: white;
  border-width: 9px;
  border-color: #8E5EED;
  border-right-width: 0;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding: 0 12px;
  text-align: center;
  line-height: 150px;
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