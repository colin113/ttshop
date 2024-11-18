<template>
	<div class="pay-panel-container">
		<div class="title-row">
			<div />
			<span class="pl-6 text-2xl">{{ title }}</span>
			<icon-park name="close" size="1.5rem" @click="handlerClose" />
		</div>
		<div class="pwd-container">
			<van-password-input :gutter="10" :value="payPwd" :mask="false" />
			<van-number-keyboard v-model="payPwd" @input="input" :close-button-text="$t('confirm')" :maxlength="6"
				:show="true" theme="custom" @close="confirm()" class="mt-10" />
		</div>
	</div>
</template>
<script setup>
	import {
		useUserStore
	} from '@/store/modules/user.js';
	import {
		useI18n
	} from 'vue-i18n';
	import i18n from '@/lang/index.js';

	const {
		t
	} = useI18n();
	const userStore = useUserStore();

	defineProps({
		title: {
			type: String,
			required: false,
			default: i18n.global.t("inputpaypwd")
		}
	});
	const payPwd = ref('');

	const emit = defineEmits(['close', 'send-data']);
	const handlerClose = () => {
		emit('close');
	};
	const input = (e) => {
		console.log(payPwd.value);
		console.log(1111, e);
	}
	const confirm = () => {
		emit('send-data', payPwd);
		payPwd.value = '';
	};
</script>
<style lang="scss" scoped>
	.pay-panel-container {
		padding: 1rem;
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: stretch;
		min-height: 400px;
		height: 42vh;

		.title-row {
			padding-top: 1rem;
			font-weight: 500;
			font-size: 1.2rem;
			color: #191919;
			line-height: 1rem;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.pwd-container {
			padding-top: 2rem;

			// Adjust the height of the input field here
			::v-deep(.van-password-input__item) {
				height: 40px; // Set your desired height here
				background: #f5f5f5 !important;
			}

			::v-deep(.van-number-keyboard__body) {
				background: #fff;
			}

			::v-deep(.van-number-keyboard) {
				padding-bottom: 0;
			}
		}
	}

	// ::v-deep(.van-number-keyboard) {
	// 	margin-bottom: 60px;
	// }
</style>