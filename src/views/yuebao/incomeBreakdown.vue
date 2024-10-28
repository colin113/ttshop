<script setup>
import { financingLog } from "@/api/index";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
//多语言
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

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
  const res = await financingLog();
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
</script>

<template>
  <van-nav-bar
    :title="$t('financialManagement.incomeBreakdown')"
    left-arrow
    @click-left="onClickLeft"
  >
  </van-nav-bar>
  <div class="bg-white mx-3 rounded-md back_4 py-[30px] text-center mt-3">
    <div class="text-[#191919]/60">
      {{ $t("financialManagement.accumulatedEarnings") }}
    </div>
    <div class="font-semibold text-[18px] pt-[5px] pb-[10px]">
      {{ route.query.total_money }}
    </div>
    <div class="text-[#191919]/60 text-[12px]">
      {{ $t("financialManagement.yesterdayEarnings")
      }}{{ route.query.yesterday_money }}
    </div>
  </div>
  <div class="mx-3 mt-[20px] mb-[6px] text-[#191919]/60">
    <span class="mr-[20px] font-semibold text-[#000]">{{
      $t("financialManagement.regularFinancialManagement")
    }}</span>
    <!-- <span
      @click="queryParams.type = 1"
      :class="queryParams.type === 1 ? 'font-semibold text-[#000]' : ''"
      >{{ $t("financialManagement.currentFinancing") }}</span
    > -->
  </div>
  <!-- 列表 -->
  <div
    style="max-height: 500px; overflow: scroll"
    class="bg-white mx-3 rounded-md back_4"
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
            class="flex items-center justify-between px-[16px] py-[16px] border border-white border-b-slate-100"
          >
            <div>{{item.createtime}}</div>
            <div>{{item.money}}</div>
          </div>
        </div>
        <van-empty
          v-else
          :description="$t('rechargerecord.noRecords')"
        ></van-empty>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss"></style>
