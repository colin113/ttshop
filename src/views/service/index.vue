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

	 serviceSrc.value = res.data.url
	// serviceSrc.value = "https://manage.tiktokh.shop/chatlink.html?metadata={%22name%22:%22%E8%80%81%E7%8E%8B%22,%22qq%22:%22123456%22,%22age%22:%2211%22}"

	}
	onBeforeMount(() => {
		getChatUrl()
	})
</script>
<template>
<!--	<header>
		<van-nav-bar :title="$t('service.service')" :left-text="$t('goback')" left-arrow @click-left="onClickLeft" />
	</header>-->
	<div class="iframe">
		<iframe style="height: 93vh; width: 100%; overflow: hidden;" frameborder="0"
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