<template>
  <Page actionBarHidden="true" class="page" @loaded="onPageLoaded">
    <ScrollView>
      <StackLayout class="container">
        <GridLayout columns="*, *, *, *, *, *, *" class="confetti-row">
          <Label col="0" id="cf0" text="🎊" class="cf" />
          <Label col="1" id="cf1" text="✨" class="cf" />
          <Label col="2" id="cf2" text="🎉" class="cf" />
          <Label col="3" id="cf3" text="⭐" class="cf" />
          <Label col="4" id="cf4" text="🎊" class="cf" />
          <Label col="5" id="cf5" text="✨" class="cf" />
          <Label col="6" id="cf6" text="🎉" class="cf" />
        </GridLayout>
        <GridLayout columns="*, *, *, *, *, *" class="confetti-row2">
          <Label col="0" id="cf7"  text="⭐" class="cf cf-s" />
          <Label col="1" id="cf8"  text="🎊" class="cf cf-s" />
          <Label col="2" id="cf9"  text="✨" class="cf cf-s" />
          <Label col="3" id="cf10" text="🎉" class="cf cf-s" />
          <Label col="4" id="cf11" text="⭐" class="cf cf-s" />
          <Label col="5" id="cf12" text="🎊" class="cf cf-s" />
        </GridLayout>

        <StackLayout class="congrats-block" id="congratsBlock">
          <Label text="Поздравляем! 🎉" class="congrats-title" />
          <Label :text="challengeTitle" class="congrats-subtitle" />
        </StackLayout>

        <StackLayout class="img-wrap" id="imgBlock">
          <GridLayout rows="auto" columns="*" class="img-circle">
            <Image row="0" col="0" :src="challengeImage" class="challenge-img" stretch="aspectFill" />
          </GridLayout>
          <StackLayout class="badge-circle">
            <Label text="🎨" class="badge-emoji" />
          </StackLayout>
        </StackLayout>

        <StackLayout class="progress-card" id="progressCard">
          <GridLayout columns="*, auto" class="prog-hdr">
            <Label col="0" text="ПРОГРЕСС ИСПЫТАНИЯ" class="prog-label" />
            <Label col="1" :text="'День ' + day + ' из ' + totalDays" class="prog-day" />
          </GridLayout>

          <GridLayout :columns="progressCols" class="prog-track">
            <StackLayout col="0" class="prog-filled" />
            <StackLayout col="1" class="prog-empty" />
          </GridLayout>

          <GridLayout columns="auto, *, auto" class="prog-labels">
            <Label col="0" text="День 1" class="prog-edge" />
            <Label col="2" :text="'День ' + totalDays" class="prog-edge" />
          </GridLayout>
        </StackLayout>

        <GridLayout columns="*, *" class="rewards" id="rewardsRow">
          <StackLayout col="0" class="reward-card reward-l">
            <Label text="✨  15" class="reward-val" />
            <Label text="Искр за сегодня" class="reward-lbl" />
          </StackLayout>
          <StackLayout col="1" class="reward-card reward-r">
            <Label text="🏅  1" class="reward-val" />
            <Label text="Новый бейдж" class="reward-lbl" />
          </StackLayout>
        </GridLayout>

        <StackLayout
          class="tomorrow-card"
          id="tomorrowCard"
          @tap="goToNextDay"
          v-if="!isLastDay"
        >
          <Label text="ЗАДАНИЕ НА ЗАВТРА:" class="tomorrow-lbl" />
          <GridLayout columns="*, auto">
            <Label col="0" :text="nextDayTitle" class="tomorrow-title" textWrap="true" />
            <Label col="1" text="›" class="tomorrow-arrow" />
          </GridLayout>
        </StackLayout>

        <StackLayout class="tomorrow-card" id="tomorrowCard" v-if="isLastDay">
          <Label text="🏆 ВЫ ПРОШЛИ ЧЕЛЛЕНДЖ!" class="tomorrow-lbl" />
          <Label text="Все 7 дней выполнены. Вы восхитительны!" class="tomorrow-title" textWrap="true" />
        </StackLayout>

        <Button text="Продолжить  ›" class="continue-btn" @tap="goToMain" />
        <Button class="share-btn" @tap="shareResult">
          <FormattedString>
            <Span text="🔗  " />
            <Span text="Поделиться" />
          </FormattedString>
        </Button>

      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'nativescript-vue'
import { Frame, CoreTypes } from '@nativescript/core'
import { $navigateTo } from 'nativescript-vue'
import { challengesData } from '~/data/challengesData'
import { getDayTask } from '~/data/dayTasksData'
import { getTotalDays } from '~/machines/challengeMachine'
import DayTaskPage from './DayTaskPage.vue'
import MainPage from './MainPage.vue'

const props = defineProps<{
  challengeId: number
  day: number  
}>()

const challenge = computed(() =>
  challengesData.find(c => c.id === props.challengeId) ?? challengesData[0]
)

const challengeTitle = computed(() => challenge.value.title)
const challengeImage = computed(() => challenge.value.image)

const totalDays = getTotalDays() 

const isLastDay = computed(() => props.day >= totalDays)

const progressCols = computed(() => {
  const pct = Math.max(4, (props.day / totalDays) * 100)
  return `${pct}*, ${100 - pct}*`
})

const nextDayTitle = computed(() => {
  const next = getDayTask(props.challengeId, props.day + 1)
  return next?.title ?? challenge.value.weeklyProgram?.[props.day]?.title ?? 'Следующий день'
})


onMounted(() => {
})


function onPageLoaded(args: any) {
  const page = args.object

  const blockIds = ['congratsBlock', 'imgBlock', 'progressCard', 'rewardsRow', 'tomorrowCard']
  blockIds.forEach((id, i) => {
    const view = page.getViewById(id)
    if (!view) return
    view.opacity = 0
    view.translateY = 30
    view.animate({
      opacity: 1,
      translate: { x: 0, y: 0 },
      duration: 450,
      delay: 150 + i * 100,
      curve: CoreTypes.AnimationCurve.easeOut,
    })
  })

  const cfItems = [
    { id: 'cf0',  dx: -55, dy: -80 },
    { id: 'cf1',  dx:  15, dy: -100 },
    { id: 'cf2',  dx:  75, dy: -70 },
    { id: 'cf3',  dx: -25, dy: -90 },
    { id: 'cf4',  dx:  45, dy: -110 },
    { id: 'cf5',  dx: -75, dy: -60 },
    { id: 'cf6',  dx:  25, dy: -95 },
    { id: 'cf7',  dx: -35, dy: -75 },
    { id: 'cf8',  dx:  65, dy: -85 },
    { id: 'cf9',  dx: -15, dy: -100 },
    { id: 'cf10', dx:  85, dy: -65 },
    { id: 'cf11', dx: -65, dy: -88 },
    { id: 'cf12', dx:   5, dy: -105 },
  ]

  cfItems.forEach(({ id, dx, dy }, i) => {
    const view = page.getViewById(id)
    if (!view) return
    view.opacity = 1
    view.animate({
      translate: { x: dx, y: dy },
      scale: { x: 1.5, y: 1.5 },
      opacity: 1,
      duration: 550,
      delay: i * 55,
      curve: CoreTypes.AnimationCurve.easeOut,
    }).then(() => {
      return view.animate({
        translate: { x: dx * 0.4, y: 60 },
        scale: { x: 0.5, y: 0.5 },
        opacity: 0,
        duration: 700,
        curve: CoreTypes.AnimationCurve.easeIn,
      })
    })
  })
}

function goToMain() {
  $navigateTo(MainPage, { clearHistory: true })
}

function shareResult() {
  console.log('Share result')
}

function goToNextDay() {
  $navigateTo(DayTaskPage, {
    props: {
      challengeId: props.challengeId,
      day: props.day + 1,
    },
  })
}
</script>

<style scoped>
.page { background-color: #F0E8FF; }

.container {
  background-color: #F0E8FF;
  padding: 16px 18px 40px 18px;
  align-items: center;
}

.confetti-row { width: 100%; margin-top: 8px; }
.confetti-row2 { width: 100%; margin-left: 16px; }
.cf { font-size: 28px; text-align: center; }
.cf-s { font-size: 22px; }

.congrats-block {
  align-items: center;
  margin-top: 12px;
  margin-bottom: 20px;
}
.congrats-title {
  font-family: 'Nunito', sans-serif;
  font-size: 30px;
  font-weight: 800;
  color: #181820;
  text-align: center;
  margin-bottom: 5px;
}
.congrats-subtitle {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  color: #565D6D;
  text-align: center;
}

.img-wrap {
  align-items: center;
  margin-bottom: 22px;
  align-self: center;
}
.img-circle {
  width: 180px;
  height: 180px;
  border-radius: 90px;
  overflow: hidden;
  border-width: 4px;
  border-color: white;
  box-shadow: 0px 6px 20px rgba(142,94,237,0.25);
}
.challenge-img {
  width: 180px;
  height: 180px;
  border-radius: 90px;
}
.badge-circle {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: white;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 8px rgba(0,0,0,0.18);
}
.badge-emoji { font-size: 22px; text-align: center; }

.progress-card {
  background-color: white;
  border-radius: 18px;
  padding: 16px 18px;
  width: 100%;
  margin-bottom: 12px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.07);
}
.prog-hdr { align-items: center; margin-bottom: 12px; }
.prog-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 10px;
  color: #9095A0;
  letter-spacing: 0.5px;
  font-weight: 700;
}
.prog-day {
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #181820;
}

.prog-track {
  height: 12px;
  border-radius: 8px;
  background-color: #EDE0FF;
  overflow: hidden;
  margin-bottom: 6px;
}
.prog-filled {
  background: linear-gradient(90deg, #FA9938 0%, #F07B20 100%);
  border-radius: 8px 0 0 8px;
}
.prog-empty { background-color: transparent; }

.prog-labels { align-items: center; margin-top: 4px; }
.prog-edge {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11px;
  color: #9095A0;
}

.rewards { width: 100%; margin-bottom: 12px; }
.reward-card {
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.07);
  align-items: center;
}
.reward-l { margin-right: 6px; }
.reward-r { margin-left: 6px; }
.reward-val {
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #181820;
  margin-bottom: 4px;
}
.reward-lbl {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  color: #9095A0;
  text-align: center;
}

.tomorrow-card {
  background-color: white;
  border-radius: 16px;
  padding: 14px 16px;
  width: 100%;
  margin-bottom: 24px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.07);
}
.tomorrow-lbl {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 10px;
  color: #9095A0;
  letter-spacing: 1px;
  margin-bottom: 5px;
}
.tomorrow-title {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #181820;
}
.tomorrow-arrow {
  font-size: 24px;
  color: #8E5EED;
  font-weight: 700;
  align-self: center;
}

.continue-btn {
  background-color: white;
  color: #8E5EED;
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  font-weight: 700;
  border-radius: 50px;
  height: 140px;
  width: 100%;
  margin-bottom: 12px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
}
.share-btn {
  background-color: #FA9938;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  font-weight: 700;
  border-radius: 50px;
  height: 140px;
  width: 100%;
  box-shadow: 0px 4px 14px rgba(250,153,56,0.4);
}
</style>