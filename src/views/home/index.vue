<template>
  <div class="main-box">
    <Title />

    <Statistics />

    <ChartContent />
  </div>
</template>


<script setup>

import Title from "@/components/Title/index.vue";
import Statistics from "@/views/home/components/Statistics/index.vue";
import ChartContent from "@/views/home/components/ChartContent/index.vue";
</script>


<style scoped lang="scss">
.main-box {
  background-color: #EDECFA;
  height: 100vh;
  width: 100vw;
  padding: 0 10px 10px;
  overflow: hidden;
}
</style>