<script setup>
import { financingIn } from "@/api/index";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/store/modules/user.js";
import { showFailToast, showToast } from "vant";
import { onMounted } from "vue";
const userStore = useUserStore();
//多语言
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const onClickLeft = () => {
  router.back();
};

const item = ref();
const getItem = () => {
  item.value = JSON.parse(route.query.item);
  console.log(item.value);
};
onMounted(() => {
  getItem();
});

const checked = ref(false);
const queryParams = ref({
  pid: null,
  balance: null,
});

const submit = async () => {
  if (!queryParams.value.balance)
    return showFailToast(t("withdraw.enterAmount"));
  if (!checked.value) return showFailToast(t("Please check the agreement"));
  queryParams.value.pid = item.value.id;
  const res = await financingIn(queryParams.value);
  if (res.code === 1) {
    showToast(t("financialManagement.buySuccess"));
  } else {
    showToast(res.msg);
  }
  userStore.toGetMerInfo();
  router.back();
};

onMounted(() => {
  userStore.toGetMerInfo();
});
</script>

<template>
  <van-nav-bar
    :title="$t('financialManagement.buy')"
    left-arrow
    @click-left="onClickLeft"
  >
  </van-nav-bar>
  <div class="bgi text-[20px] pl-[57px]">
    {{ $t("financialManagement.revenueEnhancement") }}{{ item?.interest_rate }}%
  </div>
  <div
    class="bg-white rounded-[20px] px-[16px] pt-[20px] pb-[40px]"
    style="
      box-shadow: 0px -3px 10px 0px rgba(0, 0, 0, 0.1);
      height: calc(100dvh - 238px);
    "
  >
    <div>{{ $t("financialManagement.purchaseAmount") }}</div>
    <div
      class="pt-[29px] pb-[21px] flex items-center"
      style="border-bottom: 1px solid rgba(25, 25, 25, 0.1)"
    >
      <img src="@/assets/icons/输入金额.svg" class="mr-[5px]" alt="" />
      <van-field
        v-model="queryParams.balance"
        type="number"
        :placeholder="t('withdraw.enterAmount')"
      />
    </div>
    <div class="my-[8px] text-[#191919]/60 text-[10px]">
      {{ $t("financialManagement.yieldsDailyAt") }}
    </div>
    <div class="text-[10px] text-[#0b57d0]">
      {{ $t("financialManagement.availableAmount") }}：{{
        userStore.MerInfo.financing
      }}
    </div>
    <div class="text-center">
      <div
        @click="submit"
        class="mx-auto mt-[44px] mb-[10px] text-[16px] text-white bg-black rounded-md py-[10px] w-[188px]"
      >
        {{ $t("withdraw.submit") }}
      </div>
      <div class="inline-block mx-auto">
        <van-checkbox v-model="checked" icon-size="14" checked-color="#000">
          <span class="text-[12px]">{{
            $t("financialManagement.agreeServiceAndRisk")
          }}</span>
        </van-checkbox>
      </div>
      <div class="text-[#000]/30 text-[10px] mt-[3px]">
        {{ $t("financialManagement.marketAndRiskCaution") }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-cell) {
  padding: 0;
}
:deep(input) {
  font-size: 20px;
}
.bgi {
  background-image: url("@/assets/image/转入背景.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 238px;
  height: 238px;
  margin: 77px auto 0 auto;
}
</style>
