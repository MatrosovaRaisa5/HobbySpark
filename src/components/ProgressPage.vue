<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="auto, *">
      <StackLayout row="0" class="header-section">
        <GridLayout columns="auto, *" class="header-content">
          <Image col="0" src="res://back" width="27" height="27" class="back-button" @tap="goBack" />
          <Label col="1" text="Мои заметки" class="header-title" />
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="content-scroll">
        <StackLayout class="content-container">
          <Label v-if="notes.length > 0" text="Заметки и мысли" class="section-title" />
          <Label v-else text="У вас пока нет заметок" class="empty-text" textWrap="true" />

          <StackLayout v-for="(note, idx) in notes" :key="idx" class="note-card">
            <GridLayout columns="auto, *" class="note-content">
              <!-- Фото: прямой URL с обработкой ошибок -->
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
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'nativescript-vue';
import { $navigateBack } from 'nativescript-vue';
import { api } from '~/services/api';

const BASE_URL = 'http://10.43.180.61:8080';   // ваш IP
const baseUrl = BASE_URL;

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
    // При ошибке прячем изображение (можно заменить на плейсхолдер)
    const img = args.object;
    img.src = 'res://nopic';  // или просто скрыть
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

function goBack() { $navigateBack(); }
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
.header-section { background-color: white; padding: 20px 20px 10px 20px; border-bottom-width: 1px; border-bottom-color: #F0F0F0; }
.header-content { align-items: center; }
.back-button { margin-right: 17px; }
.header-title { font-family: 'Nunito', sans-serif; font-size: 24px; font-weight: 700; color: #181820; margin-top: 27px; margin-left: 20px; margin-bottom: 40px; }
.content-scroll { background-color:  #8e5eed36; }
.content-container { padding: 0 16px 20px 16px; }
.section-title { font-family: 'Nunito', sans-serif; font-size: 18px; font-weight: 700; color: #181820; margin-top: 12px; margin-bottom: 13px; margin-left: 30px; }
.empty-text { font-family: 'Nunito Sans', sans-serif; font-size: 16px; color: #9095A0; text-align: center; margin-top: 60px; }
.note-card { background-color: white; border-radius: 40px; padding: 20px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.262); margin: 20px; }
.note-content { align-items: center; }
.note-image { border-radius: 30px; margin: 20px; }
.note-text-container { padding-left: 8px; margin: 20px; }
.note-title { font-family: 'Nunito Sans', sans-serif; font-size: 15px; font-weight: 600; color: #181820; margin-bottom: 4px; }
.note-text { font-family: 'Nunito Sans', sans-serif; font-size: 13px; font-weight: 400; color: #181820; }
.note-date { font-family: 'Nunito Sans', sans-serif; font-size: 11px; color: #9095A0; margin-top: 6px; }
</style>