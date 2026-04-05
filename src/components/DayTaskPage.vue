<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="auto, *">
      <!-- Header -->
      <StackLayout row="0" class="header-section">
        <GridLayout columns="auto, *" class="header-content">
          <Image col="0" src="res://back" width="27" height="27" class="back-button" @tap="goBack" />
          <Label col="1" :text="task ? task.title : 'Задание дня'" class="header-title" textWrap="true" />
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="content-scroll">
        <StackLayout>

          <!-- Intro -->
          <StackLayout class="intro-block" v-if="task">
            <Label :text="task.intro" class="intro-text" textWrap="true" />
          </StackLayout>

          <!-- Нет данных -->
          <StackLayout v-if="!task" class="no-data-block">
            <Label text="😕" class="no-data-emoji" />
            <Label text="Задание не найдено" class="no-data-text" />
          </StackLayout>

          <!-- Материалы -->
          <StackLayout class="white-block" v-if="task">
            <GridLayout columns="*, auto" class="accordion-header" @tap="toggleMaterials">
              <Label col="0" text="Что сегодня понадобится?" class="accordion-title" />
              <Label col="1" :text="materialsOpen ? '▲' : '▼'" class="accordion-arrow" />
            </GridLayout>
            <StackLayout v-if="materialsOpen">
              <StackLayout
                v-for="(item, idx) in materialsList"
                :key="'mat-' + idx"
                class="material-row"
                @tap="toggleCheck(idx)"
              >
                <GridLayout columns="auto, *, auto" class="material-inner">
                  <StackLayout col="0" class="checkbox-wrap" :class="item.checked ? 'checked' : ''">
                    <Label v-if="item.checked" text="✓" class="checkbox-tick" />
                  </StackLayout>
                  <StackLayout col="1" class="material-label-wrap">
                    <Label :text="item.emoji + '  ' + item.name" class="material-name" />
                  </StackLayout>
                  <Label col="2" :text="item.hint" class="material-hint" textWrap="true" />
                </GridLayout>
              </StackLayout>
              <StackLayout class="tip-box">
                <GridLayout columns="auto, *">
                  <Label col="0" text="💡" class="tip-icon" />
                  <Label col="1" text="Если чего-то нет, не беда! Используй то, что есть дома. Главное — начать" class="tip-text" textWrap="true" />
                </GridLayout>
              </StackLayout>
            </StackLayout>
          </StackLayout>

          <!-- Шаги -->
          <StackLayout
            v-for="(step, idx) in (task ? task.steps : [])"
            :key="'step-' + idx"
            class="white-block step-block"
          >
            <GridLayout columns="auto, *" class="step-header">
              <StackLayout col="0" class="step-number-wrap">
                <Label :text="String(idx + 1)" class="step-number" />
              </StackLayout>
              <Label col="1" :text="step.title" class="step-title" textWrap="true" />
            </GridLayout>
            <Label :text="step.description" class="step-desc" textWrap="true" />
            <Image :src="step.image" class="step-image" stretch="aspectFill" />
          </StackLayout>

          <!-- Советы дня -->
          <StackLayout class="tips-section" v-if="task && task.tips.length > 0">
            <GridLayout columns="auto, *" class="tips-header-row">
              <Label col="0" text="🤔" class="tips-emoji" />
              <Label col="1" text="Советы дня" class="tips-title" />
            </GridLayout>
            <StackLayout v-for="(tip, idx) in task.tips" :key="'tip-' + idx" class="tip-card">
              <Label :text="tip.title" class="tip-card-title" />
              <Label :text="tip.body" class="tip-card-body" textWrap="true" />
            </StackLayout>
          </StackLayout>

          <!-- Вопросы + настроение + заметка -->
          <StackLayout class="white-block questions-block" v-if="task">
            <GridLayout columns="auto, *" class="questions-header-row">
              <Label col="0" text="❓" class="questions-emoji" />
              <Label col="1" text="Вопросы дня" class="questions-title" />
            </GridLayout>
            <StackLayout v-for="(q, idx) in task.questions" :key="'q-' + idx" class="question-pill">
              <Label :text="q" class="question-text" textWrap="true" />
            </StackLayout>

            <Label text="Как бы ты оценила своё настроение после задания?" class="mood-question" textWrap="true" />
            <GridLayout columns="*, *, *, *, *, *, *, *, *" class="mood-grid">
              <StackLayout
                v-for="(emoji, idx) in moodEmojis"
                :key="'mood-' + idx"
                :col="idx"
                :class="['mood-emoji-wrap', selectedMood === idx ? 'mood-selected' : '']"
                @tap="selectMood(idx)"
              >
                <Label :text="emoji" class="mood-emoji" />
              </StackLayout>
            </GridLayout>

            <GridLayout columns="*, auto" class="note-header-row">
              <Label col="0" text="Заметка" class="note-label" />
              <Label col="1" text="✏️" class="note-edit-icon" />
            </GridLayout>
            <StackLayout class="note-input-wrap">
              <GridLayout columns="*, auto">
                <TextField col="0" hint="Как прошёл ваш день? Добавьте пару слов..." class="note-input" v-model="noteText" returnKeyType="done" />
                <Label col="1" text="📎" class="note-attach" />
              </GridLayout>
            </StackLayout>

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
import { getDayTask } from '~/data/dayTasksData'
import TaskCompletedPage from './TaskCompletedPage.vue'

const props = defineProps<{
  challengeId: number
  day: number
}>()

// Загружаем данные синхронно — props доступны сразу в setup
const task = getDayTask(props.challengeId, props.day)

// Материалы с реактивным checked (простой ref, не computed)
const materialsList = ref(
  (task?.materials ?? []).map(m => ({ ...m, checked: false }))
)

function toggleCheck(idx: number) {
  const item = materialsList.value[idx]
  if (item) item.checked = !item.checked
}

const materialsOpen = ref(true)
function toggleMaterials() {
  materialsOpen.value = !materialsOpen.value
}

const moodEmojis = ['😠', '😵', '😢', '😐', '😊', '😃', '🤩', '😇', '🥰']
const selectedMood = ref<number | null>(null)
function selectMood(idx: number) {
  selectedMood.value = idx
}

const noteText = ref('')

function goBack() { $navigateBack() }

function completeDay() {
  $navigateTo(TaskCompletedPage, {
    props: {
      challengeId: props.challengeId,
      day: props.day,
    },
  })
}
</script>

<style scoped>
.page { background-color: #F3EEF9; }

.header-section {
  background-color: white;
  padding: 44px 20px 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
}
.header-content { align-items: center; }
.back-button { margin-right: 14px; }
.header-title {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #181820;
}

.content-scroll { background-color: #F3EEF9; }

.intro-block {
  background-color: #E9DCFB;
  padding: 20px 20px;
  margin-bottom: 12px;
}
.intro-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  color: #363645;
  line-height: 22px;
}

.white-block {
  background-color: white;
  border-radius: 20px;
  margin: 12px 14px;
  padding: 18px 16px;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.06);
}

.accordion-header {
  align-items: center;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
  margin-bottom: 8px;
}
.accordion-title {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #181820;
}
.accordion-arrow { font-size: 14px; color: #8E5EED; }

.material-row {
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #F5F5F8;
}
.material-inner { align-items: center; }

.checkbox-wrap {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border-width: 2px;
  border-color: #D0D5DD;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}
.checkbox-wrap.checked {
  background-color: #8E5EED;
  border-color: #8E5EED;
}
.checkbox-tick {
  font-size: 13px;
  color: white;
  text-align: center;
  font-weight: 800;
}
.material-label-wrap { padding-right: 8px; }
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
  width: 120px;
  line-height: 16px;
}

.tip-box {
  background-color: #FFF7ED;
  border-radius: 12px;
  padding: 12px 14px;
  margin-top: 14px;
}
.tip-icon { font-size: 20px; margin-right: 10px; margin-top: 2px; }
.tip-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #6B5B00;
  line-height: 20px;
}

.step-block { padding: 18px 16px 0 16px; }
.step-header { align-items: center; margin-bottom: 10px; }
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
  font-size: 17px;
  font-weight: 700;
  color: #181820;
}
.step-desc {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #363645;
  line-height: 20px;
  margin-bottom: 14px;
  padding: 0 2px;
}
.step-image {
  width: 100%;
  height: 200px;
  border-radius: 0 0 16px 16px;
}

.tips-section {
  background-color: #EDE0FF;
  border-radius: 20px;
  margin: 12px 14px;
  padding: 18px 16px;
}
.tips-header-row { align-items: center; margin-bottom: 14px; }
.tips-emoji { font-size: 26px; margin-right: 10px; }
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
  line-height: 18px;
}

.questions-block { margin-bottom: 24px; }
.questions-header-row { align-items: center; margin-bottom: 14px; }
.questions-emoji { font-size: 26px; margin-right: 10px; }
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
  line-height: 20px;
}

.mood-question {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #181820;
  margin-top: 16px;
  margin-bottom: 12px;
}
.mood-grid { margin-bottom: 16px; }
.mood-emoji-wrap {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  background-color: #EDE0FF;
  margin: 2px;
}
.mood-emoji-wrap.mood-selected { background-color: #8E5EED; }
.mood-emoji { font-size: 20px; text-align: center; }

.note-header-row { align-items: center; margin-bottom: 8px; margin-top: 4px; }
.note-label {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #181820;
}
.note-edit-icon { font-size: 18px; }
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

.complete-button {
  background-color: #8E5EED;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  font-weight: 700;
  border-radius: 50px;
  height: 54px;
  width: 100%;
  box-shadow: 0px 4px 12px rgba(142,94,237,0.35);
}

.no-data-block { align-items: center; padding: 60px 20px; }
.no-data-emoji { font-size: 48px; text-align: center; margin-bottom: 12px; }
.no-data-text {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  color: #9095A0;
  text-align: center;
}
</style>
