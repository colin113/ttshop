<script setup>
	import {
		useTheme
	} from "@/utils/useTheme.js";
	import tabbers from '@/components/tabbar/index.vue';
	import {
		hotProduct
	} from '@/api/index.js'
	import {
		useUserStore
	} from '@/store/modules/user.js';
	import {
		useRouter
	} from 'vue-router'
	import {
		useI18n
	} from 'vue-i18n';
	//多语言
	const {
		t
	} = useI18n();
	const {
		theme
	} = useTheme();
	const router = useRouter();
	//仓库中获取商户信息请求函数
	const userStore = useUserStore();

	//商户信息
	const merInfo = ref({})
	merInfo.value = userStore.MerInfo

	//切换主题
	const switchThemes = () => {
		theme.value = theme.value === 'light' ? 'dark' : 'light';
	};

	//商品列表
	const product = ref([])
	const gethotProduct = async () => {
		const res = await hotProduct();
		console.log(res.data)
		product.value = res.data;
	}
	onMounted(() => {
		gethotProduct()
	})
</script>

<template>
	<div class="container_mix">
		<div class="bg">
			<img src="@/assets/image/BG.png">
		</div>
		<div class="bg-white w-[100vw] h-[100vh]" style="position: fixed;z-index: -2;top: 0;left: 0;"></div>
		<!-- <header class="h-40" style="position: relative;z-index: 3;">
			<div class="mx-3 pt-6 flex items-center">
				<div>
					<van-image :src="userStore.MerInfo.mer_avatar" height="60px" lazy-load round width="60px" />
				</div>
				<div class="flex flex-col ml-3">
					<span class="font-semibold text-lg text-white">{{ userStore.MerInfo.mer_email }}</span>
					<span class="text-sm text-white"> ID:{{ userStore.MerInfo.mer_id }}</span>
				</div>
				<div class="ml-auto mr-3">
				</div>
			</div>
		</header> -->
		<header>
			<div class="flex my-6 mx-6  text-white ">
				<div class="flex items-center mr-auto w-[70%]">
					<van-image width="4.6rem" height="4.6rem" round :src="userStore.MerInfo.mer_avatar" />
					<div class="flex flex-col ml-[.6rem] justify-around"
						style="height: 100%;width: calc(100% - 5.2rem);">
						<div class="mt-1 flex justify-left ">
							<span
								class="text-lg text-white ml-1.5 font-semibold ">{{ userStore.MerInfo.mer_name }}</span>
						</div>
						<div class="mt-1 flex justify-left ">
							<span class="text-lg text-white ml-1.5" style="overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;">{{ userStore.MerInfo.mer_info }}</span>
						</div>
						<!--            <div class="ml-1 mt-2">-->
						<!--              <span class="text-sm  px-3 py-2 rounded-xl bg-gradient-to-r from-[#6B6B6B]  to-[#1C1B1B]">未认证</span>-->
						<!--            </div>-->
					</div>
				</div>
				<div class="flex items-center justify-between pl-3 w-[30%]">
					<div class="flex items-center justify-center">
						<van-badge class="mr-3" @click="router.push('/baseinfo')" style="position: relative;">
							<div
								style="background: #FFFFFF;opacity: 0.35;width: 3rem;height: 3rem;position: absolute;border-radius: 100%;">
							</div>
							<div
								style="width: 3rem;height: 3rem;display: flex;justify-content: center;align-items: center;">
								<van-icon size="24" class="" name="setting-o" />
							</div>

						</van-badge>
					</div>
					<div class="flex items-center ml-1">
						<van-badge class="mr-3" :content="userStore.MerInfo.unread_notice"
							@click="router.push('/message')" style="position: relative;">
							<div
								style="background: #FFFFFF;opacity: 0.35;width: 3rem;height: 3rem;position: absolute;border-radius: 100%;">
							</div>
							<div
								style="width: 3rem;height: 3rem;display: flex;justify-content: center;align-items: center;">
								<img class="h-8 w-8" src="@/assets/image/my/chat.png" alt="">
							</div>

						</van-badge>
					</div>

				</div>
				<div class="h-10">
				</div>
			</div>
		</header>
		<!-- 	<header class="mx-3 bg-black text-white rounded-md mt-3 back_4">
			<div class="flex py-3">
				<div class="flex items-center  mr-auto ml-3">
					<van-image width="56px" height="56px" round :src="merInfo.mer_avatar" />
					<div class="flex flex-col ml-3">
						<div>
							<span class="font-semibold text-xl">{{ merInfo.mer_name }}</span>
							<span
								class="text-xs text-white px-3 py-0.5 rounded-lg bg-amber-500 ml-1.5">{{ $t("product.ProductManagement") }}</span>
						</div>
						<div><span class="text-sm">{{ $t("product.crossEcommerce") }}</span></div>
					</div>
				</div>
				<div class="flex items-center" @click="router.push('/baseinfo')">
					<van-icon size="24" class="ml-auto mr-3" name="setting-o" />
				</div>
			</div>
		</header> -->
		<main class=" mx-3">
			<!--    商品分类-->
			<div class=" text-white mx-3 pb-3 font-semibold" style="font-size: 1.8rem;font-family: Poppins;">
				{{ $t("product.ProductCategory") }}
			</div>
			<div class="mx-3 mt-3 flex justify-between">
				<div class="w-[12rem] h-[8rem] rounded-[0.5rem] back_3 back_4 p-3 flex"
					style="box-shadow: 0px 30px 50px -20px rgba(0,153,150,0.3);" @click="router.push('/distribution')">
					<div class="w-[50%] " style="line-height: 2.2rem;font-family: Poppins;font-size: .9rem;">
						{{ $t("distribution.distributionCenter") }}
					</div>
					<div class="w-[50%] flex items-end justify-end">
						<img class="w-[80%]" src="@/assets/image/product/distributionCenter.png" alt="">
					</div>
				</div>
				<div class="w-[12rem] h-[8rem] rounded-[0.5rem] back_3 back_4 p-3 flex"
					style="box-shadow: 0px 30px 50px -20px rgba(0,153,150,0.3);" @click="router.push('/goods')">
					<div class="w-[50%]" style="line-height: 2.2rem;font-family: Poppins;font-size: .9rem;">
						{{ $t("product.ProductManagement") }}
					</div>
					<div class="w-[50%] flex items-end justify-end">
						<img class="w-[80%]" src="@/assets/image/product/goods.png" alt="">
					</div>
				</div>
			</div>
			<!--    系统通知-->
			<div class="mx-3 mt-16 bg-[#F2FAFA] h-[4.5rem] back_4 flex items-center contentList">
				<div class="w-[70%] notice notice-text mx-3">
					<span class="mr-0.5">{{ $t("product.BestSellingProducts") }}</span><span
						class="text-[#009996] font-semibold ml-2">TOP10</span>
					<img src="@/assets/image/product/top10.png" alt="" />
				</div>
				<!-- <van-notice-bar background="#ffffff" class="rounded-md back_4" color="#000000" left-icon="volume-o"
					scrollable>
					<span v-for="item in contentList" class="mr-0.5">{{ item.content }}</span>
				</van-notice-bar> -->
			</div>
			<div class="mt-3 ">
				<!-- <h5 class="antialiased font-semibold text mx-3 pt-3 ">
					{{ $t("product.BestSellingProducts") }}TOP10
				</h5> -->
				<div v-if="product.length<=0">
					<van-empty :description="$t('product.NoBestSellingProductsYet')" />
				</div>
				<div class="flex flex-wrap justify-between w-[100%]  grid grid-cols-2">
					<div class="bg-slate-50 p-3 back_3 back_4 mx-3 rounded-md mt-5 back_2"
						v-for="(item,index) in product" :key="index" style="position: relative;"
						@click="router.push({ path: '/goodsDetail', query: { product_id: item.product_id } })">

						<div style="position: absolute;top:-.5rem;left: -1rem;z-index:10; width:4rem">
							<img src="@/assets/image/product/top1.png" alt="" v-if="index==0">
							<img src="@/assets/image/product/top2.png" alt="" v-if="index==1">
							<img src="@/assets/image/product/top3.png" alt="" v-if="index==2">

						</div>
						<div style="position: absolute;top:-.5rem;left: -1rem;z-index:10; width:2.6rem">
							<img src="@/assets/image/product/top4.png" alt="" v-if="index==3">

						</div>
						<div style="width: 100%;">
							<van-image width="10rem" height="10rem" fit="cover" radius="10px" lazy-load
								:src="item.goods.image">
								<template v-slot:loading>
									<van-loading type="spinner" size="20" />
								</template>
							</van-image>
						</div>

						<div class="flex flex-col justify-center  flex-1  flex-nowrap ">

							<div class="flex-initial my-1.5 leading-5">
								<span class="text-ellipsis line-clamp_2 text-[#181818]"
									style="font-family: Poppins">{{ item.goods.title }}</span>
							</div>
							<div class="flex justify-between my-1.5">
								<!-- <span class="text-neutral-500 text-sm">{{ $t("product.Click") }} {{ item.click }}</span> -->
								<div>
									<span
										class="text-neutral-500 text-sm text-[#939393]">{{ $t("product.Selling") }}</span>
									<span class="text-[#9E9E9E] text-sm font-semibold">{{ item.sales }}</span>
								</div>

								<div>
									<span
										class="text-neutral-500 text-sm pl-6 text-[#939393]">{{ $t("product.shoujia2") }}
									</span>
									<span class="text-[#EB4E3D] text-sm font-semibold "> $
										{{ item.goods.sales_price }}</span>
								</div>

							</div>
							<div class="antialiased text-lg text-blue-500">{{ item.sales_price }}</div>
						</div>
					</div>
				</div>
			</div>
		</main>
		<div class="h-[4rem]"></div>
	</div>
	<tabbers style="position: relative;z-index:15"></tabbers>

</template>

<style scoped lang="scss">
	.bottom-button {
		width: 160px;
		height: 40px;
		background-color: black;
		border: 0 solid white;
	}

	body {
		background-color: #fff !important;
	}

	.bg {
		width: 100%;
		height: 268px;
		background: linear-gradient(180deg, #40A295 0%, #069895 35%, #fff);
		border-radius: 0px 0px 0px 0px;
		position: absolute;
		top: 0;
		z-index: -1;
	}

	.bottom {
		height: calc(100vh - 40px);
		height: calc(100dvh - 40px);
		padding-bottom: 30px;
	}

	.totalsales {
		font-family: Poppins;
		font-weight: 500;
		font-size: 1.2rem;
		color: #181818;
		line-height: 1.2rem;
		margin-bottom: .8rem;
	}

	.moneyValue {
		font-family: Poppins;
		font-weight: 800;
		font-size: 1.5rem;
		color: #009996;
		line-height: 2.2rem;
	}

	.greed {
		color: #009996;
	}

	.red {
		color: #FE4938;
	}

	.contentList {
		position: relative;

		img {
			position: absolute;
			bottom: 0;
			right: 0;
			height: 7rem;
		}
	}

	.notice {
		font-size: 1.2rem;
		// line-height: 100%;
		font-family: Poppins;
		font-weight: 400;
		color: #141A52;

	}

	.notice-text {
		font-size: 1.2rem;
		// line-height: 100%;
		font-family: Poppins;
		font-weight: 400;
		color: #141A52;

	}
</style>