<script setup>
import {changePayPwd} from "@/api/index.js";
import { useI18n } from 'vue-i18n';
//多语言
const { t } = useI18n();
const onClickLeft = () => history.back();

//请求参数
const setPayQuery = ref({
      old: '',
      new: '',
      is_verify: '0'
    }
)
const repwd=ref('')
//请求函数
const onSubmit = async (data) => {
  const res = await changePayPwd(data)
  if (res.code === 1) {
    showSuccessToast(res.msg);
  }else{
    showFailToast(res.msg);
  }
}
//校验密码
const validator = (val) => {
  if(val!==setPayQuery.value.new){
    return false;
  }
}
</script>

<template>
  <header>
    <van-nav-bar
        :title= "$t('setPaypwd.setPaymentPassword')"
        :left-text="$t('goback')"
        left-arrow
        @click-left="onClickLeft"
    />
  </header>
  <main>
    <van-form @submit="onSubmit(setPayQuery)" class="bg-white">
      <div>
        <van-cell :title="$t('setPaypwd.fundsPassword')" center style="font-size: 20px"/>
        <van-field :placeholder="$t('setPaypwd.enterSixDigits')" type="password" v-model="setPayQuery.new" required maxlength="6"/>
      </div>
      <div>
        <van-cell :title="$t('setPaypwd.reenterFundsPassword')" center style="font-size: 20px"/>
        <van-field :placeholder="$t('setPaypwd.reenterPassword')" type="password"  v-model="repwd" required :rules="[{ validator ,message: $t('setPaypwd.passwordsDoNotMatch')}]" maxlength="6"/>
      </div>
      <div class="bg-black mx-3 mt-3 flex justify-center items-center rounded-md ">
        <van-button native-type="submit">{{ $t("setPaypwd.submit") }}</van-button>
      </div>
      <div class="h-5"></div>
    </van-form>
  </main>
</template>

<style scoped lang="scss">
.van-button--default {
  color: white;
  background-color: black;
  border: 0 solid white;
}
</style>