<script setup>
	import {
		useUserStore
	} from '@/store/modules/user.js';
	import {
		useRouter
	} from 'vue-router'
	import {
		useI18n
	} from 'vue-i18n';
	import {
		showFailToast
	} from "vant";
	//多语言
	// const { t } = useI18n();
	const router = useRouter();

	//仓库中获取商户信息请求函数
	const userStore = useUserStore();

	//商户信息
	const merInfo = ref({})
	merInfo.value = userStore.MerInfo

	//返回函数
	const onClickLeft = () => {
		router.back();
	};
</script>

<template>
	<header>
		<van-nav-bar :title="$t('personallinfo.personallinfo')" :border="false" left-text="" color="#141A52" left-arrow
			@click-left="onClickLeft" />
	</header>
	<section class="mx-6 mt-5">
		<div class="bg-white  flex items-center border rounded-[.5rem] border-slate-50 py-3 h-[6rem]"
			style="overflow: hidden;">
			<div class="px-3">
				<span>{{ $t("personallinfo.avatar") }}</span>
			</div>
			<div class="flex items-center ml-auto mr-3">
				<div>
					<van-image width="50" height="50" round :src="merInfo.mer_avatar" />
				</div>
				<div class="pl-3">
					<van-icon name="arrow" size="16px" />
				</div>
			</div>
		</div>
		<div class="bg-white rounded-[.5rem] mt-5" style="overflow: hidden;">
			<div class="flex items-center border border-slate-50 py-3 h-[4rem]">
				<div class="px-3">
					<span>{{ $t("personallinfo.fullName") }}</span>
				</div>
				<div class="flex items-center ml-auto mr-3">
					<div class="flex items-center">
						<!--          <span class="text-gray-500">tx**xt</span>-->
						<van-icon class="ml-3" color="#0ECB81" size="22px" name="checked" />
						<span class="text-gray-500">{{ $t("personallinfo.verified") }}</span>
					</div>
					<div class="pl-3">
						<van-icon name="arrow" size="16px" />
					</div>
				</div>
			</div>
			<!-- 	<div class="flex items-center border border-slate-50 py-3  h-[4rem]">
				<div class="px-3">
					<span>{{ $t("personallinfo.phoneVerification") }}</span>
				</div>
				<div class="flex items-center ml-auto mr-3">
					<div class="flex items-center">
						<van-icon class="ml-3" color="#0ECB81" size="22px" name="checked" />
						<span class="text-gray-500">{{ $t("personallinfo.verified") }}</span>
					</div>
					<div class="pl-3">
						<van-icon name="arrow" size="16px" />
					</div>
				</div>
			</div> -->
			<div class="flex items-center border border-slate-50 py-3  h-[4rem]">
				<div class="px-3">
					<span>{{ $t("personallinfo.email") }}</span>
				</div>
				<div class="flex items-center ml-auto mr-3">
					<div class="flex items-center">
						<!--          <span class="text-gray-500">tx**xt</span>-->
						<van-icon class="ml-3" color="#0ECB81" size="22px" name="checked" />
						<span class="text-gray-500">{{ $t("personallinfo.verified") }}</span>
					</div>
					<div class="pl-3">
						<van-icon name="arrow" size="16px" />
					</div>
				</div>
			</div>
		</div>
		<div class="flex rounded-[.5rem] items-center border border-slate-50 py-3 bg-white  mt-5  h-[4rem]"
			style="overflow: hidden;"
			@click="userStore.MerInfo.status===1?router.push('/setPaypwd'):showFailToast($t('over'))">
			<div class="px-3">
				<span>{{ $t("personallinfo.setPaymentPassword") }}</span>
			</div>
			<div class="flex items-center ml-auto mr-3">
				<div class="pl-3">
					<van-icon name="arrow" size="16px" />
				</div>
			</div>
		</div>
		<div class="flex rounded-[.5rem] items-center border border-slate-50 py-3 bg-white  mt-5  h-[4rem]"
			style="overflow: hidden;"
			@click="userStore.MerInfo.status===1?router.push('/changeLoginPassword'):showFailToast($t('over'))">
			<div class="px-3">
				<span>{{ $t("personallinfo.changeLoginPassword") }}</span>
			</div>
			<div class="flex items-center ml-auto mr-3">
				<div class="pl-3">
					<van-icon name="arrow" size="16px" />
				</div>
			</div>
		</div>
		<div class="flex rounded-[.5rem] items-center border border-slate-50 py-3 bg-white  mt-5  h-[4rem]"
			style="overflow: hidden;"
			@click="userStore.MerInfo.status===1?router.push('/changePayPassword'):showFailToast($t('over'))">
			<div class="px-3">
				<span>{{ $t("personallinfo.changeFundsPassword") }}</span>
			</div>
			<div class="flex items-center ml-auto mr-3">
				<div class="pl-3">
					<van-icon name="arrow" size="16px" />
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
	:deep(.van-nav-bar) {
		background-color: transparent !important;

	}

	:deep(.van-nav-bar__title),
	:deep(.van-nav-bar__left .van-icon),
	:deep(.van-nav-bar__text) {
		color: #141A52 !important;
	}
</style>