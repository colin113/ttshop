<script setup>
	const router = useRouter();
	import {
		showSuccessToast
	} from "vant";
	import {
		useUserStore
	} from "@/store/modules/user.js";
	import {
		useI18n
	} from 'vue-i18n';

	const userStore = useUserStore();
	const {
		t
	} = useI18n();
	const onClickLeft = () => {
		router.back();
	};
	const list = [{
			name: t("bankCardRecharge.name")
		},
		{
			name: t("bankCardRecharge.card")
		},
		{
			name: t("bankCardRecharge.bankname")
		}
	]
	const data = ref({
		money: '',
		sjMoney: 0.00
	})
</script>

<template>
	<div class="bg">
		<img src="@/assets/image/Deposit/BG.png">
	</div>
	<header>
		<van-nav-bar :title="$t('bankCardRecharge.Recharge')" :border="false" :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft">
			<template #right>
				<span @click="router.push('/rechargeRecord')"
					class="text-white">{{ $t("bankCardRecharge.rechargeRecord") }}</span>
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
			<div class="bg-white rounded-md  mb-[1.1rem] h-[3.5rem] flex items-center py-3">
				<van-field class="mh rounded-[0.5rem]" :label="$t('bankCardRecharge.rechargeMoney')"
					label-width="8.8rem" input-align="right" :placeholder="$t('bankCardRecharge.inputrechargeMoney')"
					type="number" v-model="data.money" required />
			</div>
			<div class="text-[#009996] mt-4">{{$t("bankCardRecharge.actualAmountReceived")}}：$ {{data.sjMoney}}</div>
		</div>
	</main>
</template>
<!-- <template>
	<header>
		<van-nav-bar :title="$t('bankCardRecharge.Recharge')" :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft">
			<template #right>
				<span @click="router.push('/rechargeRecord')"
					class="text-white">{{ $t("bankCardRecharge.rechargeRecord") }}</span>
			</template>
		</van-nav-bar>
	</header>
	<main class="mx-3">
		<h5 class="mt-3 text-base font-semibold">{{ $t("bankCardRecharge.rechargeMethod") }}</h5>
		<div v-for="(item,index) in list" :key="index" class="bg-white rounded-md mt-3 flex items-center py-3">
			<div class="mx-3">
				<span class="font-normal">{{ item.name }}</span>
			</div>
		</div>
		<h5 class="mt-6 text-base font-semibold">{{ $t("bankCardRecharge.rechargeMoney") }}</h5>
		<input class="bg-white w-full rounded-md mt-3 flex items-center py-3 px-3"
			:placeholder="$t('bankCardRecharge.inputrechargeMoney')" />
		<div class="flex mt-3">
			<div>
				<icon-park name="info" size="1.4rem" />
			</div>
			<div class="leading-">
				<span class="opacity-80">{{ $t("bankCardRecharge.title") }}</span>
			</div>
		</div>
		<div class="pt-10">
			<van-button round block color="#191919">{{ $t("bankCardRecharge.submit") }}</van-button>
		</div>
	</main>

</template> -->

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