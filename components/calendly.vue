<template>
  <CalendlyInlineWidget class="container" v-bind="options" />
</template>

<script lang="ts" setup>
const props = defineProps({ prefill: Object });
const config = useRuntimeConfig();

const calendlyUrl = new URL(config.public.calendlyUrl);
const prefillData = props.prefill;

const options = {
  url: calendlyUrl.toString(),
  prefill: prefillData,
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
