<template>
  <div class="w-screen h-screen absolute z-30 bg-black bg-opacity-60 flex justify-center items-center">
    <div class="bg-green-600 p-6 text-center text-white rounded-lg">
      <p class="font-bold text-2xl">All Done!</p>
      <p class="my-4 font-bold text-3xl">{{ percent }} % score</p>

      <!-- buttons -->
      <div class="flex justify-around">
        <!-- <div class="rounded-full py-1 w-28 border cursor-pointer hover:text-black hover:bg-white">Done</div> -->
        <div
          class="rounded-full py-1 w-28 border cursor-pointer hover:text-black hover:bg-white"
          @click="$emit('restartQuiz')"
        >
          Play Again
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizCompleteOverlay',
  props: ['percent'],
  setup() {}
};
</script>

<style></style>
