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
  <Page actionBarHidden="true" class="page-gradient">
    <ScrollView>
      <GridLayout rows="auto, auto, auto, auto, auto, auto" class="px-6">
        <StackLayout row="0" class="items-center mt-[50px]">
          <Image src="res://icon" width="72" height="72" class="image" />
        </StackLayout>

        <StackLayout row="1" class="items-center mt-3">
          <Label text="HobbySpark" class="main-title" textWrap="true" />
        </StackLayout>

        <StackLayout row="2" class="items-center mt-6">
          <Label
            text="Искры вдохновения каждый день"
            class="sub-title"
            textWrap="true"
          />
        </StackLayout>

        <StackLayout row="3" class="px-10 mt-10">
          <Label
            text="Увлекательные челленджи, которые поддержат твой путь!"
            class="description"
            textWrap="true"
          />
        </StackLayout>

        <StackLayout row="4" class="px-4 mt-">
          <Label
            text="Попробуй что-то новое без обязательств и стресса"
            class="tagline"
            textWrap="true"
          />
        </StackLayout>

        <StackLayout row="5" class="mt-10 px-3">
          <Button @tap="goToLogin" class="action-button">
            <FormattedString>
              <Span text="Войти" />
            </FormattedString>
          </Button>

          <Button @tap="goToRegister" class="action-button">
            <FormattedString>
              <Span text="Регистрация" />
            </FormattedString>
          </Button>
        </StackLayout>
      </GridLayout>
    </ScrollView>
  </Page>
</template>

<style scoped>
.page-gradient {
  background: linear-gradient(155.78deg, #8e5eedf0 0%, #fa9938f0 100%);
}

.image {
  align-self: center;
  margin-top: 50px;
}

.main-title {
  font-family: 'Nunito', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: white;
  text-shadow: 0px 2px 4px rgba(24, 24, 32, 0.15);
  text-align: center;
  margin-bottom: 70px;
}

.sub-title {
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: white;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-bottom: 100px;
}

.description {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 19px;
  font-weight: 700;
  color: #5618d4;
  text-align: center;
  margin-bottom: 90px;
  padding-left: 40px;
  padding-right: 40px;
}

.tagline {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 19px;
  color: white;
  text-shadow: 1px 1px 3.6px rgba(23, 26, 31, 0.25);
  text-align: center;
  margin-bottom: 160px;
}

.action-button {
  background-color: white;
  color: #323743;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  border-radius: 70px;
  height: 160px;
  width: 80%;
  margin-bottom: 70px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.156);
  padding: 0;
}

.action-button:active {
  background-color: #f0f0f0;
}
</style>