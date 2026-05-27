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
            :opacity="subtitleOpacity"
          />
        </StackLayout>

        <StackLayout row="3" class="px-10 mt-10">
          <Label
            :text="typedDescription"
            class="description"
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

<script lang="ts" setup>
import { ref, onMounted } from 'nativescript-vue'
import { $navigateTo } from 'nativescript-vue'
import LoginPage from './LoginPage.vue'
import RegisterPage from './RegisterPage.vue'

const subtitleOpacity = ref(0)
const typedDescription = ref('')
const fullDescription = 'Увлекательные челленджи, которые поддержат твой путь!'

onMounted(() => {
  // Fade in subtitle after 800ms
  setTimeout(() => {
    animateFadeIn()
  }, 800)

  // Start typing effect after subtitle appears (2.5s total)
  setTimeout(() => {
    typeText()
  }, 2500)
})

function animateFadeIn() {
  let opacity = 0
  const interval = setInterval(() => {
    opacity += 0.05
    subtitleOpacity.value = opacity
    if (opacity >= 1) {
      subtitleOpacity.value = 1
      clearInterval(interval)
    }
  }, 50)
}

function typeText() {
  let index = 0
  const interval = setInterval(() => {
    if (index < fullDescription.length) {
      typedDescription.value += fullDescription[index]
      index++
    } else {
      clearInterval(interval)
    }
  }, 45)
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

.image {
  align-self: center;
  margin-top: 50px;
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
  color: #5618d4;
  text-align: center;
  margin-top: 90px;
  margin-bottom: 350px;
  padding-left: 40px;
  padding-right: 40px;
  min-height: 60px;
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
  height: 180px;
  width: 80%;
  margin-bottom: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.156);
  padding: 0;
}

.action-button:active {
  background-color: #f0f0f0;
}
</style>