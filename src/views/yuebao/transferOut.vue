<script setup>
import { financingTransfer, getMerInfo } from "@/api/index";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { showFailToast, showSuccessToast } from "vant";
import { useUserStore } from "@/store/modules/user.js";
import { onMounted } from "vue";
//多语言
const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const onClickLeft = () => {
  router.back();
};

// 参数
const queryParams = ref({
  type: "out",
  balance: null,
});
// 提交
const submit = async () => {
  if (!queryParams.value.balance)
    return showFailToast(t("withdraw.enterAmount"));
  const res = await financingTransfer(queryParams.value);
  if (res.code === 1) {
    showToast(t("financialManagement.transferOutSuccess"));
  } else {
    showToast(res.msg);
  }
  userStore.toGetMerInfo();
};

onMounted(() => {
  userStore.toGetMerInfo();
});
</script>

<template>
  <van-nav-bar
    :title="$t('financialManagement.transferOut')"
    left-arrow
    @click-left="onClickLeft"
    class="mb-[16px]"
  ></van-nav-bar>

  <div class="flex items-center mx-[16px] mt-[29px] mb-[32px]">
    <span class="mr-[24px]">{{
      $t("financialManagement.incomingAccount")
    }}</span>
    <img src="@/assets/icons/转出.png" alt="" />
    <span class="ml-[8px] leading-none">{{
      $t("tabbar.financialManagement")
    }}</span>
  </div>
  <div
    class="bg-white rounded-[20px] px-[16px] pt-[26px]"
    style="
      box-shadow: 0px -3px 10px 0px rgba(0, 0, 0, 0.1);
      height: calc(100dvh - 180px);
    "
  >
    <div>{{ $t("financialManagement.transferOutAmount") }}</div>
    <div
      class="pt-[24px] pb-[6px]"
      style="border-bottom: 1px solid rgba(25, 25, 25, 0.1)"
    >
      <van-field
        v-model="queryParams.balance"
        type="number"
        :placeholder="t('withdraw.enterAmount')"
      />
    </div>
    <div class="mt-[14px]">
      <span class="text-[#191919]/60 text-[12px] mr-[16px]"
        >{{ $t("financialManagement.changePassBalance") }}：{{
          userStore.MerInfo.financing
        }}</span
      >
      <span class="text-[12px]">{{
        $t("financialManagement.rollOutAll")
      }}</span>
    </div>
    <div
      @click="submit"
      class="text-center mx-auto mt-[150px] mb-[10px] text-[16px] text-white bg-black rounded-md py-[10px] w-[188px]"
    >
      {{ $t("withdraw.submit") }}
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
</style>
