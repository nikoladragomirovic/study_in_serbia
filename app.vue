<template>
  <Transition>
    <Step v-if="step === steps['splash1']" :step="1" :title="'FORM'"></Step>
  </Transition>
  <Tally
    v-if="step < 3"
    :class="{ hidden: step !== steps['tally'], show: step === steps['tally'] }"
    :userId="userId"
  ></Tally>
  <Transition>
    <Step v-if="step === steps['splash2']" :step="2" :title="'CALENDLY'"></Step>
  </Transition>
  <Calendly
    v-if="step > 2"
    :class="{
      hidden: step !== steps['calendly'],
      show: step === steps['calendly'],
    }"
    :prefill="prefill"
  ></Calendly>
</template>

<script setup lang="ts">
import { uuid } from "vue-uuid";

const makeTransition: any = (
  from: keyof typeof steps,
  to: keyof typeof steps
) => {
  step.value = steps[from];
  setTimeout(() => {
    step.value = steps[to];
  }, 1500);
};

const steps = {
  initial: 0,
  splash1: 1,
  tally: 2,
  splash2: 3,
  calendly: 4,
};

const step = ref(steps["initial"]);
const userId = useState("userId", () => uuid.v4());
const prefill = ref({});

onMounted(() => {
  const url = "ws://localhost:3000/_ws";
  const ws = new WebSocket(url);

  const prefillData = localStorage.getItem("prefillData");
  if (prefillData) {
    prefill.value = JSON.parse(prefillData);
  }

  const savedStep = Number(localStorage.getItem("currentStep"));
  if (savedStep === steps["tally"] || savedStep === steps["calendly"]) {
    step.value = Number(savedStep);
  } else {
    makeTransition("splash1", "tally");
  }

  ws.addEventListener("open", () => {
    ws.send("SetID/" + userId.value);
  });

  ws.addEventListener("message", (event) => {
    prefill.value = JSON.parse(event.data).message;
    makeTransition("splash2", "calendly");
  });
});

watch(step, (update) => {
  localStorage.setItem("currentStep", update.toString());
});

watch(prefill, (update) => {
  localStorage.setItem("prefillData", JSON.stringify(update));
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-200px);
}
.v-leave-to {
  opacity: 0;
  transform: translateY(200px);
}

.hidden {
  opacity: 0;
  position: absolute;
  top: -100%;
  transform: translateY(-200px);
}

.show {
  opacity: 1;
  position: relative;
  transition: all 1s ease 1.5s;
}
</style>
