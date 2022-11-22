<template>
  <div class="w-screen h-screen absolute z-30 bg-black bg-opacity-60 flex justify-center items-center">
    <div class="text-center background-image">
      <div class="quiz-complete-container">
        <div class="title-main">
          <h1 class="purples">SCORE</h1>
        </div>
        <div class="title-main">
          <h1 class="score-text mint">{{ percent }} %</h1>
        </div>
        <!-- buttons -->
        <div class="options flex justify-beetween justify-center items-center">
          <div class="py-1 w-28 cursor-pointer hover:text-black mr-4" @click="goToMain()">
            <div class="option">
              <img class="button-option" src="@/assets/svg/button-exit-main-menu.svg" alt="buton_exit_main_menu" />
              <span class="option-text">Back to Main</span>
            </div>
          </div>
          <div class="py-1 w-28 cursor-pointer hover:text-black" @click="$emit('restartQuiz')">
            <div class="option">
              <img class="button-option" src="@/assets/svg/button-retry-again.svg" alt="button_retry_again" />
              <span class="option-text">Play Again</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: 'QuizCompleteOverlay',
  props: ['percent'],
  setup() {
    const router = useRouter();
    return {
      goToMain: () => router.push({ name: 'home' })
    };
  }
};
</script>

<style scoped>
.background-image {
  background-image: url('@/assets/svg/background_image_score.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 400px;
  height: 520px;
}

.quiz-complete-container {
  height: 60%;
  margin-top: 32%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.options {
  bottom: 0px;
}

.button-option {
  width: 100px;
}

.option:hover {
  transform: scale(100%);
  filter: drop-shadow(3px 5px 2px rgb(72 38 16 / 0.4));
}

.option:active {
  transform: scale(80%);
}

.option-text {
  color: rgb(72 38 16);
}

.title-main {
  font-family: 'Rocher';
  text-align: center;
  font-size: 80px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-text {
  font-size: 4rem;
}

h1 {
  margin: 0;
}

.purples {
  font-palette: --Purples;
}

.mint {
  font-palette: --Mint;
}

@media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
  .background-image {
    background-image: url('@/assets/svg/background_image_score_movil.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 375px;
    height: 500px;
  }

  .quiz-complete-container {
    height: 58%;
    margin-top: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title-main {
    padding: 10px;
    height: 70px;
    font-family: 'Rocher';
    text-align: center;
    font-size: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
