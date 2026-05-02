<template>
  <Page actionBarHidden="true" class="page">
    <GridLayout rows="auto, *">
      <StackLayout row="0" class="header-section">
        <GridLayout columns="auto, *" class="header-content">
          <Image col="0" src="res://back" width="27" height="27" class="back-button" @tap="goBack" />
          <Label col="1" text="Личные данные" class="header-title" />
        </GridLayout>
      </StackLayout>

      <ScrollView row="1" class="content-scroll">
        <StackLayout class="content-container">
          <TextField v-model="name" hint="Имя" class="input-field" />
          <Button text="Сохранить" class="save-button" @tap="save" />
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import { $navigateBack } from 'nativescript-vue';
import { Dialogs, ApplicationSettings } from '@nativescript/core';
import { api } from '~/services/api';

const name = ref(ApplicationSettings.getString('user_name', ''));

async function save() {
    if (!name.value.trim()) {
        await Dialogs.alert('Имя не может быть пустым');
        return;
    }
    try {
        await api.updateProfile({ name: name.value });
        ApplicationSettings.setString('user_name', name.value);
        await Dialogs.alert('Данные обновлены');
        $navigateBack();
    } catch (err: any) {
        await Dialogs.alert('Ошибка: ' + err.message);
    }
}

function goBack() { $navigateBack(); }
</script>

<style scoped>
.page { background-color: white; }
.header-section { background-color: white; padding: 20px 20px 10px 20px; border-bottom-width: 1px; border-bottom-color: #F0F0F0; }
.header-content { align-items: center; }
.back-button { margin-right: 17px; }
.header-title { font-family: 'Nunito', sans-serif; font-size: 24px; font-weight: 700; color: #181820; margin-top: 27px; margin-left: 20px; margin-bottom: 40px; }
.content-scroll { background-color: white; }
.content-container { padding: 20px; }
.input-field { background-color: #F3F3F6; border-radius: 30px; padding:30px; font-size: 16px; font-family: 'Nunito Sans', sans-serif; height: 130px; width: 97%; margin-bottom: 30px; placeholder-color: #9095A0; }
.save-button { background-color: #8E5EED; color: white; font-family: 'Nunito', sans-serif; font-size: 18px; font-weight: 500; border-radius: 70px; height: 130px; width: 80%; margin-top: 20px; }
</style>