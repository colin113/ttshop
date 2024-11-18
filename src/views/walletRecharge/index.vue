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
const imgUrl = ref('')

const onClickLeft = () => {
  router.back();
};


const network1 = ref('');


const title = ref('');
const unit = ref('');
const address = ref('');
const orderNumberText = ref('');

const account = ref('');  // New addition for account
const blockchaindata = ref([]);

const getrechargedata = ref({
  type: 1,
});

const getBlockchaindata = async () => {
  const res = await getBlockchain(getrechargedata.value);
  blockchaindata.value = res.data;
  imgUrl.value = res.data.url;
  account.value = res.data.account;
  network1.value = res.data.network;

}
const rechargeRate = ref(0);
const rechargeFact = ref(0);
const uploadRef1 = ref(null);
const fileList1 = ref([]);
const showUpload1 = computed(() => {
  return !fileList1.value.length;
});
const rechargeImageUrl = ref("");

const afterRead1 = (file) => {
  // toast.loading({msg:'上传中...'})
  const formData1 = new FormData();
  formData1.append("file", file.file);
  loadingToast();
  upload(formData1).then((res) => {
    if (res.code === 1) {
      rechargeImageUrl.value = res.data.fullurl;
      showSuccessToast(res.msg);
    } else {
      showFailToast(res.msg);
    }
    closeToast();
  });
};

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
  bank_name: '',
  order: ''
});

const changePrice = (e) => {
  price1.value = Number(e.target.value);
  torechargedata.value.price = price1.value;
  rechargeFact.value = (price1.value / rechargeRate.value).toFixed(2);
}

const onSubmit = () => {

  if (rechargeImageUrl.value == "") {
    showFailToast(t("walletrecharge.uprechargevoucher"));
    return;
  }


  loadingToast();
  torechargedata.value.network = network1.value;
  torechargedata.value.blockchain = account.value;
  torechargedata.value.image = rechargeImageUrl.value;
  torechargedata.value.order = orderNumberText.value;

  console.log(torechargedata.value)
  recharge(torechargedata.value).then(res => {
    closeToast();
    if (res.code === 1) {
      showSuccessToast(res.msg);
    } else {
      showFailToast(res.msg);
    }
  })
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
    unit.value = t("walletrecharge.numbe")
  } else if (rechargeType.value == "2") {
    title.value = t("recharge.zfbDeposit")
    unit.value = t("walletrecharge.number")
  } else if (rechargeType.value == "1") {
    title.value = t("recharge.chainDeposit")
    unit.value = t("walletrecharge.number")
  }
})
</script>

<template>
  <header>
    <van-nav-bar :title=title :left-text="$t('goback')" left-arrow @click-left="onClickLeft">
      <template #right>
        <span @click="router.push('/rechargeRecord')" class="text-white">{{
            $t("walletrecharge.rechargerecord")
          }}</span>
      </template>
    </van-nav-bar>
  </header>
  <main class="mx-3">
    <img :src="imgUrl">

    <div class="flex items-center">
      <h5 class="text-base font-semibold pr-1">{{ $t("withdraw.blockchainAddress") }}</h5>
      <van-icon name="arrow" size="1.1rem"/>
    </div>
    <div class="bg-white rounded-md mt-3 flex items-center py-3">
      <div class="flex justify-between w-full mx-3">
        <span class="font-normal">{{ account }}</span>
        <icon-park name="copy" size="1.4rem" @click="copy(account)"/>
      </div>
    </div>

    <van-form @submit="onSubmit()">
      <h5 class="mt-3 text-base font-semibold">{{ unit }}</h5>
      <van-field class="bg-white w-full rounded-md mt-3 flex items-center py-3 px-3" @input="changePrice"
                 v-model="price1" :placeholder="$t('walletrecharge.inputmoney')"
                 :rules="[{ required: true, message: $t('walletrecharge.inputmoney') }, { validator, message: $t('walletrecharge.nozero') }]"/>

      <h5 class="mt-3 text-base font-semibold">{{ $t('walletrecharge.orderNumber') }}</h5>
      <van-field class="bg-white w-full rounded-md mt-3 flex items-center py-3 px-3" v-model="orderNumberText"
                 :placeholder="$t('walletrecharge.orderNumber')"
                 :rules="[{ required: true, message: $t('walletrecharge.orderNumber') }]"/>


      <h5 class="mt-3 text-base font-semibold">{{ $t("walletrecharge.uprechargevoucher") }}</h5>
      <div>
        <van-uploader ref="uploadRef1" v-model="fileList1" :after-read="afterRead1" :max-count="1"
                      :show-upload="showUpload1" upload-icon="plus">
          <template #preview-cover="{ file }">
          </template>
        </van-uploader>
      </div>
      <div class="pt-10">
        <van-button native-type="submit" round block color="#191919">{{ $t("walletrecharge.submit") }}</van-button>
      </div>
    </van-form>
  </main>

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
