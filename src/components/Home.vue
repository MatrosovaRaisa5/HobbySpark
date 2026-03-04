<script lang="ts" setup>
import { $navigateTo } from 'nativescript-vue'
import LoginPage from './LoginPage.vue'
import RegisterPage from './RegisterPage.vue'

function goToLogin() {
  $navigateTo(LoginPage)
}

function goToRegister() {
  $navigateTo(RegisterPage)
}
</script>

<template>
  <Page actionBarHidden="true">
    <GridLayout
      rows="auto, auto, auto, auto, auto, auto"
      class="px-6"
      :style="{ background: 'linear-gradient(155.78deg, #8E5EEDF0 0%, #FA9938F0 100%)' }"
    >
      <StackLayout row="0" class="items-center mt-[70px]">
        <Image src="res://icon" width="72" height="72" class="rounded-2xl" />
      </StackLayout>

      <StackLayout row="1" class="items-center mt-2">
        <Label
          text="HobbySpark"
          class="text-white font-extrabold text-4xl text-center text-shadow-1"
          style="font-family: 'Nunito'"
        />
      </StackLayout>

      <StackLayout row="2" class="items-center mt-5">
        <Label
          text="Искры вдохновения каждый день"
          class="text-white font-extrabold text-2xl text-center text-shadow-2"
          style="font-family: 'Nunito'"
          textWrap="true"
        />
      </StackLayout>

      <StackLayout row="3" class="px-8 mt-8">
        <Label
          text="Увлекательные челленджи, которые поддержат твой путь!"
          class="text-[#5618D4] font-bold text-lg text-center"
          style="font-family: 'Nunito Sans'"
          textWrap="true"
        />
      </StackLayout>

      <StackLayout row="4" class="px-5 mt-8">
        <Label
          text="Попробуй что-то новое без обязательств и стресса"
          class="text-white text-lg text-center text-shadow-3"
          style="font-family: 'Nunito Sans'"
          textWrap="true"
        />
      </StackLayout>

      <StackLayout row="5" class="mt-16 px-3">
        <Button
          @tap="goToLogin"
          class="bg-white text-[#323743] rounded-xl h-17 text-base mb-6"
          style="font-family: 'Nunito Sans'"
        >
          <FormattedString>
            <Span text="Войти"/>
          </FormattedString>
        </Button>

        <Button
          @tap="goToRegister"
          class="bg-white text-[#323743] rounded-xl h-17 text-base mb-6"
          style="font-family: 'Nunito Sans'"
        >
          <FormattedString>
            <Span text="Регистрация"/>
          </FormattedString>
        </Button>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<style scoped>
.text-shadow-1 {
  text-shadow: 0px 2px 4px rgba(24, 24, 32, 0.15);
}
.text-shadow-2 {
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.5);
}
.text-shadow-3 {
  text-shadow: 1px 1px 3.6px rgba(23, 26, 31, 0.25);
}
</style>