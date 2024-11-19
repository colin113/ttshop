<script setup>
	import {
		handleProduct,
		productList,
		productManagement,
		removeProduct
	} from "@/api/index.js";
	import {
		showFailToast,
		showSuccessToast
	} from "vant";
	import {
		useI18n
	} from 'vue-i18n';
	import {
		useUserStore
	} from "@/store/modules/user.js";
	import tr from "@/lang/tr";
	//多语言
	const {
		t
	} = useI18n();
	const userStore = useUserStore();
	//返回
	const router = useRouter();
	const onClickLeft = () => {
		router.go(-1);
	};

	//去详情页
	const toDetail = (data) => {
		console.log(data)
		router.push({
			path: '/goodsDetail',
			query: {
				product_id: data
			}
		});
	}

	//tab标签
	const tabs = ref([{
			switch: "all",
			title: t("goods.all"),
		},
		{
			switch: "1",
			title: t("goods.selling"),
		},
		{
			switch: "0",
			title: t("goods.store"),
		}
	])
	// 获取商品列表
	const List = ref([])
	const listQuery = ref({
		switch: 'all',
		page: '1',
		limit: '10',
		title: ''
	})
	const showOffBtn = ref(false);
	const showDelBtn = ref(false);
	const loading = ref(false);
	const finished = ref(false);
	const onload = (id) => {
		const show = showLoadingToast({
			message: t("goods.loading"),
			forbidClick: true,
			duration: 0
		});
		show.close();
		if (id !== undefined) {
			show.open();
			List.value = [];
			listQuery.value.page = '1';
			listQuery.value.switch = id;
			finished.value = false;
		}
		// console.log(listQuery.value);
		productManagement(listQuery.value).then(res => {
			show.close();
			listQuery.value.page++;
			// console.log(List.value);
			if (res.data.list.length <= 0) {
				// console.log('结束');
				finished.value = true;
			} else {
				List.value.push(...res.data.list);
				// console.log(List.value)
			}
			loading.value = false;
		});
	};

	//点击传递标签参数
	const onClickTab = ({
		name
	}) => {
		loading.value = true;
		searchValue.value = ''
		listQuery.value.title = ''
		onload(name);
		if (name === "1") {
			showOffBtn.value = true
			showDelBtn.value = false
		} else if (name === "0") {
			showOffBtn.value = false
			showDelBtn.value = true
		} else {
			showOffBtn.value = false
			showDelBtn.value = false
		}
	};

	//搜索
	const searchValue = ref('')
	const onSearch = async () => {
		List.value = []
		finished.value = false
		listQuery.value.page = '1'
		listQuery.value.title = searchValue.value
		loading.value = true;
		const res = await productManagement(listQuery.value)
		// console.log(res)
		loading.value = false
		let number = parseInt(listQuery.value.page);

		// console.log(res)
		number++;
		listQuery.value.page = number.toString();

		if (res.data.list.length <= 0) {
			finished.value = true;
		}
		List.value.push(...res.data.list)
	}

	//右滑删除商品
	const removeQuery = ref({
		ids: ''
	})
	const toRemoveProduct = async (id) => {
		event.stopPropagation();
		removeQuery.value.ids = id
		const res = await removeProduct(removeQuery.value)
		if (res.code === 1) {
			List.value = List.value.filter(item => item.product_id !== id)
			showSuccessToast(res.msg)
		} else {
			showFailToast(res.msg)
		}
	}
	//商品上下架
	const query = ref({
		id: '',
		switch: ''
	})
	const productMove = async (id, product_id, data) => {
		event.stopPropagation();
		if (userStore.MerInfo.status === 1) {
			// console.log(data)
			query.value.id = id;
			if (data === 1) {
				query.value.switch = "0"
			} else {
				query.value.switch = "1"
			}
			// console.log(query.value)
			//处理商品上下架接口
			const res = await handleProduct(query.value)
			if (res.code === 1) {
				showSuccessToast(res.msg);
			} else {
				showFailToast(res.msg);
			}
			//商品点击上下架之后全部页面 把swith标签改相反,其他页面上下架直接删除
			if (listQuery.value.switch == 'all') {
				List.value = List.value.map(item => {
					if (item.product_id === product_id) {
						return {
							...item,
							switch: item.switch == 1 ? 0 : 1
						};
					} else {
						return item;
					}
				});
			} else {
				List.value = List.value.filter(item => item.product_id !== product_id)
			}
		} else {
			showFailToast(t("over"))
		}
	}
	onBeforeMount(() => {
		loading.value = true;
		onload()
		userStore.toGetMerInfo();
	})
</script>

<template>
	<header class="sticky top-0 z-10 pb-1.5" style="background-color: #fff">
		<van-nav-bar :title="$t('goods.ProductManagement')" :left-text="$t('goback')" left-arrow :border="false"
			@click-left="onClickLeft" />
		<div class="mx-3 mt-6 rounded-md ">
			<van-tabs @click-tab="onClickTab" color="#009996" type="card">
				<van-tab v-for="item in tabs" :key="item.switch" :name="item.switch" :title="item.title">
				</van-tab>
			</van-tabs>
			<div class="p-3">
				<div class="bg-[#F2FAFA] rounded flex items-center h-[3.5rem]">
					<div style="width: calc(100% - 4rem);" class="h-[3.5rem] flex">
						<van-search class="w-[100%]" v-model="searchValue" :clearable="false"
							:placeholder="$t('goods.searchinput')" @search="onSearch" />
					</div>
					<div>
						<img class="h-[2rem] w-[2rem]" src="@/assets/image/product/search.png" @click="onSearch" alt="">
					</div>
				</div>

			</div>
			<!-- <div>
				<van-search v-model="searchValue" clearable :placeholder="$t('goods.searchinput')" @search="onSearch" />
			</div> -->
		</div>
	</header>
	<main>
		<div v-if="List.length <= 0">
			<van-empty />
		</div>
		<div>
			<van-list v-model:loading="loading" :finished="finished" :finished-text="$t('goods.nomore')"
				@load="onload()" :immediate-check="false">

				<div class="bg-white mx-3 mt-3 back_4" v-for="(item,index) in List" :key="index">
					<van-swipe-cell>
						<div class="flex p-3" @click="toDetail(item.product_id)">
							<div class="p-3 ">
								<van-image width="100" height="100" radius="10px" lazy-load :src="item.goods.image">
									<template v-slot:loading>
										<van-loading type="spinner" size="20" />
									</template>
								</van-image>
							</div>
							<div class="ml-1 flex-1 mb-2 mt-2 flex flex-col justify-between ">
								<div class="my-3">
									<span class="">
										{{ item.goods.title }}
									</span>
								</div>
								<div class="">
									<div class="text-[#939393] mr-3 py-1 ">
										<span class=" text-sm">{{ $t("goods.price") }}</span>
										<span
											class="text-[#3B3B3B] font-semibold pl-2 ">{{ item.goods.sales_price }}</span>
									</div>
									<div class="text-[#939393] mr-3 py-1">
										<span class=" text-sm">{{ $t("goods.profit") }}</span>
										<span class="text-[#FE4938] font-semibold pl-2 ">{{ item.profit }}</span>
									</div>
								</div>
								<div class="flex justify-end mt-3">
									<van-button type="default" size="small" v-if="showOffBtn"
										@click="productMove(item.id, item.product_id, item.switch)">
										<span class="text-[#AEAEAE] text-sm ">{{ $t("goods.OffShelf") }}</span>
									</van-button>
									<van-button type="default" size="small" class="bg009996 " v-if="showDelBtn"
										@click="productMove(item.id, item.product_id, item.switch)">
										<span class="text-[#fff] text-sm ">{{ $t("goods.OnShelf") }}</span>
									</van-button>
									<van-button type="default" size="small" class="ml2rem" v-if="showDelBtn"
										@click="toRemoveProduct(item.product_id)" color="#F5F6F6"
										style="border: 1px solid #CBCBCB;">
										<span class="text-neutral-500 text-sm">{{ $t("goods.remove") }}</span>
									</van-button>
								</div>
							</div>
						</div>
						<div>
						</div>
					</van-swipe-cell>
				</div>
			</van-list>
		</div>
	</main>
</template>

<style scoped lang="scss">
	.delete-button {
		height: 100%;
	}

	:deep(.van-nav-bar) {
		background-color: transparent !important;
	}

	:deep(.van-nav-bar__title),
	:deep(.van-nav-bar__left .van-icon),
	:deep(.van-nav-bar__text) {
		color: #141A52 !important;
	}


	:deep(.van-tabs__wrap) {}

	:deep(.van-tab--active) {
		border-radius: .6rem;
	}

	:deep(.van-tab--active .van-tab__text) {
		color: #fff;
	}

	:deep(.van-tab__text) {
		color: #141A52;
	}

	:deep(.van-tabs__nav--card) {
		border: none !important;

	}

	:deep(.van-tab--card) {
		border-right: none;

	}

	:deep(.van-field__body input) {
		height: 3.5rem
	}

	:deep(.van-search__content) {
		width: 100%;
		// padding-left: 0;


	}

	:deep(.van-search__content .van-field__left-icon) {
		display: none;
	}

	:deep(.van-search__content .van-field__left-icon) {
		display: none;
	}

	* {
		--van-search-content-background: transparent;
		--van-search-background: transparent;
		--van-tabs-card-height: 3rem;
		--van-search-input-height: 4rem;
		--van-padding-md: 0.75rem;
		--van-search-left-icon-color: transparent;
		--van-search-input-height: 3.5rem;
		--van-slider-button-background: #009996;
	}

	.bg009996{
		background-color: #009996 !important;
		color: #fff !important;
	}
	.ml2rem{
		margin-left: 1rem;
	}
</style>