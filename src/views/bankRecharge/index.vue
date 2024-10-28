<script setup>
import QRCode from 'vue-qrcode';
import { getBlockchain, recharge, upload, getRate } from "@/api/index.js";
import CustomFloatingPanel from '@/components/CustomFloatingPanel/index.vue'
import { showSuccessToast, showFailToast, showToast } from "vant";
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onBeforeMount } from 'vue';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

//请求参数
const rechargeType = ref('')
rechargeType.value = route.query.recharge_type

const onClickLeft = () => {
  router.back();
};

const floatingPanel = ref(null);
const handleChooseCoin = () => {
  floatingPanel.value.show = true;
}

const network1 = ref('');
const change = (item, data, itemName, itemAccount) => {
  floatingPanel.value.show = false;
  network1.value = item;
  address.value = data;
  name.value = itemName;
  account.value = itemAccount;
}

const title = ref('');
const unit = ref('');
const address = ref('');
const name = ref('');  // New addition for name
const account = ref('');  // New addition for account
const blockchaindata = ref([]);
const getBlockchaindata = async () => {
  const res = await getBlockchain();
  blockchaindata.value = res.data;
  if (blockchaindata.value.length > 0) {
    address.value = blockchaindata.value[0]?.blockchain;
    name.value = blockchaindata.value[0]?.name; // Set initial name
    account.value = blockchaindata.value[0]?.account; // Set initial account
  }
}


const rechargeRate = ref(0);
const rechargeFact = ref(0);

//获取汇率
const requestRate = async () => {
  const res = await getRate();
  rechargeRate.value = res.data.rate
}

const price1 = ref(0);
const torechargedata = ref({
  image: '',
  price: 0,
  recharge_type: rechargeType.value,
  currency_type: 'USD',
  network: '',
  blockchain: '',
  real_name: '',
  bank_card: '',
  bank_name: ''
});

const changePrice = (e) => {
  price1.value = Number(e.target.value);
  torechargedata.value.price = price1.value;
  rechargeFact.value = (price1.value / rechargeRate.value).toFixed(2);
}

const onSubmit = () => {
  loadingToast();
  torechargedata.value.network = network1.value;
  torechargedata.value.blockchain = address.value;
  recharge(torechargedata.value).then(res => {
    if (res.code === 1) {
      goToExternalSite(res.data.url)
      //  showSuccessToast(res.msg);
    } else {
      showFailToast(res.msg);
    }
    closeToast();
  })
}

const goToExternalSite = (url) => {
  // console.log("type----:"+rechargeType.value)
  if (rechargeType.value == "2") {
    router.push({ path: '/imageShow', query: { imgUrl: url } })
  } else {
    window.location.href = url
  }
}

const validator = (val) => /^[1-9]\d*$/.test(val);

const loadingToast = () => {
  showLoadingToast({
    message: '',
    forbidClick: true,
    duration: 0
  });
}

onBeforeMount(() => {
  getBlockchaindata();
  requestRate();
  if (rechargeType.value == "0") {
    title.value = t("recharge.chainDeposit")
    unit.value = t("withdraw.amount")
  } else if (rechargeType.value == "2") {
    title.value = t("recharge.zfbDeposit")
    unit.value = t("walletrecharge.number")
  } else {
    title.value = t("recharge.wxDeposit")
    unit.value = t("walletrecharge.number")
  }
})
</script>

<template>
  <header>
    <van-nav-bar :title=title :left-text="$t('goback')" left-arrow @click-left="onClickLeft">
      <template #right>
        <span @click="router.push('/rechargeRecord')" class="text-white">{{ $t("walletrecharge.rechargerecord")
          }}</span>
      </template>
    </van-nav-bar>
  </header>
  <main class="mx-3">
    <van-form @submit="onSubmit()">
      <h5 class="mt-3 text-base font-semibold">{{ unit }}</h5>
      <van-field class="bg-white w-full rounded-md mt-3 flex items-center py-3 px-3" @input="changePrice"
        v-model="price1" :placeholder="$t('walletrecharge.inputmoney')"
        :rules="[{ required: true, message: $t('walletrecharge.inputmoney') }, { validator, message: $t('walletrecharge.nozero') }]" />
      <div class="flex text-blue-500 justify-between mt-3 mx-3 text-sm">
        <span>
          {{ $t("withdraw.actualAmountReceived") }}{{ rechargeFact }} $
        </span>
      </div>
      <div class="pt-10">
        <van-button native-type="submit" round block color="#191919">{{ $t("walletrecharge.submit") }}</van-button>
      </div>
    </van-form>
  </main>
  <custom-floating-panel ref="floatingPanel" height="800px">
    <div class="coins-container">
      <div class="title-row">
        {{ $t("walletrecharge.title2") }}
      </div>
      <div class="tip-row">
        {{ $t("walletrecharge.title3") }}
      </div>
      <van-space direction="vertical" size="1rem">
        <div class="coin-card" v-for="(item, index) in blockchaindata" :key="index"
          @click="change(item.network, item.blockchain, item.name, item.account)">
          <div class="name-row">{{ item.network }}</div>
          <div class="other-row">{{ $t("walletrecharge.title4") }} 0.00000001 USDT</div>
          <div class="other-row">{{ $t("walletrecharge.title5") }}</div>
        </div>
      </van-space>
    </div>
  </custom-floating-panel>
</template>

<style lang="scss" scoped>
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
