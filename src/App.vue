<script setup>
	// const tologin=()=>{
	//   if($route.meta.data){
	//
	//   }
	// }
	// onBeforeMount(()=>{
	//   tologin()
	// })
	// console.log(window.location)
	import {
		third
	} from "@/api/index.js";
	import {
		useRouter
	} from "vue-router";
	import {
		useUserStore
	} from '@/store/modules/user.js';

	//获取当前窗口参数
	const params = new URLSearchParams(window.location.search);
	//  const paramValue = 'ewogICJjdXN0b21JRCIgOiAiQGNvbGlubGluNTMiLAogICJhdmF0YXIiIDogImh0dHBzOlwvXC9wMTYtc2lnbi1zZy50aWt0b2tjZG4uY29tXC90b3MtYWxpc2ctYXZ0LTAwNjhcLzcyMzA3MjQxOTYyMjM5NDI2NTh YzVfMzAweDMwMC53ZWJwP2xrM3M9YTVkNDgwNzgmbm9uY2U9ODU1NDUmcmVmcmVzaF90b2tlbj0zMTMxZGVlNmQwNmRiMjlmOGFmMTQwYTA4OGU0MTk4MiZ4LWV4cGlyZXM9MTcyNTY5NjAwMCZ4LXNpZ25hdHVyZT1vcjhBUzdSVUolMkYlMkZhZDBxMlh2bCUyRlhXS25CM1ElM0Qmc2hwPWE1ZDQ4MDc4JnNoY3A9MjQ3MmE2YzYiLAogICJsYW5nIiA6ICJ6aC1IYW5zIiwKICAibmlja25hbWUiIDogImNvbGlubGluNTMiLAogICJ0aW1lem9uZSIgOiAiR01UKzA3OjAwIiwKICAidGlrdG9rX2lkIiA6ICI3MjE5NjU4ODYxMzAzNjk0MzM3IiwKICAidmVyc2lvbiIgOiAidjAuMC40IiwKICAidGltZXN0YW1wIiA6IDE3MjU1MjYzNjU3ODEsCiAgInJvdXRlIiA6ICJzaG9wQ2VudGVyIgp9';
	const paramValue = params.get('data');
	const code = params.get('code');
	const mer = params.get('mer');
	const path = params.get('path');

	console.log(paramValue, code, mer, path);
	const query = {
		data: paramValue,
		code,
		mer
	};
	const router = useRouter();
	const userStore = useUserStore();

	const loading = showLoadingToast({
		message: 'Loading...',
		forbidClick: true,
		loadingType: 'spinner',
		duration: 0
	});

	if (paramValue) {
		third(query).then(res => {
			loading.close();
			//status  =1 正常登录进去   -1 不存在  0审核中  -2  审核不通过
			if (res.code == 0 || res.data.status == 0) {
				localStorage.setItem('data', paramValue);
				// router.push('/code')
				if (res.data == null) {
					res.data = {
						status: -1
					}
				}
				router.push({
					path: '/code',
					query: {
						status: res.data.status
					}
				})
			} else {
				userStore.token = res.data.merinfo.token;
				if (userStore.token) {
					if (path) {
						router.push(path);
					} else {
						router.push('/home');
					}
				}
			}
			return;
		});
	} else {
		loading.close();
	}

	onMounted(() => {

	});

	//我需要判断当前是ios还是安卓
	const getisIos = () => {
		const u = navigator.userAgent;
		return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		// return false
	};

	const isIos = getisIos();

	console.log(isIos);
</script>

<template>
	<div class="relative">
		<!-- <div v-if="isIos">
      <div class="h-20 bg-black fixed top-0 w-full z-50">
      </div>
      <div class="h-20">
      </div>
    </div> -->
		<div>
			<router-view />
		</div>
	</div>
	<!--  <router-view/>-->
</template>

<style scoped>
	@font-face {
		font-family: 'YouSheBiaoTiHei';
		src: url("@/assets/icons/YouSheBiaoTiHei.ttf");
	}

	@font-face {
		font-family: 'Poppins';
		src: url("@/assets/icons/Poppins.ttf");
	}

	@font-face {
		font-family: 'PangMenZhengDao-3-Regular';
		src: url("@/assets/icons/PangMenZhengDao.ttf");
	}

	@font-face {
		font-family: 'PangMenZhengDao';
		src: url("@/assets/icons/PangMenZhengDao.ttf");
	}

	* {
		font-family: Poppins !important;
	}
</style>