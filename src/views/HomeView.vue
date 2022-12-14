<!-- eslint-disable prettier/prettier -->
<template>
  <main class="flex h-screen items-center justify-center bg-gray-800">
    <!-- quiz image container -->
    <div class="overflow-hidden container background-image">
      <!-- contents -->
      <div class="content z-20">
        <!-- main title -->
        <div class="container-main-title">
          <div class="title-main">
            <h1 class="purples">TRIVIAL</h1>
          </div>
        </div>
        <!-- end main title -->
        <!-- content list categories -->
        <div class="container-list">
          <div class="container-list-buttons">
            <button class="button-option" v-for="category of categories" :key="category" @click="gotTo(category)">
              {{ formatSnakeCaseToUpperCase(category) }}
            </button>
          </div>
        </div>
        <!-- content list categories -->
      </div>
      <!-- end contents -->
    </div>
    <!-- end image container -->
  </main>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { formatSnakeCaseToUpperCase } from '@/use/use-format.js';

export default {
  name: 'HomeView',
  setup() {
    const router = useRouter();
    const store = useStore();

    function gotTo(category) {
      router.push({
        name: 'quiz',
        params: { category }
      });
    }
    return {
      gotTo,
      categories: computed(() => store.state.categories),
      formatSnakeCaseToUpperCase
    };
  }
};
</script>

<style scoped>
.container {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 500px;
  height: 850px;
}

.background-image {
  background-image: url('@/assets/svg/background_main_menu.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.container-main-title {
  margin-top: 150px;
  height: 100px;
  min-height: -webkit-fill-available;
  display: grid;
  place-content: center;
  font-family: sans-serif;
  line-height: 1;
  color: var(--c5);
}

.title-main {
  font-family: 'Rocher';
  text-align: center;
  font-size: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.purples {
  font-palette: --Purples;
}

.container-list {
  width: 400px;
  margin: 0 auto;
  position: relative;
  perspective: 500px;
}

.container-list-buttons {
  padding: 10%;
  display: flex;
  flex-direction: column;
  transform: rotatex(10deg);
  animation: rotateAngle 6s linear infinite;
}

button {
  color: var(--c6);
  display: block;
  position: relative;
  margin: 0.5em 0;
  padding: 0.8em 1.2em;
  cursor: pointer;

  background: linear-gradient(var(--shine-angle), var(--t) 0%, var(--t) 35%, var(--w) 49.95%, var(--w) 50.15%, var(--t) 65%, var(--t)),
    linear-gradient(to right, var(--c1), var(--c2), var(--c3), var(--c4), var(--c5));
  border: 3px solid rgb(143, 92, 10);
  border-radius: 0.4em;

  text-transform: uppercase;
  font-size: 1.2em;
  font-family: 'Work Sans', sans-serif;
  font-weight: 500;
  letter-spacing: 0.04em;

  mix-blend-mode: color-dodge;
  perspective: 500px;
  transform-style: preserve-3d;
}

button:before,
button:after {
  --z: 0px;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  content: '';
  width: 100%;
  height: 100%;
  opacity: 0;
  mix-blend-mode: inherit;
  border-radius: inherit;
  transform-style: preserve-3d;
  transform: translate3d(calc(var(--z) * 0px), calc(var(--z) * 0px), calc(var(--z) * 0px));
}

button:after {
  background-color: #5d00ff;
}

button:before {
  background-color: #ff1731;
}

/* desktop hover */
button:hover {
  background-color: #fff65b;
  transition: background 0.3s 0.1s;
}

button:hover:before {
  --z: 0.04;
  animation: translateWobble 2.2s ease forwards;
}

button:hover:after {
  --z: -0.06;
  animation: translateWobble 2.2s ease forwards;
}

@keyframes rotateAngle {
  0% {
    transform: rotateY(0deg) rotateX(10deg);
    animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
  }

  25% {
    transform: rotateY(20deg) rotateX(10deg);
  }

  50% {
    transform: rotateY(0deg) rotateX(10deg);
    animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
  }

  75% {
    transform: rotateY(-20deg) rotateX(10deg);
  }

  100% {
    transform: rotateY(0deg) rotateX(10deg);
  }
}

@keyframes translateWobble {
  0% {
    opacity: 0;
    transform: translate3d(calc(var(--z) * 0px), calc(var(--z) * 0px), calc(var(--z) * 0px));
  }

  16% {
    transform: translate3d(calc(var(--z) * 160px), calc(var(--z) * 160px), calc(var(--z) * 160px));
  }

  28% {
    opacity: 1;
    transform: translate3d(calc(var(--z) * 70px), calc(var(--z) * 70px), calc(var(--z) * 70px));
  }

  44% {
    transform: translate3d(calc(var(--z) * 130px), calc(var(--z) * 130px), calc(var(--z) * 130px));
  }

  59% {
    transform: translate3d(calc(var(--z) * 85px), calc(var(--z) * 85px), calc(var(--z) * 85px));
  }

  73% {
    transform: translate3d(calc(var(--z) * 110px), calc(var(--z) * 110px), calc(var(--z) * 110px));
  }

  88% {
    opacity: 1;
    transform: translate3d(calc(var(--z) * 90px), calc(var(--z) * 90px), calc(var(--z) * 90px));
  }

  100% {
    opacity: 1;
    transform: translate3d(calc(var(--z) * 100px), calc(var(--z) * 100px), calc(var(--z) * 100px));
  }
}

@media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
  .container {
    width: 82%;
    height: 100vh;
  }

  .background-image {
    background-image: url('@/assets/svg/background_main_menu_movil.svg');
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding: 0px !important;
    justify-content: flex-start;
    justify-items: center;
  }

  .container-main-title {
    display: flex;
    flex-direction: column-reverse;
    margin-top: 75px;
    height: 80px;
    width: 100%;
  }

  .title-main {
    font-family: 'Rocher';
    text-align: center;
    font-size: 65px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .container-list {
    width: 80%;
    margin-top: 10px;
    perspective: 300px;
  }

  .container-list-buttons {
    padding: 10px;
    margin-top: -10px;
  }

  .button-option {
    margin: 0.2em 0;
    padding: 0.5em 0.5em;
    cursor: pointer;
    perspective: 300px;
    font-size: 1.1em;
  }
}
</style>
