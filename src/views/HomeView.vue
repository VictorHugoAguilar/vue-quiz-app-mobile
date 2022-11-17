<!-- eslint-disable prettier/prettier -->
<template>
  <main class="flex h-screen items-center justify-center bg-gray-800">

    <!-- quiz container -->
    <div class="overflow-hidden bg-white container relative shadow-lg rounded-lg px-12 py-6">

      <img src="@/assets/images/abstract.svg" alt="background" class="absolute -top-10 left-0 object-none" />

      <!-- contents -->
      <div class="relative z-20">

        <!-- score container -->
        <div class="text-right text-gray-800">
          <p class="text-sm leading-3">Score</p>
          <p class="font-bold">60</p>
        </div>

        <!-- timer container -->
        <div class="bg-white shadow-lg p-1 rounded-full w-full h-5 mt-4">
          <div class="bg-blue-700 rounded-full w-7/12 h-full"></div>
        </div>

        <!-- question container -->
        <div class="rounded-lg bg-gray-100 p-2 neumorph-1 text-center font-bold text-gray-800 mt-8">
          <div class="bg-white p-5">{{ currentQuestion.question }}</div>
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
          <p class="font-bold text-gray-800">2/10</p>
        </div>

      </div>

    </div>
  </main>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    // data
    let questionCounter = ref(0)
    const currentQuestion = ref({
      question: '',
      answer: 1,
      choices: []
    });

    const questions = [
      {
        question: 'Which operator returns true if the two compared values are not equal?',
        answer: 4,
        choices: ['<>', '~', '==!', '!==']
      },
      {
        question: 'How is a forEach statement different from a for statement?',
        answer: 2,
        choices: [
          'Only a for statement uses a callback function.',
          'A for statement is generic, but a forEach statement can be used only with an array.',
          'Only a forEach statement lets you specify your own iterator.',
          'A forEach statement is generic, but a for statement can be used only with an array.'
        ]
      }
    ];

    const onQuizStart = () => {
      currentQuestion.value = questions[questionCounter.value];
    };

    // lifecycle hooks
    onMounted(() => {
      onQuizStart();
    });

    // methods/functions
    let itemRef = [];
    const optionChosen = element => {
      if (element) {
        itemRef.push(element);
      }
    };

    const onOptionClicked = (choiceSelected, item) => {
      const divContainer = itemRef[item];
      const optionId = item + 1;
      if (currentQuestion.value.answer === optionId) {
        console.log('you are correct');
        divContainer.classList.add('option-correct');
        divContainer.classList.remove('option-default');
      } else {
        console.log('you are wrong');
        divContainer.classList.add('option-wrong');
        divContainer.classList.remove('option-default');
      }
    };

    // return
    return {
      optionChosen,
      currentQuestion,
      questions,
      questionCounter,
      onQuizStart,
      onOptionClicked
    }
  },
}
</script>

<style scoped>
.container {
  max-width: 400px;
  border-radius: 25px;
}

.neumorph-1 {
  box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09), -6px -6px 18px #ffffff;
}
</style>
