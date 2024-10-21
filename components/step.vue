<template>
  <div class="step-container">
    <p class="step-title">
      STEP {{ props.step }} -
      {{ props.title }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({ step: Number, title: String });
</script>

<style scoped>
.step-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-title {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 24px;
}
</style>
