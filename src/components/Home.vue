<script lang="ts" setup>
function continueWith(provider: string) {
  console.log(`Продолжить с ${provider}`);
}

function continueAsGuest() {
  console.log('Продолжить как гость');
}
</script>

<template>
  <Page actionBarHidden="true">
    <GridLayout
      rows="auto, auto, auto, auto, auto, auto, auto"
      class="px-6"
      :style="{ background: 'linear-gradient(155.78deg, #8E5EEDF0 0%, #FA9938F0 100%)' }"
    >

      <StackLayout row="0" class="items-center mt-[70px]">
        <Image src="res://icon" width="72" height="72" class="rounded-2xl" />
      </StackLayout>

      <StackLayout row="1" class="items-center mt-[12px]">
        <Label
          text="HobbySpark"
          class="text-white font-extrabold text-4xl text-shadow-1"
          style="font-family: 'Nunito'"
        />
      </StackLayout>

      <StackLayout row="2" class="items-center mt-2">
        <Label
          text="Искры вдохновения каждый день"
          class="text-white font-extrabold text-2xl text-center text-shadow-2"
          style="font-family: 'Nunito'"
          textWrap="true"
        />
      </StackLayout>

      <StackLayout row="3" class="px-8 mt-8">
        <Label
          text="Увлекательные челленджи, которые поддержат твой путь!"
          class="text-[#5618D4] font-bold text-lg text-center"
          style="font-family: 'Nunito Sans'"
          textWrap="true"
        />
      </StackLayout>

      <StackLayout row="4" class="px-8 mt-4">
        <Label
          text="Попробуй что-то новое без обязательств и стресса"
          class="text-white text-lg text-center text-shadow-3"
          style="font-family: 'Nunito Sans'"
          textWrap="true"
        />
      </StackLayout>

      <StackLayout row="5" class="mt-10 px-8 space-y-3">
        <Button
          @tap="continueWith('Telegram')"
          class="bg-white text-[#323743] rounded-xl h-12 text-base"
          style="font-family: 'Nunito Sans'"
        >
          <FormattedString>
            <Span text="📱 " />
            <Span text="Продолжить с Telegram" />
          </FormattedString>
        </Button>

        <Button
          @tap="continueWith('Google')"
          class="bg-white text-[#323743] rounded-xl h-12 text-base"
          style="font-family: 'Nunito Sans'"
        >
          <FormattedString>
            <Span text="🔍 " />
            <Span text="Продолжить с Google" />
          </FormattedString>
        </Button>

        <Button
          @tap="continueWith('Apple')"
          class="bg-white text-[#323743] rounded-xl h-12 text-base"
          style="font-family: 'Nunito Sans'"
        >
          <FormattedString>
            <Span text="🍎 " />
            <Span text="Продолжить с Apple" />
          </FormattedString>
        </Button>
      </StackLayout>

      <StackLayout row="6" class="mt-6 items-center">
        <Button
          @tap="continueAsGuest"
          class="bg-transparent text-[#565D6D] text-lg"
          style="font-family: 'Nunito Sans'"
        >
          Продолжить как гость
        </Button>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<style scoped>
.text-shadow-1 {
  text-shadow: 0px 2px 4px rgba(24, 24, 32, 0.15);
}
.text-shadow-2 {
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.5);
}
.text-shadow-3 {
  text-shadow: 1px 1px 3.6px rgba(23, 26, 31, 0.25);
}
</style>