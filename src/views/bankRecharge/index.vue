<script setup>
import QRCode from 'vue-qrcode';
import { getBlockchain, recharge, upload, getRate } from "@/api/index.js";
import CustomFloatingPanel from '@/components/CustomFloatingPanel/index.vue'
import { showSuccessToast, showFailToast, showToast } from "vant";
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ref, computed, onBeforeMount } from 'vue';

const { t } = useI18n();
const router = useRouter();

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
const rechargeRate = ref(0);
const address = ref('');
const name = ref('');  // New addition for name
const account = ref('');  // New addition for account
const blockchaindata = ref([]);

const getrechargedata = ref({
  type: 0,
});
const getBlockchaindata = async () => {
  const res = await getBlockchain(getrechargedata.value);
  address.value = res.data.blockchain;
  name.value = res.data.name; // Set initial name
  account.value = res.data.account; // Set initial account
}
//获取汇率
const requestRate = async () => {
  const res = await getRate();
  rechargeRate.value = res.data.rate
}
const copy = (textToCopy) => {
  const textarea = document.createElement('textarea');
  textarea.value = textToCopy;
  textarea.style.position = 'fixed';
  textarea.style.opacity = 0;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  showToast('复制成功');
};

const price1 = ref(0);
const torechargedata = ref({
  image: '',
  price: 0,
  recharge_type: '0',
  currency_type: 'CNY',
  network: '',
  blockchain: '',
  real_name: '',
  bank_card: '',
  bank_name: ''
});

const changePrice = (e) => {
  price1.value = Number(e.target.value);
  torechargedata.value.price = price1.value;
}

const onSubmit = () => {
  torechargedata.value.network = network1.value;
  torechargedata.value.blockchain = address.value;
  torechargedata.value.bank_card = account.value;
  torechargedata.value.bank_name = address.value;
  torechargedata.value.real_name = name.value;
  if (torechargedata.value.image) {
    recharge(torechargedata.value).then(res => {
      if (res.code === 1) {
        router.back();
        showSuccessToast(res.msg);
      } else {
        showFailToast(res.msg);
      }
    })
  } else {
    showFailToast(t("walletrecharge.uprechargevoucher"));
  }
}

const validator = (val) => /^[1-9]\d*$/.test(val);

const uploadRef = ref(null);
const fileList = ref([]);
const showUpload = computed(() => {
  return !fileList.value.length;
})
const afterRead = file => {
  const formData = new FormData();
  formData.append('file', file.file);
  upload(formData).then(res => {
    if (res.code === 1) {
      torechargedata.value.image = res.data.fullurl;
      showSuccessToast(res.msg);
    } else {
      showFailToast(res.msg);
    }
  })
}

onBeforeMount(() => {
  getBlockchaindata();
  requestRate();
})
</script>

<template>
  <header>
    <van-nav-bar
        :title="$t('walletrecharge.recharge')"
        :left-text="$t('goback')"
        left-arrow
        @click-left="onClickLeft">
      <template #right>
        <span @click="router.push('/rechargeRecord')" class="text-white">{{ $t("walletrecharge.rechargerecord") }}</span>
      </template>
    </van-nav-bar>
  </header>
  <main class="mx-3">
    <div class="flex items-center">
      <h5 class="text-base font-semibold pr-1">{{ $t("bankCardRecharge.bankname") }}</h5>
      <van-icon name="arrow" size="1.1rem"/>
    </div>
    <div class="bg-white rounded-md mt-3 flex items-center py-3">
      <div class="flex justify-between w-full mx-3">
        <span class="font-normal">{{ address }}</span>
        <icon-park name="copy" size="1.4rem" @click="copy(address)"/>
      </div>
    </div>

    <div class="flex items-center">
      <h5 class="text-base font-semibold pr-1">{{ $t("bankCardRecharge.name") }}</h5>
      <van-icon name="arrow" size="1.1rem"/>
    </div>
    <div class="bg-white rounded-md mt-3 flex items-center py-3">
      <div class="flex justify-between w-full mx-3">
        <span class="font-normal">{{ name }}</span>
        <icon-park name="copy" size="1.4rem" @click="copy(name)"/>
      </div>
    </div>

    <div class="flex items-center">
      <h5 class="text-base font-semibold pr-1">{{ $t("bankCardRecharge.card") }}</h5>
      <van-icon name="arrow" size="1.1rem"/>
    </div>
    <div class="bg-white rounded-md mt-3 flex items-center py-3">
      <div class="flex justify-between w-full mx-3">
        <span class="font-normal">{{ account }}</span>
        <icon-park name="copy" size="1.4rem" @click="copy(account)"/>
      </div>
    </div>

    <div class="flex mt-3">
      <div>
        <icon-park name="info" size="1.4rem"/>
      </div>
      <div class="leading-">
        <span class="opacity-80">{{ $t("walletrecharge.title1") }} {{rechargeRate}} {{ $t("walletrecharge.title6") }}</span>
      </div>
    </div>

    <div class="flex mt-3">
      <div>
        <icon-park name="info" size="1.4rem"/>
      </div>
      <div class="leading-">
        <span class="opacity-80">{{ $t("walletrecharge.title12") }}</span>
      </div>
    </div>

    <div class="flex mt-3">
      <div>
        <icon-park name="info" size="1.4rem"/>
      </div>
      <div class="leading-">
        <span class="opacity-80">{{ $t("walletrecharge.title13") }}</span>
      </div>
    </div>

    <div class="flex mt-3">
      <div>
        <icon-park name="info" size="1.4rem"/>
      </div>
      <div class="leading-">
        <span class="opacity-80">{{ $t("walletrecharge.title14") }}</span>
      </div>
    </div>

    <div class="flex mt-3">
      <div>
        <icon-park name="info" size="1.4rem"/>
      </div>
      <div class="leading-">
        <span class="opacity-80">{{ $t("walletrecharge.title15") }}</span>
      </div>
    </div>
    <van-form @submit="onSubmit()">
      <h5 class="mt-3 text-base font-semibold">{{ $t("walletrecharge.number") }}</h5>
      <van-field class="bg-white w-full rounded-md mt-3 flex items-center py-3 px-3" @input="changePrice"
                 v-model="price1"
                 :placeholder="$t('walletrecharge.inputmoney')"
                 :rules="[{ required: true, message: $t('walletrecharge.inputmoney') },{ validator, message: $t('walletrecharge.nozero') }]"/>
      <div class="flex flex-col mt-3">
        <h5 class="text-base font-semibold pr-1">{{ $t("walletrecharge.rechargevoucher") }}</h5>
        <van-uploader
            ref="uploadRef"
            v-model="fileList"
            :show-upload="showUpload"
            :max-count="1"
            upload-icon="plus"
            :after-read="afterRead"
        />
      </div>
      <div class="pt-10">
        <van-button native-type="submit" round block color="#191919">{{ $t("walletrecharge.submit") }}</van-button>
      </div>
    </van-form>
  </main>
  <custom-floating-panel
      ref="floatingPanel"
      height="800px"
  >
    <div class="coins-container">
      <div class="title-row">
        {{ $t("walletrecharge.title2") }}
      </div>
      <div class="tip-row">
        {{ $t("walletrecharge.title3") }}
      </div>
      <van-space direction="vertical" size="1rem">
        <div
            class="coin-card"
            v-for="(item, index) in blockchaindata"
            :key="index"
            @click="change(item.network, item.blockchain, item.name, item.account)"
        >
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
