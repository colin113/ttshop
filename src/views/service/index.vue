<script setup>
	import {
		useUserStore
	} from '@/store/modules/user.js';
	import {
		useRouter
	} from "vue-router";
	import {
		getChat
	} from '@/api/index';
	const router = useRouter();
	const onClickLeft = () => {
		router.back();
	};
	const userStore = useUserStore();
	const serviceSrc = ref('')


	const getChatUrl = async () => {
		const res = await getChat()
		// console.log(res)
		serviceSrc.value = res.data.url
		// serviceSrc.value = 'https://chat.tiktokh.shop/#/userChat?userNo=499&nickname=tooy&remark=&csId=7&fromUrl=fromUrl&sign=90CA51E711E74A2C2E0859740A32C46D'
		// serviceSrc.value = 'http://192.168.31.40:2023/#/userChat?userNo=499&nickname=tooy&remark=&csId=7&fromUrl=fromUrl&sign=90CA51E711E74A2C2E0859740A32C46D'
	}
	onBeforeMount(() => {
		getChatUrl()
	})
</script>
<template>
	<header>
		<van-nav-bar :title="$t('service.service')" :left-text="$t('goback')" left-arrow @click-left="onClickLeft" />
	</header>
	<div class="iframe">
		<iframe style="height: 87vh; width: 100%; overflow: hidden;" frameborder="0" id="feee_c2c_widget"
			:src="serviceSrc"></iframe>
	</div>
</template>

<style scoped lang="scss">
	:deep(.van-nav-bar) {
		background-color: #009996 !important;
	}

	.iframe {
		width: 100%;
		background-color: #fff;
	}
</style>