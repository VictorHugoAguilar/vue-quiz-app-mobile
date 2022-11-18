<!-- eslint-disable prettier/prettier -->
<template>
  <main class="flex h-screen items-center justify-center bg-gray-800">
    <!-- Quiz overlay -->
    <QuizCompleteOverlay v-if="endOfQuiz" :percent="percentageScore" @restartQuiz="onQuizStart" />
    <!-- quiz container -->
    <div class="overflow-hidden bg-white container relative shadow-lg rounded-lg px-12 py-6">

      <img src="@/assets/images/abstract.svg" alt="background" class="absolute -top-10 left-0 object-none" />

      <!-- contents -->
      <div class="relative z-20">

        <!-- score container -->
        <div class="text-right text-gray-800">
          <p class="text-sm leading-3">Score</p>
          <p class="font-bold">{{ score }}</p>
        </div>

        <!-- timer container -->
        <div class="bg-white shadow-lg p-1 rounded-full w-full h-5 mt-4">
          <div class="bg-blue-700 rounded-full w-11/12 h-full" :style="`width:${timer}%`"></div>
        </div>

        <!-- question container -->
        <div class="rounded-lg bg-gray-100 p-2 neumorph-1 text-center font-bold text-gray-800 mt-8">
          <div class="bg-white p-5">{{ formattedQuestion }}</div>
        </div>

        <!-- options container -->
        <div class="mt-8">
          <div v-for="(choice, item) in currentQuestion.choices" :key="item">
            <!-- option container -->
            <div class="neumorph-1 option-default bg-gray-100 p-2 rounded-lg mb-3 relative" :ref="optionChosen"
              @click="onOptionClicked(choice, item)">
              <div
                class="bg-blue-500 p-1 transform rotate-45 rounded-md h-10 w-10 text-white font-bold absolute right-0 -top-0 shadow-md">
                <p class="transform -rotate-45">+10</p>
              </div>
              <div class="rounded-lg font-bold flex p-2">
                <!-- option id -->
                <div class="p-3 rounded-lg">
                  {{ item }}
                </div>
                <div class="flex items-center pl-6">
                  {{ choice }}
                </div>
              </div>
            </div>
            <!-- end option container -->
          </div>
        </div>

        <!-- progress indicator container -->
        <div class="mt-8 text-center">
          <div class="h-1 w-12 bg-gray-800 rounded-full mx-auto"></div>
          <p class="font-bold text-gray-800">{{ questionCounter }}/{{ questions.length }}</p>
        </div>

      </div>

    </div>
  </main>
</template>

<script>
import { onMounted, ref } from 'vue';
import QuizCompleteOverlay from '@/components/QuizCompleteOverlay.vue';
// import getQuestionMock from '@/mocks/question-mocks';

export default {
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

    const questions = ref([]); //getQuestionMock();

    const loadQuestion = () => {
      canClick = true;
      // check if there are more question to load
      if (questions.value.length > questionCounter.value) {
        // load question
        timer.value = 100;
        currentQuestion.value = questions.value[questionCounter.value];
        console.log('Cuerrent questions', currentQuestion.value);
        questionCounter.value++;
      } else {
        // no more questions
        onQuizEnd();
        console.log('no more question');
      }
    };

    const countDownTimer = () => {
      let interVal = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          console.log('timer is up');
          onQuizEnd();
          clearInterval(interVal);
        }
      }, 100);
    };

    const fetchQuestionsFromServer = async function () {
      console.log('fetch questions from server');
      fetch('https://opentdb.com/api.php?amount=10&category=18')
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log('serverQuestion data', data);
          // map json to fit our own arrangement
          const newQuestions = data.results.map(serverQuestion => {
            const arrangedQuestion = {
              question: serverQuestion.question,
              choices: '',
              answer: ''
            };
            const choices = serverQuestion.incorrect_answers;
            arrangedQuestion.answer = Math.floor(Math.random() * 4 + 1);
            choices.splice(arrangedQuestion.answer - 1, 0, serverQuestion.correct_answer);
            arrangedQuestion.choices = choices;
            return arrangedQuestion;
          });
          console.log('new formatted questions', newQuestions);
          questions.value = newQuestions;
          loadQuestion();
          countDownTimer();
        });
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
      fetchQuestionsFromServer();
    };

    // lifecycle hooks
    onMounted(() => {
      //2. fetch questions from server
      fetchQuestionsFromServer();
    });

    // methods/functions
    let itemRef = [];
    const optionChosen = element => {
      if (element) {
        itemRef.push(element);
      }
    };

    const clearSelected = divSelected => {
      setTimeout(() => {
        divSelected.classList.remove('option-correct');
        divSelected.classList.remove('option-wrong');
        divSelected.classList.add('option-default');
        loadQuestion();
      }, 1000);
    };

    const onOptionClicked = (choiceSelected, item) => {
      if (canClick) {
        // TODO select on option
        const divContainer = itemRef[item];
        const optionId = item + 1;
        if (currentQuestion.value.answer === optionId) {
          console.log('you are correct');
          score.value = score.value + 10;
          divContainer.classList.add('option-correct');
          divContainer.classList.remove('option-default');
        } else {
          console.log('you are wrong');
          divContainer.classList.add('option-wrong');
          divContainer.classList.remove('option-default');
        }
        canClick = false;
        clearSelected(divContainer);
        // TODO: go to next question
        // loadQuestion();
      } else {
        // cant select option
        console.log('cant selecte question');
      }
    };

    // return
    return {
      timer,
      optionChosen,
      currentQuestion,
      questions,
      score,
      questionCounter,
      loadQuestion,
      onOptionClicked,
      onQuizStart,
      endOfQuiz,
      percentageScore
    };
  },
  computed: {
    formattedQuestion() {
      let entities = {
        amp: '&',
        apos: "'",
        '#x27': "'",
        '#x2F': '/',
        '#39': "'",
        '#47': '/',
        lt: '<',
        gt: '>',
        nbsp: ' ',
        quot: '"',
        '#039': "'"
      };
      return this.currentQuestion.question.replace(/&([^;]+);/gm, function (match, entity) {
        return entities[entity] || match;
      });
    }
  },
  components: {
    QuizCompleteOverlay
  }
};
</script>

<style scoped>
.container {
  max-width: 540px;
  border-radius: 25px;
}

.neumorph-1 {
  box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09), -6px -6px 18px #ffffff;
}
</style>
