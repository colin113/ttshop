<script setup>
	import {
		useRoute,
		useRouter
	} from "vue-router";
	import {
		orderDetail,
		productDetail
	} from "@/api/index.js";
	import {
		useI18n
	} from 'vue-i18n';
	//多语言
	const {
		t
	} = useI18n();
	const route = useRoute()

	const onClickLeft = () => history.back();

	//请求参数
	const product_id = ref({
		product_id: "",
	})
	//详情数据
	const detailData = ref({})
	//传递路由参数
	product_id.value.product_id = route.query.product_id
	// console.log(product_id.value)
	//获取请求数据
	const getproductDetail = async () => {
		const res = await productDetail(product_id.value)
		detailData.value = res.data
		console.log(detailData.value)
	}

	onBeforeMount(() => {
		getproductDetail()
	})
</script>

<template>
	<div class="w-[100vw] h-[100vh] bg-white fixed" style="z-index: -2;"></div>
	<div class="bg">
		<img src="@/assets/image/BG.png">
	</div>
	<header>
		<van-nav-bar :title="$t('goodsDetail.Detail')" fixed placeholder :border="false" :left-text="$t('goback')"
			left-arrow @click-left="onClickLeft" />
	</header>
	<main class="mx-3 mt-10">
		<div class="mx-3">
			<div class="bg-white p-4 rounded-md flex" style="box-shadow: 0px 30px 50px -20px rgba(0,153,150,0.3);">
				<div class="w-[7rem]">
					<van-image class="" width="7rem" height="7rem" fit="cover" radius="10px" lazy-load
						:src="detailData.image" />
				</div>
				<div class="flex flex-col justify-center pl-3">
					<div class="flex-initial leading-5">
						<span class="">{{detailData.title}}</span>
					</div>
					<div class="flex-auto  mt-3">
						<span class="text-neutral-500 text-sm text-[#939393]">{{ $t("goodsDetail.look") }}</span>
						<span class="font-semibold text-sm text-[#939393] ml-0.5">{{ detailData.look }}</span>

						<span class="text-neutral-500 text-sm pl-6 text-[#939393]">
							{{ $t("goodsDetail.sales") }}
						</span>
						<span class="font-semibold text-sm text-[#939393]"> ${{detailData.sales_price }}</span>
					</div>
					<div class="antialiased mt-3">
						<span class="text-[#939393] text-sm">{{ $t("goodsDetail.profit1") }}</span>
						<span class="text-[#EB4E3D] ml-0.5 text-sm"> ${{detailData.profit}}</span>

					</div>
				</div>
			</div>
		</div>
		<div class="mx-3 mt-8 rounded-md">
			<div class="flex justify-between items-center px-5 py-3 bg-[#F2FAFA] mt-3 h-[3.5rem] rounded">
				<span class="">{{ $t("goodsDetail.sales") }}</span>
				<span>{{ detailData.sales_price }}</span>
			</div>
			<!--      <div class="flex justify-between items-center px-3 py-3">-->
			<!--        <span class="text-gray-500">成本价</span>-->
			<!--        <span>{{ detailData.cost_price }}</span>-->
			<!--      </div>-->
			<div class="flex justify-between items-center px-5 py-3 bg-[#F2FAFA] mt-3 h-[3.5rem] rounded">
				<span class="">{{ $t("goodsDetail.profit2") }}</span>
				<span class="text-red-600">{{ detailData.profit }}</span>
			</div>
			<div class="flex justify-between items-center px-5 py-3 bg-[#F2FAFA] mt-3 h-[3.5rem] rounded">
				<span class="">{{ $t("goodsDetail.looks") }}</span>
				<span>{{ detailData.look }}</span>
			</div>

			<div class="flex justify-between items-center px-5 py-3 bg-[#F2FAFA] mt-3 h-[3.5rem] rounded">
				<span class="">{{ $t("goodsDetail.stock") }}</span>
				<span>{{detailData.stock}}</span>
			</div>
			<div class="flex justify-between items-center px-5 py-3 bg-[#F2FAFA] mt-3 h-[3.5rem] rounded">
				<span class="">{{ $t("goodsDetail.title") }}</span>
				<span>100</span>
			</div>
		</div>
		<div v-html="detailData.content" class="content" style="padding:20px;width:100vw;word-break: break-all;"></div>
	</main>
</template>

<style scoped lang="scss">
	body {
		background-color: #fff;
	}

	:deep(.van-nav-bar) {
		background-color: #009996 !important;
	}

	// :deep(.van-nav-bar__title),
	// :deep(.van-nav-bar__left .van-icon),
	// :deep(.van-nav-bar__text) {
	// 	color: #141A52 !important;
	// }

	.bg {
		width: 100%;
		height: 268px;
		background: linear-gradient(180deg, #40A295 0%, #069895 35%, #fff);
		border-radius: 0px 0px 0px 0px;
		position: absolute;
		top: -2rem;
		z-index: -1;
	}

	* {
		font-family: Poppins !important;
	}

	.content {
		:deep(img) {
			width: 100vw !important;
		}
	}
</style>