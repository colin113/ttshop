<script setup>
	import {
		buyTrainBill
	} from "@/api/index.js";
	import img from '@/assets/image/buyTrainBill/404-no-order.png'
	const router = useRouter();
	const onClickLeft = () => {
		router.back();
	};
	//请求数据
	const query = ref({
		page: '1',
		limit: '8'
	})
	//充值记录列表
	const List = ref([])
	//请求函数

	//滚动加载
	const loading = ref(false);
	const finished = ref(false);
	const onload = () => {
		buyTrainBill(query.value).then(res => {
			loading.value = false
			let number = parseInt(query.value.page);
			number++;
			query.value.page = number.toString();
			if (res.data.list.length <= 0) {
				finished.value = true;
			}
			if (res.data.list.length < query.value.limit) {
				finished.value = true;
			}
			List.value.push(...res.data.list)
			console.log(List.value)
		})
	}

	onMounted(() => {
		onload()
	})
</script>

<template>

	<header>
		<van-nav-bar :title="$t('buyTrainBill.record')" :left-text="$t('goback')" left-arrow fixed placeholder
			@click-left="onClickLeft" />
	</header>
	<main class="mt-5 mx-3">
		<div v-if="List.length<=0">
			<van-empty :description="$t('buyTrainBill.empty')" :image="img" image-size="17rem">
			</van-empty>
		</div>
		<van-list v-model:loading="loading" :finished="finished"
			:finished-text="(List.length>0)? $t('buyTrainBill.nomore'):''" @load="onload()" :immediate-check="false">
			<div class="bg-white mx-3 mt-4  rounded-md back_4 p-2" style="line-height: 2rem;" v-for="item in List "
				:key="item.recharge_id">
				<div class="flex justify-between mx-3 ">
					<div class="">{{ $t("buyTrainBill.type") }}</div>
					<div class="flex items-center">
						<span>{{item.train.name}}</span>
						<img src="@/assets/image/buyTrainBill/vip.png" class="ml-1.5 w-[1.2rem] h-[1.2rem]" alt="" />
					</div>
				</div>
				<div class="flex justify-between mx-3">
					<div class="">{{ $t("buyTrainBill.time") }}</div>
					<div class="flex items-center">
						<span>{{ item.createtime }}</span>
					</div>
				</div>
				<div class="flex justify-between mx-3">
					<div class="">{{ $t("buyTrainBill.money") }}</div>
					<div class="flex items-center">
						<span style="color: #009996;">{{item.money}}</span>
					</div>
				</div>
				<!--        <div class="flex justify-between mx-3 py-1.5">-->
				<!--          <div class="text-gray-500">支付状态</div>-->
				<!--          <div class="flex items-center">-->
				<!--            <span class="text-green-500">{{item.paid===1?'已支付':'待支付'}}</span>-->
				<!--          </div>-->
				<!--        </div>-->
			</div>
		</van-list>
	</main>
</template>

<style scoped lang="scss">
	:deep(.van-nav-bar) {
		background-color: #009996 !important;
	}
</style>