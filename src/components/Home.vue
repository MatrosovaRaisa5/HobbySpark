<template>
  <Page actionBarHidden="true" class="page-gradient">
    <GridLayout rows="*, auto">
      <ScrollView row="0">
        <StackLayout class="content-wrapper">
          <StackLayout class="items-center mt-[50px]">
            <Image src="res://icon" width="72" height="72" class="image" />
          </StackLayout>

          <StackLayout class="items-center mt-3">
            <Label text="HobbySpark" class="main-title" textWrap="true" />
          </StackLayout>

          <StackLayout class="items-center mt-6">
            <Label
              text="Искры вдохновения каждый день"
              class="sub-title"
              textWrap="true"
              :opacity="subtitleOpacity"
            />
          </StackLayout>

          <StackLayout class="px-10 mt-10">
            <Label
              text="Увлекательные челленджи, которые поддержат твой путь!"
              class="description"
              textWrap="true"
              :opacity="descriptionOpacity"
            />
          </StackLayout>
        </StackLayout>
      </ScrollView>

      <StackLayout row="1" class="buttons-container">
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
  </Page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'nativescript-vue'
import { $navigateTo } from 'nativescript-vue'
import LoginPage from './LoginPage.vue'
import RegisterPage from './RegisterPage.vue'

const subtitleOpacity = ref(0)
const descriptionOpacity = ref(0)

onMounted(() => {
  setTimeout(() => {
    animateFadeIn(subtitleOpacity)
  }, 1000)


  setTimeout(() => {
    animateFadeIn(descriptionOpacity)
  }, 1900)
})

function animateFadeIn(opacityRef: any) {
  let opacity = 0
  const interval = setInterval(() => {
    opacity += 0.05
    opacityRef.value = opacity
    if (opacity >= 1) {
      opacityRef.value = 1
      clearInterval(interval)
    }
  }, 60)
}

function goToLogin() {
  $navigateTo(LoginPage)
}

function goToRegister() {
  $navigateTo(RegisterPage)
}
</script>

<style scoped>
.page-gradient {
  background: linear-gradient(155.78deg, #8e5eedf0 0%, #fa9938f0 100%);
}

.content-wrapper {
  padding-bottom: 20px;
}

.image {
  align-self: center;
  margin-top: 80px;
}

.main-title {
  font-family: 'Nunito', sans-serif;
  font-size: 40px;
  font-weight: 800;
  color: white;
  text-shadow: 0px 2px 4px rgba(24, 24, 32, 0.15);
  text-align: center;
  margin-bottom: 70px;
}

.sub-title {
  font-family: 'Nunito', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: white;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-bottom: 100px;
  margin-top: 50px;
}

.description {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #520fda;
  text-align: center;
  margin-top: 110px;
  margin-bottom: 20px;
  padding-left: 40px;
  padding-right: 40px;
  min-height: 60px;
}

.buttons-container {
  padding: 0 20px 30px 20px;
  margin-bottom: 120px;
}

.action-button {
  background-color: white;
  color: #323743;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  border-radius: 70px;
  height: 180px;
  width: 80%;
  margin-bottom: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.156);
  padding: 0;
  horizontal-align: center;
}

.action-button:active {
  background-color: #f0f0f0;
}
</style>