<script setup>
	import {
		finance,
		fundsRecords,
		productManagement
	} from "@/api/index.js";

	const router = useRouter();

	const onClickLeft = () => history.back();
	import {
		useI18n
	} from 'vue-i18n';
	//多语言
	const {
		t
	} = useI18n();

	//弹出选择层
	const show = ref(false);
	//选择层选项
	const actions = [{
			name: t("finance.all")
		},
		{
			name: t("finance.yesterday")
		},
		{
			name: t("finance.today")
		},
		{
			name: t("finance.week")
		},
		{
			name: t("finance.month")
		}
	];
	//定义选项和发送请求数据
	const selects = ref("");
	const financeQuery = ref({
		range: 'all',
		page: '1',
		limit: '10'
	});

	//定义加载中提示
	const show1 = showLoadingToast({
		message: t("finance.loading"),
		forbidClick: true,
		duration: 0
	});

	//点击选项函数
	const onSelect = (item) => {
		// 默认情况下点击选项时不会自动收起
		// 可以通过 close-on-click-action 属性开启自动收起
		// console.log(item)
		selects.value = item.name;
		// console.log(selects.value);
		show.value = false;
		// showToast(item.name);
		if (selects.value === t("finance.today")) {
			financeQuery.value.range = "today"
		} else if (selects.value === t("finance.yesterday")) {
			financeQuery.value.range = "yesterday"
		} else if (selects.value === t("finance.week")) {
			financeQuery.value.range = "week"
		} else if (selects.value === t("finance.month")) {
			financeQuery.value.range = "month"
		} else {
			financeQuery.value.range = "all"
		}
		show1.open();
		orderList.value = [];
		financeQuery.value.page = '1';
		finished.value = false;
		loading.value = true;
		onload()
	}
	//列表下拉刷新
	const loading = ref(false);
	const finished = ref(false);
	const price = ref('')
	const allprofit = ref('')
	const orderList = ref([]);
	const onload = () => {
		finance(financeQuery.value).then(res => {
			show1.close();
			let number = parseInt(financeQuery.value.page);
			number++;
			financeQuery.value.page = number.toString();
			console.log(orderList.value);
			price.value = res.data.total_unreceived
			allprofit.value = res.data.all_profit
			if (res.data.report.length <= 0) {
				// console.log('结束');
				finished.value = true;
			} else {
				orderList.value.push(...res.data.report);
				loading.value = false;
			}

		});
	};

	//打开选择层
	const openshow = () => {
		console.log(111);
		show.value = true;
	};
	//首屏加载全部
	onMounted(() => {
		onload(financeQuery.value)
	})
</script>

<template>
	<div class="bg"></div>
	<header>
		<van-nav-bar :title="$t('finance.finance')" left-text="" :border="false" left-arrow @click-left="onClickLeft">
			<template #right>
				<div @click="openshow" class="text-[#fff]">{{ $t("finance.history") }}</div>
				<!-- <van-icon color="#FFFFFF" @click="openshow" size="22px" name="todo-list" /> -->
			</template>
		</van-nav-bar>
	</header>
	<main>
		<!--收益数据-->

		<div class="grid grid-flow-row grid-cols-2 gap-5 mx-5 mt-10">
			<div class=" back_4 h-[8rem] p-5 rounded-md flex flex-col justify-between bg-[#FFE4E1] ">
				<div>
					<span class=" ">{{ $t("finance.awaitmomey") }}</span>
				</div>
				<div class="">
					<span class="font-semibold text-[#FE4938]"
						style="font-family: Poppins;font-size: 1.8rem;">${{ price }}</span>
				</div>
			</div>
			<div class=" back_4 h-[8rem] p-5 rounded-md flex flex-col justify-between bg-[#E5F4F4]">
				<div>
					<span class="">{{ $t("finance.totalprofit") }}</span>
				</div>
				<div class="">
					<span class="font-semibold text-[#009996]"
						style="font-family: Poppins;font-size: 1.8rem;">${{ allprofit}}</span>
				</div>
			</div>
		</div>
		<div v-if="orderList.length<=0">
			<van-empty />
		</div>
		<van-list v-model:loading="loading" class="mt-10" :finished="finished" :finished-text="$t('finance.nomore')"
			@load="onload()" :immediate-check="false">
			<div class="bg-white mx-5 py-6 mt-3 rounded-md back_4" v-for="item in orderList">
				<div class="mx-3 mr-6 grid grid-flow-row grid-cols-3 gap-5">
					<!--总订单-->
					<div class="flex flex-col items-center justify-between h-[3rem] ">
						<div>
							<span>{{ item.total_order }}</span>
						</div>
						<div>
							<span class="ml-3">{{ $t("finance.totalorder") }}</span>
						</div>
					</div>
					<!--取消订单-->
					<div class="flex flex-col items-center justify-between h-[3rem]">
						<div>
							<span>{{ item.cancel_order }}</span>
						</div>
						<div>
							<span class="ml-3">{{ $t("finance.cancel_order") }}</span>
						</div>
					</div>
					<!--退款订单-->
					<div class="flex flex-col items-center justify-between h-[3rem]">
						<div>
							<span>{{ item.refund_order }}</span>
						</div>
						<div>
							<span class="ml-3">{{ $t("finance.refund_order") }}</span>
						</div>
					</div>
				</div>
				<!--日期-->
				<div class="flex items-center mt-6 pt-3 mx-3 mr-6 border-t px-5">
					<!-- <span class="ml-3">{{ $t("finance.data") }}</span> -->
					<span style="font-family: Poppins, Poppins;
font-weight: 500;
font-size: 10px;
color: #888888;">{{ item.date }}</span>
					<div class="ml-auto mr-3 text-[#FE4938]"><span class="text-[#888888]">{{ $t("finance.profit") }} $
						</span>
						{{ item.total_profit }}
					</div>
				</div>

			</div>
		</van-list>
	</main>
	<!--弹出层-->
	<van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>

<style scoped lang="scss">
	:deep(.van-nav-bar) {
		background-color: transparent !important;
	}

	.bg {
		width: 100%;
		height: 268px;
		background: linear-gradient(180deg, #40A295 0%, #069895 35%, #F8F8F8);
		border-radius: 0px 0px 0px 0px;
		position: absolute;
		top: 0;
		z-index: -1;
	}
</style>