<template>
  <Page actionBarHidden="true" class="page">
    <ScrollView>
      <StackLayout class="content-container">

        <!-- Congratulations header -->
        <StackLayout class="congrats-block">
          <Label text="Поздравляем!" class="congrats-title" />
          <Label text="Твоя искра в акварели" class="congrats-subtitle" />
        </StackLayout>

        <!-- Challenge image -->
        <StackLayout class="image-wrap">
          <Image src="res://art" class="challenge-image" stretch="aspectFill" />
          <StackLayout class="image-badge">
            <Label text="🎨" class="image-badge-icon" />
          </StackLayout>
        </StackLayout>

        <!-- Progress bar -->
        <StackLayout class="progress-block">
          <GridLayout columns="*, auto" class="progress-header">
            <Label col="0" text="Прогресс испытания" class="progress-label" />
            <Label col="1" text="День 1 из 7" class="progress-day" />
          </GridLayout>
          <StackLayout class="progress-bar-bg">
            <StackLayout class="progress-bar-fill" />
          </StackLayout>
        </StackLayout>

        <!-- Rewards row -->
        <GridLayout columns="*, *" class="rewards-row">
          <StackLayout col="0" class="reward-card reward-card-left">
            <GridLayout columns="auto, *">
              <Label col="0" text="✨" class="reward-icon" />
              <Label col="1" text="15" class="reward-value" />
            </GridLayout>
            <Label text="Искр за сегодня" class="reward-label" />
          </StackLayout>
          <StackLayout col="1" class="reward-card reward-card-right">
            <GridLayout columns="auto, *">
              <Label col="0" text="🏅" class="reward-icon" />
              <Label col="1" text="1" class="reward-value" />
            </GridLayout>
            <Label text="Новый бейдж" class="reward-label" />
          </StackLayout>
        </GridLayout>

        <!-- Tomorrow task -->
        <StackLayout class="tomorrow-block">
          <Label text="ЗАДАНИЕ НА ЗАВТРА:" class="tomorrow-label" />
          <GridLayout columns="*, auto" @tap="goToNextDay">
            <Label col="0" text='Техника "мокрым по мокрому"' class="tomorrow-title" textWrap="true" />
            <Label col="1" text="›" class="tomorrow-arrow" />
          </GridLayout>
        </StackLayout>

        <!-- Action buttons -->
        <Button text="Продолжить  ›" class="continue-button" @tap="continueChallenge" />
        <Button class="share-button" @tap="shareResult">
          <FormattedString>
            <Span text="🔗  " />
            <Span text="Поделиться" />
          </FormattedString>
        </Button>

      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts" setup>
import { $navigateBack } from 'nativescript-vue'

function continueChallenge() {
  $navigateBack()
}

function shareResult() {
  console.log('Share result')
}

function goToNextDay() {
  console.log('Go to next day task')
}
</script>

<style scoped>
.page {
  background-color: #EDE0FF;
}

.content-container {
  background-color: #EDE0FF;
  padding: 50px 20px 40px 20px;
  align-items: center;
}

/* Congratulations */
.congrats-block {
  align-items: center;
  margin-bottom: 24px;
}

.congrats-title {
  font-family: 'Nunito', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #181820;
  text-align: center;
  margin-bottom: 6px;
}

.congrats-subtitle {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  color: #565D6D;
  text-align: center;
}

/* Image */
.image-wrap {
  width: 200px;
  height: 200px;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 28px;
  border-width: 4px;
  border-color: white;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  align-self: center;
}

.challenge-image {
  width: 200px;
  height: 200px;
  border-radius: 100px;
}

.image-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
}

.image-badge-icon {
  font-size: 20px;
  text-align: center;
}

/* Progress */
.progress-block {
  background-color: white;
  border-radius: 16px;
  padding: 16px 18px;
  width: 100%;
  margin-bottom: 14px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
}

.progress-header {
  align-items: center;
  margin-bottom: 10px;
}

.progress-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #9095A0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.progress-day {
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #181820;
}

.progress-bar-bg {
  background-color: #EDE0FF;
  border-radius: 6px;
  height: 10px;
  width: 100%;
}

.progress-bar-fill {
  background-color: #FA9938;
  border-radius: 6px;
  height: 10px;
  width: 14%;
}

/* Rewards */
.rewards-row {
  width: 100%;
  margin-bottom: 14px;
}

.reward-card {
  background-color: white;
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
}

.reward-card-left {
  margin-right: 7px;
}

.reward-card-right {
  margin-left: 7px;
}

.reward-icon {
  font-size: 22px;
  margin-right: 6px;
  align-self: center;
}

.reward-value {
  font-family: 'Nunito', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #181820;
}

.reward-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #9095A0;
  margin-top: 4px;
}

/* Tomorrow task */
.tomorrow-block {
  background-color: white;
  border-radius: 16px;
  padding: 14px 18px;
  width: 100%;
  margin-bottom: 28px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
}

.tomorrow-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11px;
  color: #9095A0;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.tomorrow-title {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #181820;
}

.tomorrow-arrow {
  font-size: 22px;
  color: #8E5EED;
  font-weight: 700;
  align-self: center;
}

/* Buttons */
.continue-button {
  background-color: white;
  color: #8E5EED;
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  font-weight: 700;
  border-radius: 50px;
  height: 120px;
  width: 100%;
  margin-bottom: 14px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
}

.share-button {
  background-color: #FA9938;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  font-weight: 700;
  border-radius: 50px;
  height: 120px;
  width: 100%;
  box-shadow: 0px 4px 12px rgba(250, 153, 56, 0.35);
}
</style>
