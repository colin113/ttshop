<script setup>
import { financingOrder, financingOut } from "@/api/index";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { showConfirmDialog } from "vant";

//多语言
const { t } = useI18n();
const router = useRouter();

const onClickLeft = () => {
  router.back();
};

// 参数
const queryParams = ref({
  limit: 20,
  page: 1,
});
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

// 请求
const toGetListData = async () => {
  const res = await financingOrder(queryParams.value);
  list.value.push(...res.data.list);
  queryParams.value.page++;
  if (res.data.list.length === 0 || list.value.length >= res.data.count) {
    finished.value = true;
  }
};
// 加载
const onLoad = async () => {
  if (refreshing.value) {
    queryParams.value.page = 1;
    list.value = [];
    refreshing.value = false;
  }
  await toGetListData();
  loading.value = false;
};
// 刷新
const onRefresh = () => {
  finished.value = false;
  loading.value = true;
  onLoad();
};

// 卖出
const saleQuery = ref({
  id: null,
  balance: null,
});
const show = ref(false);
const sale = (e) => {
  saleQuery.value = {
    id: e.id,
    balance: e.total_balance,
  };
  show.value = true;
};
const confirmSale = async () => {
  const res = await financingOut(saleQuery.value);
  if (res.code === 1) {
    showToast(t("financialManagement.sellSuccess"));
  } else {
    showToast(res.msg);
  }
  show.value = false;
};
</script>

<template>
  <van-nav-bar
    :title="$t('financialManagement.holdingAssets')"
    left-arrow
    @click-left="onClickLeft"
    class="mb-[16px]"
  ></van-nav-bar>
  <!-- 列表 -->
  <div
    style="max-height: calc(100dvh - 150px); overflow: scroll"
    class="mb-[20px]"
  >
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :loosing-text="t('refresh')">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="list.length ? $t('distribution.nomore') : ''"
        @load="onLoad"
      >
        <div v-if="list.length">
          <div
            v-for="item in list"
            :key="item.id"
            class="bg-white mx-[10px] mb-[16px] p-[16px] rounded-lg"
            style="box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.05)"
          >
            <div class="mb-[16px] flex justify-between items-center">
              <div class="flex items-center">
                <span>{{ item.product.title }}</span>
                <span
                  class="ml-[11px] mr-[13px] text-[10px] bg-[#EEFAF5] text-[#2DBD85] px-[4px] py-[2px]"
                  >{{ item.product.day
                  }}{{ $t("financialManagement.days") }}</span
                >
                <span class="text-[10px] text-[#EA3943]"
                  >{{ $t("financialManagement.residue") }}{{ item.day
                  }}{{ $t("financialManagement.days") }}</span
                >
              </div>
              <div
                @click="sale(item)"
                class="bg-black rounded-md py-[4px] px-[14px]"
              >
                <span class="text-white">{{
                  $t("financialManagement.sale")
                }}</span>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                <div class="text-[#191919]/60 text-[12px]">
                  {{ $t("financialManagement.amountHeld") }}
                </div>
                <div>{{ item.total_balance }}</div>
              </div>
              <div>
                <div class="text-[#191919]/60 text-[12px]">
                  {{ $t("financialManagement.positionGain") }}
                </div>
                <div>{{ item.income }}</div>
              </div>
              <div>
                <div class="text-[#191919]/60 text-[12px]">
                  {{ $t("financialManagement.yesterdayEarnings") }}
                </div>
                <div>{{ item.yesterday_income }}</div>
              </div>
              <div>
                <div class="text-[#191919]/60 text-[12px]">
                  {{ $t("financialManagement.deadline") }}
                </div>
                <div>{{ item.end_time }}</div>
              </div>
            </div>
          </div>
        </div>
        <van-empty
          v-else
          :description="$t('rechargerecord.noRecords')"
        ></van-empty>
      </van-list>
    </van-pull-refresh>
  </div>
  <!-- 卖出 -->
  <van-popup
    v-model:show="show"
    class="pt-[60px] pb-[30px] px-[40px] w-[80%] rounded-lg"
  >
    <div class="text-center mb-[20px] text-[16px]">
      {{ t("financialManagement.areYouSureToSell") }}
    </div>
    <div class="flex text-center">
      <div
        @click="show = false"
        class="w-[50%] rounded-lg mr-[20px] py-[10px] bg-[#ccc] text-black"
      >
        {{ t("my.cancel") }}
      </div>
      <div
        @click="confirmSale"
        class="w-[50%] rounded-lg py-[10px] bg-black text-white"
      >
        {{ t("my.confirm") }}
      </div>
    </div>
  </van-popup>
</template>

<style scoped lang="scss"></style>
