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
            <Label col="1" text="Детали искры" class="header-title" />
          </GridLayout>
        </StackLayout>

        <ScrollView row="1" class="content-scroll">
          <StackLayout class="content-container">
            <GridLayout class="image-container" rows="*" columns="*">
              <Image
                row="0"
                col="0"
                :src="challenge.image"
                class="challenge-image"
                stretch="aspectFill"
              />
              <StackLayout row="0" col="0" class="image-overlay" />
              <Label
                row="0"
                col="0"
                :text="challenge.title"
                class="image-title"
                textWrap="true"
              />
            </GridLayout>

            <Label :text="challenge.description" class="challenge-description" textWrap="true" />

            <Button text="Начать вызов" class="start-button" @tap="startChallenge" />

            <Label text="Еженедельная программа" class="section-title" />

            <StackLayout v-for="(day, index) in challenge.weeklyProgram" :key="index" class="day-card">
              <GridLayout columns="*, auto" class="day-header" @tap="toggleDay(index)">
                <Label col="0" :text="day.title" class="day-title" textWrap="true" />
                <Image
                  col="1"
                  src="res://down"
                  width="16"
                  height="16"
                  class="day-arrow"
                  :class="{ rotated: openDayIndex === index }"
                />
              </GridLayout>
              <Label
                v-if="openDayIndex === index"
                :text="day.description"
                class="day-description"
                textWrap="true"
              />
            </StackLayout>

            <Label text="Необходимые материалы" class="section-title" />

            <StackLayout v-for="(material, idx) in challenge.materials" :key="idx" class="material-item">
              <GridLayout columns="auto, *">
                <Label col="0" text="✅" class="check-icon" />
                <Label col="1" :text="material" class="material-text" textWrap="true" />
              </GridLayout>
            </StackLayout>

            <Label text="Позовите друзей в вызов!" class="invite-title" />
            <Button text="Пригласить друзей" class="invite-button" @tap="inviteFriends" />
          </StackLayout>
        </ScrollView>
      </GridLayout>
    </Page>
  </template>

  <script lang="ts" setup>
  import { ref, computed } from 'nativescript-vue'
  import { $navigateBack, $navigateTo } from 'nativescript-vue'
  import { challengesData } from '~/data/challengesData'
  import DayTaskPage from './DayTaskPage.vue'

  const props = defineProps<{ challengeId: number }>()

  const challenge = computed(() => {
    return challengesData.find(c => c.id === props.challengeId) || challengesData[0]
  })

  const openDayIndex = ref<number | null>(null)

  function toggleDay(index: number) {
    openDayIndex.value = openDayIndex.value === index ? null : index
  }

  function goBack() {
    $navigateBack()
  }

  function startChallenge() {
    $navigateTo(DayTaskPage, { props: { challengeId: challenge.value.id, day: 1 } })
  }

  function inviteFriends() {
    console.log('Пригласить друзей')
  }
  </script>

  <style scoped>
  .page {
    background-color: white;
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
    background-color: #e3d6fe;
  }

  .content-container {
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 600px;
    margin-bottom: 7px;
  }

  .challenge-image {
    width: 100%;
    height: 600px;
  }

  .image-overlay {
    background: linear-gradient(0deg, rgba(0,0,0,0.83) 0%, rgba(0,0,0,0) 100%);
    width: 100%;
    height: 100%;
  }

  .image-title {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: white;
    text-shadow: 0px 2px 4px rgba(24,24,32,0.15);
    text-align: center;
    margin-top: 400px;
    z-index: 2;
  }

  .challenge-description {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 15px;
    line-height: 14px;
    color: #363645;
    margin-bottom: 20px;
    padding: 50px;
  }

  .start-button {
    width: 80%;
    height: 140px;
    background-color: #854ef3;
    color: white;
    font-size: 18px;
    font-family: 'Nunito Sans', sans-serif;
    border-radius: 50px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
    padding: 0;
  }

  .section-title {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #181820;
    margin-bottom: 20px;
    padding-bottom: 20px;
    padding-top: 30px;
    text-align: center;
  }

  .day-card {
    background-color: white;
    border-width: 1px;
    border-color: #F3F3F6;
    border-radius: 30px;
    margin: 20px;
    margin-left: 50px;
    margin-right: 50px;
    padding: 40px;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.05);
  }

  .day-header {
    align-items: center;
  }

  .day-title {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #181820;
    margin-bottom: 10px;
  }

  .day-arrow {
    transition: transform 0.2s;
  }

  .day-arrow.rotated {
    transform: rotate(180deg);
  }

  .day-description {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
    line-height: 16px;
    color: #363645;
    margin-top: 10px;
  }

  .material-item {
    margin-bottom: 10px;
  }

  .check-icon {
    background-color: #8E5EED;
    width: 24px;
    height: 24px;
    text-align: center;
    vertical-align: center;
    margin-right: 20px;
    margin-left: 60px;
}

  .material-text {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 15px;
    color: #363645;
    padding: 20px;
    padding-left: 35px;
    padding-right: 35px;
  }

  .invite-title {
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #181820;
    text-align: center;
    margin: 40px 0 40px 0;
  }

  .invite-button {
    width: 75%;
    background-color: #F59741;
    color: #ffffff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    font-weight: 700;
    border-radius:50px;
    height: 140px;
    margin-bottom: 60px;
    margin-top: 40px;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.05);
  }
  </style>