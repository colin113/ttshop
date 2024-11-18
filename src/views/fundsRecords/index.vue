<script setup>
	import {
		fundsRecords,
		productManagement,
		buyTrainBill
	} from "@/api/index.js";

	const router = useRouter();
	import {
		useI18n
	} from 'vue-i18n';
	//多语言
	const {
		t
	} = useI18n();
	//返回
	const onClickLeft = () => {
		router.back();
	};
	//弹出选择层
	const show = ref(false);
	const actions = [{
			name: t("fundsRecords.all")
		},
		{
			name: t("fundsRecords.redcord1")
		},
		{
			name: t("fundsRecords.redcord2")
		},
		{
			name: t("fundsRecords.redcord3")
		},
		{
			name: t("fundsRecords.redcord4")
		}
	];
	//打开选择层
	const openshow = () => {
		show.value = true;
	};

	//点击选项函数
	const selects = ref("");
	const onSelect = (item) => {
		// 默认情况下点击选项时不会自动收起
		// 可以通过 close-on-click-action 属性开启自动收起
		console.log(item)
		selects.value = item.name;
		console.log(selects.value);
		show.value = false;
		showToast(item.name);
		if (selects.value === t("fundsRecords.redcord4")) {
			isFundsRecords.value = false
			isBuyTrainBill.value = true
		} else {
			isBuyTrainBill.value = false
			isFundsRecords.value = true
			if (selects.value === t("fundsRecords.redcord1")) {
				fundsQuery.value.type = "recharge"
			} else if (selects.value === t("fundsRecords.redcord2")) {
				fundsQuery.value.type = "extract"
			} else if (selects.value === t("fundsRecords.redcord3")) {
				fundsQuery.value.type = "order"
			} else {
				isBuyTrainBill.value = true
				isFundsRecords.value = true
				fundsQuery.value.type = "all"
			}
		}

		orderList.value = [];
		fundsQuery.value.page = '1';
		fundsQuery2.value.page = '1';
		finished.value = false;
		loading.value = true;
		onload()
	};

	//定义选项和发送请求数据
	const fundsQuery = ref({
		type: 'all',
		page: '1',
		limit: '10'
	});
	const fundsQuery2 = ref({
		page: '1',
		limit: '10'
	});
	//发送请求获取列表
	const orderList = ref([]);

	//加载列表
	const loading = ref(false);
	const finished = ref(false);
	const isFundsRecords = ref(true)
	const isBuyTrainBill = ref(true)
	const onload = () => {
		Promise.allSettled([fundsRecords(fundsQuery.value), buyTrainBill(fundsQuery2.value)]).then(res => {
			console.log(res);
			loading.value = false
			let number = parseInt(fundsQuery.value.page);
			number++;
			fundsQuery.value.page = number.toString();
			fundsQuery2.value.page = number.toString();

			if (isFundsRecords.value) {
				if (res[0].value.data.list.length <= 0) {
					isFundsRecords.value = false
				} else {
					orderList.value.push(...res[0].value.data.list)
				}
			}
			if (isBuyTrainBill.value) {
				if (res[1].value.data.list.length <= 0) {
					isBuyTrainBill.value = false
				} else {
					orderList.value.push(...res[1].value.data.list)
				}
			}
			orderList.value.sort((b, a) => a.createtime.localeCompare(b.createtime) || a.createtime
				.localeCompare(b
					.createtime));

			console.log(orderList.value);
			if (!isFundsRecords.value && !isBuyTrainBill.value) {
				finished.value = true;
			}
		})
		// fundsRecords(fundsQuery.value).then(res => {
		// 	loading.value = false
		// 	let number = parseInt(fundsQuery.value.page);
		// 	console.log(res.data)
		// 	number++;
		// 	fundsQuery.value.page = number.toString();
		// 	if (res.data.list.length <= 0) {
		// 		finished.value = true;
		// 	} else {
		// 		orderList.value.push(...res.data.list)
		// 	}
		// })
		// buyTrainBill(fundsQuery.value).then(res => {

		// })
	}

	//加载提示
	// showLoadingToast({
	//   message: '加载中...',
	//   forbidClick: true,
	// });
	// onBeforeMount(()=>{
	//   showLoadingToast()
	// })
	onMounted(() => {
		onload()
	})

	import img from '@/assets/image/refundRequest/404-no-order.png'
</script>

<template>
	<header class="sticky top-0 z-10 w-dvw back_4">
		<van-nav-bar :title="$t('fundsRecords.fundsRecords')" left-text="" left-arrow @click-left="onClickLeft">
			<template #right>
				<van-icon color="#FFFFFF" @click="openshow" size="22px" name="todo-list" />
			</template>
		</van-nav-bar>
	</header>
	<main class="mx-3 mt-2">
		<div v-if="orderList.length<=0">
			<van-empty :description="$t('fundsRecords.norecord')" :image="img" image-size="17rem" />
		</div>
		<van-list v-model:loading="loading" :finished="finished" :finished-text="$t('fundsRecords.nomore')"
			@load="onload()" :immediate-check="false">
			<div class="bg-white rounded-md flex mb-3 h-[7rem]" style="box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);"
				v-for="item in orderList" :key="item.id">
				<div class="flex justify-center py-5 mx-3 w-[5rem]">
					<!-- <icon-park name="finance" size="2.5rem"/> -->
					<img src="@/assets/image/ic_money2.png" style="height: 3rem;width: 3rem;">
				</div>
				<div class="flex-auto flex flex-col justify-between py-5" style="width: calc(65% - 3rem);height: 100%;">
					<div class="text-base w-[100%]"
						style="font-weight: 400;word-break: break-all;height: 3rem;text-overflow: ellipsis;-webkit-line-clamp:2;display: -webkit-box;-webkit-box-orient: vertical;overflow: hidden;">
						{{ item.title||item.memo }}
					</div>
					<span class="text-sm opacity-80">
						{{ item.createtime }}
					</span>
				</div>
				<div class="p-3 py-5 mr-2 flex flex-col justify-between items-end" style="width: 35%;height: 100%;">
					<div class="flex justify-end items-center ml-3 h-[50%]">
						<span v-if="item.pm===1" class="text-[#FE4938]"
							style="font-family: Poppins;font-weight: 800;">+</span>
						<span v-if="item.pm===0" style="font-family: Poppins;font-weight: 800;color: #009996;">-</span>
						<!-- <icon-park color="#FE4857" name="plus" size="1.6rem" v-if="item.pm===1" /> -->
						<!-- <van-icon name="minus" v-if="item.pm===0" color="green" /> -->
						<span class="text-base font-medium"
							style="font-family: Poppins;font-weight: 800;font-size: 1rem;"
							:style="{ color: item.pm === 1 ? '#FE4938' : '#009996'}">
							${{item.money}}
						</span>
					</div>
					<div class="flex">
						<span class="text-xs">{{ $t("fundsRecords.money") }}</span>
						<span class="text-xs" :style="{ color: item.pm === 1 ? '#FE4938' : '#009996'}">
							${{ item.after }}</span>
					</div>
				</div>
			</div>
		</van-list>
	</main>
	<van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>
<style lang="scss" scoped>
	:deep(.van-nav-bar) {
		background-color: #009996 !important;
	}
</style>