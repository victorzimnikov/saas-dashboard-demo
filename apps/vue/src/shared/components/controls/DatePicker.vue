<script setup lang="ts">
import { format } from "date-fns";
import { computed, ref } from "vue";

const model = defineModel<Date>({ required: true });

const inputValue = computed<string>({
  get() {
    return format(model.value, "yyyy-MM-dd");
  },

  set(value) {
    const [year, month, day] = value.split("-").map(Number);

    model.value = new Date(year, month - 1, day);
  },
});

const input = ref<HTMLInputElement | null>(null);

const formattedDate = computed<string>(() => {
  if (!model.value) {
    return "Выберите дату";
  }

  return format(model.value, "dd-MM-yyyy");
});

function openCalendar(): void {
  const element = input.value;

  if (!element) {
    return;
  }

  if (typeof element.showPicker === "function") {
    element.showPicker();
  } else {
    element.click();
  }
}
</script>

<template>
  <button type="button" class="date-picker" @click="openCalendar">
    <span>{{ formattedDate }}</span>

    <svg class="date-picker__arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5 7.5 5 5 5-5" />
    </svg>

    <input
      ref="input"
      v-model="inputValue"
      class="date-picker__input"
      type="date"
      tabindex="-1"
      aria-label="Выберите дату"
    />
  </button>
</template>

<style scoped>
.date-picker {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 54px;
  padding: 6px 16px;
  overflow: hidden;

  color: #525873;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;

  background: var(--color-white);
  border: 0;
  border-radius: 6px;
  box-shadow: 0 2px 12px rgb(28 35 65 / 2%);
  cursor: pointer;
}

.date-picker:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.date-picker__arrow {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  fill: none;
  stroke: rgb(from var(--color-text) r g b / 50%);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.date-picker__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
</style>
