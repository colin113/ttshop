<script setup>
import tabbers from '@/components/tabbar/index.vue';
import {
	changelanguage,
	finance,
	notice,
	languageList,
	ranklist
} from "@/api/index.js";
import {
	useUserStore
} from '@/store/modules/user.js';
import {
	useRouter
} from 'vue-router';
import {
	useI18n
} from 'vue-i18n';
import {
	showFailToast,
	showSuccessToast
} from "vant";

const {
	locale,
	t
} = useI18n();
const router = useRouter();
//仓库中获取商户信息请求函数
const userStore = useUserStore();
//切换语言
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
const defautlanguage = () => {
	// languageList({page: 1, limit: 10}).then(res => {
	//   langList.value = res.data.list;
	//提取里面属性组成新的数组渲染选项卡
	actionList.value = langList.value.map(item => ({
		name: item.language_name,
		file_name: item.file_name
	}));
	// console.log(actionList.value)
	actions.value = actionList.value
	console.log(actions.value)
	//存入一个数据判断是否执行过此功能,如未执行,就获取默认语言,如果获取过,页面更新就不再执行存入默认语言
	const hasExecutedFunction = localStorage.getItem('hasExecutedFunction');
	if (!hasExecutedFunction) {
		console.log(langList.value)
		langList.value.forEach((item) => {
			if (item.is_default == 1) {
				localStorage.setItem('lang', item.file_name);
				location.reload()
			}
		})
		localStorage.setItem('hasExecutedFunction', 'true')
	}
	// })
}


//请求参数
const lang1 = ref({
	lang: ''
});
//打开选择层
const show = ref(false);
const onSelect = (item) => {
	show.value = false;
	lang1.value.lang = item.file_name;
	locale.value = item.file_name;
	console.log("file_name----:" + item.file_name)
	localStorage.setItem('lang', item.file_name);
	// changelanguage(lang1.value).then(res => {
	//   if (res.code === 1) {
	//     console.log(1)
	//     showSuccessToast(res.msg)
	//   } else {
	//     showFailToast(res.msg)
	//   }
	// })
	location.reload()
};
const contentList = ref([]);
const getNotice = async () => {
	const res = await notice(lang1.value);
	console.log(res.data);
	contentList.value = res.data;
	// console.log(contentList.value);
};
//列表图片
const imgs = ref({
	icon1: new URL('@/assets/image/my/info.png', import.meta.url).href, //个人信息
	icon2: new URL('@/assets/image/my/lang.png', import.meta.url).href, //语言
	icon3: new URL('@/assets/image/my/applyForRefund.png', import.meta.url).href, //申请退款
	icon4: new URL('@/assets/image/my/financialRecords.png', import.meta.url).href, //资金记录
	icon5: new URL('@/assets/image/my/financialReports.png', import.meta.url).href, //财务报表
	icon6: new URL('@/assets/image/my/entrepreneurAlliance.png', import.meta.url).href, //创业联盟
});
//列表
const list = ref(
	[{
		name: t('my.applyForRefund'),
		path: '/refundRequest', //申请退款
		icon: new URL('@/assets/image/my/applyForRefund.png', import.meta.url).href
	},
	{
		name: t("my.financialRecords"),
		path: '/fundsRecords', //资金记录
		icon: new URL('@/assets/image/my/financialRecords.png', import.meta.url).href
	},
	{
		name: t("my.financialReports"),
		path: '/finance', //财务报表
		icon: new URL('@/assets/image/my/financialReports.png', import.meta.url).href
	},
	{
		name: t("my.entrepreneurAlliance"),
		path: '/alliance', //创业联盟
		icon: new URL('@/assets/image/my/entrepreneurAlliance.png', import.meta.url).href
	}, {
		name: t("my.VIPAlliance"),
		path: '/vip', //VIP联盟
		icon: new URL('@/assets/image/my/VIPAlliance.png', import.meta.url).href
	},
	{
		name: t("my.prizePoolRanking"),
		path: '/prizePoolRanking', //奖池排行榜
		icon: new URL('@/assets/image/my/prizePoolRanking.png', import.meta.url).href
	},
	]
);

const userSettings = ref([{
	name: t('my.info'),
	path: '/personalInfo', //个人信息
	icon: new URL('@/assets/image/my/info.png', import.meta.url).href
}, {
	name: t("my.lang"),
	path: '/lang', //语言
	icon: new URL('@/assets/image/my/lang.png', import.meta.url).href
},])
//去对应页面
const Goto = ((path) => {
	if (path == "/prizePoolRanking") {
		getRanklist(path)
	} else {
		if (path === '/lang') {
			show.value = true;
			return;
		}
		router.push(path);
	}
});
//退出登录
const loginOut = () => {
	showConfirmDialog({
		title: t("my.logout"),
		message: t("my.confirmLogout"),
		cancelButtonText: t("my.cancel"),
		confirmButtonText: t("my.confirm"),
	})
		.then(() => {
			userStore.nologin();
		})
		.catch(() => {
			// on cancel
		});
};
//
// //悬浮窗
// const offset = ref({y: 500});
//财务报告中待到账金额获取
const totalunreceived = ref('');
const getfinance = () => {
	finance({
		range: 'all',
		page: '1',
		limit: '10'
	}).then(res => {
		console.log(res.data.total_unreceived);
		totalunreceived.value = res.data.total_unreceived;
	});
};

onMounted(() => {
	const headerData = ref({});
	getNotice();
	userStore.toGetMerInfo();
	getfinance();
	defautlanguage()
	// getRanklist()
});
const is_open = ref(null)
const getRanklist = async (path) => {
	let res = await ranklist()
	is_open.value = res.data.is_open
	if (is_open.value != 1) {
		showFailToast('排行榜暂未开放')
		return
	} else {
		router.push(path);
	}
}
</script>

<template>
	<div class="container_mix">
		<div class="bg">
			<img src="@/assets/image/BG.png">
		</div>
		<div class="bg-white w-[100vw] h-[100vh]" style="position: fixed;z-index: -2;top: 0;left: 0;"></div>
		<!-- <header class="h-40" style="position: relative;z-index: 3;">
			<div class="mx-3 pt-6 flex items-center">
				<div>
					<van-image :src="userStore.MerInfo.mer_avatar" height="60px" lazy-load round width="60px" />
				</div>
				<div class="flex flex-col ml-3">
					<span class="font-semibold text-lg text-white">{{ userStore.MerInfo.mer_email }}</span>
					<span class="text-sm text-white"> ID:{{ userStore.MerInfo.mer_id }}</span>
				</div>
				<div class="ml-auto mr-3">
				</div>
			</div>
		</header> -->
		<header>
			<div class="flex my-6 mx-6  text-white ">
				<div class="flex items-center mr-auto w-[70%]">
					<van-image width="4.6rem" height="4.6rem" round :src="userStore.MerInfo.mer_avatar" />
					<div class="flex flex-col ml-[.6rem] justify-around "
						style="height: 100%;width: calc(100% - 5.2rem);">
						<div class="mt-1 flex justify-left items-end">
							<span class="text-lg text-white ml-1.5 font-semibold ">{{ userStore.MerInfo.mer_name
								}}</span>
							<span class=" text-white ml-3  ">ID:{{ userStore.MerInfo.mer_id }}</span>
						</div>
						<div class="mt-1 flex justify-left ">
							<span class="text-lg text-white ml-1.5" style="overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;">{{ userStore.MerInfo.mer_info }}</span>
						</div>
						<!--            <div class="ml-1 mt-2">-->
						<!--              <span class="text-sm  px-3 py-2 rounded-xl bg-gradient-to-r from-[#6B6B6B]  to-[#1C1B1B]">未认证</span>-->
						<!--            </div>-->
					</div>
				</div>
				<div class="flex items-center ml-auto">
					<div class="flex items-center ml-auto">
						<van-badge class="mr-3" :content="userStore.MerInfo.unread_notice"
							@click="router.push('/message')" style="position: relative;">
							<div
								style="background: #FFFFFF;opacity: 0.35;width: 3rem;height: 3rem;position: absolute;border-radius: 100%;">
							</div>
							<div
								style="width: 3rem;height: 3rem;display: flex;justify-content: center;align-items: center;">
								<img class="h-8 w-8" src="@/assets/image/my/chat.png" alt="">
							</div>

						</van-badge>
					</div>
				</div>
				<div class="h-10">
				</div>
			</div>
		</header>
		<main class="mx-3">
			<div class="bg-white py-6 px-2 mx-3 rounded-md mt-10 back_4">
				<div class="flex items-center mx-3">
					<span class="font-semibold text-xl pr-3">{{ $t("my.Amount") }}</span>
					<span class="text-xl text-[#FE4857] mr-2" style="font-width:800">{{ totalunreceived || 0.00 }}</span>
					<van-icon name="replay" size="14px" @click="userStore.toGetMerInfo" />
				</div>
				<div class="bg-white mx-3  z-10 rounded-md py-7 pb-4">
					<div class="grid grid-cols-2 grid-flow-col gap-4 rounded-b-lg">
						<div class="flex flex-col justify-center items-start">
							<div class="antialiased  font-semibold totalsales">
								{{ $t("my.Balance") }}
							</div>
							<div class="antialiased  font-semibold text-2xl moneyValue">
								<!-- <van-icon name="cart-circle-o" /> -->
								$ {{ userStore.MerInfo.mer_money || 0.00 }}
							</div>
						</div>
						<div class="flex flex-col justify-center items-start">
							<div class="antialiased  font-semibold totalsales">{{ $t("my.Income") }}</div>
							<div class="antialiased  font-semibold text-2xl moneyValue red">
								$ {{ userStore.MerInfo.total_income || 0.00 }}
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="flex mt-6 justify-between">
					<div class="mx-3 flex flex-column items-left" style="flex-direction: column;">
						<span class="text-sm">{{ $t("my.Balance") }}</span>
						<span class="font-semibold">{{ userStore.MerInfo.mer_money || 0}}</span>
					</div>
					<div class="mx-3 flex flex-column items-left" style="flex-direction: column;">
						<span class="pr-2 text-sm">{{ $t("my.Income") }}</span>
						<span class="font-semibold">{{ userStore.MerInfo.total_income || 0}}</span>
					</div>
				</div> -->
				<div class="grid grid-cols-2 mx-3 mt-3 gap-3 ">
					<div class="bg-[#E5F4F4] h-10 rounded-md text-[#009996] h-[3rem] flex justify-center items-center"
						@click="router.push('/recharge')">
						<span>{{ $t("my.deposit") }}</span>
					</div>
					<div class="bg-[#009996] h-10 rounded-md h-[3rem] flex justify-center items-center"
						@click="router.push('/withdraw')">
						<span class="text-white">{{ $t("my.Withdraw") }}</span>
					</div>
				</div>
			</div>

			<!--    系统通知-->
			<div class="mx-3 mt-10 bg-[#F2FAFA] h-[4.5rem] back_4 flex items-center contentList">
				<div class="w-[70%] notice notice-text mx-3" v-if="contentList.length > 0">
					<van-notice-bar background="#F2FAFA" class="rounded-md" color="#000000" scrollable>
						<span v-for="(item, index) in contentList" class="mr-0.5" :key="index">{{ item.content }}</span>
					</van-notice-bar>
					<img src="@/assets/image/home1/gg.png" alt="" />
				</div>
				<!-- <van-notice-bar background="#ffffff" class="rounded-md back_4" color="#000000" left-icon="volume-o"
					scrollable>
					<span v-for="item in contentList" class="mr-0.5">{{ item.content }}</span>
				</van-notice-bar> -->
			</div>
			<div class="mx-3 bg-white  mt-3 rounded-md back_4  h-[14rem]">
				<div class="grid grid-cols-3 grid-flow-row gap-x-2 mx-3 rounded-b-lg mt-3 text-center h-[100%]">
					<div class="flex flex-col justify-center items-center py-3 h-[100%]" v-for="(item, index) in list"
						@click="Goto(item.path)" :key="index">
						<div class="flex justify-center container" style="height: 50%;">
							<img :src="item.icon" class="w-7 h-7 my-2" alt="">
						</div>
						<div style="height: 50%;" class="flex items-center">
							<span class="text-sm text-neutral-500">{{ item.name }}</span>
						</div>
					</div>
				</div>
			</div>
			<view class="mx-3">
				<view class="grid grid-cols-2 grid-flow-row gap-x-6 mx-3  py-0">
					<div class="flex justify-center items-center py-3 p-4 bg-white back_4"
						v-for="(item, index) in userSettings" @click="Goto(item.path)" :key="index">
						<div class="flex container" style="width: 20%;">
							<img :src="item.icon" class="w-7 h-7 my-2" alt="">
						</div>
						<div style="width: 70%;padding-left: .4rem;">
							<span class="text-sm text-neutral-500">{{ item.name }}</span>
						</div>
						<div
							style="width:10%;height: 100%;align-items: center;display: flex;justify-content: flex-end;">
							<van-icon name="arrow" />
						</div>
					</div>
				</view>
			</view>
			<!-- <div class="bg-white mx-3 mt-3 back_4 ">
				<div v-for="item in list.slice(0,3)" :key="item.path"
					class="flex py-3 mx-3 justify-between border-b border-gray-100 " @click="Goto(item.path)">
					<div class="flex items-center">
						<img :src="item.icon" alt="" class="w-6">
						<span class="text-base pl-2">{{ item.name }}</span>
					</div>
					<div class="flex items-center">
						<van-icon name="arrow" size="18px" />
					</div>
				</div>
			</div>
			<div class="bg-white mx-3 mt-6 back_4">
				<div v-for="item in list.slice(3)" class="flex py-3 mx-3 justify-between border-b border-gray-100"
					@click="Goto(item.path)">
					<div class="flex items-center">
						<img :src="item.icon" alt="" class="w-6">
						<span class="text-base pl-2">{{ item.name }}</span>
					</div>
					<div class="flex items-center">
						<van-icon name="arrow" size="18px" />
					</div>
				</div>
			</div> -->
<!--      <div class="bg-black mx-3 mt-3 flex justify-center items-center rounded-md py-3">
        <span class="text-white" @click="loginOut">{{ $t("my.logout") }}</span>
      </div>
			<div class="h-[4.5rem]"></div>-->
		</main>
	</div>
	<tabbers></tabbers>
	<!--  <van-floating-bubble v-model:offset="offset" axis="xy" icon="chat" @click="router.push('/service')"/>-->
	<van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>

<style lang="scss" scoped>
body {
	background-color: #fff !important;
}

.bg {
	width: 100%;
	height: 268px;
	background: linear-gradient(180deg, #40A295 0%, #069895 35%, #fff);
	border-radius: 0px 0px 0px 0px;
	position: absolute;
	top: 0;
	z-index: -1;
}

.bottom {
	height: calc(100vh - 40px);
	height: calc(100dvh - 40px);
	padding-bottom: 30px;
}

.totalsales {
	font-family: Poppins;
	font-weight: 500;
	font-size: 1.2rem;
	color: #181818;
	line-height: 1.2rem;
	margin-bottom: .8rem;
}

.moneyValue {
	font-family: Poppins;
	font-weight: 800;
	font-size: 1.5rem;
	color: #009996;
	line-height: 2.2rem;
}

.greed {
	color: #009996;
}

.red {
	color: #FE4938;
}

.contentList {
	position: relative;

	img {
		position: absolute;
		bottom: 0;
		right: 0;
		height: 7rem;
	}
}

.notice {
	font-size: 1.2rem;
	// line-height: 100%;
	font-family: Poppins;
	font-weight: 400;
	color: #141A52;

}

.notice-text {
	font-size: 1.2rem;
	// line-height: 100%;
	font-family: Poppins;
	font-weight: 400;
	color: #141A52;

}
</style>