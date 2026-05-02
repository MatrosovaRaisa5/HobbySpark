<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="auto, *">
      <StackLayout row="0" class="header-section">
        <GridLayout columns="auto, *" class="header-content">
          <Image col="0" src="res://back" width="27" height="27" class="back-button" @tap="goBack" />
          <Label col="1" :text="task ? task.title : 'Задание дня'" class="header-title" textWrap="true" />
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="content-scroll">
        <StackLayout>

          <StackLayout class="intro-block" v-if="task">
            <Label :text="task.intro" class="intro-text" textWrap="true" />
          </StackLayout>

          <StackLayout v-if="!task" class="no-data-block">
            <Label text="😕" class="no-data-emoji" />
            <Label text="Задание не найдено" class="no-data-text" />
          </StackLayout>

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

          <StackLayout
            v-for="(step, idx) in (task ? task.steps : [])"
            :key="'step-' + idx"
            class="white-block step-block"
          >
            <GridLayout columns="auto, *" class="step-header">
              <StackLayout col="0" class="step-number-wrap">
                <Label :text="String(Number(idx) + 1)" class="step-number" />
              </StackLayout>
              <Label col="1" :text="step.title" class="step-title" textWrap="true" />
            </GridLayout>
            <Label :text="step.description" class="step-desc" textWrap="true" />
            <Image :src="step.image" class="step-image" stretch="aspectFill" />
          </StackLayout>

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

          <Label text="Как бы ты оценил своё настроение после задания?" class="mood-question" textWrap="true" />

          <WrapLayout class="mood-wrap">
            <StackLayout
              v-for="(emoji, idx) in moodEmojis"
              :key="'mood-' + idx"
              :class="['mood-emoji-wrap', selectedMood === idx ? 'mood-selected' : '']"
              @tap="selectMood(idx)"
              width="52" height="52"
            >
              <Label :text="emoji" class="mood-emoji" verticalAlignment="center" horizontalAlignment="center" />
            </StackLayout>
          </WrapLayout>

          <StackLayout class="white-block questions-block" v-if="task">
            <GridLayout columns="auto, *" class="questions-header-row">
              <Label col="0" text="❓" class="section-emoji" />
              <Label col="1" text="Вопросы дня" class="questions-title" />
            </GridLayout>
            <StackLayout v-for="(q, idx) in task.questions" :key="'q-' + idx" class="question-pill">
              <Label :text="q" class="question-text" textWrap="true" />
            </StackLayout>

            <GridLayout columns="*, auto" class="note-header-row">
              <Label col="0" text="Заметка" class="note-label" />
              <Label col="1" text="✏️" class="note-edit-icon" />
            </GridLayout>
            <StackLayout class="note-input-wrap">
              <TextView
                hint="Добавьте результат в заметки, чтобы вспоминать о своих маленьких победах! А также поделитесь с другими :)"
                class="note-input"
                v-model="noteText"
                returnKeyType="done"
              />
            </StackLayout>

            <Label text="Фото результата" class="photo-label" />
            <StackLayout class="photo-attach-area" @tap="pickPhoto">
              <Image v-if="attachedPhoto" :src="attachedPhoto" class="photo-preview" stretch="aspectFill" />
              <StackLayout v-else class="photo-placeholder">
                <Label text="📷" class="photo-placeholder-icon" horizontalAlignment="center" />
                <Label text="Прикрепить фото" class="photo-placeholder-text" horizontalAlignment="center" />
              </StackLayout>
            </StackLayout>
            <Label v-if="attachedPhoto" text="✕  Удалить фото" class="photo-remove-btn" @tap="removePhoto" />

            <Button text="✓  Завершить день" class="complete-button" @tap="completeDayHandler" />
          </StackLayout>

        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'nativescript-vue';
import { $navigateBack, $navigateTo } from 'nativescript-vue';
import { ImageSource } from '@nativescript/core';
import { api } from '~/services/api';
import TaskCompletedPage from './TaskCompletedPage.vue';
import { completeDay } from '~/machines/challengeMachine';
import * as imagepicker from '@nativescript/imagepicker';

const props = defineProps<{ challengeId: number; day: number }>();

interface MaterialItem { emoji: string; name: string; hint: string; checked?: boolean; }
interface Step { title: string; description: string; image: string; }
interface Tip { title: string; body: string; }
interface GalleryItem { image: string; author?: string; }

const task = ref<any>(null);
const materialsList = ref<MaterialItem[]>([]);
const materialsOpen = ref(true);
const moodEmojis = ['😠','😵','😢','😐','😊','😃','🤩','😇','🥰','🫣','☠️','😶‍🌫️'];
const selectedMood = ref<number | null>(null);
const noteText = ref('');
// теперь это data-URI для отображения, null если не выбрано
const attachedPhoto = ref<string | null>(null);

async function loadTask() {
    try {
        const data = await api.getDayTask(props.challengeId, props.day);
        task.value = data;
        materialsList.value = (data.materials || []).map((m: any) => ({ ...m, checked: false }));
    } catch (err) {
        console.error('Ошибка загрузки задания', err);
    }
}

onMounted(loadTask);

function toggleMaterials() { materialsOpen.value = !materialsOpen.value; }
function toggleCheck(idx: number) {
    const item = materialsList.value[idx];
    if (item) item.checked = !item.checked;
}
function selectMood(idx: number) { selectedMood.value = idx; }

async function pickPhoto() {
    try {
        const context = imagepicker.create({ mode: 'single' });
        await context.authorize();
        const selection = await context.present();
        if (selection && selection.length > 0) {
            const selectedItem = selection[0];
            let imageSource: ImageSource | null = null;

            // Пытаемся получить ImageSource несколькими способами
            try {
                // Способ 1: напрямую из selectedItem, если он ImageAsset
                imageSource = await ImageSource.fromAsset(selectedItem as any);
            } catch (e) {
                try {
                    // Способ 2: через вложенный asset
                    if ((selectedItem as any).asset) {
                        imageSource = await ImageSource.fromAsset((selectedItem as any).asset);
                    } else if (typeof (selectedItem as any).getImage === 'function') {
                        imageSource = await (selectedItem as any).getImage();
                    }
                } catch (e2) {
                    console.error('Не удалось получить ImageSource', e2);
                }
            }

            if (imageSource) {
                const base64 = imageSource.toBase64String('jpg');
                // сохраняем для предпросмотра и для отправки
                attachedPhoto.value = 'data:image/jpeg;base64,' + base64;
            }
        }
    } catch (error) {
        console.error('Ошибка выбора фото', error);
    }
}

function removePhoto() {
    attachedPhoto.value = null;
}

async function completeDayHandler() {
    try {
        // извлекаем чистый base64 из data-URI
        let photoBase64: string | undefined = undefined;
        if (attachedPhoto.value) {
            const parts = attachedPhoto.value.split(',');
            if (parts.length === 2) {
                photoBase64 = parts[1]; // только base64
            }
        }
        await api.completeDay(
            props.challengeId,
            props.day,
            selectedMood.value ?? undefined,
            noteText.value || undefined,
            photoBase64, // передаём чистый base64
        );
        completeDay(); // машина состояний
        $navigateTo(TaskCompletedPage, {
            props: { challengeId: props.challengeId, day: props.day },
        });
    } catch (err: any) {
        console.error('Ошибка завершения дня', err);
    }
}

function goBack() { $navigateBack(); }
</script>

<style scoped>
.page { background-color: #F3EEF9; }
.header-section { background-color: white; padding: 20px 20px 10px 20px; border-bottom-width: 1px; border-bottom-color: #F0F0F0; }
.header-content { align-items: center; }
.back-button { margin-right: 17px; }
.header-title { font-family: 'Nunito', sans-serif; font-size: 24px; font-weight: 700; color: #181820; margin-top: 27px; margin-left: 20px; margin-bottom: 40px; }
.content-scroll { background-color: #F3EEF9; }
.intro-block { background-color: #E9DCFB; padding: 20px 20px; margin-bottom: 12px; }
.intro-text { font-family: 'Nunito Sans', sans-serif; font-size: 15px; color: #363645; line-height: 12px; }
.white-block { background-color: white; border-radius: 20px; margin: 12px 14px; padding: 18px 16px; box-shadow: 0px 2px 8px rgba(0,0,0,0.06); }
.accordion-header { align-items: center; padding-bottom: 12px; border-bottom-width: 1px; border-bottom-color: #F0F0F0; margin-bottom: 8px; }
.accordion-title { font-family: 'Nunito', sans-serif; font-size: 16px; font-weight: 700; color: #181820; }
.accordion-arrow { font-size: 14px; color: #8E5EED; }
.material-row { padding: 12px 0; border-bottom-width: 1px; border-bottom-color: #F5F5F8; }
.material-inner { align-items: center; margin-bottom: 6px; }
.checkbox-wrap { width: 50px; height: 50px; border-radius: 8px; border-width: 2px; border-color: #D0D5DD; align-items: center; justify-content: center; margin-right: 12px; }
.checkbox-wrap.checked { background-color: #8E5EED; border-color: #8E5EED; }
.checkbox-tick { font-size: 12px; color: white; text-align: center; font-weight: 800; }
.material-emoji { font-size: 22px; width: 100px; text-align: center; margin-right: 8px; }
.material-name { font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 700; color: #181820; }
.material-hint { font-family: 'Nunito Sans', sans-serif; font-size: 13px; color: #565D6D; line-height: 10px; margin-left: 76px; margin-top: 4px; }
.tip-box { background-color: #FFF7ED; border-radius: 12px; padding: 12px 14px; margin-top: 14px; }
.tip-icon { font-size: 20px; margin-right: 10px; margin-top: 2px; }
.tip-text { font-family: 'Nunito Sans', sans-serif; font-size: 14px; color: #6B5B00; line-height: 12px; }
.step-block { padding: 18px 16px 0 16px; }
.step-header { align-items: center; margin-bottom: 10px; }
.step-number-wrap { width: 50px; height: 50px; border-radius: 18px; background-color: #8E5EED; align-items: center; justify-content: center; margin-right: 12px; }
.step-number { font-family: 'Nunito', sans-serif; font-size: 12px; font-weight: 800; color: white; text-align: center; }
.step-title { font-family: 'Nunito', sans-serif; font-size: 17px; font-weight: 700; color: #181820; }
.step-desc { font-family: 'Nunito Sans', sans-serif; font-size: 14px; color: #363645; line-height: 12px; margin-bottom: 14px; padding: 0 2px; }
.step-image { width: 100%; height: 650px; border-radius: 16px; margin-bottom: 4px; }
.tips-section { background-color: #EDE0FF; border-radius: 20px; margin: 12px 14px; padding: 18px 16px; }
.tips-header-row { align-items: center; margin-bottom: 14px; }
.tips-title { font-family: 'Nunito', sans-serif; font-size: 18px; font-weight: 700; color: #181820; }
.tip-card { background-color: white; border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; }
.tip-card-title { font-family: 'Nunito', sans-serif; font-size: 13px; font-weight: 800; color: #181820; margin-bottom: 4px; letter-spacing: 0.2px; }
.tip-card-body { font-family: 'Nunito Sans', sans-serif; font-size: 13px; color: #565D6D; line-height: 12px; }
.gallery-section { background-color: white; border-radius: 20px; margin: 12px 14px; padding: 18px 16px; box-shadow: 0px 2px 8px rgba(0,0,0,0.06); }
.gallery-header-row { align-items: center; margin-bottom: 14px; }
.gallery-title { font-family: 'Nunito', sans-serif; font-size: 18px; font-weight: 700; color: #181820; }
.gallery-scroll-inner { padding: 4px 0 8px 0; }
.gallery-card { width: 650px; margin-right: 12px; border-radius: 16px; overflow: hidden; background-color: #F3EEF9; }
.gallery-img { width: 650px; height: 650px; border-radius: 16px; }
.gallery-author { font-family: 'Nunito', sans-serif; font-size: 13px; font-weight: 700; color: #8E5EED; text-align: center; padding: 6px 4px; }
.questions-block { margin-bottom: 24px; }
.questions-header-row { align-items: center; margin-bottom: 14px; }
.questions-title { font-family: 'Nunito', sans-serif; font-size: 16px; font-weight: 700; color: #181820; }
.question-pill { background-color: #EDE0FF; border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; }
.question-text { font-family: 'Nunito Sans', sans-serif; font-size: 14px; color: #363645; line-height: 20px; }
.section-emoji { font-size: 24px; width: 36px; height: 36px; text-align: center; vertical-align: middle; margin-right: 10px; }
.mood-question { font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 700; color: #181820; margin-top: 16px; margin-bottom: 12px; }
.mood-wrap { margin: 20px; margin-bottom: 16px; margin-top: 4px; }
.mood-emoji-wrap { border-radius: 26px; align-items: center; justify-content: center; background-color: #EDE0FF; margin: 10px; }
.mood-emoji-wrap.mood-selected { background-color: #8E5EED; }
.mood-emoji { font-size: 28px; width: 100px; height:100px; text-align: center; vertical-align: middle; }
.note-header-row { align-items: center; margin-bottom: 8px; margin-top: 4px; }
.note-label { font-family: 'Nunito', sans-serif; font-size: 16px; font-weight: 700; color: #181820; }
.note-edit-icon { font-size: 18px; }
.note-input-wrap { background-color: #F3F3F6; border-radius: 14px; padding: 10px 14px; margin-bottom: 20px; }
.note-input { font-family: 'Nunito Sans', sans-serif; font-size: 14px; color: #363645; background-color: transparent; placeholder-color: #9095A0; min-height: 80px; }
.photo-label { font-family: 'Nunito', sans-serif; font-size: 16px; font-weight: 700; color: #181820; margin-bottom: 10px; }
.photo-attach-area { border-radius: 16px; border-width: 2px; border-color: #D8C7F8; border-style: dashed; overflow: hidden; margin-bottom: 8px; }
.photo-placeholder { padding: 28px 0; background-color: #F8F4FF; align-items: center; }
.photo-placeholder-icon { font-size: 36px; margin-bottom: 8px; }
.photo-placeholder-text { font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700; color: #8E5EED; }
.photo-preview { width: 90%; height: 800px; }
.photo-remove-btn { font-family: 'Nunito', sans-serif; font-size: 13px; color: #E5534B; text-align: center; margin-bottom: 16px; }
.complete-button { background-color: #8E5EED; color: white; font-family: 'Nunito', sans-serif; font-size: 17px; font-weight: 700; border-radius: 50px; height: 140px; width: 100%; margin-top: 8px; box-shadow: 0px 4px 12px rgba(142,94,237,0.35); }
.no-data-block { align-items: center; padding: 60px 20px; }
.no-data-emoji { font-size: 48px; text-align: center; margin-bottom: 12px; }
.no-data-text { font-family: 'Nunito', sans-serif; font-size: 16px; color: #9095A0; text-align: center; }
</style>