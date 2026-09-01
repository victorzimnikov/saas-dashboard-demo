<script setup lang="ts">
import { ColorPalette } from "@/constants";
import { alpha } from "@saas-dashboard/utils";
import { computed } from "vue";
import VChart from "vue-echarts";

const START_ANGLE = 80;
const FULL_CIRCLE = 360;
const SEGMENT_DURATION = 600;

type Props = {
  saleValue: number;
  distributeValue: number;
  returnValue: number;
};

const props = defineProps<Props>();

const commonGauge = {
  type: "gauge" as const,
  min: 0,
  max: 100,
  radius: "82%",
  center: ["50%", "50%"],
  pointer: { show: false },
  axisTick: { show: false },
  splitLine: { show: false },
  axisLabel: { show: false },
  detail: { show: false },
  anchor: { show: false },
  silent: true,
};

const background = {
  ...commonGauge,
  animation: false,
  startAngle: 90,
  endAngle: -270,
  axisLine: {
    lineStyle: {
      width: 15,
      color: [[1, alpha(ColorPalette.Blue, 0.05)]],
    },
  },
  data: [],
  z: 1,
};

const segment = (
  color: string,
  startAngle: number,
  endAngle: number,
  withShadow: boolean,
  width: number,
  delay: number,
) => ({
  ...commonGauge,
  startAngle,
  endAngle,

  animation: true,
  animationDuration: SEGMENT_DURATION,
  animationDelay: delay,
  animationEasing: "cubicOut" as const,

  progress: {
    show: true,
    roundCap: true,
    width,
    itemStyle: {
      color,
      shadowBlur: withShadow ? 12 : 0,
      shadowOffsetY: withShadow ? 8 : 0,
      shadowColor: withShadow ? alpha(ColorPalette.Text, 0.28) : "transparent",
    },
  },

  axisLine: {
    lineStyle: {
      width,
      color: [[1, "transparent"]],
    },
  },

  // Каждый сегмент должен заполнить весь заданный ему диапазон углов.
  data: [{ value: 100 }],
});

const totalValue = computed(() => props.distributeValue + props.returnValue + props.saleValue);

const option = computed(() => {
  const sale = Math.max(0, props.saleValue);
  const distribute = Math.max(0, props.distributeValue);
  const returned = Math.max(0, props.returnValue);

  const valuesSum = sale + distribute + returned;
  const totalPercent = Math.min(100, Math.max(0, totalValue.value));

  // Например, totalValue = 80 означает 288° цветного кольца.
  const coloredAngle = FULL_CIRCLE * (totalPercent / 100);

  const angleFor = (value: number) => (valuesSum > 0 ? coloredAngle * (value / valuesSum) : 0);

  const saleAngle = angleFor(sale);
  const distributeAngle = angleFor(distribute);
  const returnAngle = angleFor(returned);

  const saleStart = START_ANGLE;
  const saleEnd = saleStart - saleAngle;

  const distributeStart = saleEnd;
  const distributeEnd = distributeStart - distributeAngle;

  const returnStart = distributeEnd;
  const returnEnd = returnStart - returnAngle;

  return {
    series: [
      background,

      {
        ...segment(ColorPalette.Blue, saleStart, saleEnd, true, 38, 0),
        z: 4,
      },

      {
        ...segment(
          ColorPalette.Yellow,
          distributeStart,
          distributeEnd,
          false,
          29,
          SEGMENT_DURATION,
        ),
        z: 3,
      },

      {
        ...segment(ColorPalette.Orange, returnStart, returnEnd, false, 24, SEGMENT_DURATION * 2),
        z: 2,
      },
    ],
  };
});
</script>

<template>
  <div class="donut">
    <VChart :option="option" autoresize />

    <div class="donut__label">
      <strong>{{ totalValue }}%</strong>
      <span>Transactions</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.donut {
  flex: 1;
  position: relative;
}

.donut__label {
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  display: grid;
  text-align: center;
  pointer-events: none;
}

.donut__label strong {
  font-size: 30px;
  font-weight: 800;
  color: var(--color-text);
}

.donut__label span {
  margin-top: 8px;
  font-size: 16px;
  line-height: 22px;
  color: rgba(from var(--color-text) r g b / 70%);
}
</style>
