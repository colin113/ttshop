<script setup>
	import {
		changePayPwd
	} from "@/api/index.js";

	const onClickLeft = () => history.back();

	//请求参数
	const changePayQuery = ref({
		old: '',
		new: '',
		is_verify: '1'
	})
	const repwd = ref('')
	//请求函数
	const onSubmit = async (data) => {
		const res = await changePayPwd(data)
		if (res.code === 1) {
			showSuccessToast(res.msg);
		} else {
			showFailToast(res.msg);
		}
	}
	//校验密码
	const validator = (val) => {
		if (val !== changePayQuery.value.new) {
			return false;
		}
	}
</script>

<template>
	<header>
		<van-nav-bar :title="$t('changePayPassword.changePayPassword')" :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft" />
	</header>
	<main>
		<van-form @submit="onSubmit(changePayQuery)" class="mt-10">
			<div class="px-4 ">
				<div class="bg-white mt-3 mh rounded-[0.5rem]">
					<!-- <van-cell :title="$t('changePayPassword.oldpwd')" center style="font-size: 20px" /> -->
					<van-field class="mh rounded-[0.5rem]" :label="$t('changePayPassword.oldpwd')" label-width="11rem"
						input-align="right" :placeholder="$t('changePayPassword.inputpwd')" type="password"
						v-model="changePayQuery.old" required maxlength="6" />
				</div>
				<div class="bg-white mt-3 mh rounded-[0.5rem]">
					<!-- <van-cell :title="$t('changePayPassword.newpwd')" center style="font-size: 20px" /> -->
					<van-field class="mh rounded-[0.5rem]" :label="$t('changePayPassword.newpwd')" label-width="11rem"
						input-align="right" :placeholder="$t('changePayPassword.inputpwd')" type="password"
						v-model="changePayQuery.new" required maxlength="6" />
				</div>
				<div class="bg-white mt-3 mh rounded-[0.5rem]">
					<!-- <van-cell :title="$t('changePayPassword.againpwd')" center style="font-size: 20px" /> -->
					<van-field class="mh rounded-[0.5rem]" :label="$t('changePayPassword.againinput')"
						label-width="12.5rem" input-align="right" :placeholder="$t('changePayPassword.againinput')"
						type="password" v-model="repwd" required
						:rules="[{ validator ,message: $t('changePayPassword.message')}]" maxlength="6" />
				</div>
			</div>
			<div class="btn mt-3 flex justify-center rounded-md h-[8rem] bg-white">
				<van-button block color="#009996" native-type="submit">{{ $t("changePayPassword.submit") }}</van-button>
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