<template>
  <Page actionBarHidden="true">
    <GridLayout rows="auto, auto, *" class="px-4 bg-white">
      <StackLayout row="0" class="h-12 justify-center">
        <Image
          src="res://back"
          width="24"
          height="24"
          @tap="goBack"
          class="ml-2"
        />
      </StackLayout>

      <StackLayout row="1" class="mt-4">
        <Label
          text="Вход"
          class="text-3xl font-bold text-center"
        />
        <Label
          text="Добро пожаловать в HobbySpark!"
          class="text-lg text-gray-600 text-center mt-2"
        />
      </StackLayout>

      <ScrollView row="2" class="mt-6">
        <StackLayout class="px-2">
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
            class="text-sm text-gray-500 mb-4"
            textWrap="true"
          />

          <Button
            text="Получить код"
            @tap="requestCode"
            class="bg-[#5618D4] text-white rounded-full p-3 mb-4"
          />

          <!-- Поле для кода (появляется после нажатия Получить код) -->
          <TextField
            v-if="codeRequested"
            hint="Код подтверждения"
            keyboardType="number"
            class="border-b border-gray-300 p-2 mb-4"
          />

          <!-- Кнопка входа (активна после ввода кода) -->
          <Button
            v-if="codeRequested"
            text="Войти"
            @tap="login"
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

function login() {
  console.log('Вход выполнен')
}

function goBack() {
  $navigateBack()
}
</script>