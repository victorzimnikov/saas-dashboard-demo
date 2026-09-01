<script setup lang="ts">
import { computed } from "vue";
import { graphic } from "echarts/core";
import VChart from "vue-echarts";

type SalesPoint = {
  time: string;
  value: number;
  sales: number;
  marker?: boolean;
};

type Props = {
  data: SalesPoint[];
};

type TooltipParam = {
  seriesName?: string;
  value?: unknown;
};

const props = defineProps<Props>();

const numberFormatter = new Intl.NumberFormat("en-US");

const isTooltipParam = (value: unknown): value is TooltipParam => {
  return typeof value === "object" && value !== null;
};

const formatTooltip = (params: unknown) => {
  const items = (Array.isArray(params) ? params : [params]).filter(isTooltipParam);
  const point = items.find((item) => item.seriesName === "Sales");

  const values = Array.isArray(point?.value) ? point.value : [];
  const sales = typeof values[2] === "number" ? values[2] : 0;

  return `
    <div style="
      position: relative;
      min-width: 142px;
      padding: 16px 24px;
      border-radius: 14px;
      background: #030229;
      color: #ffffff;
      text-align: center;
      box-shadow: 0 10px 24px rgba(3, 2, 41, 0.18);
    ">
      <div style="
        margin-bottom: 5px;
        color: rgba(255, 255, 255, 0.72);
        font-size: 15px;
        line-height: 20px;
      ">
        Sales
      </div>

      <div style="
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
      ">
        ${numberFormatter.format(sales)}
      </div>

      <span style="
        position: absolute;
        bottom: -7px;
        left: 50%;
        width: 15px;
        height: 15px;
        background: #030229;
        transform: translateX(-50%) rotate(45deg);
      "></span>
    </div>
  `;
};

const chartData = computed(() => props.data.map((point) => [point.time, point.value, point.sales]));

const markerData = computed(() =>
  props.data.filter((point) => point.marker).map((point) => [point.time, point.value, point.sales]),
);

const option = computed(() => ({
  animationDuration: 700,
  animationEasing: "cubicOut" as const,

  grid: {
    top: 16,
    right: 8,
    bottom: 10,
    left: 8,
    containLabel: true,
  },

  tooltip: {
    show: true,
    trigger: "axis",
    confine: true,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    extraCssText: "box-shadow: none;",
    formatter: formatTooltip,

    axisPointer: {
      type: "line",
      snap: true,
      lineStyle: {
        color: "#605bff",
        width: 1.5,
        type: [4, 6],
      },
    },
  },

  xAxis: {
    type: "category",
    boundaryGap: false,

    axisLine: {
      show: false,
    },

    axisTick: {
      show: false,
    },

    axisLabel: {
      margin: 18,
      color: "rgba(3, 2, 41, 0.52)",
      fontFamily: "Nunito",
      fontSize: 15,
    },

    splitLine: {
      show: false,
    },
  },

  yAxis: {
    type: "value",
    min: 0,
    max: 100,
    interval: 20,

    axisLine: {
      show: false,
    },

    axisTick: {
      show: false,
    },

    axisLabel: {
      margin: 20,
      color: "rgba(3, 2, 41, 0.52)",
      fontFamily: "Nunito",
      fontSize: 14,
    },

    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(3, 2, 41, 0.06)",
        width: 1,
      },
    },
  },

  series: [
    {
      name: "Sales",
      type: "line",

      dimensions: ["time", "value", "sales"],
      encode: {
        x: "time",
        y: "value",
      },

      data: chartData.value,

      smooth: 0.42,
      smoothMonotone: "x",
      showSymbol: false,
      symbol: "circle",
      clip: true,

      lineStyle: {
        width: 5,
        color: new graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#55c7ff",
          },
          {
            offset: 0.5,
            color: "#9678f4",
          },
          {
            offset: 1,
            color: "#ed48e9",
          },
        ]),
        shadowBlur: 8,
        shadowOffsetY: 5,
        shadowColor: "rgba(96, 91, 255, 0.18)",
      },

      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(150, 120, 244, 0.14)",
          },
          {
            offset: 1,
            color: "rgba(150, 120, 244, 0.01)",
          },
        ]),
      },

      emphasis: {
        disabled: true,
      },

      z: 2,
    },

    {
      name: "Markers",
      type: "scatter",

      dimensions: ["time", "value", "sales"],
      encode: {
        x: "time",
        y: "value",
      },

      data: markerData.value,
      symbol: "circle",
      symbolSize: 16,

      itemStyle: {
        color: "#ffffff",
        borderColor: "#9a7cf7",
        borderWidth: 5,
        shadowBlur: 6,
        shadowColor: "rgba(96, 91, 255, 0.16)",
      },

      emphasis: {
        scale: 1.08,
        itemStyle: {
          color: "#ffffff",
          borderColor: "#8d70ef",
          borderWidth: 5,
        },
      },

      tooltip: {
        show: false,
      },

      z: 4,
    },
  ],
}));
</script>

<template>
  <div class="line-chart">
    <VChart :option="option" autoresize />
  </div>
</template>

<style lang="scss" scoped>
.line-chart {
  flex: 1;
  width: 100%;
  min-height: 280px;
}
</style>
