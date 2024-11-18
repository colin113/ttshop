<script setup>
import { changeLoginPwd } from "@/api/index.js";
import { useUserStore } from '@/store/modules/user.js';
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
//多语言
const { t } = useI18n();
//仓库中获取商户信息请求函数
const userStore = useUserStore();
const router = useRouter();
const onClickLeft = () => history.back();
//请求参数
const forgetLoginQuery = ref({
  newpassword: '',
  mer_phone: '',
  oldpassword: '',
  renewpassword: ''
})
//请求函数
const onSubmit = async (data) => {
  const res = await changeLoginPwd(data)
  if (res.code === 1) {
    showSuccessToast(res.msg);
    router.push('/login');
  } else {
    showFailToast(res.msg);
  }
}

//校验密码
const validator = (val) => {
  if (val !== forgetLoginQuery.value.newpassword) {
    return false;
  }
}
</script>

<template>
  <div class="box">
    <header>
      <van-nav-bar :left-text="$t('goback')" left-arrow @click-left="onClickLeft" />
    </header>
    <main>
      <van-form @submit="onSubmit(forgetLoginQuery)" class="">
        <div class="mx-3 mt-10">
          <span class="ml-3 pt-1 font-semibold text-3xl " style="color: #141A52;">{{
            $t("forgetPwd.changeLoginPassword") }}</span>
        </div>
        <div class="mx-4 item">
          <van-field label-width="7.5rem" class="rounded-lg" required v-model="forgetLoginQuery.mer_phone"
            :label="$t('forgetPwd.tel')" input-align="right" :placeholder="$t('forgetPwd.telmessage')"
            :rules="[{ required: true, message: $t('forgetPwd.telmessage') }]" />
        </div>
        <div class="mx-4 item">
          <van-field label-width="10rem" class="rounded-lg" required v-model="forgetLoginQuery.newpassword"
            :label="$t('forgetPwd.pwd')" input-align="right" :placeholder="$t('forgetPwd.inputpwd')"
            :rules="[{ required: true, message: $t('forgetPwd.inputpwd') }]" />
        </div>
        <!-- <div>
          <van-cell :title="$t('forgetPwd.pwd')" center style="font-size: 20px" />
          <van-field :placeholder="$t('forgetPwd.inputpwd')" type="password" v-model="forgetLoginQuery.newpassword"
            :rules="[{ required: true, message: $t('forgetPwd.inputpwd') }]" required />
        </div> -->
        <div class="mx-4 item">
          <van-field label-width="10rem" class="rounded-lg" required v-model="forgetLoginQuery.renewpassword"
            :label="$t('forgetPwd.againpwd')" input-align="right" :placeholder="$t('forgetPwd.againinput')"
            :rules="[{ required: true, message: $t('forgetPwd.message') }]" />
        </div>
<!-- 
        <div>
          <van-cell :title="$t('forgetPwd.againpwd')" center style="font-size: 20px" />
          <van-field :placeholder="$t('forgetPwd.againinput')" type="password" v-model="forgetLoginQuery.renewpassword"
            required :rules="[{ required: true, validator, message: $t('forgetPwd.message') }]" />
        </div> -->
        <div class="mx-3 mt-20 flex justify-center items-center rounded-md ">
          <van-button native-type="submit" class="btn"> {{ $t("forgetPwd.submit") }}</van-button>
        </div>
        <div class="h-5"></div>
      </van-form>
    </main>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8 !important;
}

.van-button--default {
  color: white;
  background-color: black;
  border: 0 solid white;
}

:deep(.van-nav-bar) {
  background-color: #f8f8f8 !important;
}

:deep(.van-nav-bar__left) {

  .van-icon,
  .van-nav-bar__text {
    color: #000 !important;
  }
}

.item {

  background-color: #fff;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  margin-top: 1.2rem;
  min-height: 4rem;

  >.right {
    display: flex;
    align-items: center;
  }

  :deep(.van-field__error-message) {
    text-align: right;
  }
}

.van-cell {
  padding: 10px 0;
}

:deep(.van-field__control::-webkit-input-placeholder) {
  font-size: 1rem;
}

.btn{
  width: 100%;
    height: 56px;
    background: #009996;
    box-shadow: 0px 20px 48px -18px rgba(0, 153, 150, 0.3);
    border-radius: 6px 6px 6px 6px;
}
</style>