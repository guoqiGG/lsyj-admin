<template>
  <el-card class="clo-center">
    <el-form
      label-position="left"
      label-width="100px"
      :model="formLabelAlign"
      style="width: 460px"
    >
      <el-form-item label="请输入验证码">
        <el-input v-model="formLabelAlign.code" />
        <div class="s-canvas">
          <canvas
            @click="updataCode"
            id="codeCanves"
            :width="contentWidth"
            :height="contentHeight"
          ></canvas>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
const contentWidth = ref(112)
const contentHeight = ref(40)
const formLabelAlign = reactive({
  code: '',
})
const identifyCodes = ref('3456789ABCDEFGHGKMNPQRSTUVWXY')
const identifyCode = ref('1234')
const backgroundColorMin = ref(180)
const backgroundColorMax = ref(240)
const colorMin = ref(50)
const colorMax = ref(160)
const lineColorMin = ref(30)
const lineColorMax = ref(120)
const dotColorMin = ref(0)
const dotColorMax = ref(255)

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const randomColor = (min, max) => {
  var r = randomNum(min, max)
  var g = randomNum(min, max)
  var b = randomNum(min, max)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

const drawPic = () => {
  var canvas = document.getElementById('codeCanves')
  var ctx = canvas.getContext('2d')
  ctx.textBaseline = 'bottom' // 绘制背景
  ctx.fillStyle = randomColor(
    backgroundColorMin.value,
    backgroundColorMax.value
  )
  ctx.fillRect(0, 0, contentWidth.value, contentHeight.value) // 绘制文字
  // for (let i = 0; i < identifyCode.value.length; i++) {
  drawText(ctx, identifyCode.value)
  // }
  drawLine(ctx)
  drawDot(ctx)
}
const drawText = (ctx, txt, i) => {
  console.log(txt)
  ctx.fillStyle = randomColor(colorMin.value, colorMax.value)
  ctx.font = randomNum(28, 40) + 'px SimHei'
  var x = contentWidth.value / (identifyCode.length + 1)
  var y = randomNum(40, contentHeight.value - 5)
  var deg = randomNum(-30, 30) // 修改坐标原点和旋转角度
  ctx.translate(x, y)
  ctx.rotate((deg * Math.PI) / 270)
  ctx.fillText(txt, 20, 30) // 恢复坐标原点和旋转角度
  console.log(txt)
  ctx.rotate((-deg * Math.PI) / 270)
  ctx.translate(-x, -y)
}
const drawLine = (ctx) => {
  // 绘制干扰线
  for (let i = 0; i < 2; i++) {
    ctx.strokeStyle = randomColor(lineColorMin.value, lineColorMax.value)
    ctx.beginPath()
    ctx.moveTo(
      randomNum(0, contentWidth.value),
      randomNum(0, contentHeight.value)
    )
    ctx.lineTo(
      randomNum(0, contentWidth.value),
      randomNum(0, contentHeight.value)
    )
    ctx.stroke()
  }
}
const drawDot = (ctx) => {
  // 绘制干扰点
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = randomColor(0, 255)
    ctx.beginPath()
    ctx.arc(
      randomNum(0, contentWidth.value),
      randomNum(0, contentHeight.value),
      1,
      0,
      2 * Math.PI
    )
    ctx.fill()
  }
}

onMounted(() => {
  drawPic()
})

const updataCode = () => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
}
const makeCode = (val, l) => {
  for (let i = 1; i < val.length && i <= l; i++) {
    identifyCode.value +=
      identifyCodes.value[
        Math.floor(Math.random() * (identifyCodes.value.length - 0) + 0)
      ]
  }

  console.log(identifyCode.value)
  drawPic()
}
</script>

<style lang="scss" scoped>
.s-canvas {
  height: 38px;
}
.s-canvas canvas {
  margin-top: 1px;
  margin-left: 8px;
}
</style>
