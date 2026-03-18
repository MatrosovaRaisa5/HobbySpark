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
          <Label col="1" text="Уведомления" class="header-title" />
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="content-scroll">
        <StackLayout class="content-container">

          <!-- Notification 1 -->
          <StackLayout class="notification-card">
            <GridLayout columns="auto, *, auto" class="notification-inner">
              <StackLayout col="0" class="notif-icon-wrap notif-icon-purple">
                <Label text="🎨" class="notif-icon" />
              </StackLayout>
              <StackLayout col="1" class="notif-text-wrap">
                <Label text='Искры в "Творческий ум"!' class="notif-title" textWrap="true" />
                <Label text='Вы получили 15 искр за "Твоя искра в акварели"' class="notif-subtitle" textWrap="true" />
              </StackLayout>
              <StackLayout col="2" class="notif-meta">
                <Label text="2 часа назад" class="notif-time" textWrap="true" />
                <Label text="•" class="notif-dot" />
              </StackLayout>
            </GridLayout>
          </StackLayout>

          <!-- Notification 2 -->
          <StackLayout class="notification-card">
            <GridLayout columns="auto, *, auto" class="notification-inner">
              <StackLayout col="0" class="notif-icon-wrap notif-icon-purple">
                <Label text="👟" class="notif-icon" />
              </StackLayout>
              <StackLayout col="1" class="notif-text-wrap">
                <Label text='Искры в "Шаг к здоровью"!' class="notif-title" textWrap="true" />
                <Label text='Вы получили 15 искр за "Твоя искра в движении"' class="notif-subtitle" textWrap="true" />
              </StackLayout>
              <StackLayout col="2" class="notif-meta">
                <Label text="4 часа назад" class="notif-time" textWrap="true" />
                <Label text="•" class="notif-dot" />
              </StackLayout>
            </GridLayout>
          </StackLayout>

          <!-- Notification 3 -->
          <StackLayout class="notification-card">
            <GridLayout columns="auto, *, auto" class="notification-inner">
              <StackLayout col="0" class="notif-icon-wrap notif-icon-gray">
                <Label text="🔔" class="notif-icon" />
              </StackLayout>
              <StackLayout col="1" class="notif-text-wrap">
                <Label text="Не забудьте про задание!" class="notif-title" textWrap="true" />
                <Label text='"Твоя искра в движении" ждет вас!' class="notif-subtitle" textWrap="true" />
              </StackLayout>
              <StackLayout col="2" class="notif-meta">
                <Label text="вчера" class="notif-time" textWrap="true" />
              </StackLayout>
            </GridLayout>
          </StackLayout>

          <!-- Empty state -->
          <StackLayout class="empty-state">
            <Label text="😐" class="empty-icon" />
            <Label text="Тут больше ничего нет..." class="empty-text" />
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
  font-size: 24px;
  font-weight: 700;
  color: #181820;
}

.content-scroll {
  background-color: #FAFAFB;
}

.content-container {
  padding: 20px 16px 40px 16px;
}

.notification-card {
  background-color: white;
  border-radius: 16px;
  margin-bottom: 12px;
  padding: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
}

.notification-inner {
  align-items: center;
}

.notif-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 26px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.notif-icon-purple {
  background-color: #EDE0FF;
}

.notif-icon-gray {
  background-color: #F3F3F6;
}

.notif-icon {
  font-size: 22px;
  text-align: center;
}

.notif-text-wrap {
  padding: 0 8px 0 0;
}

.notif-title {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #181820;
  margin-bottom: 4px;
}

.notif-subtitle {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #565D6D;
  line-height: 14px;
}

.notif-meta {
  align-items: flex-end;
  justify-content: flex-start;
  min-width: 70px;
}

.notif-time {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  color: #9095A0;
  text-align: right;
  margin-bottom: 6px;
}

.notif-dot {
  font-size: 20px;
  color: #8E5EED;
  text-align: right;
}

.empty-state {
  align-items: center;
  margin-top: 60px;
}

.empty-icon {
  font-size: 60px;
  color: #C0C0CC;
  text-align: center;
  margin-bottom: 14px;
}

.empty-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  color: #9095A0;
  text-align: center;
}
</style>
