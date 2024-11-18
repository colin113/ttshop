<script setup>
	import {
		checkInvite,
		languageList,
		changelanguage,
		third
	} from "@/api/index";
	import {
		useI18n
	} from 'vue-i18n';
	import IconPark from "@/components/IconPark/index.vue";
	import {
		onBeforeMount
	} from "vue";
	import tr from "@/lang/tr";
	//多语言
	const {
		locale,
		t
	} = useI18n();
	const router = useRouter();
	const route = useRoute();

	//定义邀请码
	const code = ref('');
	//定义'申请商户'展示状态
	const show = ref(false);
	const hideAll = ref(true);
	const status = ref(route?.query?.status || -1);
	const titleText = ref('');
	const titleTextColor = ref('#000');
	const isShowApplyBtn = ref(false);
	const isShowEmailLoginBtn = ref(false);
	let timeoutId;

	//切换语言
	//点击展示选项卡
	const showAction = ref(false);
	const Goto = () => {
		showAction.value = true;
	}
	//定义选项卡内容
	const actions = ref([])
	//从后端拿取默认语言,并且渲染语言列表
	const langList = ref([{
		chinese_name: "英语",
		createtime: 1712824643,
		file_name: "en",
		id: 2,
		is_default: 1,
		language_name: "English",
		status: 1
	}, {
		"id": 1,
		"language_name": "中文",
		"chinese_name": "中文",
		"file_name": "zh-CN",
		"status": 1,
		"is_default": 0,
		"createtime": 1712824643
	}])

	const actionList = ref([])
	//语言选项卡接口
	const defautlanguage = () => {
		// 	languageList({
		// 		page: 1,
		// 		limit: 10
		// 	}).then(res => {
		// 		langList.value = res.data.list;
		// 		//提取里面属性组成新的数组渲染选项卡
		actionList.value = langList.value.map(item => ({
			name: item.language_name,
			file_name: item.file_name
		}));
		// console.log(actionList.value)
		actions.value = actionList.value
		// console.log(actions.value)
		//存入一个数据判断是否执行过此功能,如未执行,就获取默认语言,如果获取过,页面更新就不再执行存入默认语言
		const hasExecutedFunction = localStorage.getItem('hasExecutedFunction');
		if (!hasExecutedFunction) {
			// console.log(langList.value)
			langList.value.forEach((item) => {
				if (item.is_default == 1) {
					localStorage.setItem('lang', item.file_name);
					location.reload()
				}
			})
			localStorage.setItem('hasExecutedFunction', 'true')
		}
		// 	})
	}
	//请求参数
	const lang1 = ref({
		lang: ''
	});
	//打开选择层
	const onSelect = (item) => {
		showAction.value = false;
		lang1.value.lang = item.file_name;
		locale.value = item.file_name;
		localStorage.setItem('lang', item.file_name);
		changelanguage(lang1.value).then(res => {
			if (res.code === 1) {
				showSuccessToast(res.msg)
			} else {
				showFailToast(res.msg)
			}
		})
		location.reload()
	};
	const getcheckInvite = () => {
		checkInvite({
			code: code.value
		}).then(res => {
			// console.log(res);
			if (res.code === 1) {
				localStorage.setItem('code', code.value)
				router.push('/register');
			} else {
				showToast(res.msg);
			}
		});
	};


	// const params = new URLSearchParams(window.location.search);
	// const paramValue = params.get('data');

	onMounted(() => {
		defautlanguage()

		if (route.query.status == null) {
			route.query.status = -1
		}

		if (route.query.status != null) {
			hideAll.value = false;
		}

		setPageStatus(route.query.status)
	});

	// 路由监听，重新加载数据
	watch(
		() => route.query.status,
		(newStatus) => {
			status.value = newStatus || -1;
			//statu=1 正常登录进去   -1 不存在  0审核中  -2  审核不通过
			if (status.value === -1) {
				hideAll.value = true;
			} else {
				hideAll.value = false;
				setPageStatus(status.value)
			}
		}
	);

<<<<<<< HEAD
	const setPageStatus = (statusValue) => {
		isShowEmailLoginBtn.value = false
		//status=1 正常登录进去   -1 不存在  0审核中  -2  审核不通过
		if (statusValue == -1) {
			isShowEmailLoginBtn.value = true
		}
		if (statusValue == -2) {
			isShowApplyBtn.value = true
			titleText.value = t("code.rejected")
			titleTextColor.value = "#E62E2F"
		} else if (statusValue == 0) {
			isShowApplyBtn.value = false
			titleText.value = t("rechargerecord.pending")
			titleTextColor.value = "#000"
			//只有审核中，才会去刷新状态
			startAutoRefresh()
		} else {
			isShowApplyBtn.value = true
			titleText.value = t("code.title")
		}
	};
=======
// 路由监听，重新加载数据
watch(
  () => route.query.status,
  (newStatus) => {
    status.value = newStatus || -1;
    //statu=1 正常登录进去   -1 不存在  0审核中  -2  审核不通过
    if (status.value === -1) {
       hideAll.value = true;
      //hideAll.value = false;
    } else {
      hideAll.value = false;
      setPageStatus(status.value)
    }
  }
);
>>>>>>> main

	const startAutoRefresh = () => {
		timeoutId = setTimeout(() => {
			requestThird()
		}, 10000); // 10秒后刷新一次
	};

	const requestThird = async () => {
		let params = {
			code: localStorage.getItem("code"),
			data: localStorage.getItem("data"),
			mer: localStorage.getItem("mer"),
		};
		const res = await third(params)
		// console.log("requestThird------000");
		if (res.code == 0) {
			//status=1 正常登录进去   -1 不存在  0审核中  -2  审核不通过
			// res.data = { status: 0 }
			if (res.data == null) return
			setPageStatus(res.data.status)
		} else {
			// console.log("requestThird------111");
		}
	}

	onBeforeUnmount(() => {
		clearTimeout(timeoutId); // 组件销毁前清除定时器
		// status.value = -1;
	});
</script>

<!-- <template>
	<header>
		<div class="mx-3  flex justify-end items-center mt-3" v-if="!hideAll">
			<span class="ml-3 pt-0.5">
				<icon-park name="earth" size="1.6rem" @click="Goto()" />
			</span>
		</div>
	</header>
	<div class="" v-if="!hideAll">
		<div class="flex justify-center items-center flex-col mt-60">
			<span>
				<icon-park name="financing-one" size="100" />
			</span>
			<span class="text-3xl">
				SHOP
			</span>
			<span class="text-xl mt-3 text-center" :style="{ color: titleTextColor }">{{ titleText }}</span>
			<span class="opacity-80">Currently supports internal invitations only</span>
			<div class="px-3 mt-20" v-if="isShowApplyBtn">
				<van-button block color="#191919" round style="height:45px;width: 50vw" @click="show = true">
					{{ $t("code.Apply") }}
				</van-button>
			</div>
			<div class="px-3 mt-10" v-if="isShowEmailLoginBtn">
				<van-button block color="#191919" round style="height:45px;width: 50vw"
					@click="router.push('/emailLogin')">
					{{ $t("newword.emailLogin") }}
				</van-button>
			</div>
		</div>
	</div>

	<van-popup v-model:show="show" :style="{ height: '50%' }" class="rounded-t-2xl" position="bottom bg-white">
		<div class="mx-6">
			<div class="grid grid-cols-3 mt-6">
				<div></div>
				<div class="text-center ">
					<span class="font-semibold text-xl"> {{ $t("code.Open") }}</span>
				</div>
				<div class="ml-auto" @click="show = false">
					<icon-park name="close" size="20" />
				</div>
			</div>
			<div class="mt-6">
				<h5 class="font-semibold text-xl">{{ $t("code.Authentication") }}</h5>
				<input v-model="code" class="border border-black rounded-3xl w-full h-10 bg-gray-100 mt-3 p-6"
					:placeholder="$t('code.enter')" type="text" />
			</div>
			<div class="bg-black h-14 rounded-3xl text-white flex justify-center items-center mt-40"
				@click="getcheckInvite">
				<span>{{ $t("code.Open") }}</span>
			</div>
		</div>
	</van-popup> -->
<template>
	<img src="@/assets/image/login/bg.png" class="bg" @click="showLogin = ''" />

	<div class="page text-white">
		<header>
			<div class="mx-3  flex justify-between items-center mt-3">
				<span class="ml-3 pt-1 font-semibold text-3xl text-black" style="color: #fff;">{{ $t("code.Apply")
						}}</span>
				<!-- <span class="ml-3 pt-0.5">
	          <icon-park name="left" @click="onClickLeft" size="1.6rem"/>
	        </span>-->
				<span class="ml-3 pt-0.5">
					<icon-park name="earth" size="1.6rem" color="#fff" @click="Goto()" />
				</span>
			</div>
		</header>
		<main>
			<div class="flex justify-center items-center flex-col mt-40">
				<img style="width: 5rem;" src="@/assets/image/login/logo.png" alt="">
				<div class="mt-2">
					<span class="font-semibold text-3xl text-white">TikTok Mall</span>
				</div>
			</div>
			<div class="h-3/5 rounded-t-2xl fixed bottom-0" style="width:100vw;height: 60%;">
				<van-form @submit="onSubmit1()" class="mx-3 mt-6 login">
					<div class="mx-3">
						<div class="text-white mb-3">
							<span style="color:var(--van-field-required-mark-color)">*</span>{{
								$t("code.Authentication") }}
						</div>
						<div>
							<van-field class="rounded-lg" preview-size="4rem" style="color: #fff;"
								:placeholder="$t('code.enter')" v-model="code" required
								:rules="[{ required: true, message: $t('code.enter') }]" />
						</div>
					</div>
					<div class="bg-black mx-3 h-16 flex justify-center items-center text-white mt-10">
						<van-button style="background-color:  #009996;" native-type="submit" @click="getcheckInvite"> {{
								$t("login.login") }}</van-button>
					</div>
				</van-form>
			</div>
		</main>
	</div>
	<van-action-sheet v-model:show="showAction" :actions="actions" @select="onSelect" />
</template>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		overflow: hidden;
		--van-field-input-text-color: #fff;
	}

	.van-cell {
		padding: 10px 0;
	}

	:deep(.van-uploader__upload) {
		margin: 0;
	}

	.van-button--default {
		height: 100%;
		width: 100%;
		color: white;
		background-color: black;
		border: 0 solid white;
	}

	.rounded-lg {
		margin: 0;
	}

	.bg {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: -1;
		bottom: 0;
	}

	:deep(.van-nav-bar) {
		background-color: #f8f8f8 !important;
	}

	:deep(.van-nav-bar__left) {

		.van-icon,
		.van-nav-bar__text {
			color: #000 !important;
		}
	}

	.h42 {
		// height: 3rem;
	}

	.flex-column {
		flex-direction: column;
		align-items: flex-start !important;

		.imgs {
			width: 100%;
		}
	}

	.item-ts {
		background-color: #fff;
		padding: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 6px;
		margin-bottom: 1.2rem;

		:deep(.van-uploader__upload) {
			border-radius: 100%;
			height: 4rem;
			width: 4rem;
			background: #D9F0EF;

			i {
				color: #009996;
			}
		}

		// :deep(.van-uploader__preview) {
		// 	// border-radius: 100%;
		// 	height: 4rem;
		// 	width: 4rem;
		// 	overflow: hidden;
		// 	margin: 0;

		// }
	}

	.item {
		background-color: #fff;
		padding: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 6px;
		margin-bottom: 1.2rem;
		min-height: 4rem;

		>.right {
			display: flex;
			align-items: center;
		}

		:deep(.van-field__error-message) {
			text-align: right;
		}
	}



	.login {
		:deep(.van-cell) {
			background-color: transparent;
			border-radius: 5px 5px 5px 5px;
			border: 1px solid #FFFFFF;
			padding-left: 1rem;
		}
	}

	.btn {
		height: 3.2rem;
		border-radius: 5px 5px 5px 5px;
	}
</style>