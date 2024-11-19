<script setup>
import { showSuccessToast, showFailToast, showToast } from "vant";
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onBeforeMount } from 'vue';
import {emailLogin, login} from "@/api/index";
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
  <header>
    <van-nav-bar :title="$t('newword.emailLoginTitle')" :left-text="$t('goback')" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
  </header>
  <main class="mx-3">
    <van-form @submit="onSubmit()">
      <div class="mx-3">
        <div class="text-black my-3">
          {{ $t("login.email") }}
        </div>
        <div>
          <van-field v-model="logindata.account" :placeholder="$t('login.enterEmail')" :rules="[
            { required: true, message: $t('login.enterEmail') },
          ]" class="border border-gray-500 border-dotted rounded-lg" />
        </div>
      </div>
      <div class="mx-3">
        <div class="text-black my-3">
          {{ $t("newword.password") }}
        </div>
        <div>
          <van-field v-model="logindata.password" :placeholder="$t('newword.enterPassword')" :rules="[
            { required: true, message: $t('newword.enterPassword') },
          ]" class="border border-gray-500 border-dotted rounded-lg" />
        </div>
      </div>

      <div class="pt-10">
        <van-button native-type="submit" round block color="#009996">{{ $t("walletrecharge.submit") }}</van-button>
      </div>
    </van-form>
  </main>
</template>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
		background-color: #009996 !important;
	}

.coins-container {
  padding: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .title-row {
    padding-top: 1rem;
    text-align: center;
    font-weight: 500;
    font-size: 1.2rem;
    color: #191919;
    line-height: 1rem;
  }

  .tip-row {
    padding: 1rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 400;
    font-size: 0.8rem;
    color: #191919;
    line-height: 1rem;
  }

  .coin-card {
    background: #ffffff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
    border-radius: 4px 4px 4px 4px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .name-row {
      font-weight: 500;
      font-size: 1rem;
      color: #191919;
      line-height: 1.2rem;
      padding-bottom: 0.3rem;
    }

    .other-row {
      font-weight: 400;
      font-size: 0.8rem;
      color: #191919;
      line-height: 1rem;
    }
  }
}
</style>
