<template>
  <div class="grid grid-cols-[1fr_1fr_1fr_600px] gap-[15px] my-[10px]">
    <el-card shadow="always">
      <div class="flex flex-col items-center justify-center  h-[200px]">
        <div class="text-[32px]">上班人数</div>
        <div class="text-[#463881] text-[50px] font-bold my-[10px]">54</div>
      </div>
    </el-card>
    <el-card shadow="always" class="cursor-pointer" @click="handleClick('迟到人次')">
      <div class="flex flex-col items-center justify-center h-[200px]">
        <div class="text-[32px]">迟到人次</div>
        <div class="text-[#463881] text-[50px] font-bold my-[10px]">322</div>
      </div>
    </el-card>
    <el-card shadow="always" class="cursor-pointer" @click="handleClick('早退人次')">
      <div class="flex flex-col items-center justify-center h-[200px]">
        <div class="text-[32px]">早退人次</div>
        <div class="text-[#463881] text-[50px] font-bold my-[10px]">4</div>
      </div>
    </el-card>
    <div class="grid grid-rows-2 gap-[10px]">
      <el-card shadow="always">
        <div class="text-[20px] font-bold mb-[10px]">考勤时间</div>
        <el-date-picker
          v-model="kaoqingDate"
          type="daterange"
          range-separator="-"
          start-placeholder="无限制"
          end-placeholder="无限制"
          size="large"
        />
      </el-card>
      <el-card shadow="always">
        <div class="text-[20px] font-bold  mb-[10px]">部门</div>
        <el-select v-model="departmentValue" placeholder="Select" size="large">
          <el-option
            v-for="item in departmentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-card>
    </div>
    <el-dialog v-model="showDialog" :title="showTitle">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="numberOfTimes" label="次数" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const kaoqingDate = ref([]);
const departmentValue = ref("1");
const departmentOptions = [
  {
    value: "1",
    label: "A部门",
  },
  {
    value: "2",
    label: "B部门",
  },
  {
    value: "3",
    label: "C部门",
  },
];


// 人数弹框列表
const showDialog = ref(false);
const showTitle = ref("");
const tableData = ref([]);

// 人数列表
const handleClick = (name) => {
  showTitle.value = name;
  showDialog.value = true;
};
</script>

<style scoped lang="scss">
::v-deep(.el-date-editor) {
  width: 100%;

  input {
    font-size: 20px;
  }
}

::v-deep(.el-select) {
  .el-select__placeholder {
    font-size: 18px;
  }
}
</style>