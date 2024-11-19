<script setup>
import { showSuccessToast, showFailToast, showToast } from "vant";
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onBeforeMount } from 'vue';
import { emailLogin, login } from "@/api/index";
import { useUserStore } from '@/store/modules/user.js';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const onClickLeft = () => {
  router.back();
};

const logindata = ref({
  account: "",
  password: "",
});

const onSubmit = async () => {
  const params = {
    ...logindata.value,
    // data: 'ewogICJjdXN0b21JRCIgOiAiQHVzZXI5MDYyMDMxNjk1MTk0MiIsCiAgImF2YXRhciIgOiAiaHR0cHM6XC9cL3AxNi1zaWduLXZhLnRpa3Rva2Nkbi5jb21cL211c2ljYWxseS1tYWxpdmEtb2JqXC8xNTk0ODA1MjU4MjE2NDU0fmM1XzMwMHgzMDAud2VicD9sazNzPWE1ZDQ4MDc4Jm5vbmNlPTU4MjAxJnJlZnJlc2hfdG9rZW49N2I2M2VhY2VmNzgyYjAxMzc5OTU5YjZkMDdiNDYwMTAmeC1leHBpcmVzPTE3MjMyODc2MDAmeC1zaWduYXR1cmU9aXhJWTlNVzBESUZNdnBBcXhDOVVlajElMkJ3ZjglM0Qmc2hwPWE1ZDQ4MDc4JnNoY3A9MjQ3MmE2YzYiLAogICJsYW5nIiA6ICJ6aC1IYW5zIiwKICAibmlja25hbWUiIDogInVzZXI5MDYyMDMxNjk1MTk0MiIsCiAgInRpbWV6b25lIiA6ICJHTVQrMDc6MDAiLAogICJ0aWt0b2tfaWQiIDogIjczOTU2MDc5NDU4Mzg3MjQxMDEiLAogICJ2ZXJzaW9uIiA6ICJ2MC4wLjQiLAogICJ0aW1lc3RhbXAiIDogMTcyMzExNjgxNzU1OSwKICAicm91dGUiIDogInNob3BDZW50ZXIiCn0=',
    data: localStorage.getItem("data"),
  };
  const res = await emailLogin(params);
  // console.log(res.data.merinfo.token);
  console.log(res);
  if (res.code === 1) {
    userStore.token = res.data.merinfo.token;
    showSuccessToast(res.msg);
    router.push('/home');
  } else {
    showFailToast(res.msg);
  }
};


onBeforeMount(() => {

})
</script>

<template>
  <img src="@/assets/image/login/bg.png" class="bg" />
  <div class="page text-white">
    <header>
      <van-nav-bar :title="$t('newword.emailLoginTitle')" :border="false" :left-text="$t('goback')" left-arrow
        @click-left="onClickLeft">
      </van-nav-bar>
    </header>
    <main>
      <div class="flex justify-center items-center flex-col mt-40">
        <img style="width: 5rem;" src="@/assets/image/login/logo.png" alt="">
        <div class="mt-2">
          <span class="font-semibold text-3xl text-white">TikTok Mall</span>
        </div>
      </div>
      <div class="h-3/5 rounded-t-2xl fixed bottom-0" style="width:100vw;height: 60%;">
        <van-form @submit="onSubmit1()" class="mx-3 mt-6 login">
          <div class="mx-3">
            <div class="text-white mb-3">
              <span style="color:var(--van-field-required-mark-color)">*</span>{{
                $t("login.email") }}
            </div>
            <div>
              <van-field class="rounded-lg" preview-size="4rem" style="color: #fff;"
                :placeholder="$t('login.enterEmail')" v-model="logindata.account" required
                :rules="[{ required: true, message: $t('login.enterEmail') }]" />
            </div>
          </div>
          <div class="mx-3">
            <div class="text-white my-3">
              <span style="color:var(--van-field-required-mark-color)">*</span>{{ $t("newword.password")
              }}
            </div>
            <div>
              <van-field class="border border-gray-500 border-dotted rounded-lg"
                :placeholder="$t('newword.enterPassword')" v-model="logindata.password" required type="password"
                :rules="[{ required: true, message: $t('newword.enterPassword') }]" />
            </div>
          </div>
          <div class="bg-black mx-3 h-16 flex justify-center items-center text-white mt-10">
            <van-button style="background-color:  #009996;" native-type="submit" @click="toHome"> {{
              $t("walletrecharge.submit") }}</van-button>
          </div>
        </van-form>
      </div>
      <!-- <van-form @submit="onSubmit()">
      <div class="mx-3 mt-4">
 
        <div class="">
          <van-field :label="$t('login.email')" input-align="right" v-model="logindata.account" :placeholder="$t('login.enterEmail')" :rules="[
            { required: true, message: $t('login.enterEmail') },
          ]" class=" rounded-lg" />
        </div>
      </div>
      <div class="mx-3 mt-4">

        <div>
          <van-field :label="$t('newword.password')" input-align="right" v-model="logindata.password" :placeholder="$t('newword.enterPassword')" :rules="[
            { required: true, message: $t('newword.enterPassword') },
          ]" class="rounded-lg" />
        </div>
      </div>

      <div class="pt-10 mx-3">
        <van-button native-type="submit" block color="#009996">{{ $t("walletrecharge.submit") }}</van-button>
      </div>
    </van-form> -->
    </main>
  </div>
</template>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
  background-color: transparent !important;
}

.page {
  height: 100vh;
  overflow: hidden;
  --van-field-input-text-color: #fff;
}

.van-cell {
  padding: 10px 0;
}

:deep(.van-uploader__upload) {
  margin: 0;
}

.van-button--default {
  height: 100%;
  width: 100%;
  color: white;
  background-color: black;
  border: 0 solid white;
}

.rounded-lg {
  margin: 0;
}

.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: -1;
  bottom: 0;
}

// :deep(.van-nav-bar) {
//   background-color: #f8f8f8 !important;
// }

:deep(.van-nav-bar__left) {

  .van-icon,
  .van-nav-bar__text {
    color: #fff !important;
  }
}

.h42 {
  // height: 3rem;
}

.flex-column {
  flex-direction: column;
  align-items: flex-start !important;

  .imgs {
    width: 100%;
  }
}

.item-ts {
  background-color: #fff;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  margin-bottom: 1.2rem;

  :deep(.van-uploader__upload) {
    border-radius: 100%;
    height: 4rem;
    width: 4rem;
    background: #D9F0EF;

    i {
      color: #009996;
    }
  }

  // :deep(.van-uploader__preview) {
  // 	// border-radius: 100%;
  // 	height: 4rem;
  // 	width: 4rem;
  // 	overflow: hidden;
  // 	margin: 0;

  // }
}

.item {
  background-color: #fff;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  margin-bottom: 1.2rem;
  min-height: 4rem;

  >.right {
    display: flex;
    align-items: center;
  }

  :deep(.van-field__error-message) {
    text-align: right;
  }
}



.login {
  :deep(.van-cell) {
    background-color: transparent;
    border-radius: 5px 5px 5px 5px;
    border: 1px solid #FFFFFF;
    padding-left: 1rem;
  }
}

.btn {
  height: 3.2rem;
  border-radius: 5px 5px 5px 5px;
}

* {
  --van-field-input-text-color: #181818;
  --van-field-input-text-color: #fff
}

.zc {
  * {
    --van-field-input-text-color: #181818
  }
}
</style>
