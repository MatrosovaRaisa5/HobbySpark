<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="auto, *">
      <StackLayout row="0" class="header-section">
        <GridLayout columns="auto, *" class="header-content">
          <Image col="0" src="res://icon" width="60" height="60" class="app-icon" />
          <Label col="1" text="Выбор интересов" class="header-title" />
        </GridLayout>
        <Label class="subtitle" textWrap="true">
          <FormattedString>
            <Span text="Выберите " />
            <Span text="минимум два направления" fontWeight="700" />
            <Span text=", которые вы хотели бы исследовать" />
          </FormattedString>
        </Label>
      </StackLayout>

      <ScrollView row="1" class="cards-scroll">
        <StackLayout class="cards-container">
          <GridLayout columns="*, *" :rows="rows" class="cards-grid">
            <StackLayout
              v-for="interest in interests" :key="interest.id"
              :col="(interest.id - 1) % 2"
              :row="Math.floor((interest.id - 1) / 2)"
              class="card"
              :class="{ 'card-selected': selectedIds.includes(interest.id) }"
              @tap="toggleSelection(interest.id)"
            >
              <StackLayout class="icon-circle">
                <Label :text="interest.emoji" class="card-icon" />
              </StackLayout>
              <Label :text="interest.name" class="card-title" />
              <Label :text="interest.description" class="card-description" textWrap="true" />
            </StackLayout>
          </GridLayout>

          <Button @tap="goNext" text="Далее" class="button" />
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'nativescript-vue';
import { Dialogs, ApplicationSettings } from '@nativescript/core';
import CatalogPage from './CatalogPage.vue';
import { $navigateTo } from 'nativescript-vue';
import { api } from '~/services/api';

interface Interest {
    id: number;
    name: string;
    emoji: string;
    description: string;
}

const interests = ref<Interest[]>([]);
const selectedIds = ref<number[]>([]);

const emojiMap: Record<string, string> = {
    'Творчество': '🎨',
    'Спорт и Фитнес': '🏋️',
    'Технологии': '💻',
    'Языки': '🗣️',
    'Кулинария': '🍳',
    'Сообщество': '🌿',
};
const descMap: Record<string, string> = {
    'Творчество': 'Рисование, музыка, дизайн, рукоделие',
    'Спорт и Фитнес': 'Йога, бег, танцы, силовые тренировки',
    'Технологии': 'Программирование, роботы, 3D-модели',
    'Языки': 'Изучение новых языков, лингвистика',
    'Кулинария': 'Приготовление еды, выпечка',
    'Сообщество': 'Природа, волонтерство',
};

const rows = computed(() => {
    const count = interests.value.length;
    const rowCount = Math.ceil(count / 2);
    return Array(rowCount).fill('auto').join(',');
});

onMounted(async () => {
    try {
        const data = await api.getAllInterests();
        interests.value = data.map((i: any) => ({
            id: i.id,
            name: i.name,
            emoji: emojiMap[i.name] || '⭐',
            description: descMap[i.name] || '',
        }));
    } catch (e) {
        console.error('Ошибка загрузки интересов', e);
    }
});

function toggleSelection(id: number) {
    const idx = selectedIds.value.indexOf(id);
    if (idx === -1) selectedIds.value.push(id);
    else selectedIds.value.splice(idx, 1);
}

async function goNext() {
    if (selectedIds.value.length < 2) {
        await Dialogs.alert({
            title: 'Недостаточно интересов',
            message: 'Пожалуйста, выберите минимум два направления',
            okButtonText: 'Ок',
        });
        return;
    }
    try {
        await api.saveInterests(selectedIds.value);
        ApplicationSettings.setBoolean('interests_selected', true);
        $navigateTo(CatalogPage, { clearHistory: true });
    } catch (err: any) {
        await Dialogs.alert('Ошибка сохранения интересов: ' + err.message);
    }
}
</script>

<style scoped>
.page {
  background-color: white;
  padding: 20px;
}
.header-section {
  background-color: white;
  padding: 30px 20px 10px 20px;
}
.header-content {
  align-items: center;
  margin-bottom: 10px;
}
.app-icon {
  margin-right: 8px;
}
.header-title {
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #181820;
  padding-bottom: 12px;
}
.subtitle {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #171A1F;
  line-height: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-bottom: 40px;
  text-align: center;
}
.cards-scroll {
  background-color: white;
}
.cards-container {
  padding: 0 20px 20px 20px;
}
.cards-grid {
  margin-bottom: 40px;
}
.card {
  background-color: white;
  border-width: 2px;
  border-color: #F3F3F6;
  border-radius: 30px;
  padding: 20px 18px;
  margin: 20px;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  height: 450px;
}
.card-selected {
  background-color: #F5F1FD;
  border-color: #7A42EA;
}
.card-icon {
  font-size: 30px;
  text-align: center;
  align-self: center;
  margin-bottom: 10px;
}
.card-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #171A1F;
  text-align: center;
  margin-bottom: 4px;
}
.card-description {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #6F6F7A;
  text-align: center;
}
.button {
  width: 65%;
  height: 140px;
  background-color: #854ef3;
  color: white;
  font-size: 18px;
  font-family: 'Nunito Sans', sans-serif;
  border-radius: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 80px;
  padding: 0;
}
.button:active {
  background-color: #5116C8;
}
</style>