<template>
    <Page actionBarHidden="true" class="page">
      <GridLayout rows="auto, *">
        <StackLayout row="0" class="header-section">
          <GridLayout columns="auto, *, auto" class="header-content">
            <Image
              col="0"
              src="res://icon"
              width="60"
              height="60"
              class="app-icon"
            />
            <Label col="1" text="Профиль" class="header-title" />
            <Image
              col="2"
              src="res://setting"
              width="27"
              height="27"
              class="settings-icon"
              @tap="goToSettings"
            />
          </GridLayout>
        </StackLayout>

        <ScrollView row="1" class="content-scroll">
          <StackLayout class="content-container">
            <StackLayout class="profile-header">
              <Image src="res://user" class="avatar" />
              <Label text="Раиса Матросова" class="profile-name" />
              <Label text="Уровень 3" class="profile-level" />
            </StackLayout>

            <GridLayout columns="*, auto" class="section-header">
              <Label col="0" text="Достижения и скидки" class="section-title" textWrap="true" />
              <Label
                col="1"
                text="Посмотреть все"
                class="view-all-label"
                @tap="goToAchievements"
              />
            </GridLayout>

            <GridLayout columns="*, *, *" class="achievements-grid">
              <StackLayout
                v-for="(item, idx) in achievements"
                :key="idx"
                :col="idx"
                class="achievement-card"
              >
                <Image :src="item.image" class="achievement-image" />
                <Label :text="item.title" class="achievement-title" textWrap="true" />
              </StackLayout>
            </GridLayout>

            <GridLayout columns="*, auto" class="section-header">
              <Label col="0" text="Мои искры" class="section-title" textWrap="true" />
              <Label
                col="1"
                :text="showAllMySparks ? 'Свернуть' : 'Посмотреть все'"
                class="view-all-label"
                @tap="toggleMySparks"
              />
            </GridLayout>

            <StackLayout class="sparks-list">
              <GridLayout
                v-for="spark in displayedSparks"
                :key="spark.id"
                columns="auto, *"
                class="spark-item"
              >
                <Image col="0" :src="spark.image" class="spark-image" />
                <StackLayout col="1" class="spark-info">
                  <Label :text="spark.title" class="spark-title" />
                  <GridLayout columns="*, auto" class="progress-row">
                    <StackLayout col="0" class="progress-bg">
                      <StackLayout
                        class="progress-fill"
                        :style="{ width: (spark.currentDay / spark.totalDays) * 100 + '%' }"
                        horizontal-align="left"
                      />
                    </StackLayout>
                    <Label
                      col="1"
                      :text="'День ' + spark.currentDay + ' из ' + spark.totalDays"
                      class="progress-text"
                    />
                  </GridLayout>
                </StackLayout>
              </GridLayout>
            </StackLayout>
          </StackLayout>
        </ScrollView>
      </GridLayout>
    </Page>
  </template>

  <script lang="ts" setup>
  import { ref, computed } from 'nativescript-vue'

  const profile = {
    name: 'Раиса Матросова',
    level: 3,
  }

  const achievements = ref([
    { title: 'Ранняя пташка', image: 'res://achievement1' },
    { title: 'Творческий ум', image: 'res://achievement2' },
    { title: 'Шаг к здоровью', image: 'res://achievement3' },
  ])

  const mySparks = ref([
    {
      id: 1,
      title: 'Твоя искра в акварели',
      image: 'res://art',
      currentDay: 1,
      totalDays: 7,
    },
    {
      id: 2,
      title: 'Твоя искра в гитаре',
      image: 'res://guitar',
      currentDay: 3,
      totalDays: 7,
    },
    {
      id: 3,
      title: 'Твоя искра в кулинарии',
      image: 'res://food',
      currentDay: 5,
      totalDays: 7,
    }
  ])

  const showAllMySparks = ref(false)

  const displayedSparks = computed(() => {
    return showAllMySparks.value ? mySparks.value : mySparks.value.slice(0, 2)
  })

  function toggleMySparks() {
    showAllMySparks.value = !showAllMySparks.value
  }

  function goToSettings() {
    console.log('Переход в настройки')
  }

  function goToAchievements() {
    console.log('Переход к достижениям')
  }
  </script>

  <style scoped>
  .page {
    background-color: white;
  }

  .header-section {
    background-color: white;
    padding: 30px 20px 10px 20px;
    border-bottom-width: 1px;
    border-bottom-color: #f0f0f0;
  }

  .header-content {
    align-items: center;
  }

  .app-icon {
    margin-right: 8px;
  }

  .header-title {
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #181820;
  }

  .settings-icon {
    width: 60px;
    height: 60px;
    margin: 20px;
  }

  .content-scroll {
    background-color: white;
  }

  .content-container {
    padding: 0 20px 20px 20px;
  }

  .profile-header {
    align-items: center;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .avatar {
    width: 210px;
    height: 210px;
    border-radius: 40px;
    margin: 20px;
  }

  .profile-name {
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #181820;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .profile-level {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    background-color: #f59741;
    color: white;
    padding: 4px 16px;
    border-radius: 40px;
    margin: 20px;
    margin-bottom: 0;
    text-align: center;
    width: 45%;
  }

  .section-header {
    margin-bottom: 16px;
  }

  .section-title {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #181820;
    margin-left: 20px;
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .view-all-label {
    background-color: transparent;
    color: #8e5eed;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    padding: 0;
    margin: 0;
    margin-top: 14px;
    margin-right: 20px;
    text-align: right;
  }

  .achievements-grid {
    margin-bottom: 30px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .achievement-card {
    background-color: #f9f9fb;
    border-radius: 25px;
    padding: 12px;
    align-items: center;
    margin: 4px;
  }

  .achievement-image {
    width: 100px;
    height: 100px;
    margin-bottom: 8px;
  }

  .achievement-title {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #181820;
    text-align: center;
  }

  .sparks-list {
    margin-bottom: 20px;
  }

  .spark-item {
    background-color: white;
    border-radius: 30px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin: 20px;
    margin-bottom: 12px;
    align-items: center;
  }

  .spark-image {
    width: 230px;
    height: 230px;
    border-radius: 20px;
    margin-right: 16px;
  }

  .spark-info {
    width: 100%;
  }

  .spark-title {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #181820;
    margin-bottom: 8px;
    margin-left: 20px;
  }

  .progress-row {
    align-items: center;
    margin-left: 20px;
  }

  .progress-bg {
    background-color: #f3f3f6;
    height: 15px;
    border-radius: 10px;
    width: 100%;
  }

  .progress-fill {
    background-color: #8e5eed;
    height: 15px;
    border-radius: 10px;
  }

  .progress-text {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
    color: #363645;
    margin-left: 30px;
    margin-right: 30px;
  }
  </style>