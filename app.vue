<template>
  <Tally v-if="step === steps['tally']" :userId="userId"></Tally>
  <Calendly v-if="step === steps['calendly']" :prefill="prefill"></Calendly>
</template>

<script setup lang="ts">
import { uuid } from "vue-uuid";

const steps = {
  tally: 1,
  calendly: 2,
};

const step = ref(steps["tally"]);
const userId = useState("userId", () => uuid.v4());
const prefill = ref({});

onMounted(() => {
  const url = "ws://localhost:3000/_ws";
  const ws = new WebSocket(url);

  const prefillData = localStorage.getItem("prefillData");
  if (prefillData) {
    prefill.value = JSON.parse(prefillData);
  }

  const savedStep = localStorage.getItem("currentStep");
  if (savedStep) {
    step.value = Number(savedStep);
  }

  ws.addEventListener("open", () => {
    ws.send("SetID/" + userId.value);
  });

  ws.addEventListener("message", (event) => {
    prefill.value = JSON.parse(event.data).message;
    step.value = steps["calendly"];
  });
});

watch(step, (update) => {
  localStorage.setItem("currentStep", update);
});

watch(prefill, (update) => {
  localStorage.setItem("prefillData", JSON.stringify(update));
});
</script>
