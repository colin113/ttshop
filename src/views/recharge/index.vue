<script setup>
// import NavBar from '@/components/CustomNavBar/index.vue'
import { useUserStore } from "@/store/modules/user.js";
import { useI18n } from 'vue-i18n';
import { showFailToast } from "vant";
//多语言
const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const onClickLeft = () => {
  router.back();
};

//0=银行卡,1=数字货币,2=支付宝,3= 微信
const list = [
  // { path: '/walletRecharge', type: "", name: t("recharge.chainDeposit"), icon: 'bitcoin', type: 0 },
 // { path: '/bankRecharge',  name: t("recharge.chainDeposit"), icon: 'bitcoin', type: 0 },
  { path: '/zhifubaoRecharge',  name: t("recharge.zfbDeposit"), icon: '', type: 2 },
  //{ path: '/zhifubaoRecharge', name: t("recharge.wxDeposit"), icon: '', type: 3 },
  // { path: 'bankCardRecharge', name: '银行卡', icon: 'bank-card' },
  { path: '/service', name: t("recharge.manualDeposit"), icon: 'headset-one', type: -1 }
]
</script>

<template>
  <header>
    <van-nav-bar :title="$t('recharge.deposit')" :left-text="$t('goback')" left-arrow @click-left="onClickLeft">
      <template #right>
        <span @click="router.push('/rechargeRecord')" class="text-white">{{ $t("recharge.depositHistory") }}</span>
      </template>
    </van-nav-bar>
  </header>
  <!--  <NavBar title="充值" />-->
  <main class="mx-3">
    <div class="flex justify-center items-center mt-10">
      <img alt="" class="w-3/4" src="@/assets/icons/yan.png">
    </div>
    <h5 class="mt-3 text-base font-semibold">{{ $t("recharge.depositMethod") }}</h5>
    <div v-for="(item, index) in list" :key="index" class="bg-white rounded-md mt-3 flex items-center py-3"
      @click="userStore.MerInfo.status === 1 ? router.push({ path: item.path, query: { recharge_type: item.type } }) : showFailToast($t('over'))">
      <div class="mx-3">
        <icon-park :name="item.icon" size="1.8rem" v-if="item.type == -1" />
        <img src="@/assets/image/home1/提现.png" style="width: 1.8rem;" v-if="item.type == 0">
        <img src="@/assets/icons/ic_zfb.svg" style="width: 1.8rem;" v-if="item.type == 2">
        <img src="@/assets/icons/ic_wx.svg" style="width: 1.8rem;" v-if="item.type == 3">
      </div>
      <div>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>