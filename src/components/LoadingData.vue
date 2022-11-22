<template>
  <div class="w-screen h-screen absolute z-30 bg-black bg-opacity-60 flex justify-center items-center">
    <!-- container image -->
    <div class="p-6 text-center text-white rounded-lg background-image">
      <div class="text-center status">
        <!-- content loading -->
        <div class="image-loading-container">
          <img class="image-loading animate-button w-30" src="@/assets/svg/button-exit-main-menu.svg" alt="spinner" />
        </div>
        <!-- end spinner -->
        <!-- message spinner -->
        <div class="title-main">
          <h1 class="score-text purples">Loading...</h1>
        </div>
        <!-- end message spinner -->
      </div>
      <!-- end content loading -->
    </div>
    <!-- end container image -->
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

.purples {
  font-palette: --Purples;
}

@media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
  .background-image {
    background-image: url('@/assets/svg/background_image_loading_movil.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 300px;
    height: 500px;
  }

  .status {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    width: 250px;
    height: 400px;
  }

  .title-main {
    font-family: 'Rocher';
    text-align: center;
    font-size: 35px;
    height: 100vh;
  }
}
</style>
