<template>
  <ClientOnly>
    <vue-slider
      v-model="sliderValue"
      :min="min"
      :max="max"
      :interval="interval"
      tooltip="none"
      class="slider"
      @change="handleChange"
    />
  </ClientOnly>
</template>

<script setup>
const VueSlider = defineAsyncComponent(() => import("vue-slider-component"));

const props = defineProps({
  value: {
    type: Number,
    default: 0.7,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 1,
  },
  interval: {
    type: Number,
    default: 0.01,
  },
});

const sliderValue = ref(props.value);

const emits = defineEmits(["update"]);

const handleChange = (newValue) => {
  emits("update", newValue);
};

watch(
  () => props.value,
  (val) => (sliderValue.value = val),
);
</script>

<style lang="scss" scoped>
.slider {
  width: 100% !important;
  height: auto !important;
  margin: 0 !important;
  padding: 0 4px !important;
  :deep(.vue-slider-rail) {
    height: 8px;
    background-color: var(--main-color-bg);
    border-radius: 25px;
    .vue-slider-process {
      border-radius: 25px;
      background-color: var(--main-color);
    }
    .vue-slider-dot {
      width: 16px;
      height: 16px;
      border: 1px solid var(--main-color-bg);
      background-color: var(--main-color);
      box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>
