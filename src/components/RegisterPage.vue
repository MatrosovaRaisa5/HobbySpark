<template>
    <Page actionBarHidden="true">
      <GridLayout rows="auto, auto, *" class="px-4 bg-white">
        <StackLayout row="0" class="h-12">
          <Image
            src="res://back"
            width="24"
            height="24"
            @tap="goBack"
            class="ml-"
          />
        </StackLayout>

        <StackLayout row="1" class="">
          <Label text="Регистрация" class="text-3xl text-lg font-bold" />
          <Label
            text="Добро пожаловать в HobbySpark!"
            class="text-lg text-gray-600 text-center mt-5"
          />
        </StackLayout>

        <!-- Форма -->
        <ScrollView row="2" class="mt-6">
          <StackLayout class="px-2">
            <!-- Имя и Фамилия -->
            <TextField
              hint="Имя"
              class="border-b border-gray-300 p-2 mb-4"
            />
            <TextField
              hint="Фамилия"
              class="border-b border-gray-300 p-2 mb-4"
            />

            <!-- Выбор страны и номер телефона -->
            <GridLayout columns="auto, *" class="mb-4 border-b border-gray-300 pb-2">
              <Label col="0" text="Россия (+7)" class="text-gray-700" />
              <Image
                col="0"
                src="res://down"
                width="16"
                height="16"
                class="ml-1"
              />
            </GridLayout>
            <TextField
              hint="Номер телефона"
              keyboardType="phone"
              class="border-b border-gray-300 p-2 mb-4"
            />

            <Label
              text="Мы отправим код подтверждения на ваш номер телефона"
              class="text-sm text-gray-500 text-center mb-4"
              textWrap="true"
            />

            <Button
              text="Получить код"
              @tap="requestCode"
              class="bg-[#5618D4] text-white rounded-full p-3 mb-4"
            />

            <TextField
              v-if="codeRequested"
              hint="Код подтверждения"
              keyboardType="number"
              class="border-b border-gray-300 p-2 mb-4"
            />

            <Button
              v-if="codeRequested"
              text="Зарегистрироваться"
              @tap="register"
              class="bg-[#5618D4] text-white rounded-full p-3"
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

function register() {
  console.log('Регистрация завершена')
}

function goBack() {
  $navigateBack()
}
</script>