<!-- eslint-disable prettier/prettier -->
<template>
  <main class="flex h-screen items-center justify-center bg-gray-800">

    <!-- Loading data -->
    <LoadingData v-if="loadingData" />

    <!-- Quiz overlay -->
    <QuizCompleteOverlay v-if="endOfQuiz" :percent="percentageScore" @restartQuiz="onQuizStart" />

    <!-- quiz container -->
    <div class="overflow-hidden container relative px-4 py-4 background-image">

      <!-- contents -->
      <div class="relative z-20">

        <!-- header quiz -->
        <div class="flex justify-between header">
          <!-- score container -->
          <div class="mt-10 ml-12 text-left text-header-category">
            <p class="text-sm leading-3">Category Selected</p>
            <p class="font-bold">{{ getCategory }}</p>
          </div>
          <!-- score container -->
          <div class="text-center text-header-score image-start">
            <p class="mt-8 font-bold">{{ score }}</p>
            <p class="text-sm font-bold leading-3">Score</p>
          </div>
        </div>
        <!-- end header quiz -->

        <!-- timer container -->
        <div class="timer-container bg-white shadow-lg p-1 rounded-full w-full h-5 mt-4">
          <div class="timer-container-internal  rounded-full w-11/12 h-full" :style="`width:${timer}%`"></div>
        </div>

        <!-- question container -->
        <div class="rounded-lg border-option p-2 neumorph-1 text-center font-bold text-gray-800 mt-8">
          <div class="background-option p-5">{{ formattedQuestion }}</div>
        </div>

        <!-- options container -->
        <div class="mt-8 options-container">
          <div v-for="(choice, item) in currentQuestion.choices" :key="item">
            <!-- option container -->
            <div class="neumorph-1 option-default border-option p-2 rounded-lg mb-3 relative" :ref="optionChosen"
              @click="onOptionClicked(choice, item)">
              <div
                class="bg-blue-500 p-1 transform rotate-45 rounded-md h-10 w-10 text-white font-bold absolute right-0 -top-0 shadow-md">
                <p class="transform -rotate-45">+10</p>
              </div>
              <div class="rounded-lg font-bold flex p-2 background-option ">
                <!-- option id -->
                <div class="p-3 rounded-lg">
                  {{ item }}
                </div>
                <div class="flex items-center pl-6 choice">
                  {{ undecodeText(choice) }}
                </div>
              </div>
            </div>
            <!-- end option container -->
          </div>
        </div>

      </div>

      <!-- footer quiz -->
      <div class="footer-quiz">
        <!-- progress indicator container -->
        <div class="text-center image-footer">
          <p class="font-bold text-footer">{{ questionCounter }}/{{ questions.length }}</p>
        </div>
      </div>
      <!-- end footer quiz -->
    </div>
  </main>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import QuizCompleteOverlay from '@/components/QuizCompleteOverlay.vue';
import LoadingData from '@/components/LoadingData.vue';
import useQuestionCharger from '@/use/use-charge-question.js';
import undecodeText from '@/use/use-undecode-string.js';

export default {
  name: 'QuizView',
  components: {
    QuizCompleteOverlay,
    LoadingData
  },
  setup() {
    // data
    let canClick = true;
    let timer = ref(100);
    let questionCounter = ref(0);
    let score = ref(0);
    let endOfQuiz = ref(false);
    let percentageScore = ref(0);
    const currentQuestion = ref({
      question: '',
      answer: 1,
      choices: []
    });
    let itemRef = [];
    const questions = ref([]); //getQuestionMock();
    const category = ref('');
    const loadingData = ref(true);

    const loadQuestion = () => {
      canClick = true;
      itemRef = [];
      // check if there are more question to load
      if (questions.value.length > questionCounter.value) {
        // load question
        timer.value = 100;
        currentQuestion.value = questions.value[questionCounter.value];
        questionCounter.value++;
      } else {
        // no more questions
        onQuizEnd();
      }
    };

    // lifecycle hooks
    onMounted(() => {
      const route = useRoute();
      const cate = route.path.replace('/', '');
      category.value = cate;
      //2. fetch questions from server
      fetchQuestionsFromServer(category.value);
    });

    const countDownTimer = () => {
      let interVal = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          // Time is up
          onQuizEnd();
          clearInterval(interVal);
        }
      }, 150);
    };

    const fetchQuestionsFromServer = async function (category) {
      loadingData.value = true;
      useQuestionCharger(category)
        .then(data => {
          questions.value = data;
          loadQuestion();
          countDownTimer();
        })
        .catch(error => console.error(error))
        .finally(() => (loadingData.value = false));
    };

    const onQuizEnd = function () {
      // calculate the percentage
      percentageScore.value = (score.value / 100) * 100;
      // stop timers
      timer.value = 0;
      // show overlay
      endOfQuiz.value = true;
    };

    const onQuizStart = () => {
      //1 . set default values
      itemRef = [];
      canClick = true;
      timer.value = 100;
      endOfQuiz.value = false;
      questionCounter.value = 0;
      score.value = 0;
      currentQuestion.value = {
        question: '',
        answer: 1,
        choices: []
      };
      percentageScore.value = 0;
      questions.value = [];
      //2. fetch questions from server
      fetchQuestionsFromServer(category.value);
    };

    // methods/functions
    const optionChosen = element => {
      if (element && !itemRef.includes(element)) {
        itemRef.push(element);
      }
    };

    const clearSelected = divSelected => {
      setTimeout(() => {
        divSelected.classList.remove('option-correct');
        divSelected.classList.remove('option-wrong');
        divSelected.classList.add('option-default');
        loadQuestion();
      }, 500);
    };

    const onOptionClicked = (choiceSelected, item) => {
      if (canClick) {
        const divContainer = itemRef[item];
        const optionId = item + 1;
        if (currentQuestion.value.answer === optionId) {
          // you are correct
          score.value = score.value + 10;
          divContainer.classList.add('option-correct');
          divContainer.classList.remove('option-default');
        } else {
          // you are wrong
          divContainer.classList.add('option-wrong');
          divContainer.classList.remove('option-default');
        }
        canClick = false;
        // go to next question
        clearSelected(divContainer);
      } else {
        // cant select option
      }
    };

    const getCategory = computed(() => category.value.replace('-', ' ').toUpperCase());

    // return
    return {
      currentQuestion,
      endOfQuiz,
      getCategory,
      loadingData,
      loadQuestion,
      onOptionClicked,
      onQuizStart,
      optionChosen,
      percentageScore,
      questionCounter,
      questions,
      score,
      timer,
      undecodeText
    };
  },
  computed: {
    formattedQuestion() {
      return undecodeText(this.currentQuestion.question);
    }
  }
};
</script>

<style scoped>
.container {
  min-width: 500px;
  max-width: 540px;
  min-height: 800px;
  max-height: 800px;
  border-radius: 25px;
  background-color: transparent;
}

.background-image {
  background-image: url('@/assets/svg/background_quiz_menu.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 500px;
}

.image-start {
  background-image: url('@/assets/svg/start-menu.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100px;
}

.header {
  height: 100px;
}

.text-header-score {
  color: var(--c0);
}

.text-header-category {
  color: var(--c0);
}

.neumorph-1 {
  box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09), -6px -6px 18px var(--c2);
}

.timer-container {
  background-color: var(--c1);
}

.timer-container-internal {
  background-color: var(--c2);
}

.border-option {
  background-color: var(--c1);
}

.background-option {
  background-color: var(--c2) !important;
  color: var(--c0) !important;
}

.choice {
  margin-left: 5px;
  border-radius: 10px;
  width: 100%;
}

.footer-quiz {
  position: absolute;
  bottom: 10px;
  right: 220px;
}

.image-footer {
  background-image: url('@/assets/svg/start-menu.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 80px;
  height: 80px;
  padding-top: 30px;
}

.text-footer {
  color: var(--c0);
}
</style>
