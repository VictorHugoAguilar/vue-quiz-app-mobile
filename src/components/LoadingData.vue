<template>
  <div class="w-screen h-screen absolute z-30 bg-black bg-opacity-60 flex justify-center items-center">
    <div class="p-6 text-center text-white rounded-lg background-image">
      <div class="text-center status">
        <div class="image-loading-container">
          <img class="image-loading animate-button w-40" src="@/assets/svg/button-exit-main-menu.svg" alt="spinner" />
        </div>
        <div class="title-main">
          <h1 class="score-text purples">Loading...</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoadingData'
};
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
}

.status {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  width: 360px;
  height: 500px;
}

.image-loading-container {
  display: flex;
  justify-content: center;
  padding-top: 100px;
}

.animate-button {
  animation: spin 1s linear infinite;
}

.background-image {
  background-image: url('@/assets/svg/background_image_loading.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 400px;
  height: 520px;
}

@font-face {
  font-family: 'Rocher';
  src: url('@/assets/font/RocherColorGX.woff2');
}

.title-main {
  font-family: 'Rocher';
  text-align: center;
  font-size: 50px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  margin: 0;
}

@font-palette-values --Grays {
  font-family: Rocher;
  base-palette: 9;
}

@font-palette-values --Purples {
  font-family: Rocher;
  base-palette: 11;
}

@font-palette-values --Mint {
  font-family: Rocher;
  base-palette: 1;
}

.grays {
  font-palette: --Grays;
}

.purples {
  font-palette: --Purples;
}

.mint {
  font-palette: --Mint;
}
</style>
