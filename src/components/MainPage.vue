<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="auto, *, auto">

      <!-- ── Шапка ── -->
      <GridLayout row="0" columns="auto, *, auto" class="header">
        <Image col="0" src="res://icon" width="40" height="40" class="header-logo" />
        <Label col="1" text="Главная" class="header-title" />
        <!-- Колокольчик → уведомления -->
        <StackLayout col="2" class="bell-wrap" @tap="goToNotifications">
          <Label text="🔔" class="bell-icon" />
          <StackLayout class="bell-badge" />
        </StackLayout>
      </GridLayout>

      <!-- ── Контент ── -->
      <ScrollView row="1" class="scroll">
        <StackLayout class="content">

          <!-- Приветствие -->
          <Label :text="'Привет, ' + userName + '!'" class="greeting" />
          <Label text="Твоё вдохновение на сегодня здесь ✨" class="subgreeting" />

          <!-- ── Карточка текущего челленджа ── -->
          <StackLayout class="challenge-card">
            <GridLayout columns="*, auto">
              <StackLayout col="0">
                <Label text="ТЕКУЩИЙ ЧЕЛЛЕНДЖ" class="challenge-label" />
                <Label :text="currentChallenge.title" class="challenge-title" textWrap="true" />
              </StackLayout>
              <!-- Иконка хобби в кружке справа сверху -->
              <StackLayout col="1" class="challenge-icon-wrap">
                <Image src="res://art" class="challenge-icon-img" stretch="aspectFill" />
              </StackLayout>
            </GridLayout>

            <!-- Прогресс -->
            <GridLayout columns="*, auto" class="progress-meta">
              <Label col="0" text="Прогресс" class="meta-left" />
              <Label col="1" :text="'День ' + currentChallenge.currentDay + ' из ' + currentChallenge.totalDays" class="meta-right" />
            </GridLayout>

            <!-- Прогресс-бар через columns (надёжный способ в NS) -->
            <GridLayout :columns="progressCols" class="progress-track">
              <StackLayout col="0" class="progress-filled" />
              <StackLayout col="1" class="progress-empty" />
            </GridLayout>

            <!-- Метка "Начало" под баром -->
            <Label text="Начало" class="progress-start-tag" />

            <!-- Точки дней -->
            <GridLayout columns="*, *, *, *, *, *, *" class="dots-row">
              <StackLayout
                v-for="d in 7"
                :key="d"
                :col="d - 1"
                :class="['dot', d <= currentChallenge.currentDay ? 'dot-active' : '']"
              />
            </GridLayout>

            <Button text="Продолжить обучение" class="challenge-btn" @tap="goToCurrentChallenge" />
          </StackLayout>

          <!-- ── Рекомендуем вам ── -->
          <GridLayout columns="*, auto" class="section-hdr">
            <Label col="0" text="Рекомендуем вам" class="section-title" />
            <Label col="1" text="Все" class="section-link" @tap="goToCatalog" />
          </GridLayout>

          <!-- 2-колоночная сетка карточек как на скриншоте -->
          <GridLayout columns="*, *" :rows="recsRows" class="recs-grid">
            <StackLayout
              v-for="(hobby, i) in recommendedHobbies"
              :key="hobby.id"
              :col="i % 2"
              :row="Math.floor(i / 2)"
              class="rec-card"
              @tap="openHobby(hobby.id)"
            >
              <Image :src="hobby.image" class="rec-img" stretch="aspectFill" />
              <Label :text="hobby.title" class="rec-title" textWrap="true" />
              <GridLayout columns="auto, auto, auto" class="rec-footer">
                <Label col="0" text="⭐⭐⭐⭐⭐" class="rec-stars" />
                <Label col="1" :text="hobby.rating" class="rec-rating" />
                <Label col="2" text=" NEW" class="rec-new" v-if="hobby.isNew" />
              </GridLayout>
            </StackLayout>
          </GridLayout>

        </StackLayout>
      </ScrollView>

      <!-- ── Таб-бар ── -->
      <GridLayout row="2" columns="*, *, *, *" class="tabbar">
        <StackLayout col="0" class="tab tab-active" @tap="goToTab('home')">
          <Label text="🏠" class="tab-icon" />
          <Label text="Главная" class="tab-lbl tab-lbl-active" />
        </StackLayout>
        <StackLayout col="1" class="tab" @tap="goToTab('catalog')">
          <Label text="📚" class="tab-icon" />
          <Label text="Каталог" class="tab-lbl" />
        </StackLayout>
        <StackLayout col="2" class="tab" @tap="goToTab('progress')">
          <Label text="📈" class="tab-icon" />
          <Label text="Прогресс" class="tab-lbl" />
        </StackLayout>
        <StackLayout col="3" class="tab" @tap="goToTab('profile')">
          <Label text="👤" class="tab-icon" />
          <Label text="Профиль" class="tab-lbl" />
        </StackLayout>
      </GridLayout>

    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'nativescript-vue'
import { $navigateTo } from 'nativescript-vue'
import { hobbiesData } from '~/data/hobbies'
import NotificationsPage from './NotificationsPage.vue'
import CatalogPage from './CatalogPage.vue'
import ChallengeDetail from './ChallengeDetail.vue'
import ProfilePage from './ProfilePage.vue'
import DayTaskPage from './DayTaskPage.vue'

const userName = 'Раиса'

const currentChallenge = {
  id: 1,
  title: 'Твоя искра в акварели',
  currentDay: 1,
  totalDays: 7,
}

// Прогресс через columns (надёжный способ в NativeScript)
const progressCols = computed(() => {
  const pct = Math.max(2, (currentChallenge.currentDay / currentChallenge.totalDays) * 100)
  return `${pct}*, ${100 - pct}*`
})

// Добавляем рейтинг к хобби
const ratings = ['4.9', '4.5', '4.7', '4.8']
const recommendedHobbies = hobbiesData.slice(0, 4).map((h, i) => ({
  ...h,
  rating: ratings[i] ?? '4.5',
  isNew: i === 0,
}))

// Строки для сетки рекомендаций
const recsRows = computed(() => {
  const rows = Math.ceil(recommendedHobbies.length / 2)
  return Array(rows).fill('auto').join(',')
})

function goToNotifications() {
  $navigateTo(NotificationsPage)
}

function goToCurrentChallenge() {
  $navigateTo(DayTaskPage, {
    props: { challengeId: currentChallenge.id, day: currentChallenge.currentDay },
  })
}

function goToCatalog() {
  $navigateTo(CatalogPage)
}

function openHobby(id: number) {
  $navigateTo(ChallengeDetail, { props: { challengeId: id } })
}

function goToTab(tab: string) {
  if (tab === 'catalog') $navigateTo(CatalogPage)
  else if (tab === 'profile') $navigateTo(ProfilePage)
}
</script>

<style scoped>
.page { background-color: #F8F6FF; }

/* ── Шапка ── */
.header {
  background-color: white;
  padding: 48px 18px 14px 18px;
  align-items: center;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.06);
}

.header-logo { border-radius: 10px; margin-right: 8px; }

.header-title {
  font-family: 'Nunito', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #181820;
}

.bell-wrap {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #F3F3F6;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}

.bell-icon {
  font-size: 20px;
  text-align: center;
}

.bell-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 9px;
  height: 9px;
  border-radius: 5px;
  background-color: #8E5EED;
}

/* ── Контент ── */
.scroll { background-color: #F8F6FF; }
.content { padding: 20px 14px 30px 14px; }

.greeting {
  font-family: 'Nunito', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #181820;
  margin-bottom: 4px;
}

.subgreeting {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  color: #565D6D;
  margin-bottom: 20px;
}

/* ── Карточка челленджа ── */
.challenge-card {
  background: linear-gradient(135deg, #8E5EED 0%, #B07DF8 100%);
  border-radius: 22px;
  padding: 18px 18px 14px 18px;
  margin-bottom: 24px;
  box-shadow: 0px 8px 24px rgba(142,94,237,0.38);
}

.challenge-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.72);
  letter-spacing: 1.2px;
  margin-bottom: 5px;
}

.challenge-title {
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: white;
  margin-bottom: 0;
}

.challenge-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: rgba(255,255,255,0.25);
  overflow: hidden;
  margin-left: 10px;
  align-self: flex-start;
  margin-top: 4px;
}

.challenge-icon-img {
  width: 52px;
  height: 52px;
  border-radius: 26px;
}

.progress-meta {
  align-items: center;
  margin-top: 14px;
  margin-bottom: 6px;
}

.meta-left {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: rgba(255,255,255,0.85);
}

.meta-right {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: white;
  text-align: right;
}

/* Прогресс-бар */
.progress-track {
  height: 8px;
  border-radius: 6px;
  background-color: rgba(255,255,255,0.25);
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-filled {
  background-color: white;
  border-radius: 6px 0 0 6px;
}

.progress-empty { background-color: transparent; }

.progress-start-tag {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 10px;
}

/* Точки дней */
.dots-row { margin-bottom: 14px; }

.dot {
  height: 8px;
  border-radius: 4px;
  background-color: rgba(255,255,255,0.3);
  margin: 0 2px;
}

.dot-active { background-color: white; }

.challenge-btn {
  background-color: white;
  color: #8E5EED;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  border-radius: 50px;
  height: 92px;
  width: 100%;
}

/* ── Рекомендации ── */
.section-hdr {
  align-items: center;
  margin-bottom: 14px;
}

.section-title {
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #181820;
}

.section-link {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #8E5EED;
  font-weight: 600;
}

.recs-grid { margin: 0 -4px; }

.rec-card {
  background-color: white;
  border-radius: 16px;
  margin: 6px 4px;
  padding-bottom: 10px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.08);
  overflow: hidden;
}

.rec-img {
  width: 100%;
  height: 130px;
  border-radius: 16px 16px 0 0;
}

.rec-title {
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #181820;
  margin: 7px 10px 4px 10px;
}

.rec-footer {
  align-items: center;
  margin: 0 10px;
}

.rec-stars { font-size: 10px; margin-right: 3px; }

.rec-rating {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  color: #565D6D;
  font-weight: 600;
}

.rec-new {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11px;
  color: #8E5EED;
  font-weight: 800;
}

/* ── Таб-бар ── */
.tabbar {
  background-color: white;
  border-top-width: 1px;
  border-top-color: #EDEDF2;
  height: 76px;
  padding-bottom: 6px;
}

.tab {
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
}

.tab-active {
  background-color: #EDE0FF;
  border-radius: 14px;
  margin: 4px;
}

.tab-icon { font-size: 20px; text-align: center; }

.tab-lbl {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 10px;
  color: #565D6D;
  text-align: center;
  margin-top: 2px;
}

.tab-lbl-active {
  color: #8E5EED;
  font-weight: 700;
}
</style>
