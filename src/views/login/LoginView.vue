<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/form/LoginForm.vue'
import RegisterForm from '@/components/form/RegisterForm.vue'
import LoginIcon from '@/components/icons/LoginIcon.vue'
import RegisterIcon from '@/components/icons/RegisterIcon.vue'

const isTrue = ref(false)
const changeForm = () => {
  isTrue.value = !isTrue.value
}
</script>

<template>
  <div class="container">
    <div class="form-container">
      <n-grid cols="4" item-responsive responsive="screen">
        <n-grid-item span="0 s:0 m:1 l:2 xl:2">
          <div class="form-left">
            <Transition name="form" mode="out-in">
              <KeepAlive>
                <Component :is="isTrue ? RegisterIcon : LoginIcon"></Component>
              </KeepAlive>
            </Transition>
          </div>
        </n-grid-item>
        <n-grid-item span="4 s:4 m:3 l:2 xl:2">
          <div class="form-right">
            <Transition name="form" mode="out-in">
              <KeepAlive>
                <Component
                  :is="isTrue ? RegisterForm : LoginForm"
                  @change-form="changeForm"
                ></Component>
              </KeepAlive>
            </Transition>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/color';
@import '@/assets/css/shadow';

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/img/geometry.webp');
  background-repeat: repeat;
}

.form-container {
  width: 50%;
  height: 50%;
  border-radius: 20px;
  background-color: $basic-white;
  border: 1px $base-border solid;
  box-shadow: $right-bottom-shadow $darker-border;
}

.form-right {
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.form-left {
  height: 50vh;
}

.form-left svg {
  height: 100%;
  width: 100%;
}

/*
媒体查询区域
 */
@media (max-width: 640px) {
  .container {
    .form-container {
      width: 100%;
      border-radius: unset;
      box-shadow:
        $top-shadow $darker-border,
        $bottom-shadow $darker-border;
    }
  }
}

/*
动画区域
 */
.form-enter-active {
  transition: opacity 0.25s ease-out;
}

.form-leave-active {
  transition: opacity 0.25s ease-in;
}

.form-enter-from,
.form-leave-to {
  opacity: 0;
}
</style>
