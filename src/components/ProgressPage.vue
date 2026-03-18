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
          <Label col="1" text="Журнал прогресса" class="header-title" />
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="content-scroll">
        <StackLayout class="content-container">
          <Label text="Активность" class="section-title" />

          <GridLayout class="calendar-card" rows="auto, auto, auto" columns="*">
            <GridLayout row="0" columns="auto, *, auto" class="calendar-header">
              <Image
                col="0"
                src="res://back"
                width="25"
                height="25"
                class="month-nav"
                @tap="prevMonth"
              />
              <Label col="1" :text="currentMonthLabel" class="month-year" textAlignment="center" />
              <Image
                col="2"
                src="res://next"
                width="25"
                height="25"
                class="month-nav"
                @tap="nextMonth"
              />
            </GridLayout>

            <GridLayout row="1" columns="*,*,*,*,*,*,*" class="weekdays">
              <Label
                v-for="(day, i) in weekdays"
                :key="i"
                :col="i"
                :text="day"
                class="weekday-label"
                textAlignment="center"
              />
            </GridLayout>

            <!-- Сетка дней (6 строк по 7 колонок) -->
            <GridLayout
              row="2"
              columns="*,*,*,*,*,*,*"
              rows="50,50,50,50,50,50"
              class="days-grid"
            >
              <StackLayout
                v-for="(day, index) in daysArray"
                :key="index"
                :col="index % 7"
                :row="Math.floor(index / 7)"
                class="day-cell"
                :class="{
                  'has-notes': day?.hasNotes,
                  'selected-day': day?.date === selectedDateStr,
                  'empty-day': !day
                }"
                @tap="onDayTap(day)"
              >
                <Label v-if="day" :text="day.dayNumber" class="day-number" />
              </StackLayout>
            </GridLayout>
          </GridLayout>

          <!-- Заметки выбранного дня (показываем только если есть заметки) -->
          <Label
            v-if="selectedDateNotes.length > 0"
            text="Заметки и мысли"
            class="section-title"
          />

          <StackLayout v-for="(note, idx) in selectedDateNotes" :key="idx" class="note-card">
            <GridLayout columns="auto, *" class="note-content">
              <Image
                col="0"
                :src="note.image ? 'res://' + note.image : 'res://nopic'"
                width="96"
                height="96"
                class="note-image"
              />
              <StackLayout col="1" class="note-text-container">
                <Label :text="note.title" class="note-title" textWrap="true" />
                <Label :text="note.text" class="note-text" textWrap="true" />
              </StackLayout>
            </GridLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue'
import { $navigateBack } from 'nativescript-vue'
import { progressNotes, Note } from '../data/progressData'

interface DayItem {
  dayNumber: number
  date: string
  hasNotes: boolean
}

const currentDate = ref(new Date(2026, 2, 1)) // март 2026
const selectedDateStr = ref('2026-03-13')

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const currentMonthLabel = computed(() => {
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]
  return months[currentDate.value.getMonth()] + ' ' + currentDate.value.getFullYear()
})

// Генерация массива дней (42 ячейки)
const daysArray = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)

  // Понедельник = 0, воскресенье = 6
  let firstWeekday = firstDay.getDay()
  let offset = firstWeekday === 0 ? 6 : firstWeekday - 1

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (DayItem | null)[] = []

  for (let i = 0; i < offset; i++) {
    days.push(null)
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const hasNotes = !!(progressNotes as any)[dateStr]
    days.push({
      dayNumber: d,
      date: dateStr,
      hasNotes
    })
  }

  while (days.length < 42) {
    days.push(null)
  }
  return days
})

const selectedDateNotes = computed<Note[]>(() => {
  return progressNotes[selectedDateStr.value] || []
})

function onDayTap(day: DayItem | null) {
  if (day?.hasNotes) {
    selectedDateStr.value = day.date
  }
}

function prevMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
  selectFirstNoteDayOfMonth(newDate)
}

function nextMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
  selectFirstNoteDayOfMonth(newDate)
}

function selectFirstNoteDayOfMonth(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const firstNoteDate = Object.keys(progressNotes).find(dateStr => {
    const [y, m] = dateStr.split('-').map(Number)
    return y === year && m === month
  })
  selectedDateStr.value = firstNoteDate || ''
}

function goBack() {
  $navigateBack()
}

// Инициализация: выбрать первый день с заметками в текущем месяце
selectFirstNoteDayOfMonth(currentDate.value)
</script>

<style scoped>
.page {
  background-color: white;
}

.header-section {
  background-color: white;
  padding: 20px 20px 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
}

.header-content {
  align-items: center;
}

.back-button {
  margin-right: 17px;
}

.header-title {
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #181820;
  margin-top: 27px;
  margin-left: 20px;
  margin-bottom: 40px;
}

.content-scroll {
  background-color: white;
}

.content-container {
  padding: 0 16px 20px 16px;
}

.section-title {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #181820;
  margin-top: 12px;
  margin-bottom: 13px;
  margin-left: 30px;
}

.calendar-card {
  background-color: white;
  border-radius: 6px;
  padding: 12px 8px;
  box-shadow: 0px 4px 7px rgba(23, 26, 31, 0.13), 0px 4px 2px rgba(23, 26, 31, 0.08);
  margin-bottom: 16px;
}

.calendar-header {
  align-items: center;
  margin-bottom: 10px;
}

.month-nav {
  padding: 40px;
}

.month-year {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #181820;
}

.weekdays {
  margin-bottom: 8px;
}

.weekday-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #363645;
}

.days-grid {
  margin-bottom: 8px;
}

.day-cell {
  background-color: #f7f7fa94;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin: 8px;
  height: 100%;
}

.empty-day {
  background-color: transparent;
}

.day-number {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #181820;
  margin: 8px;
}

.has-notes {
  background-color: #8E5EED33;
}

.selected-day {
  border-width: 5px;
  border-color: #9c6affa8;
}

.note-card {
  background-color: white;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.262);
  margin: 20px;
}

.note-content {
  align-items: center;
}

.note-image {
  border-radius: 30px;
  margin: 20px;
}

.note-text-container {
  padding-left: 8px;
  margin: 20px;
}

.note-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #181820;
  margin-bottom: 4px;
}

.note-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #181820;
}
</style>