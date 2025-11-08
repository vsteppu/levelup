<!-- From Uiverse.io by aryamitra06 --> 
<template>
    <div class="loader">
        <span class="bar w-0.5 h-2.5"></span>
        <span class="bar w-0.5 h-2.5 nth-2n:h-[18px]"></span>
        <span class="bar w-0.5 h-2.5"></span>
    </div>
</template>

<style scooped>
.loader {
  display: flex;
  align-items: center;
}

.bar {
  display: inline-block;
  background-color: rgba(255, 255, 255, .5);
  border-radius: 10px;
  animation: scale-up4 1s linear infinite;
}

.bar:nth-child(2) {
  height: 18px;
  margin: 0 5px;
  animation-delay: .25s;
}

.bar:nth-child(3) {
  animation-delay: .5s;
}

@keyframes scale-up4 {
  20% {
    background-color: #ffff;
    transform: scaleY(1.5);
  }

  40% {
    transform: scaleY(1);
  }
}
</style>