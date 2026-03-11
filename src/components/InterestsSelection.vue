<template>
    <Page actionBarHidden="true" class="page">
      <GridLayout rows="auto, *">
        <StackLayout row="0" class="header-section">
          <GridLayout columns="auto, *" class="header-content">
            <Image
              col="0"
              src="res://icon"
              width="45"
              height="45"
              class="app-icon"
            />
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

        <!-- Карточки -->
        <ScrollView row="1" class="cards-scroll">
          <StackLayout class="cards-container">
            <GridLayout columns="*, *" rows="auto, auto, auto" class="cards-grid">
              <!-- Карточка 1: Творчество -->
              <StackLayout
                col="0"
                row="0"
                class="card"
                :class="{ 'card-selected': selected.includes(0) }"
                @tap="toggleSelection(0)"
              >
                <StackLayout class="icon-circle">
                  <Label text="🎨" class="card-icon" />
                </StackLayout>
                <Label text="Творчество" class="card-title" />
                <Label text="Рисование, музыка, дизайн, рукоделие" class="card-description" textWrap="true" />
              </StackLayout>

              <!-- Карточка 2: Спорт и Фитнес -->
              <StackLayout
                col="1"
                row="0"
                class="card"
                :class="{ 'card-selected': selected.includes(1) }"
                @tap="toggleSelection(1)"
              >
                <StackLayout class="icon-circle">
                  <Label text="🏋️" class="card-icon" />
                </StackLayout>
                <Label text="Спорт и Фитнес" class="card-title" />
                <Label text="Йога, бег, танцы, силовые тренировки" class="card-description" textWrap="true" />
              </StackLayout>

              <!-- Карточка 3: Технологии -->
              <StackLayout
                col="0"
                row="1"
                class="card"
                :class="{ 'card-selected': selected.includes(2) }"
                @tap="toggleSelection(2)"
              >
                <StackLayout class="icon-circle">
                  <Label text="💻" class="card-icon" />
                </StackLayout>
                <Label text="Технологии" class="card-title" />
                <Label text="Программирова- ние, роботы, 3D-модели" class="card-description" textWrap="true" />
              </StackLayout>

              <!-- Карточка 4: Языки -->
              <StackLayout
                col="1"
                row="1"
                class="card"
                :class="{ 'card-selected': selected.includes(3) }"
                @tap="toggleSelection(3)"
              >
                <StackLayout class="icon-circle">
                  <Label text="🗣️" class="card-icon" />
                </StackLayout>
                <Label text="Языки" class="card-title" />
                <Label text="Изучение новых языков, лингвистика" class="card-description" textWrap="true" />
              </StackLayout>

              <!-- Карточка 5: Кулинария -->
              <StackLayout
                col="0"
                row="2"
                class="card"
                :class="{ 'card-selected': selected.includes(4) }"
                @tap="toggleSelection(4)"
              >
                <StackLayout class="icon-circle">
                  <Label text="🍳" class="card-icon" />
                </StackLayout>
                <Label text="Кулинария" class="card-title" />
                <Label text="Приготовление еды, выпечка" class="card-description" textWrap="true" />
              </StackLayout>

              <!-- Карточка 6: Сообщество -->
              <StackLayout
                col="1"
                row="2"
                class="card"
                :class="{ 'card-selected': selected.includes(5) }"
                @tap="toggleSelection(5)"
              >
                <StackLayout class="icon-circle">
                  <Label text="🌿" class="card-icon" />
                </StackLayout>
                <Label text="Сообщество" class="card-title" />
                <Label text="Природа, волонтерство" class="card-description" textWrap="true" />
              </StackLayout>
            </GridLayout>

            <Button
              @tap="goNext"
              text="Далее"
              class="button"
            />
          </StackLayout>
        </ScrollView>
      </GridLayout>
    </Page>
  </template>

  <script lang="ts" setup>
  import { ref } from 'nativescript-vue'
  import { Dialogs } from '@nativescript/core'
  // import { $navigateTo } from 'nativescript-vue' // для перехода на следующую страницу

  const selected = ref<number[]>([])

  function toggleSelection(index: number) {
    if (selected.value.includes(index)) {
      selected.value = selected.value.filter(i => i !== index)
    } else {
      selected.value = [...selected.value, index]
    }
  }

  async function goNext() {
    if (selected.value.length < 2) {
      await Dialogs.alert('Пожалуйста, выберите минимум два направления')
      return
    }
    // Переход на следующую страницу
    // $navigateTo(NextPage)
    console.log('Выбрано:', selected.value)
  }
  </script>

  <style scoped>
  .page {
    background-color: white;
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
    padding-bottom: 4px;
  }

  .subtitle {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: #171A1F;
    line-height: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .cards-scroll {
    background-color: white;
  }

  .cards-container {
    padding: 0 20px 20px 20px;
  }

  .cards-grid {
    margin-bottom: 20px;
  }

  .card {
    background-color: white;
    border-width: 2px;
    border-color: #F3F3F6;
    border-radius: 14px;
    padding: 16px 8px;
    margin: 6px;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    min-height: 170px;
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
    width: 100%;
    min-height: 60px;
    background-color: #854ef3;
    color: white;
    font-size: 18px;
    font-family: 'Nunito Sans', sans-serif;
    border-radius: 30px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0;
  }

  .button:active {
    background-color: #5116C8;
  }
  </style>