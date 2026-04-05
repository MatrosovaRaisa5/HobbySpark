<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="auto, *">
      <StackLayout row="0" class="header-section">
        <GridLayout columns="auto, *" class="header-content">
          <Image col="0" src="res://back" width="27" height="27" class="back-button" @tap="goBack" />
          <Label col="1" text="Достижения и скидки" class="header-title" />
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="content-scroll">
        <StackLayout class="content-container">

          <!-- ── Достижения ── -->
          <GridLayout columns="*, auto" class="section-hdr-row">
            <Label col="0" text="Мои достижения" class="section-title" />
            <Label col="1" text="Посмотреть все" class="section-link" @tap="viewAllAchievements" />
          </GridLayout>

          <StackLayout
            v-for="(ach, idx) in achievements"
            :key="idx"
            :class="['ach-card', ach.unlocked ? 'ach-unlocked' : 'ach-locked']"
          >
            <GridLayout columns="*, auto" class="ach-inner">
              <StackLayout col="0">
                <!-- Название -->
                <Label :text="ach.name" :class="['ach-name', ach.unlocked ? 'ach-name-done' : '']" />

                <!-- Получено / в прогрессе -->
                <Label v-if="ach.unlocked" :text="'Получено: ' + ach.date" class="ach-date" />
                <Label v-else :text="'Прогресс: ' + ach.progress + '/100'" class="ach-prog-lbl" />

                <!--
                  ПРОГРЕСС-БАР через GridLayout columns
                  Работает надёжно в NativeScript в отличие от width: x%
                -->
                <GridLayout
                  v-if="!ach.unlocked"
                  :columns="progressCols(ach.progress)"
                  class="ach-track"
                >
                  <StackLayout col="0" class="ach-filled" />
                  <StackLayout col="1" class="ach-empty" />
                </GridLayout>

                <!-- Прогресс-бар для выполненных (100%) -->
                <StackLayout v-else class="ach-track-done">
                  <StackLayout class="ach-filled-done" />
                </StackLayout>
              </StackLayout>

              <!-- Иконка-бейдж -->
              <StackLayout col="1" :class="['ach-badge', ach.unlocked ? 'ach-badge-purple' : 'ach-badge-gray']">
                <Label :text="ach.icon" class="ach-badge-icon" />
              </StackLayout>
            </GridLayout>

            <!-- Описание -->
            <Label :text="ach.desc" class="ach-desc" textWrap="true" />
          </StackLayout>

          <!-- ── Купоны ── -->
          <Label text="Купоны и скидки от спонсоров" class="section-title section-title-margin" />

          <StackLayout
            v-for="(coupon, idx) in coupons"
            :key="'c' + idx"
            class="coupon-card"
          >
            <GridLayout columns="auto, *, auto" class="coupon-inner">
              <!-- Иконка -->
              <StackLayout col="0" :class="['coupon-icon-wrap', coupon.colorClass]">
                <Label text="%" class="coupon-icon" />
              </StackLayout>

              <!-- Текст -->
              <StackLayout col="1" class="coupon-text">
                <Label :text="coupon.title" class="coupon-title" textWrap="true" />
                <Label :text="coupon.subtitle" class="coupon-subtitle" />
              </StackLayout>

              <!--
                Кнопка "Забрать":
                - открывает URL если задан
                - анимирует нажатие (меняет цвет на зелёный)
              -->
              <StackLayout
                col="2"
                :class="['coupon-btn-wrap', coupon.claimed ? 'coupon-btn-claimed' : 'coupon-btn-active']"
                @tap="claimCoupon(idx)"
              >
                <Label :text="coupon.claimed ? '✓' : 'Забрать'" class="coupon-btn-lbl" />
              </StackLayout>
            </GridLayout>

            <!-- Срок действия / статус -->
            <Label v-if="coupon.claimed" text="Купон активирован ✓" class="coupon-claimed-msg" />
          </StackLayout>

          <!-- Ещё скидки -->
          <StackLayout class="more-row" @tap="viewAllCoupons">
            <GridLayout columns="auto, *, auto" class="more-inner">
              <Label col="0" text="💎" class="more-gem" />
              <Label col="1" text="Ещё 12 доступных скидок" class="more-text" textWrap="true" />
              <Label col="2" text="›" class="more-arrow" />
            </GridLayout>
          </StackLayout>

        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { $navigateBack } from 'nativescript-vue'
import { Utils } from '@nativescript/core'

function goBack() {
  $navigateBack()
}

// Достижения
const achievements = ref([
  {
    name: 'Ранняя пташка',
    icon: '🕐',
    unlocked: true,
    date: '10 февраля 2026',
    progress: 100,
    desc: 'Завершите первое задание до полудня',
  },
  {
    name: 'Творческий ум',
    icon: '🎨',
    unlocked: true,
    date: '18 февраля 2026',
    progress: 100,
    desc: 'Начните свой первый творческий челлендж',
  },
  {
    name: 'Шаг к здоровью',
    icon: '👟',
    unlocked: false,
    date: '',
    progress: 75,
    desc: 'Пробегите свои первые 10 километров',
  },
  {
    name: 'Языковой эксперт',
    icon: '🈵',
    unlocked: false,
    date: '',
    progress: 0,
    desc: 'Проведите 10 часов за изучением языков',
  },
])

// Прогресс-бар через columns (надёжно в NativeScript)
function progressCols(pct: number): string {
  const safe = Math.max(2, Math.min(98, pct))
  return `${safe}*, ${100 - safe}*`
}

// Купоны с URL
const coupons = ref([
  {
    title: 'Скидка 20% в Coffee House',
    subtitle: 'Действует до 30 июня',
    colorClass: 'coupon-purple',
    url: 'https://coffeehouse.ru',
    claimed: false,
  },
  {
    title: '-15% на спортивные товары',
    subtitle: 'Для активных пользователей',
    colorClass: 'coupon-orange',
    url: 'https://sportmaster.ru',
    claimed: false,
  },
  {
    title: 'Бесплатный урок рисования',
    subtitle: 'Для новых участников',
    colorClass: 'coupon-green',
    url: 'https://skillbox.ru',
    claimed: false,
  },
])

function claimCoupon(idx: number) {
  const coupon = coupons.value[idx]
  if (!coupon.claimed) {
    // Открываем URL
    if (coupon.url) {
      Utils.openUrl(coupon.url)
    }
    // Помечаем как полученный
    coupons.value[idx] = { ...coupon, claimed: true }
  }
}

function viewAllAchievements() {
  console.log('View all achievements')
}

function viewAllCoupons() {
  // Например, открыть страницу всех скидок
  Utils.openUrl('https://hobbyspark.ru/discounts')
}
</script>

<style scoped>
.page { background-color: white; }

/* ── Шапка ── */
.header-section {
  background-color: white;
  padding: 40px 18px 16px 18px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
}
.header-content { align-items: center; }
.back-button { margin-right: 14px; }
.header-title {
  font-family: 'Nunito', sans-serif;
  font-size: 21px;
  font-weight: 700;
  color: #181820;
}

.content-scroll { background-color: white; }
.content-container { padding: 18px 14px 40px 14px; }

/* ── Секции ── */
.section-hdr-row { align-items: center; margin-bottom: 14px; }
.section-title {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #181820;
}
.section-title-margin { margin-top: 26px; margin-bottom: 14px; }
.section-link {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #8E5EED;
  font-weight: 600;
}

/* ── Карточки достижений ── */
.ach-card {
  border-radius: 18px;
  margin-bottom: 12px;
  padding: 16px 14px 10px 14px;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.05);
}
.ach-unlocked {
  background-color: white;
  border-width: 1.5px;
  border-color: #D5C0FB;
}
.ach-locked {
  background-color: #FAFAFA;
  border-width: 1px;
  border-color: #EDEDF2;
}

.ach-inner { align-items: center; margin-bottom: 8px; }

.ach-name {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #363645;
  margin-bottom: 3px;
}
.ach-name-done { color: #181820; }

.ach-date {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  color: #9095A0;
  margin-bottom: 6px;
}

.ach-prog-lbl {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  color: #9095A0;
  margin-bottom: 6px;
}

/* Прогресс-бар через columns */
.ach-track {
  height: 10px;
  border-radius: 6px;
  background-color: #EDEDF2;
  overflow: hidden;
  width: 190px;
}
.ach-filled {
  background: linear-gradient(90deg, #8E5EED, #B07DF8);
  border-radius: 6px 0 0 6px;
}
.ach-empty { background-color: transparent; }

.ach-track-done {
  height: 10px;
  border-radius: 6px;
  background-color: #EDEDF2;
  overflow: hidden;
  width: 190px;
  margin-top: 6px;
}
.ach-filled-done {
  background: linear-gradient(90deg, #8E5EED, #B07DF8);
  border-radius: 6px;
  height: 10px;
  width: 100%;
}

/* Бейдж-иконка */
.ach-badge {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
}
.ach-badge-purple { background-color: #EDE0FF; }
.ach-badge-gray { background-color: #F3F3F6; }
.ach-badge-icon { font-size: 24px; text-align: center; }

.ach-desc {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #565D6D;
}

/* ── Купоны ── */
.coupon-card {
  background-color: white;
  border-radius: 16px;
  margin-bottom: 12px;
  padding: 14px 14px 10px 14px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.07);
  border-width: 1px;
  border-color: #EDEDF2;
}
.coupon-inner { align-items: center; }

.coupon-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}
.coupon-purple { background-color: #8E5EED; }
.coupon-orange { background-color: #FA9938; }
.coupon-green  { background-color: #3DB87A; }

.coupon-icon {
  font-size: 22px;
  font-weight: 800;
  color: white;
  text-align: center;
}

.coupon-text { padding-right: 8px; }
.coupon-title {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #181820;
  margin-bottom: 3px;
}
.coupon-subtitle {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  color: #9095A0;
}

/* Кнопка купона */
.coupon-btn-wrap {
  border-radius: 22px;
  padding: 10px 16px;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}
.coupon-btn-active {
  background-color: white;
  border-width: 1.5px;
  border-color: #8E5EED;
}
.coupon-btn-claimed {
  background-color: #3DB87A;
  border-width: 0;
}
.coupon-btn-lbl {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #8E5EED;
  text-align: center;
}
.coupon-btn-claimed .coupon-btn-lbl {
  color: white;
}

.coupon-claimed-msg {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  color: #3DB87A;
  margin-top: 8px;
  font-weight: 600;
}

/* ── Ещё скидки ── */
.more-row {
  background-color: #F7F4FF;
  border-radius: 16px;
  padding: 16px 14px;
  margin-top: 4px;
}
.more-inner { align-items: center; }
.more-gem { font-size: 22px; margin-right: 10px; }
.more-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  color: #363645;
  font-weight: 600;
}
.more-arrow {
  font-size: 22px;
  color: #8E5EED;
  font-weight: 700;
}
</style>
