<script setup>
	import {
		changeLoginPwd
	} from "@/api/index.js";
	import {
		useUserStore
	} from '@/store/modules/user.js';
	//仓库中获取商户信息请求函数
	const userStore = useUserStore();
	const onClickLeft = () => history.back();
	//请求参数
	const changeLoginQuery = ref({
		newpassword: '',
		mer_phone: '',
		renewpassword: '',
		oldpassword: ''
	})
	//请求函数
	const onSubmit = async (data) => {
		const res = await changeLoginPwd(data)
		if (res.code === 1) {
			showSuccessToast(res.msg);
			userStore.nologin()
		} else {
			showFailToast(res.msg);
		}
	}

	//校验密码
	const validator = (val) => {
		if (val !== changeLoginQuery.value.newpassword) {
			return false;
		}
	}
</script>

<template>
	<header>
		<van-nav-bar :title="$t('changeLoginPassword.changeLoginPassword')" :border="false" :left-text="$t('goback')"
			left-arrow @click-left="onClickLeft" />
	</header>
	<main>
		<van-form @submit="onSubmit(changeLoginQuery)" class="mt-10">
			<div class="px-4 ">
				<div class="bg-white mh rounded-[0.5rem]">
					<!-- <van-cell :title="" center style="font-size: 20px" /> -->
					<van-field class="mh rounded-[0.5rem]" :label="$t('changeLoginPassword.oldpwd')" label-width="11rem"
						input-align="right" :placeholder="$t('changeLoginPassword.inputpwd')" type="password"
						v-model="changeLoginQuery.oldpassword" required />
				</div>
				<div class="bg-white mt-3 mh rounded-[0.5rem]">
					<!-- <van-cell :title="$t('changeLoginPassword.newpwd')" center style="font-size: 20px" /> -->
					<van-field class="mh rounded-[0.5rem]" :label="$t('changeLoginPassword.newpwd')" label-width="11rem"
						input-align="right" :placeholder="$t('changeLoginPassword.inputpwd')" type="password"
						v-model="changeLoginQuery.newpassword" required />
				</div>
				<div class="bg-white mt-3 mh rounded-[0.5rem]">
					<!-- <van-cell :title="$t('changeLoginPassword.againpwd')" center style="font-size: 20px" /> -->
					<van-field class="mh rounded-[0.5rem]" :label="$t('changeLoginPassword.newpwd')" label-width="11rem"
						input-align="right" :placeholder="$t('changeLoginPassword.againinput')" type="password"
						v-model="changeLoginQuery.renewpassword" required
						:rules="[{ validator ,message: '两次密码输入不一致'}]" />
				</div>
			</div>
			<div class="btn mt-3 flex justify-center rounded-md h-[8rem] bg-white">
				<van-button block color="#009996" native-type="submit">
					{{ $t("changeLoginPassword.submit") }}
				</van-button>
			</div>
		</van-form>
	</main>
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

	.van-button--default {
		color: white;
		background-color: black;
		border: 0 solid white;
	}

	.btn {
		position: fixed;
		bottom: 0;
		// left: 0;
		right: 0;
		width: 100vw;
		height: 8rem;
		padding: 1rem 2rem;
		display: flex;
		justify-content: center;

		>div {
			height: 4rem;
			background: #009996;
			box-shadow: 0px 20px 48px -18px rgba(0, 153, 150, 0.3);
			border-radius: 6px 6px 6px 6px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	:deep(.van-field__body) {
		height: 4.2rem;
	}

	:deep(.van-field__label) {
		height: 4.2rem;
		display: flex;
		align-items: center;
	}

	.mh {
		min-height: 4.2rem !important;
		display: flex;
	}

	:deep(.van-field__error-message) {
		text-align: right;
	}
</style>