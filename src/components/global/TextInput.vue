<template>
  <div>
    <label
      class="text-xs tracking-wide font-bold block uppercase mb-2"
      :class="[labelColor ? 'text-gray-900' : 'text-gray-100']"
      >{{ label }}</label
    >
    <input
      :type="inputType"
      :placeholder="placeholder"
      v-model="inputComputed"
      class="
        apparance-none
        block
        w-full
        bg-white
        text-gray-700
        border border-gray-400
        rounded
        py-3
        px-4
        leading-tight
        focus:outline-none focus:bg-white focus:border-gray-500
      "
    />
    <span v-if="error" class="text-red-500">
      {{ error }}
    </span>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, toRefs, computed } from "vue";
const emit = defineEmits(["update:input"]);
const props = defineProps({
  label: String,
  labelColor: { type: Boolean, default: true },
  input: String,
  placeholder: { type: String, default: "" },
  inputType: String,
  error: String,
});
const { label, labelColor, input, placeholder, error } = toRefs(props);
const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit("update:input", val),
});
</script>
<style lang="scss">
</style>