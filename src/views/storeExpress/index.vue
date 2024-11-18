<script setup>
	import {
		buyTrain,
		train,
		payPwdconfirm
	} from "@/api/index.js";
	import {
		useUserStore
	} from "@/store/modules/user.js";
	import {
		showFailToast
	} from "vant";
	import {
		useI18n
	} from "vue-i18n";
	import png0 from '@/assets/image/storeExpress/0.png'
	import png1 from '@/assets/image/storeExpress/1.png'
	import png2 from '@/assets/image/storeExpress/2.png'

	const imgs = ref([png0, png1, png2])
	const userStore = useUserStore();
	const {
		t
	} = useI18n();
	const router = useRouter();
	const onClickLeft = () => {
		router.back();
	};


	//获取信息请求
	const List = ref([])
	const getTrain = async () => {
		const res = await train()
		List.value = res.data
		console.log(res)
	}
	//购买直通车
	const query = ref({
		id: ''
	})
	const tobuy = async (id) => {
		if (userStore.MerInfo.status === 1) {
			query.value.id = id;
			showActionSheet.value = true
		} else {
			showFailToast(t("over"))
		}
	}
	/*
	  支付密码模块
	*/
	//展现支付密码
	const showActionSheet = ref(false)
	//定义支付密码
	const payPwd = ref({
		password_pay: ''
	})

	//支付密码确认接口
	const order_id = ref({
		order_id: ''
	})
	const confirm = async () => {
		const res = await payPwdconfirm(payPwd.value)
		// code.value = res.code
		// console.log(code.value)
		if (res.code == 1) {
			buyTrain(query.value).then(res => {
				if (res.code == 1) {
					showActionSheet.value = false
					showSuccessToast(res.msg)
				}
			})
		} else {
			showFailToast(res.msg);
		}
	}
	//输入完成之后触发
	const confirmdata = (data) => {
		payPwd.value.password_pay = data
		console.log(data)
		confirm()
	}

	onBeforeMount(() => {
		getTrain()
	})
</script>

<template>
	<div class="bg">
		<img src="@/assets/image/BG.png">
	</div>
	<header style="position: relative;z-index: 3;">
		<van-nav-bar :title="$t('storeExpress.storeExpress')" :border="false" :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft">
			<template #right>
				<span class="text-white" @click="router.push('/buyTrainBill')">{{ $t("storeExpress.record") }}</span>
			</template>
		</van-nav-bar>
	</header>
	<main class="mt-20 mx-3" style="position: relative;z-index: 3;">
		<div class="bg-white  rounded-md my-10 flex items-center py-6 mx-3 back_4" style="position: relative;"
			v-for="(item,index) in List" :key="index">
			<div class="absolute">
				<img class="w-[100%] h-[100%]" :src="imgs[index]" alt="">
			</div>
			<div class="mr-3 px-5">
				<div class="mb-1.5 "><span class="font-semibold text-base name">{{ item.name }}</span></div>
				<div class="w-[60%] " style="word-break: break-all;">
					<span class="text-sm opacity-80">{{ $t("storeExpress.title1") }}</span>
				</div>
				<div class="flex mt-2 justify-end">
					<div class="flex flex-col w-[50%]">
						<div class="flex">
							<div class="bg-[#E5F4F4] px-2 rounded-1xl" style="border-radius: 4px;">
								<span class="text-sm opacity-80 mr-3"
									style="font-size: .8rem;">{{ $t("storeExpress.title2") }}</span>
								<span class="font-semibold text-[#009996]">{{ item.order_num }}</span>
							</div>
						</div>
						<div class="mt-4">
							<span
								style="font-family: Poppins;font-weight: 800;font-size: 1.5rem;color: #FE4938;line-height: 2rem;">
								$ {{ item.price }}</span>
						</div>
					</div>
					<div class="flex justify-end w-[50%] -mt-1.5 text-base items-end">
						<div class="bg-[#009996] w-[8rem] h-[3.5rem] p-3 px-5 text-white flex items-center justify-center"
							@click="tobuy(item.id)" style="border-radius: 8px;">
							{{ $t("storeExpress.buy") }}
						</div>
					</div>
				</div>
			</div>

		</div>
		<view class="h-[1rem] " style="display: block;"></view>
	</main>
	<van-action-sheet :overlay="false" :round="false" v-model:show="showActionSheet">
		<payPassword :price="price1" @close="()=>showActionSheet=false" @send-data="confirmdata" />
	</van-action-sheet>
	<van-overlay :show="showActionSheet" @click="showActionSheet = false" />
</template>

<style scoped lang="scss">
	:deep(.van-nav-bar) {
		background-color: transparent !important;
	}

	.bg {
		width: 100%;
		height: 268px;
		background: linear-gradient(180deg, #40A295 0%, #069895 35%, #fff);
		border-radius: 0px 0px 0px 0px;
		position: absolute;
		top: 0;
		z-index: 1;
	}

	.name {
		font-family: Poppins;
		font-size: 1.3rem;
		color: #181818;
		line-height: 1.5rem;
	}

	.absolute {
		width: 8rem;
		height: 8rem;
		position: absolute;
		top: -2rem;
		right: 0
	}
</style>