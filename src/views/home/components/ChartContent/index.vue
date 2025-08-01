<template>
  <div class="grid grid-cols-[800px_1fr] gap-[15px]">
    <el-card shadow="always">
      <div class="font-bold mb-[10px] text-[20px]">部门人数分布</div>
      <div class="line"></div>

      <div class="w-full h-[640px]" ref="bmrsEchartsRef"></div>
    </el-card>

    <div>
      <div class="grid grid-cols-2 gap-[15px] mb-[15px]">
        <el-card shadow="always">
          <div class="font-bold mb-[10px] text-[20px]">部门迟到分布</div>
          <div class="line"></div>
          <div class="w-full h-[300px]" ref="cdfbEchartsRef"></div>
        </el-card>

        <el-card shadow="always">
          <div class="font-bold mb-[10px] text-[20px]">部门早退分布</div>
          <div class="line"></div>
          <div class="w-full h-[300px]" ref="ztfbEchartsRef"></div>
        </el-card>
      </div>
      <el-card shadow="always">
        <div class="font-bold mb-[10px] text-[20px]">打卡时间分布</div>
        <div class="line"></div>
        <div class="w-full h-[230px]" ref="dksjEchartsRef"></div>
      </el-card>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const bmrsEchartsRef = ref(null);
let bmrsEchartInstance = null;

// 水平柱状图
const bmrsOptions = ref({
  yAxis: {
    type: "category",
    name: "部门",
    data: ["A部门", "B部门", "C部门", "D部门", "E部门", "F部门", "G部门"],
    // 去掉y轴刻度
    axisTick: {
      show: false,
    },
    // 设置y轴标签字体大小
    axisLabel: {
      interval: 0,
      rotate: 0,
      fontSize: 16,  // y轴数据标签字体大小
    },
    nameGap: 0, // 名称与轴线的距离
    // 设置y轴名称样式和位置
    nameTextStyle: {
      fontSize: 16,  // y轴名称字体大小
      fontWeight: "bold",
      padding: [0, 0, 0, -80], // 向左偏移10px（最后一个值控制左内边距）
    },
    nameOffset: [20, 40],
    nameLocation: "end",  // 名称位置：middle/start/end
  },
  xAxis: {
    type: "value",
    name: "部门人数",
    // 设置x轴标签字体大小
    axisLabel: {
      fontSize: 16,  // x轴数据标签字体大小
    },
    // 设置x轴刻度样式（可选）
    axisTick: {
      show: true,
    },
    // 设置x轴名称样式和位置
    nameTextStyle: {
      fontSize: 16,  // x轴名称字体大小
      fontWeight: "bold",
    },
    nameLocation: "middle",  // 名称位置
    nameGap: 30,  // 名称与轴线的距离
  },
  series: [
    {
      barWidth: 44,
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: "#DDDAF1" },
          { offset: 0.2, color: "#C0B7E5" },
          { offset: 0.4, color: "#ACA5D2" },
          { offset: 0.6, color: "#968BC5" },
          { offset: 0.8, color: "#8374C4" },
          { offset: 1, color: "#7464BD" },
        ]),
      },
      label: {
        show: true,
        position: "right",
        formatter: "{c}",
        fontSize: 16,  // 数据标签字体大小
      },
    },
  ],
  grid: {
    top: "4%",
    left: "4%",
    right: "8%",
    bottom: "4%",
    containLabel: true,
  },
});


// 迟到分布图
const cdfbEchartsRef = ref();
let cdfbEchartInstance = null;
const cdfbOptions = ref({
  legend: {
    left: "40",
  },
  title: {
    text: "部门",
    textStyle: {
      fontSize: 14,
      fontWeight: 400,
    },
  },
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      type: "pie",
      radius: ["50%", "70%"],
      center: ["50%", "55%"],
      label: {
        show: true,  // 显示标签
        position: "outside",  // 标签位置在外部
        formatter: "{b}: {c}",  // 标签格式：名称: 值
      },
      labelLine: {
        show: true,  // 显示引导线
        length: 15,  // 第一段线长度
        length2: 30, // 第二段线长度
        lineStyle: {
          width: 1,   // 线宽
          color: "#666", // 线颜色
        },
      },
      color: ["#7C6CC1", "#9CCAF1", "#C77CD7", "#E2ADC5", "#F2CC4B", "#C7A1F2"],
      data: [
        { value: 1048, name: "A部门" },
        { value: 735, name: "B部门" },
        { value: 580, name: "C部门" },
        { value: 484, name: "D部门" },
        { value: 300, name: "E部门" },
        { value: 300, name: "F部门" },
      ],
    },
  ],
});


// 早退分布图
const ztfbEchartsRef = ref();
let ztfbEchartInstance = null;
const ztfbOptions = ref({
  legend: {
    left: "40",
  },
  tooltip: {
    trigger: "item",
  },
  title: {
    text: "部门",
    textStyle: {
      fontSize: 14,
      fontWeight: 400,
    },
  },
  series: [
    {
      type: "pie",
      radius: ["50%", "70%"],
      center: ["50%", "55%"],
      label: {
        show: true,  // 显示标签
        position: "outside",  // 标签位置在外部
        formatter: "{b}: {c}",  // 标签格式：名称: 值
      },
      labelLine: {
        show: true,  // 显示引导线
        length: 15,  // 第一段线长度
        length2: 30, // 第二段线长度
        lineStyle: {
          width: 1,   // 线宽
          color: "#666", // 线颜色
        },
      },
      color: ["#8374C4", "#9CCAF1", "#C77CD7"],
      data: [
        { value: 1048, name: "G部门" },
        { value: 735, name: "F部门" },
        { value: 580, name: "D部门" },
      ],
    },
  ],
});


// 打卡时间分布图
const dksjEchartsRef = ref();
let dksjEchartInstance = null;
const dksjOptions = ref({
  grid: {
    left: "5%",
    right: "10%",
    bottom: "15%",
    top: "20%",
  },
  xAxis: {
    name: "考勤时间", // y轴名称
    nameTextStyle: {
      fontSize: 18, // 字体大小
      color: "#666", // 可选：设置文字颜色
    },
    type: "category",
    data: ["09-01", "09-02", "09-03", "09-04", "09-05", "09-06", "09-07"],
    axisTick: {
      show: false, // 去掉x轴刻度
    },
    axisLine: {
      show: false, // 去掉x轴线
    },
    axisLabel: {
      fontSize: 16,
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      fontSize: 16,
    },
    nameTextStyle: {
      fontSize: 18, // 字体大小
      color: "#666",
      padding: [0, 0, 10, 30],
    },
    name: "工号去重计数", // y轴名称
  },
  series: [
    {
      data: [46, 48, 46, 3, 3, 46, 50],
      type: "line",
      showSymbol: true, // 必须开启才能显示标签
      symbol: "circle", // 定义数据点形状
      itemStyle: {
        color: "rgba(0, 0, 0, 0)", // 数据点完全透明
        borderColor: "rgba(0, 0, 0, 0)", // 边框也透明
      },
      // 不显示数据点
      lineStyle: {
        color: "#968BC5", // 线条颜色（使用主题色更协调）
        width: 4, // 线条宽度
      },
      areaStyle: {
        // 渐变背景配置
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#968BC5" }, // 上方颜色
            { offset: 1, color: "#EDECFA" },  // 下方颜色
          ],
        },
      },
      // 线上显示数值
      label: {
        show: true,
        position: "top",
        fontSize: 18,
        color: "#9B9EA8",
      },
    },
  ],
});


const dksjInit = () => {
  dksjEchartInstance = echarts.init(dksjEchartsRef.value);
  dksjEchartInstance.setOption(dksjOptions.value);
};

const ztfbInit = () => {
  ztfbEchartInstance = echarts.init(ztfbEchartsRef.value);
  ztfbEchartInstance.setOption(ztfbOptions.value);
};

const cdfbInit = () => {
  cdfbEchartInstance = echarts.init(cdfbEchartsRef.value);
  cdfbEchartInstance.setOption(cdfbOptions.value);
};

const bmrsInit = () => {
  bmrsEchartInstance = echarts.init(bmrsEchartsRef.value);
  bmrsEchartInstance.setOption(bmrsOptions.value);
};


onMounted(() => {
  dksjInit();
  ztfbInit();
  cdfbInit();
  bmrsInit();
});

</script>

<style scoped lang="scss">
.line {
  background-color: #AEB9C5;
  height: 2px;
  margin-bottom: 15px;
}
</style>
