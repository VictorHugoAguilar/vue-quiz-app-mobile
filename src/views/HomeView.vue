<!-- eslint-disable prettier/prettier -->
<template>
  <main class="flex h-screen items-center justify-center bg-gray-800 ">

    <!-- quiz container -->
    <div class="overflow-hidden bg-white container relative shadow-lg rounded-lg px-12 py-6 min-h-540">

      <img src="@/assets/images/abstract.svg" alt="background" class="absolute -top-10 left-0 object-none" />

      <!-- contents -->
      <div class="relative z-20">

        <!-- main title -->
        <div class="p-1 w-full h-32 mt-10 container-main-title">
          <span class="sticker sticker-lg" data-text="TRIVIAL"><span>TRIVIAL</span></span>
        </div>

        <div class="container-list mt-10">
          <div class="container-list-buttons">
            <button @click="gotTo('general-knowledge')">General Knowledge</button>
            <button @click="gotTo('entertainment-film')">Entertainment: Film</button>
            <button @click="gotTo('science-geography')">Geography</button>
            <button @click="gotTo('science-mathematics')">Science: Mathematics</button>
            <button @click="gotTo('science-computer')">Science: Computer</button>
          </div>
        </div>

      </div>
      <!-- end quiz container -->
    </div>
  </main>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: 'HomeView',
  setup() {
    const router = useRouter();
    function gotTo(category) {
      router.push({
        name: 'quiz',
        params: { category }
      });
    }
    return {
      gotTo
    };
  }
};
</script>

<style scoped>
.container {
  min-width: 500px;
  max-width: 540px;
  min-height: 800px;
  border-radius: 25px;
  background-color: #ef548f;
}

.neumorph-1 {
  box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09), -6px -6px 18px #ffffff;
}

.container-main-title {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  display: grid;
  place-content: center;
  font-family: sans-serif;
  line-height: 1;
  color: var(--c5);
}

* {
  /* box-sizing: border-box; */
  --t: rgba(255, 0, 0, 0);
  --w: rgba(255, 255, 255, 0.98);
  --c1: #ef548f;
  --c2: #ef8b6d;
  --c3: #cfef6b;
  --c4: #3bf0c1;
  --c5: #bb4af0;
  --shine-angle: 15deg;
}

.sticker {
  display: inline-grid;
  grid-template-areas: 'text';
  place-items: center;
  font-family: 'Alegreya Sans SC', sans-serif;
  font-weight: 900;
  font-style: italic;
  font-size: clamp(3rem, 15vw, 8rem);
  text-transform: uppercase;
  color: var(--c5);
}

.sticker-lg {
  font-size: clamp(3rem, 15vw, 8rem);
}

.sticker-lg span {
  background: linear-gradient(var(--shine-angle), var(--t) 0%, var(--t) 35%, var(--w) 49.95%, var(--w) 50.15%, var(--t) 65%, var(--t)),
    linear-gradient(to right, var(--c1), var(--c2), var(--c3), var(--c4), var(--c5));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 0.02em rgba(0, 0, 0, 0.6);
}

.sticker > *,
.sticker::before,
.sticker::after {
  grid-area: text;
}

.sticker::before,
.sticker::after {
  content: attr(data-text);
  color: #fff;
}

.sticker::before {
  -webkit-text-stroke: 0.21em white;
  background: no-repeat linear-gradient(white, white) 15% 50% / 85% 60%;
}

.sticker::after {
  text-shadow: 0.07em 0.08em 0.05em rgba(0, 0, 0, 0.75), -0.07em -0.05em 0.05em rgba(0, 0, 0, 0.75);
  z-index: -2;
}

container-list {
  position: relative;
  margin: auto;
  perspective: 500px;
}

.container-list-buttons {
  display: flex;
  flex-direction: column;
  transform: rotatex(10deg);
  animation: rotateAngle 6s linear infinite;
}

button {
  display: block;
  position: relative;
  margin: 0.5em 0;
  padding: 0.8em 2.2em;
  cursor: pointer;

  background: linear-gradient(var(--shine-angle), var(--t) 0%, var(--t) 35%, var(--w) 49.95%, var(--w) 50.15%, var(--t) 65%, var(--t)),
    linear-gradient(to right, var(--c1), var(--c2), var(--c3), var(--c4), var(--c5));
  border: 3px solid rgb(143, 92, 10);
  border-radius: 0.4em;

  text-transform: uppercase;
  font-size: 1.4em;
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
</style>
