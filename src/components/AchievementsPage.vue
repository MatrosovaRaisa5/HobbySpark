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
          <Label col="1" text="Достижения и скидки" class="header-title" />
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="content-scroll">
        <StackLayout class="content-container">

          <!-- Achievements section -->
          <GridLayout columns="*, auto" class="section-header-row">
            <Label col="0" text="Мои достижения" class="section-title" />
            <Label col="1" text="Посмотреть все" class="section-link" @tap="viewAllAchievements" />
          </GridLayout>

          <!-- Achievement 1: Ранняя пташка (unlocked) -->
          <StackLayout class="achievement-card achievement-unlocked">
            <GridLayout columns="*, auto" class="achievement-inner">
              <StackLayout col="0">
                <Label text="Ранняя пташка" class="achievement-name" />
                <Label text="Получено: 10 февраля 2026" class="achievement-date" />
              </StackLayout>
              <StackLayout col="1" class="achievement-badge-wrap achievement-badge-purple">
                <Label text="🕐" class="achievement-badge-icon" />
              </StackLayout>
            </GridLayout>
            <Label text="Завершите первое задание до полудня" class="achievement-desc" textWrap="true" />
          </StackLayout>

          <!-- Achievement 2: Творческий ум (unlocked) -->
          <StackLayout class="achievement-card achievement-unlocked">
            <GridLayout columns="*, auto" class="achievement-inner">
              <StackLayout col="0">
                <Label text="Творческий ум" class="achievement-name" />
                <Label text="Получено: 18 февраля 2026" class="achievement-date" />
              </StackLayout>
              <StackLayout col="1" class="achievement-badge-wrap achievement-badge-purple">
                <Label text="🎨" class="achievement-badge-icon" />
              </StackLayout>
            </GridLayout>
            <Label text="Начните свой первый творческий челлендж" class="achievement-desc" textWrap="true" />
          </StackLayout>

          <!-- Achievement 3: Шаг к здоровью (in progress) -->
          <StackLayout class="achievement-card">
            <GridLayout columns="*, auto" class="achievement-inner">
              <StackLayout col="0">
                <Label text="Шаг к здоровью" class="achievement-name achievement-name-progress" />
                <Label text="Прогресс: 75/100" class="achievement-progress-label" />
                <StackLayout class="progress-bar-bg">
                  <StackLayout class="progress-bar-fill" width="75%" />
                </StackLayout>
              </StackLayout>
              <StackLayout col="1" class="achievement-badge-wrap achievement-badge-gray">
                <Label text="👟" class="achievement-badge-icon" />
              </StackLayout>
            </GridLayout>
            <Label text="Пробегите свои первые 10 километров" class="achievement-desc" textWrap="true" />
          </StackLayout>

          <!-- Achievement 4: Языковой эксперт (locked) -->
          <StackLayout class="achievement-card">
            <GridLayout columns="*, auto" class="achievement-inner">
              <StackLayout col="0">
                <Label text="Языковой эксперт" class="achievement-name achievement-name-progress" />
                <Label text="Прогресс: 0/100" class="achievement-progress-label" />
                <StackLayout class="progress-bar-bg">
                  <StackLayout class="progress-bar-fill" width="0%" />
                </StackLayout>
              </StackLayout>
              <StackLayout col="1" class="achievement-badge-wrap achievement-badge-gray">
                <Label text="🈵" class="achievement-badge-icon" />
              </StackLayout>
            </GridLayout>
            <Label text="Проведите 10 часов за изучением языков" class="achievement-desc" textWrap="true" />
          </StackLayout>

          <!-- Coupons section -->
          <Label text="Купоны и скидки от спонсоров" class="section-title section-title-margin" />

          <!-- Coupon 1 -->
          <StackLayout class="coupon-card">
            <GridLayout columns="auto, *, auto" class="coupon-inner">
              <StackLayout col="0" class="coupon-icon-wrap coupon-icon-purple">
                <Label text="%" class="coupon-icon" />
              </StackLayout>
              <StackLayout col="1" class="coupon-text-wrap">
                <Label text="Скидка 20% в Coffee House" class="coupon-title" textWrap="true" />
                <Label text="Действует до 30 июня" class="coupon-subtitle" />
              </StackLayout>
              <Button col="2" text="Забрать" class="coupon-button" @tap="claimCoupon(1)" />
            </GridLayout>
          </StackLayout>

          <!-- Coupon 2 -->
          <StackLayout class="coupon-card">
            <GridLayout columns="auto, *, auto" class="coupon-inner">
              <StackLayout col="0" class="coupon-icon-wrap coupon-icon-orange">
                <Label text="%" class="coupon-icon" />
              </StackLayout>
              <StackLayout col="1" class="coupon-text-wrap">
                <Label text="-15% на спортивные товары" class="coupon-title" textWrap="true" />
                <Label text="Для активных пользователей" class="coupon-subtitle" />
              </StackLayout>
              <Button col="2" text="Забрать" class="coupon-button" @tap="claimCoupon(2)" />
            </GridLayout>
          </StackLayout>

          <!-- More coupons -->
          <StackLayout class="more-coupons-row">
            <GridLayout columns="auto, *" class="more-coupons-inner">
              <Label col="0" text="💎" class="more-coupons-gem" />
              <GridLayout col="1" columns="*, auto">
                <Label col="0" text="Ещё 12 доступных скидок" class="more-coupons-text" textWrap="true" />
                <Label col="1" text="Посмотреть" class="more-coupons-link" @tap="viewAllCoupons" />
              </GridLayout>
            </GridLayout>
          </StackLayout>

        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { $navigateBack } from 'nativescript-vue'

function goBack() {
  $navigateBack()
}

function viewAllAchievements() {
  console.log('View all achievements')
}

function claimCoupon(id: number) {
  console.log('Claim coupon', id)
}

function viewAllCoupons() {
  console.log('View all coupons')
}
</script>

<style scoped>
.page {
  background-color: white;
}

.header-section {
  background-color: white;
  padding: 40px 20px 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
}

.header-content {
  align-items: center;
}

.back-button {
  margin-right: 14px;
}

.header-title {
  font-family: 'Nunito', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #181820;
}

.content-scroll {
  background-color: white;
}

.content-container {
  padding: 20px 16px 40px 16px;
}

.section-header-row {
  align-items: center;
  margin-bottom: 14px;
}

.section-title {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #181820;
}

.section-title-margin {
  margin-top: 28px;
  margin-bottom: 14px;
}

.section-link {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #8E5EED;
  font-weight: 600;
}

/* Achievement cards */
.achievement-card {
  background-color: white;
  border-width: 1px;
  border-color: #EDEDF2;
  border-radius: 16px;
  margin-bottom: 12px;
  padding: 16px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04);
}

.achievement-unlocked {
  border-color: #E2D4FB;
}

.achievement-inner {
  align-items: center;
  margin-bottom: 6px;
}

.achievement-name {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #181820;
  margin-bottom: 2px;
}

.achievement-name-progress {
  color: #363645;
}

.achievement-date {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #9095A0;
}

.achievement-progress-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #9095A0;
  margin-bottom: 6px;
}

.progress-bar-bg {
  background-color: #EDEDF2;
  border-radius: 4px;
  height: 8px;
  width: 180px;
  margin-top: 4px;
}

.progress-bar-fill {
  background-color: #8E5EED;
  border-radius: 4px;
  height: 8px;
}

.achievement-badge-wrap {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
}

.achievement-badge-purple {
  background-color: #EDE0FF;
}

.achievement-badge-gray {
  background-color: #F3F3F6;
}

.achievement-badge-icon {
  font-size: 22px;
  text-align: center;
}

.achievement-desc {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #565D6D;
  margin-top: 4px;
}

/* Coupon cards */
.coupon-card {
  background-color: white;
  border-width: 1px;
  border-color: #EDEDF2;
  border-radius: 16px;
  margin-bottom: 12px;
  padding: 14px 16px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04);
}

.coupon-inner {
  align-items: center;
}

.coupon-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.coupon-icon-purple {
  background-color: #8E5EED;
}

.coupon-icon-orange {
  background-color: #FA9938;
}

.coupon-icon {
  font-size: 20px;
  font-weight: 800;
  color: white;
  text-align: center;
}

.coupon-text-wrap {
  padding-right: 8px;
}

.coupon-title {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #181820;
  margin-bottom: 3px;
}

.coupon-subtitle {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #9095A0;
}

.coupon-button {
  background-color: white;
  color: #8E5EED;
  border-width: 1.5px;
  border-color: #8E5EED;
  border-radius: 20px;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  height: 64px;
  padding: 0 16px;
}

.more-coupons-row {
  background-color: #FAFAFB;
  border-radius: 16px;
  padding: 16px;
  margin-top: 4px;
}

.more-coupons-inner {
  align-items: center;
}

.more-coupons-gem {
  font-size: 22px;
  margin-right: 10px;
}

.more-coupons-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  color: #363645;
  font-weight: 600;
}

.more-coupons-link {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #8E5EED;
  font-weight: 600;
  text-align: right;
}
</style>
