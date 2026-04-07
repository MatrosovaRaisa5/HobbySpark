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

          <!-- Материалы (чеклист) -->
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
                <GridLayout columns="auto, auto, *" class="material-inner">
                  <StackLayout col="0" class="checkbox-wrap" :class="item.checked ? 'checked' : ''">
                    <Label v-if="item.checked" text="✓" class="checkbox-tick" />
                  </StackLayout>
                  <!-- Emoji отдельным Label для правильного рендера -->
                  <Label col="1" :text="item.emoji" class="material-emoji" />
                  <Label col="2" :text="item.name" class="material-name" />
                </GridLayout>
                <Label :text="item.hint" class="material-hint" textWrap="true" v-if="item.hint" />
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
              <Label col="0" text="🤔" class="section-emoji" />
              <Label col="1" text="Советы дня" class="tips-title" />
            </GridLayout>
            <StackLayout v-for="(tip, idx) in task.tips" :key="'tip-' + idx" class="tip-card">
              <Label :text="tip.title" class="tip-card-title" />
              <Label :text="tip.body" class="tip-card-body" textWrap="true" />
            </StackLayout>
          </StackLayout>

          <!-- Галерея участников -->
          <StackLayout
            class="gallery-section"
            v-if="task && task.gallery && task.gallery.length > 0"
          >
            <GridLayout columns="auto, *" class="gallery-header-row">
              <Label col="0" text="🖼" class="section-emoji" />
              <Label col="1" text="Работы участников" class="gallery-title" />
            </GridLayout>
            <ScrollView orientation="horizontal" scrollBarIndicatorVisible="false">
              <StackLayout orientation="horizontal" class="gallery-scroll-inner">
                <StackLayout
                  v-for="(item, idx) in task.gallery"
                  :key="'gal-' + idx"
                  class="gallery-card"
                >
                  <Image :src="item.image" class="gallery-img" stretch="aspectFill" />
                  <Label
                    v-if="item.author"
                    :text="item.author"
                    class="gallery-author"
                  />
                </StackLayout>
              </StackLayout>
            </ScrollView>
          </StackLayout>

          <!-- Вопросы + настроение + заметка + фото -->
          <StackLayout class="white-block questions-block" v-if="task">
            <GridLayout columns="auto, *" class="questions-header-row">
              <Label col="0" text="❓" class="section-emoji" />
              <Label col="1" text="Вопросы дня" class="questions-title" />
            </GridLayout>
            <StackLayout v-for="(q, idx) in task.questions" :key="'q-' + idx" class="question-pill">
              <Label :text="q" class="question-text" textWrap="true" />
            </StackLayout>

            <Label text="Как бы ты оценил своё настроение после задания?" class="mood-question" textWrap="true" />

            <!-- Настроение — смайлики в WrapLayout -->
            <WrapLayout class="mood-wrap">
              <StackLayout
                v-for="(emoji, idx) in moodEmojis"
                :key="'mood-' + idx"
                :class="['mood-emoji-wrap', selectedMood === idx ? 'mood-selected' : '']"
                @tap="selectMood(idx)"
                width="52" height="52"
              >
                <!-- Emoji в отдельном Label без лишних шрифтов -->
                <Label :text="emoji" class="mood-emoji" verticalAlignment="center" horizontalAlignment="center" />
              </StackLayout>
            </WrapLayout>

            <!-- Заметка -->
            <GridLayout columns="*, auto" class="note-header-row">
              <Label col="0" text="Заметка" class="note-label" />
              <Label col="1" text="✏️" class="note-edit-icon" />
            </GridLayout>
            <StackLayout class="note-input-wrap">
              <TextView
                hint="Как прошёл ваш день? Добавьте пару слов..."
                class="note-input"
                v-model="noteText"
                returnKeyType="done"
              />
            </StackLayout>

            <!-- Прикрепить фото -->
            <Label text="Фото результата" class="photo-label" />
            <StackLayout class="photo-attach-area" @tap="pickPhoto">
              <!-- Если фото уже выбрано — показываем превью -->
              <Image
                v-if="attachedPhoto"
                :src="attachedPhoto"
                class="photo-preview"
                stretch="aspectFill"
              />
              <!-- Иначе — кнопка-заглушка -->
              <StackLayout v-else class="photo-placeholder">
                <Label text="📷" class="photo-placeholder-icon" horizontalAlignment="center" />
                <Label text="Прикрепить фото" class="photo-placeholder-text" horizontalAlignment="center" />
              </StackLayout>
            </StackLayout>
            <Label
              v-if="attachedPhoto"
              text="✕  Удалить фото"
              class="photo-remove-btn"
              @tap="removePhoto"
            />

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
// Для выбора фото из галереи устройства
import { ImagePicker, ImagePickerMediaType } from '@nativescript/imagepicker'

const props = defineProps<{
  challengeId: number
  day: number
}>()

const task = getDayTask(props.challengeId, props.day)

// Материалы с реактивным checked
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

// Настроение
const moodEmojis = ['😠', '😵', '😢', '😐', '😊', '😃', '🤩', '😇', '🥰', '🫣', '☠️', '😶‍🌫️']
const selectedMood = ref<number | null>(null)
function selectMood(idx: number) {
  selectedMood.value = idx
}

// Заметка
const noteText = ref('')

// Прикреплённое фото
const attachedPhoto = ref<string | null>(null)

async function pickPhoto() {
  try {
    const picker = new ImagePicker({
      mode: 'single',
      mediaType: ImagePickerMediaType.Image,
    })
    await picker.authorize()
    const selection = await picker.present()
    if (selection && selection.length > 0) {
      const selected = selection[0]
      await selected.getImageAsync()
      attachedPhoto.value = selected.fileUri ?? selected.uri
    }
  } catch (e) {
    console.error('Ошибка выбора фото:', e)
  }
}

function removePhoto() {
  attachedPhoto.value = null
}

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

/* ── Header ─────────────────────────────────────────────────────────────── */
.header-section {
  background-color: white;
  padding: 20px 20px 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
}
.header-content { align-items: center; }
.back-button { margin-right: 17px; }
.header-title {
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #181820;
  margin-top: 27px;
  margin-left: 20px;
  margin-bottom: 40px;
}

/* ── Scroll ──────────────────────────────────────────────────────────────── */
.content-scroll { background-color: #F3EEF9; }

/* ── Intro ───────────────────────────────────────────────────────────────── */
.intro-block {
  background-color: #E9DCFB;
  padding: 20px 20px;
  margin-bottom: 12px;
}
.intro-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  color: #363645;
  line-height: 12px;
}

/* ── Белый блок ──────────────────────────────────────────────────────────── */
.white-block {
  background-color: white;
  border-radius: 20px;
  margin: 12px 14px;
  padding: 18px 16px;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.06);
}

/* ── Аккордеон материалов ────────────────────────────────────────────────── */
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

/* ── Материалы ───────────────────────────────────────────────────────────── */
.material-row {
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: #F5F5F8;
}
.material-inner { align-items: center; margin-bottom: 6px; }
.checkbox-wrap {
  width: 50px;
  height: 50px;
  border-radius: 8px;
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
  font-size: 12px;
  color: white;
  text-align: center;
  font-weight: 800;
}
/* Emoji материала — отдельный Label, чтобы не конфликтовать с шрифтом текста */
.material-emoji {
  font-size: 22px;
  width: 100px;
  text-align: center;
  margin-right: 8px;
}
.material-name {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #181820;
}
.material-hint {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #565D6D;
  line-height: 10px;
  margin-left: 76px;
  margin-top: 4px;
}

/* ── Подсказка внизу чеклиста ────────────────────────────────────────────── */
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
  line-height: 12px;
}

/* ── Шаги ────────────────────────────────────────────────────────────────── */
.step-block { padding: 18px 16px 0 16px; }
.step-header { align-items: center; margin-bottom: 10px; }
.step-number-wrap {
  width: 50px;
  height: 50px;
  border-radius: 18px;
  background-color: #8E5EED;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}
.step-number {
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
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
  line-height: 12px;
  margin-bottom: 14px;
  padding: 0 2px;
}
.step-image {
  width: 100%;
  height: 650px;
  border-radius: 16px;
  margin-bottom: 4px;
}

/* ── Советы дня ──────────────────────────────────────────────────────────── */
.tips-section {
  background-color: #EDE0FF;
  border-radius: 20px;
  margin: 12px 14px;
  padding: 18px 16px;
}
.tips-header-row { align-items: center; margin-bottom: 14px; }
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
  letter-spacing: 0.2px;
}
.tip-card-body {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: #565D6D;
  line-height: 12px;
}

/* ── Галерея участников ──────────────────────────────────────────────────── */
.gallery-section {
  background-color: white;
  border-radius: 20px;
  margin: 12px 14px;
  padding: 18px 16px;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.06);
}
.gallery-header-row { align-items: center; margin-bottom: 14px; }
.gallery-title {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #181820;
}
.gallery-scroll-inner { padding: 4px 0 8px 0; }
.gallery-card {
  width: 650px;
  margin-right: 12px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #F3EEF9;
}
.gallery-img {
  width: 650px;
  height: 650px;
  border-radius: 16px;
}
.gallery-author {
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #8E5EED;
  text-align: center;
  padding: 6px 4px;
}

/* ── Вопросы ─────────────────────────────────────────────────────────────── */
.questions-block { margin-bottom: 24px; }
.questions-header-row { align-items: center; margin-bottom: 14px; }
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

/* ── Общий стиль emoji-иконок секций ────────────────────────────────────── */
.section-emoji {
  font-size: 24px;
  width: 36px;
  height: 36px;
  text-align: center;
  vertical-align: middle;
  margin-right: 10px;
}

/* ── Настроение ──────────────────────────────────────────────────────────── */
.mood-question {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #181820;
  margin-top: 16px;
  margin-bottom: 12px;
}
.mood-wrap {
  margin-bottom: 16px;
  margin-top: 4px;
}
.mood-emoji-wrap {
  border-radius: 26px;
  align-items: center;
  justify-content: center;
  background-color: #EDE0FF;
  margin: 4px;
}
.mood-emoji-wrap.mood-selected {
  background-color: #8E5EED;
}
/* Emoji настроения: отдельный Label без привязки к шрифту текста */
.mood-emoji {
  font-size: 28px;
  width: 100px;
  height:100px;
  text-align: center;
  vertical-align: middle;
}

/* ── Заметка ─────────────────────────────────────────────────────────────── */
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

/* ── Прикрепить фото ─────────────────────────────────────────────────────── */
.photo-label {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #181820;
  margin-bottom: 10px;
}
.photo-attach-area {
  border-radius: 16px;
  border-width: 2px;
  border-color: #D8C7F8;
  border-style: dashed;
  overflow: hidden;
  margin-bottom: 8px;
}
.photo-placeholder {
  padding: 28px 0;
  background-color: #F8F4FF;
  align-items: center;
}
.photo-placeholder-icon {
  font-size: 36px;
  margin-bottom: 8px;
}
.photo-placeholder-text {
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #8E5EED;
}
.photo-preview {
  width: 100%;
  height: 220px;
}
.photo-remove-btn {
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  color: #E5534B;
  text-align: center;
  margin-bottom: 16px;
}

/* ── Завершить день ──────────────────────────────────────────────────────── */
.complete-button {
  background-color: #8E5EED;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  font-weight: 700;
  border-radius: 50px;
  height: 140px;
  width: 100%;
  margin-top: 8px;
  box-shadow: 0px 4px 12px rgba(142,94,237,0.35);
}

/* ── Нет данных ──────────────────────────────────────────────────────────── */
.no-data-block { align-items: center; padding: 60px 20px; }
.no-data-emoji { font-size: 48px; text-align: center; margin-bottom: 12px; }
.no-data-text {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  color: #9095A0;
  text-align: center;
}
</style>
