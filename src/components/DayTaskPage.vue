<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="auto, *">
      <!-- Header -->
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
          <Label col="1" text="День 1: Знакомство с материалами" class="header-title" textWrap="true" />
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="content-scroll">
        <StackLayout>

          <!-- Intro description -->
          <StackLayout class="intro-block">
            <Label
              text="Начни своё творческое путешествие с основ! Сегодня ты изучишь инструменты, попробуешь разные мазки и научишься смешивать цвета. Никаких шедевров — только эксперименты и удовольствие"
              class="intro-text"
              textWrap="true"
            />
          </StackLayout>

          <!-- Materials accordion -->
          <StackLayout class="white-block">
            <GridLayout columns="*, auto" class="accordion-header" @tap="toggleMaterials">
              <Label col="0" text="Что сегодня понадобится?" class="accordion-title" />
              <Label col="1" :text="materialsOpen ? '▲' : '▼'" class="accordion-arrow" />
            </GridLayout>

            <StackLayout v-if="materialsOpen">
              <StackLayout v-for="(item, idx) in materials" :key="idx" class="material-row" @tap="toggleCheck(idx)">
                <GridLayout columns="auto, *, auto" class="material-inner">
                  <StackLayout col="0" :class="item.checked ? 'checkbox checked' : 'checkbox'" class="checkbox-wrap">
                    <Label v-if="item.checked" text="✓" class="checkbox-tick" />
                  </StackLayout>
                  <StackLayout col="1" class="material-label-wrap">
                    <Label :text="item.emoji + '  ' + item.name" class="material-name" />
                  </StackLayout>
                  <Label col="2" :text="item.hint" class="material-hint" textWrap="true" />
                </GridLayout>
              </StackLayout>

              <!-- Tip box -->
              <StackLayout class="tip-box">
                <GridLayout columns="auto, *">
                  <Label col="0" text="💡" class="tip-icon" />
                  <Label col="1" text="Если чего-то нет, не беда! Используй то, что есть дома. Главное — начать" class="tip-text" textWrap="true" />
                </GridLayout>
              </StackLayout>
            </StackLayout>
          </StackLayout>

          <!-- Step 1 -->
          <StackLayout class="white-block step-block">
            <GridLayout columns="auto, *" class="step-header">
              <StackLayout col="0" class="step-number-wrap">
                <Label text="1" class="step-number" />
              </StackLayout>
              <Label col="1" text="Изучи краски" class="step-title" />
            </GridLayout>
            <Label
              text="Выдави краски на палитру. Попробуй нанести на бумагу каждый цвет отдельно. Обрати внимание на насыщенность и прозрачность (особенно у акварели)"
              class="step-desc"
              textWrap="true"
            />
            <Image src="res://paints" class="step-image" stretch="aspectFill" />
          </StackLayout>

          <!-- Step 2 -->
          <StackLayout class="white-block step-block">
            <GridLayout columns="auto, *" class="step-header">
              <StackLayout col="0" class="step-number-wrap">
                <Label text="2" class="step-number" />
              </StackLayout>
              <Label col="1" text="Познакомься с кистями" class="step-title" />
            </GridLayout>
            <Label
              text="Круглой кистью сделай линии разной толщины, точки, завитки&#10;Плоской кистью — широкие мазки, попробуй держать её плашмя и на ребре&#10;Тонкой кистью — мелкие детали, точки, надписи"
              class="step-desc"
              textWrap="true"
            />
            <Image src="res://brushes" class="step-image" stretch="aspectFill" />
          </StackLayout>

          <!-- Daily tips -->
          <StackLayout class="tips-section">
            <GridLayout columns="auto, *" class="tips-header-row">
              <Label col="0" text="🤔" class="tips-emoji" />
              <Label col="1" text="Советы дня" class="tips-title" />
            </GridLayout>

            <StackLayout v-for="(tip, idx) in dailyTips" :key="idx" class="tip-card">
              <Label :text="tip.title" class="tip-card-title" />
              <Label :text="tip.body" class="tip-card-body" textWrap="true" />
            </StackLayout>
          </StackLayout>

          <!-- Sparks from beginners -->
          <StackLayout class="white-block">
            <GridLayout columns="*, auto" class="section-header-row">
              <Label col="0" text="Искры других новичков" class="section-header-title" />
              <Label col="1" text="Ещё" class="section-header-link" @tap="viewMoreSparks" />
            </GridLayout>
            <GridLayout columns="*, *" rows="auto, auto" class="sparks-grid">
              <Image col="0" row="0" src="res://spark1" class="spark-image" stretch="aspectFill" />
              <Image col="1" row="0" src="res://spark2" class="spark-image" stretch="aspectFill" />
              <Image col="0" row="1" src="res://spark3" class="spark-image" stretch="aspectFill" />
              <Image col="1" row="1" src="res://spark4" class="spark-image" stretch="aspectFill" />
            </GridLayout>
          </StackLayout>

          <!-- Questions of the day -->
          <StackLayout class="white-block questions-block">
            <GridLayout columns="auto, *" class="questions-header-row">
              <Label col="0" text="❓" class="questions-emoji" />
              <Label col="1" text="Вопросы дня" class="questions-title" />
            </GridLayout>

            <StackLayout v-for="(q, idx) in questions" :key="idx" class="question-pill">
              <Label :text="q" class="question-text" textWrap="true" />
            </StackLayout>

            <!-- Mood rating -->
            <Label text="Как бы ты оценила своё настроение после задания?" class="mood-question" textWrap="true" />
            <GridLayout columns="*, *, *, *, *, *, *, *, *" class="mood-grid">
              <StackLayout
                v-for="(emoji, idx) in moodEmojis"
                :key="idx"
                :col="idx"
                :class="['mood-emoji-wrap', selectedMood === idx ? 'mood-selected' : '']"
                @tap="selectMood(idx)"
              >
                <Label :text="emoji" class="mood-emoji" />
              </StackLayout>
            </GridLayout>

            <!-- Note input -->
            <GridLayout columns="*, auto" class="note-header-row">
              <Label col="0" text="Заметка" class="note-label" />
              <Label col="1" text="✏️" class="note-edit-icon" />
            </GridLayout>
            <StackLayout class="note-input-wrap">
              <GridLayout columns="*, auto">
                <TextField
                  col="0"
                  hint="Как прошёл ваш день? Добавьте фото и пару слов..."
                  class="note-input"
                  v-model="noteText"
                  returnKeyType="done"
                />
                <Label col="1" text="📎" class="note-attach" />
              </GridLayout>
            </StackLayout>

            <!-- Complete button -->
            <Button text="✓  Завершить день" class="complete-button" @tap="completeDay" />
          </StackLayout>

        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { $navigateBack, $navigateTo } from 'nativescript-vue'
import TaskCompletedPage from './TaskCompletedPage.vue'

function goBack() {
  $navigateBack()
}

const materialsOpen = ref(true)

function toggleMaterials() {
  materialsOpen.value = !materialsOpen.value
}

const materials = ref([
  { name: 'Краски', emoji: '🎨', hint: 'Акварель, гуашь или акрил (на выбор). Рекомендуем акварель она прощает ошибки', checked: true },
  { name: 'Кисти', emoji: '🖌️', hint: 'Минимум три: круглая (№6-8), плоская (№10), тонкая (№2). Синтетика подойдёт', checked: true },
  { name: 'Бумага', emoji: '📄', hint: 'Акварельная плотностью 200-300 г/м². Формат А5 или А4', checked: true },
  { name: 'Палитра', emoji: '🎭', hint: 'Обычная тарелочка, пластиковая крышка или специальная палитра', checked: false },
  { name: 'Вода', emoji: '💧', hint: 'Баночка непроливайка или обычный стакан', checked: false },
  { name: 'Салфетки', emoji: '🧻', hint: 'Понадобятся, чтобы вытирать кисти', checked: false },
])

function toggleCheck(idx: number) {
  materials.value[idx].checked = !materials.value[idx].checked
}

const dailyTips = [
  {
    title: 'НЕ БОЙСЯ ОШИБОК',
    body: 'В творчестве нет неправильных мазков, есть только новые открытия',
  },
  {
    title: 'ВОДА - ДРУГ',
    body: 'Промывай кисть при смене цвета, особенно в акварели, чтобы краски оставались чистыми',
  },
  {
    title: 'ИГРАЙ С КОНСИСТЕНЦИЕЙ',
    body: 'Попробуй разное количество воды — от густой краски до лёгкой заливки',
  },
  {
    title: 'СФОТОГРАФИРУЙ ПРОЦЕСС',
    body: 'Позже будет интересно посмотреть на первые шаги',
  },
]

const questions = [
  'Было ли что-то, что разозлило или расстроило? Если да, то что?',
  'Какой приём или эффект стал для тебя открытием?',
  'Что бы ты сделала иначе, если бы начала этот день заново?',
]

const moodEmojis = ['😠', '😵', '😢', '😐', '😊', '😃', '🤩', '😇', '🥰']
const selectedMood = ref<number | null>(null)

function selectMood(idx: number) {
  selectedMood.value = idx
}

const noteText = ref('')

function viewMoreSparks() {
  console.log('View more sparks')
}

function completeDay() {
  $navigateTo(TaskCompletedPage)
}
</script>

<style scoped>
.page {
  background-color: #F3EEF9;
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
  font-size: 18px;
  font-weight: 700;
  color: #181820;
}

.content-scroll {
  background-color: #F3EEF9;
}

/* Intro block */
.intro-block {
  background-color: #E9DCFB;
  padding: 20px 18px;
  margin-bottom: 12px;
}

.intro-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  color: #363645;
  line-height: 16px;
}

/* White block shared */
.white-block {
  background-color: white;
  border-radius: 20px;
  margin: 12px 14px;
  padding: 18px 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
}

/* Accordion */
.accordion-header {
  align-items: center;
  margin-bottom: 14px;
}

.accordion-title {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #181820;
}

.accordion-arrow {
  font-size: 12px;
  color: #8E5EED;
  font-weight: 700;
  text-align: right;
}

/* Materials */
.material-row {
  margin-bottom: 10px;
}

.material-inner {
  align-items: flex-start;
}

.checkbox-wrap {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border-width: 2px;
  border-color: #C8CACD;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 2px;
}

.checkbox-wrap.checked {
  background-color: #8E5EED;
  border-color: #8E5EED;
}

.checkbox-tick {
  font-size: 14px;
  color: white;
  text-align: center;
  font-weight: 800;
}

.material-label-wrap {
  padding-right: 8px;
  min-width: 80px;
}

.material-name {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #181820;
}

.material-hint {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  color: #565D6D;
  width: 140px;
  line-height: 13px;
}

/* Tip box */
.tip-box {
  background-color: #FFF7ED;
  border-radius: 12px;
  padding: 12px 14px;
  margin-top: 14px;
}

.tip-icon {
  font-size: 20px;
  margin-right: 10px;
  margin-top: 2px;
}

.tip-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #6B5B00;
  line-height: 15px;
}

/* Steps */
.step-block {
  padding: 18px 16px 0 16px;
}

.step-header {
  align-items: center;
  margin-bottom: 10px;
}

.step-number-wrap {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #8E5EED;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.step-number {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: white;
  text-align: center;
}

.step-title {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #181820;
}

.step-desc {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #363645;
  line-height: 15px;
  margin-bottom: 14px;
  padding: 0 2px;
}

.step-image {
  width: 100%;
  height: 280px;
  border-radius: 0 0 16px 16px;
}

/* Tips section */
.tips-section {
  background-color: #EDE0FF;
  border-radius: 20px;
  margin: 12px 14px;
  padding: 18px 16px;
}

.tips-header-row {
  align-items: center;
  margin-bottom: 14px;
}

.tips-emoji {
  font-size: 26px;
  margin-right: 10px;
}

.tips-title {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #181820;
}

.tip-card {
  background-color: white;
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 8px;
}

.tip-card-title {
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #181820;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.tip-card-body {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #565D6D;
  line-height: 14px;
}

/* Section header */
.section-header-row {
  align-items: center;
  margin-bottom: 12px;
}

.section-header-title {
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #181820;
}

.section-header-link {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #8E5EED;
  font-weight: 600;
}

/* Sparks grid */
.sparks-grid {
  margin: 0 -4px;
}

.spark-image {
  height: 130px;
  border-radius: 12px;
  margin: 4px;
}

/* Questions */
.questions-block {
  margin-bottom: 24px;
}

.questions-header-row {
  align-items: center;
  margin-bottom: 14px;
}

.questions-emoji {
  font-size: 26px;
  margin-right: 10px;
}

.questions-title {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #181820;
}

.question-pill {
  background-color: #EDE0FF;
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 8px;
}

.question-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #363645;
  line-height: 15px;
}

/* Mood */
.mood-question {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #181820;
  margin-top: 16px;
  margin-bottom: 12px;
}

.mood-grid {
  margin-bottom: 16px;
}

.mood-emoji-wrap {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  background-color: #EDE0FF;
  margin: 2px;
}

.mood-emoji-wrap.mood-selected {
  background-color: #8E5EED;
}

.mood-emoji {
  font-size: 20px;
  text-align: center;
}

/* Note */
.note-header-row {
  align-items: center;
  margin-bottom: 8px;
  margin-top: 4px;
}

.note-label {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #181820;
}

.note-edit-icon {
  font-size: 18px;
}

.note-input-wrap {
  background-color: #F3F3F6;
  border-radius: 14px;
  padding: 10px 14px;
  margin-bottom: 20px;
}

.note-input {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #363645;
  background-color: transparent;
  placeholder-color: #9095A0;
  min-height: 80px;
}

.note-attach {
  font-size: 22px;
  color: #8E5EED;
  align-self: flex-end;
  margin-bottom: 4px;
}

/* Complete button */
.complete-button {
  background-color: #8E5EED;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  font-weight: 700;
  border-radius: 50px;
  height: 120px;
  width: 100%;
  box-shadow: 0px 4px 12px rgba(142, 94, 237, 0.35);
}
</style>
