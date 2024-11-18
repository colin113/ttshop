<script setup>
	import tabbers from "@/components/tabbar/index.vue";
	import {
		financing,
		financingList
	} from "@/api/index";
	import {
		useRouter
	} from "vue-router";
	import {
		useUserStore
	} from "@/store/modules/user.js";
	import {
		useI18n
	} from "vue-i18n";
	import {
		onMounted
	} from "vue";
	//多语言
	const {
		t
	} = useI18n();
	const router = useRouter();
	//仓库中获取商户信息请求函数
	const userStore = useUserStore();

	const data = ref();
	const getfinancing = async () => {
		const res = await financing();
		data.value = res.data;
	};
	const dataList = ref();
	const getfinancingList = async () => {
		const res = await financingList();
		dataList.value = res.data;
	};

	onMounted(() => {
		getfinancing();
		getfinancingList();
	});

	const toBuy = (e) => {
		const item = JSON.stringify(e);
		router.push({
			name: "buy",
			query: {
				item: item
			}
		});
	};
</script>

<template>
	<div class="text-center text-[16px] font-semibold py-[15px] bg-white">
		{{ $t("tabbar.financialManagement") }}
	</div>
	<div class="bg-white mx-3 mt-[10px] rounded-md back_4 pt-[32px] pb-[39px] px-[52px]">
		<div class="flex items-center justify-center text-[#191919]/60">
			<img src="@/assets/icons/balance.svg" alt="" />
			<span class="ml-[5px] leading-none">{{
        $t("financialManagement.totalAmountOfFinancing")
      }}</span>
		</div>
		<div @click="router.push('/holdingAssets')" class="flex items-center justify-center mt-[8px] mb-[30px]">
			<span class="font-semibold text-[20px] mr-[4px]">{{
        data?.total_balance
      }}</span>
			<van-icon name="arrow" size="14px" class="text-[#191919]/60" />
		</div>
		<div class="flex">
			<div class="w-[50%] border border-white border-r-slate-100 text-center">
				<div class="text-[#191919]/60 text-[12px]">
					{{ $t("financialManagement.yesterdayEarnings") }}
				</div>
				<div class="text-[#FE4857] font-medium">
					{{ data?.yesterday_money }}
				</div>
			</div>
			<div class="w-[50%] text-center">
				<div @click="
            router.push(
              `/incomeBreakdown?total_money=${data.total_money}&yesterday_money=${data.yesterday_money}`
            )
          " class="flex items-center justify-center">
					<span class="text-[#191919]/60 text-[12px]">{{
            $t("financialManagement.accumulatedEarnings")
          }}</span>
					<van-icon name="arrow" size="12px" class="text-[#191919]/60" />
				</div>
				<div class="font-medium">{{ data?.total_money }}</div>
			</div>
		</div>
		<div class="flex justify-between mt-[24px]">
			<div @click="router.push('/transferOut')"
				class="bg-[#F2F2F2] rounded-md py-[14px] px-[14px] w-[50%] mr-[20px] text-center">
				<span>{{ $t("financialManagement.transferOut") }}</span>
			</div>
			<div @click="router.push('/transferIn')"
				class="bg-black rounded-md py-[14px] px-[14px] w-[50%] text-center">
				<span class="text-white">{{
          $t("financialManagement.transferIn")
        }}</span>
			</div>
		</div>
	</div>
	<!-- <div class="mx-3 mt-[20px] mb-[6px] font-semibold">
    {{ $t("financialManagement.currentFinancing") }}
  </div>
  <div class="bg-white mx-3 rounded-md back_4 p-[16px]">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="w-[94px] font-medium text-[#FE4857] text-[18px]">
          123
        </div>
        <span>{{
          $t("financialManagement.instantTransferInstantReceipt")
        }}</span>
      </div>
      <div
        @click="router.push('/buy?type=1')"
        class="bg-black rounded-md py-[4px] px-[14px]"
      >
        <span class="text-white">{{ $t("financialManagement.buy") }}</span>
      </div>
    </div>
  </div> -->
	<div class="mx-3 mt-[20px] mb-[6px] font-semibold">
		{{ $t("financialManagement.regularFinancialManagement") }}
	</div>
	<div class="bg-white mx-3 rounded-md back_4 px-[16px] pb-[16px]">
		<div v-for="item in dataList" :key="item.id"
			class="flex items-center justify-between py-[16px] border border-white border-b-slate-100">
			<div class="flex items-center">
				<div class="w-[94px] font-medium text-[#FE4857] text-[18px]">
					+{{ item.interest_rate }}%
				</div>
				<span>{{ item.title }}</span>
			</div>
			<div @click="toBuy(item)" class="bg-black rounded-md py-[4px] px-[14px]">
				<span class="text-white">{{ $t("financialManagement.buy") }}</span>
			</div>
		</div>
	</div>
	<tabbers></tabbers>
</template>

<style scoped lang="scss"></style>