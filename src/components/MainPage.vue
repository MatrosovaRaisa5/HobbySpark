<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="auto, *, auto">
      <StackLayout row="0" class="header-section">
        <GridLayout columns="auto, *, auto" class="header-content">
          <Image col="0" src="res://icon" width="60" height="60" class="app-icon" />
          <Label col="1" text="Главная" class="header-title" />
          <StackLayout col="2" class="bell-wrap" @tap="goToNotifications">
            <Image src="res://kolokol" width="100" height="100" stretch="aspectFit" />
          </StackLayout>
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="scroll">
        <StackLayout class="content">
          <Label :text="'Привет, ' + userName + '!'" class="greeting" />
          <Label text="Твоё вдохновение на сегодня здесь ✨" class="subgreeting" />

          <StackLayout class="challenge-card" v-if="activeChallenge">
            <GridLayout columns="*, auto">
              <StackLayout col="0">
                <Label text="ТЕКУЩИЙ ЧЕЛЛЕНДЖ" class="challenge-label" />
                <Label :text="activeChallenge.title" class="challenge-title" textWrap="true" />
              </StackLayout>
              <StackLayout col="1" class="challenge-icon-wrap">
                <Label text="💫" class="challenge-icon-emoji" />
              </StackLayout>
            </GridLayout>

            <GridLayout columns="*, auto" class="progress-meta">
              <Label col="0" text="Прогресс" class="meta-left" />
              <Label col="1" :text="'День ' + currentDay + ' из ' + totalDays" class="meta-right" />
            </GridLayout>

            <GridLayout :columns="progressCols" class="progress-track">
              <StackLayout col="0" class="progress-filled" />
              <StackLayout col="1" class="progress-empty" />
            </GridLayout>

            <Label text="Начало" class="progress-start-tag" />

            <GridLayout columns="*, *, *, *, *, *, *" class="dots-row">
              <StackLayout v-for="d in totalDays" :key="d" :col="d - 1" :class="['dot', d <= currentDay ? 'dot-active' : '']" />
            </GridLayout>

            <Button
              :text="machineState === 'completed' ? 'Челлендж завершён 🎉' : 'Продолжить обучение'"
              class="challenge-btn"
              @tap="goToCurrentChallenge"
            />
          </StackLayout>

          <GridLayout columns="*, auto" class="section-hdr">
            <Label col="0" text="Рекомендуем вам" class="section-title" />
            <Label col="1" text="Все" class="section-link" @tap="goToCatalog" />
          </GridLayout>

          <GridLayout columns="*, *" :rows="recsRows" class="recs-grid">
            <StackLayout v-for="(hobby, i) in recommendedHobbies" :key="hobby.id" :col="i % 2" :row="Math.floor(i / 2)" class="rec-card" @tap="openHobby(hobby.id)">
              <Image :src="hobby.image" class="rec-img" stretch="aspectFill" />
              <Label :text="hobby.title" class="rec-title" textWrap="true" />
              <GridLayout columns="auto, *" class="card-difficulty">
                <Label col="0" text="⭐" class="star-icon" />
                <Label col="1" :text="'Сложность: ' + hobby.difficulty + '/5'" class="difficulty-text" />
              </GridLayout>
            </StackLayout>
          </GridLayout>

        </StackLayout>
      </ScrollView>

      <GridLayout row="2" columns="*, *, *, *" class="tabbar-menu">
        <StackLayout col="0" class="tabbar-menu-item" :class="{ selected: currentTab === 'home' }" @tap="goToTab('home')">
          <Label text="🏠" class="tab-icon" />
          <Label text="Главная" class="tab-label" />
        </StackLayout>
        <StackLayout col="1" class="tabbar-menu-item" :class="{ selected: currentTab === 'catalog' }" @tap="goToTab('catalog')">
          <Label text="📚" class="tab-icon" />
          <Label text="Каталог" class="tab-label" />
        </StackLayout>
        <StackLayout col="2" class="tabbar-menu-item" :class="{ selected: currentTab === 'progress' }" @tap="goToTab('progress')">
          <Label text="📝" class="tab-icon" />
          <Label text="Заметки" class="tab-label" />
        </StackLayout>
        <StackLayout col="3" class="tabbar-menu-item" :class="{ selected: currentTab === 'profile' }" @tap="goToTab('profile')">
          <Label text="👤" class="tab-icon" />
          <Label text="Профиль" class="tab-label" />
        </StackLayout>
      </GridLayout>

    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'nativescript-vue';
import { $navigateTo } from 'nativescript-vue';
import { ApplicationSettings } from '@nativescript/core';
import { api } from '~/services/api';
import NotificationsPage from './NotificationsPage.vue';
import CatalogPage from './CatalogPage.vue';
import ChallengeDetail from './ChallengeDetail.vue';
import ProfilePage from './ProfilePage.vue';
import ProgressPage from './ProgressPage.vue';
import DayTaskPage from './DayTaskPage.vue';
import {
  getCurrentDay,
  getTotalDays,
  getChallengeId,
  getMachineState,
  startChallenge,
} from '~/machines/challengeMachine';

const currentTab = ref('home');
const userName = ref(ApplicationSettings.getString('user_name', 'Пользователь'));
const activeChallenge = ref<any>(null);
const recommendedHobbies = ref<any[]>([]);

const currentDay = ref(getCurrentDay());
const totalDays = ref(getTotalDays());
const machineState = ref(getMachineState());

const progressCols = computed(() => {
  const pct = currentDay.value > 0 ? Math.max(2, (currentDay.value / totalDays.value) * 100) : 2;
  return `${pct}*, ${100 - pct}*`;
});

const recsRows = computed(() => {
  const rows = Math.ceil(recommendedHobbies.value.length / 2);
  return Array(rows).fill('auto').join(',');
});

onMounted(async () => {
  // попытка загрузить активный челлендж с сервера
  try {
    const challenge = await api.getActiveChallenge();
    if (challenge) {
      activeChallenge.value = challenge;
      // синхронизируем машину состояний с сервером
      startChallenge(challenge.challengeId, challenge.totalDays);
      // обновляем локальные переменные
      currentDay.value = challenge.currentDay;
      totalDays.value = challenge.totalDays;
      machineState.value = getMachineState();
    }
  } catch (e) {
    console.log('Нет активного челленджа');
  }

  // загрузка рекомендованных
  try {
    const list = await api.getChallenges();
    recommendedHobbies.value = list.slice(0, 4).map((c: any) => ({
      id: c.id,
      title: c.title,
      image: c.image,
      difficulty: c.difficulty,
    }));
  } catch (e) {
    console.error('Ошибка загрузки рекомендаций', e);
  }
});

function goToNotifications() { $navigateTo(NotificationsPage); }

function goToCurrentChallenge() {
  if (!activeChallenge.value) return;
  const day = currentDay.value;
  const id = activeChallenge.value.challengeId;
  if (machineState.value === 'completed') return;
  $navigateTo(DayTaskPage, { props: { challengeId: id, day } });
}

function goToCatalog() { $navigateTo(CatalogPage); }
function openHobby(id: number) { $navigateTo(ChallengeDetail, { props: { challengeId: id } }); }

function goToTab(tab: string) {
  if (tab === 'catalog') $navigateTo(CatalogPage);
  else if (tab === 'progress') $navigateTo(ProgressPage);
  else if (tab === 'profile') $navigateTo(ProfilePage);
}
</script>

<style scoped>
/* все ваши стили без изменений */
.page { background-color: #F8F6FF; }
.header-section { background-color: white; padding: 30px 20px 10px 20px; }
.header-content { align-items: center; margin-bottom: 10px; }
.app-icon { margin-right: 8px; }
.header-title { font-family: 'Nunito', sans-serif; font-size: 24px; font-weight: 700; color: #181820; }
.bell-wrap { width: 100px; height: 100px; border-radius: 12px; background-color: #F3F3F6; align-items: center; justify-content: center; }
.scroll { background-color: #F8F6FF; }
.content { padding: 24px 20px 30px 20px; }
.greeting { font-family: 'Nunito', sans-serif; font-size: 28px; font-weight: 800; color: #181820; margin-bottom: 4px; }
.subgreeting { font-family: 'Nunito Sans', sans-serif; font-size: 15px; color: #565D6D; margin-bottom: 22px; }
.challenge-card { background: linear-gradient(135deg, #8E5EED 0%, #B07DF8 100%); border-radius: 22px; padding: 20px 20px 18px 20px; margin-bottom: 28px; box-shadow: 0px 8px 24px rgba(142,94,237,0.35); }
.challenge-label { font-family: 'Nunito Sans', sans-serif; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.75); letter-spacing: 0.2px; margin-bottom: 6px; }
.challenge-title { font-family: 'Nunito', sans-serif; font-size: 21px; font-weight: 800; color: white; }
.challenge-icon-wrap { width: 100px; height: 100px; border-radius: 27px; background-color: rgba(255,200,100,0.3); align-items: center; justify-content: center; margin-left: 12px; align-self: flex-start; margin-top: 4px; }
.challenge-icon-emoji { font-size: 25px; text-align: center; }
.progress-meta { align-items: center; margin-top: 16px; margin-bottom: 8px; }
.meta-left { font-family: 'Nunito Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.85); }
.meta-right { font-family: 'Nunito Sans', sans-serif; font-size: 13px; font-weight: 700; color: white; text-align: right; }
.progress-track { height: 8px; border-radius: 6px; background-color: rgba(255,255,255,0.3); overflow: hidden; margin-bottom: 4px; }
.progress-filled { background-color: white; border-radius: 6px 0 0 6px; }
.progress-empty { background-color: transparent; }
.progress-start-tag { font-family: 'Nunito Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.85); margin-bottom: 10px; }
.dots-row { margin-bottom: 18px; }
.dot { height: 8px; border-radius: 4px; background-color: rgba(255,255,255,0.3); margin: 0 10px; }
.dot-active { background-color: white; }
.challenge-btn { background-color: white; color: #8E5EED; font-family: 'Nunito', sans-serif; font-size: 16px; font-weight: 700; border-radius: 50px; height: 140px; width: 100%; }
.section-hdr { align-items: center; margin-bottom: 16px; }
.section-title { font-family: 'Nunito', sans-serif; font-size: 20px; font-weight: 800; color: #181820; }
.section-link { font-family: 'Nunito Sans', sans-serif; font-size: 14px; color: #8E5EED; font-weight: 600; }
.recs-grid { margin: 0 -6px; }
.rec-card { background-color: white; border-radius: 20px; margin: 8px 6px; padding-bottom: 12px; box-shadow: 0px 6px 9px rgba(0,0,0,0.09); overflow: hidden; }
.rec-img { width: 100%; height: 300px; border-radius: 20px 20px 0 0; }
.rec-title { font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700; color: #181820; margin: 8px 12px 5px 12px; }
.card-difficulty { align-items: center; margin-bottom: 8px; }
.star-icon { font-size: 14px; color: #FA9938; margin-right: 4px; }
.difficulty-text { font-family: 'Nunito Sans', sans-serif; font-size: 12px; color: #363645; }
.tabbar-menu { background-color: white; border-top-width: 1px; border-top-color: #E0E0E6; height: 170px; align-items: center; }
.tabbar-menu-item { align-items: center; justify-content: center; padding: 8px 0; color: #565D6D; }
.tabbar-menu-item.selected { color: #8E5EED; font-weight: 700; background-color: #DBCCF9; }
.tab-icon, .tab-label { text-align: center; horizontal-align: center; }
.tab-icon { font-size: 20px; }
.tab-label { font-family: 'Nunito Sans', sans-serif; font-size: 10px; margin-top: 2px; }
</style>