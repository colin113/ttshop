<script setup>
	// import NavBar from '@/components/CustomNavBar/index.vue'
	import {
		useUserStore
	} from "@/store/modules/user.js";

	import {
		useI18n
	} from 'vue-i18n';
	import {
		showFailToast
	} from "vant";
	import {
		RechargeType
	} from "@/api/index.js";
	const getRechargeType = () => {
		RechargeType({

		}).then(res => {
			console.log(res);
			let arr = []
			res.data.forEach(item => {
				let index = list2.value.findIndex(value => item.type === value.type)
				if (index > -1) {
					arr.push(list2.value[index])
				}
			})
			list.value = arr
		})
	}
	//多语言
	const {
		t
	} = useI18n();
	const router = useRouter();
	const userStore = useUserStore();
	const onClickLeft = () => {
		router.back();
	};
	getRechargeType()
	//0=银行卡,1=数字货币,2=支付宝,3= 微信
	const list = ref([])
	const list2 = ref([
		// {
		// 	path: '/bankCardRecharge',
		// 	type: "",
		// 	name: t("recharge.chainDeposit"),
		// 	icon: 'bitcoin',
		// 	type: 0
		// },
		{
			path: '/bankRecharge',
			name: t("recharge.chainDeposit"),
			icon: 'bitcoin',
			type: 0
		},
		{
			path: '/blockchainRecharge',
			name: t("recharge.blockchainRecharge"),
			icon: '',
			type: 1
		},
		{
			path: '/zhifubaoRecharge',
			name: t("recharge.zfbDeposit"),
			icon: '',
			type: 2
		},
		{
			path: '/weixin',
			name: t("recharge.wxDeposit"),
			icon: '',
			type: 3
		},
		//{ path: '/zhifubaoRecharge', name: t("recharge.wxDeposit"), icon: '', type: 3 },
		// {
		// 	path: 'bankCardRecharge',
		// 	name: '银行卡',
		// 	icon: 'bank-card'
		// },
		{
			path: '/service',
			name: t("recharge.manualDeposit"),
			icon: 'headset-one',
			type: 4
		}
	])
</script>

<template>
	<div class="bg">
		<img src="@/assets/image/Deposit/BG.png">
	</div>
	<header>

		<van-nav-bar :title="$t('recharge.deposit')" :border="false" :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft">
			<template #right>
				<span @click="router.push('/rechargeRecord')"
					class="text-white">{{ $t("recharge.depositHistory") }}</span>
			</template>
		</van-nav-bar>
	</header>
	<!--  <NavBar title="充值" />-->
	<main>
		<div class="flex justify-center items-center mx-3 h-[12rem]">
			<img alt="" class="w-[22rem] h-[12rem]" src="@/assets/image/Deposit/card.png" style="position: absolute;" />
			<div class="w-[22rem] h-[7rem] pt-9 px-6 flex flex-col justify-between"
				style="position: relative;z-index: 2;">
				<div class="money">
					{{ $t("my.Balance") }}
				</div>
				<div class="moneyValue mt-4">
					<!-- <van-icon name="cart-circle-o" /> -->
					$ {{ userStore.MerInfo.mer_money || 0.00}}
				</div>
			</div>

		</div>
		<div class="bg-[#F8F8F8] py-[2.3rem] px-[1.8rem]"
			style="height: calc(100vh - var(--van-nav-bar-height) - 12rem);border-radius: 30px 30px 0px 0px;">
			<h5 class="text-base font-semibold mb-[2.3rem]">{{ $t("recharge.depositMethod") }}</h5>
			<div v-for="(item, index) in list" :key="index"
				class="bg-white rounded-md  mb-[1.1rem] h-[3.5rem] flex items-center py-3"
				@click="userStore.MerInfo.status === 1 ? router.push({ path: item.path, query: { recharge_type: item.type } }) : showFailToast($t('over'))">
				<div class="mx-3 w-[10%]">
					<!-- <icon-park :name="item.icon" size="1.8rem" v-if="item.type == -1" /> -->
					<img src="@/assets/icons/kf.svg" style="width: 1.8rem;" v-if="item.type == 4">
					<img src="@/assets/icons/tx.png" style="width: 1.8rem;" v-if="item.type == 0">
					<img src="@/assets/icons/USDT.svg" style="width: 1.8rem;" v-if="item.type == 1">
					<img src="@/assets/icons/ic_zfb.svg" style="width: 1.8rem;" v-if="item.type == 2">
					<img src="@/assets/icons/ic_wx.svg" style="width: 1.8rem;" v-if="item.type == 3">
				</div>
				<div class="w-[80%]">
					<span>{{ item.name }}</span>
				</div>
				<div class="w-[10%]">
					<van-icon name="arrow" />
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
	:deep(.van-nav-bar) {
		background-color: transparent !important;
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
		top: 0;
		z-index: -1;
	}

	.money {
		font-family: Poppins, Poppins;
		font-weight: 500;
		font-size: 1.2rem;
		color: #141A52;
		line-height: 24px;
	}

	.moneyValue {
		font-family: Poppins;
		font-weight: 800;
		font-size: 1.8rem;
		line-height: 2.2rem;
		color: #FE4938;
	}
</style>