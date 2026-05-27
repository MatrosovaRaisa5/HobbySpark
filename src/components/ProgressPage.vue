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
          <Label col="1" text="Мои заметки" class="header-title" />
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="content-scroll">
        <StackLayout class="content-container">
          <Label v-if="notes.length > 0" text="Заметки и мысли" class="section-title" />
          <Label v-else text="У вас пока нет заметок..." class="empty-text" textWrap="true" />

          <StackLayout v-for="(note, idx) in notes" :key="idx" class="note-card">
            <GridLayout columns="auto, *" class="note-content">
              <Image
                v-if="note.image"
                col="0"
                :src="baseUrl + note.image"
                width="96" height="96"
                class="note-image"
                @error="onImageError"
              />
              <Label v-else col="0" text="📷" class="note-image-placeholder" />
              <StackLayout col="1" class="note-text-container">
                <Label
                  :text="note.challengeTitle ? note.challengeTitle + ' : День ' + note.dayNumber : note.title"
                  class="note-title" textWrap="true"
                />
                <Label :text="note.text" class="note-text" textWrap="true" />
                <Label :text="note.date" class="note-date" textWrap="true" />
              </StackLayout>
            </GridLayout>
          </StackLayout>
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
          <Label text="📝" class="tab-icon" />
          <Label text="Заметки" class="tab-label" />
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
import { ref, onMounted } from 'nativescript-vue';
import { $navigateTo } from 'nativescript-vue';
import { api } from '~/services/api';
import MainPage from './MainPage.vue';
import CatalogPage from './CatalogPage.vue';
import ProfilePage from './ProfilePage.vue';

const BASE_URL = 'http://192.168.1.207:8080';
const baseUrl = BASE_URL;
const currentTab = ref('progress');

interface NoteItem {
    title: string;
    text: string;
    image: string | null;
    date: string;
    dayNumber: number;
    challengeTitle: string;
}

const notes = ref<NoteItem[]>([]);

function formatDateRu(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = [
        'января','февраля','марта','апреля','мая','июня',
        'июля','августа','сентября','октября','ноября','декабря'
    ];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year} г.`;
}

function onImageError(args: any) {
    const img = args.object;
    img.src = 'res://nopic';
}

onMounted(async () => {
    try {
        const data = await api.getNotes();
        notes.value = data.map((n: any) => ({
            title: n.title,
            text: n.text || '',
            image: n.image || null,
            date: n.date ? formatDateRu(n.date) : '',
            dayNumber: n.dayNumber ?? parseInt(n.title?.replace('День ', '') || '0'),
            challengeTitle: n.challengeTitle || '',
        }));
    } catch (e) {
        console.error('Ошибка загрузки заметок', e);
    }
});

function goToTab(tab: string) {
    currentTab.value = tab;
    switch (tab) {
        case 'home': $navigateTo(MainPage); break;
        case 'catalog': $navigateTo(CatalogPage); break;
        case 'progress': break;
        case 'profile': $navigateTo(ProfilePage); break;
    }
}
</script>

<style scoped>
.note-image-placeholder {
    font-size: 30px;
    text-align: center;
    vertical-align: middle;
    width: 96px;
    height: 96px;
    border-radius: 30px;
    background-color: #f0f0f0;
    margin: 20px;
}
.page {
  background: linear-gradient(to top, #d5bbffe4, #fdfdfd 50%);
}
.header-section {
  background-color: white;
  padding: 30px 20px 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
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
  background-color: #8e5eed36;
}
.content-container {
  padding: 0 16px 20px 16px;
}
.section-title {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #181820;
  margin-top: 12px;
  margin-bottom: 13px;
  margin-left: 30px;
}
.empty-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  color: #9095A0;
  text-align: center;
  margin-top: 60px;
}
.note-card {
  background-color: white;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.262);
  margin: 20px;
}
.note-content {
  align-items: center;
}
.note-image {
  border-radius: 30px;
  margin: 20px;
}
.note-text-container {
  padding-left: 8px;
  margin: 20px;
}
.note-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #181820;
  margin-bottom: 4px;
}
.note-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #181820;
}
.note-date {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11px;
  color: #9095A0;
  margin-top: 6px;
}
.empty-state {
  align-items: center;
  margin-top: 60px;
}
.empty-icon {
  width: 400px;
  height: 400px;
  margin-bottom: 14px;
  border-radius: 450px;
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
.tab-icon,
.tab-label {
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