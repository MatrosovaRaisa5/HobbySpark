<template>
    <Page actionBarHidden="true" class="page">
      <GridLayout rows="auto, *, auto">
        <StackLayout row="0" class="header-section">
          <GridLayout columns="auto, *" class="header-content">
            <Image
              col="0"
              src="res://icon"
              width="60"
              height="60"
              class="app-icon"
            />
            <Label col="1" text="Каталог хобби" class="header-title" />
          </GridLayout>
        </StackLayout>
        <ScrollView row="1" class="content-scroll">
          <StackLayout class="content-container">
            <GridLayout columns="auto, *" class="search-container">
              <Label col="0" text="🔍" class="search-icon" />
              <TextField col="1" hint="Искать хобби..." class="search-input" />
            </GridLayout>

            <GridLayout columns="*, *" class="filters-row">
              <Button
                col="0"
                class="filter-button"
                @tap="showCategoryFilter"
                text="📂 Категория"
              />
              <Button
                col="1"
                class="filter-button difficulty"
                @tap="showDifficultyFilter"
                text="⭐ Сложность"
              />
            </GridLayout>
            <GridLayout columns="*, *" :rows="rowsString" class="cards-grid">
              <StackLayout
                v-for="(hobby, index) in hobbies"
                :key="hobby.id"
                :col="index % 2"
                :row="Math.floor(index / 2)"
                class="card"
                @tap="openChallenge(hobby.id)"
              >
                <Image
                  :src="hobby.image"
                  class="card-image"
                  stretch="aspectFill"
                />
                <Label :text="hobby.title" class="card-title" textWrap="true" />
                <GridLayout columns="auto, *" class="card-difficulty">
                  <Label col="0" text="⭐" class="star-icon" />
                  <Label col="1" :text="'Сложность: ' + hobby.difficulty + '/5'" class="difficulty-text" />
                </GridLayout>
              </StackLayout>
            </GridLayout>
          </StackLayout>
        </ScrollView>
        <GridLayout row="2" columns="*, *, *, *" class="tabbar-menu">
          <StackLayout
            col="0"
            class="tabbar-menu-item"
            :class="{ selected: currentTab === 'home' }"
            @tap="goToTab('home')"
          >
            <Label text="🏠" class="tab-icon" />
            <Label text="Главная" class="tab-label" />
          </StackLayout>
          <StackLayout
            col="1"
            class="tabbar-menu-item"
            :class="{ selected: currentTab === 'catalog' }"
            @tap="goToTab('catalog')"
          >
            <Label text="📚" class="tab-icon" />
            <Label text="Каталог" class="tab-label" />
          </StackLayout>
          <StackLayout
            col="2"
            class="tabbar-menu-item"
            :class="{ selected: currentTab === 'progress' }"
            @tap="goToTab('progress')"
          >
            <Label text="📈" class="tab-icon" />
            <Label text="Прогресс" class="tab-label" />
          </StackLayout>
          <StackLayout
            col="3"
            class="tabbar-menu-item"
            :class="{ selected: currentTab === 'profile' }"
            @tap="goToTab('profile')"
          >
            <Label text="👤" class="tab-icon" />
            <Label text="Профиль" class="tab-label" />
          </StackLayout>
        </GridLayout>
      </GridLayout>
    </Page>
  </template>

  <script lang="ts" setup>
  import { ref, computed } from 'nativescript-vue'
  import { $navigateTo } from 'nativescript-vue'
  import { hobbiesData } from '~/data/hobbies'
  import ChallengeDetail from './ChallengeDetail.vue'
  import ProfilePage from './ProfilePage.vue'

  const hobbies = ref(hobbiesData)
  const currentTab = ref('catalog')

  const rowsString = computed(() => {
    const count = hobbies.value.length
    const rowsCount = Math.ceil(count / 2)
    return Array(rowsCount).fill('auto').join(',')
  })

  function showCategoryFilter() {
    console.log('Категория фильтр')
  }

  function showDifficultyFilter() {
    console.log('Сложность фильтр')
  }

  function openChallenge(id: number) {
    $navigateTo(ChallengeDetail, { props: { challengeId: id } })
  }

  function goToTab(tab: string) {
    currentTab.value = tab
    switch (tab) {
      case 'home':
        // $navigateTo(HomePage)
        break
      case 'catalog':
        break
      case 'progress':
        // $navigateTo(ProgressPage)
        break
      case 'profile':
        $navigateTo(ProfilePage)
        break
    }
  }
  </script>

  <style scoped>
  .page {
    background-color: white;
  }

  .header-section {
    background-color: white;
    padding: 30px 20px 10px 20px;
  }

  .header-content {
    align-items: center;
    margin-bottom: 10px;
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

  .content-scroll {
    background-color: white;
  }

  .content-container {
    padding: 0 20px 20px 20px;
  }

  .search-container {
    background-color: white;
    border-width: 2px;
    border-color: #E0E0E6;
    border-radius: 14px;
    margin-bottom: 50px;
    align-items: center;
    padding: 0 8px;
    width: 100%;
  }

  .search-icon {
    font-size: 16px;
    color: #363645;
    padding: 0 4px;
  }

  .search-input {
    background-color: white;
    font-size: 16px;
    font-family: 'Nunito Sans', sans-serif;
    placeholder-color: #A0A0A0;
    padding: 12px 8px;
  }

  .filters-row {
    margin-bottom: 30px;
    width: 100%;
  }

  .filter-button {
    background-color: #F3F3F6;
    color: #171A1F;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    border-radius: 14px;
    height: 90px;
    padding: 0 8px;
    margin: 0 4px;
    align-items: center;
    justify-content: center;
  }

  .filter-button.difficulty {
    background-color: #8E5EED;
    color: white;
  }

  .cards-grid {
    margin-bottom: 20px;
  }

  .card {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.08);
    margin: 20px;
    padding: 0 0 12px 0;
    align-items: center;
  }

  .card-image {
    width: 100%;
    height: 300px;
  }

  .card-title {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #181820;
    text-align: center;
    margin: 8px 0 4px;
    padding: 0 10px;
  }

  .card-difficulty {
    align-items: center;
    margin-bottom: 8px;
  }

  .star-icon {
    font-size: 14px;
    color: #FA9938;
    margin-right: 4px;
  }

  .difficulty-text {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 12px;
    color: #363645;
  }

  .tabbar-menu {
    background-color: white;
    border-top-width: 1px;
    border-top-color: #E0E0E6;
    height: 170px;
    align-items: center;
  }

  .tabbar-menu-item {
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    color: #565D6D;
  }

  .tabbar-menu-item.selected {
    color: #8E5EED;
    font-weight: 700;
    background-color: #DBCCF9;
  }

  .tab-icon, .tab-label {
    text-align: center;
    horizontal-align: center;
  }

  .tab-icon {
    font-size: 20px;
  }

  .tab-label {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 10px;
    margin-top: 2px;
  }
  </style>