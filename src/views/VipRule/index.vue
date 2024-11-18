<template>
	<div class="w-[100vw] h-[100vh] fixed z-[-3] bg-white"></div>
	<div class="bg"></div>
	<header>
		<van-nav-bar :title="$t('VipRule.title')" :border="false" :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft" />
	</header>
	<main class="px-[1.8rem]">
		<div class="h-[20rem] bg-white rounded-[.6rem] mt-14 p-[1.3rem]">
			<img src="@/assets/image/vip/flowChart.png" alt="">
		</div>
		<div class="mt-2">

			<!-- <div class="mt-[1.5rem] text-[#181818] ">
				<div class="mt-[1.2rem] text-[0.85rem]" style="word-wrap:break-word">
					{{$t('VipRule.RuleDetail.V1')}}
				</div>
				<div class="mt-[1.2rem] text-[0.85rem]" style="word-wrap:break-word">
					{{$t('VipRule.RuleDetail.V2')}}
				</div>
				<div class="mt-[1.2rem] text-[0.85rem]" style="word-wrap:break-word">
					{{$t('VipRule.RuleDetail.VN')}}
				</div>
				<div class="mt-[.4rem] text-[0.85rem] text-[#888888] " style="word-wrap:break-word">
					{{$t('VipRule.RuleDetail.remark')}}
				</div>
				<div class="mt-[.6rem] text-[0.85rem]" style="word-wrap:break-word">
					{{$t('VipRule.RuleDetail.X')}}
				</div>
				<div class="mt-[1.2rem] text-[0.85rem]" style="word-wrap:break-word">
					{{$t('VipRule.RuleDetail.M')}}
				</div>
				<div class="mt-[1.2rem] text-[0.85rem]" style="word-wrap:break-word">
					{{$t('VipRule.RuleDetail.Q')}}
				</div>
				<div class="mt-[.4rem] text-[0.85rem] text-[#888888] " style="word-wrap:break-word">
					{{$t('VipRule.RuleDetail.remark2')}}
				</div>
			</div> -->
			<div class="text-[1.6rem] text-[#141A52] mt-[2.2rem]">{{ $t('VipRule.Rule') }}</div>
			<div class="mt-[1.6rem] pb-[2rem]">
				<div v-for="(item, index) in RuleArray" :key="index">
					<div class="font-semibold text-[.85rem] mt-[1rem]">{{ item.title }}</div>
					<div class="text-[.85rem] mt-[1rem]" v-for="(v, i) in item.data" :key="i">
						{{ v }}
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import {
	useI18n
} from 'vue-i18n';
import {
	level
} from "@/api/index.js";
//多语言
const {
	t
} = useI18n();
const router = useRouter();
const onClickLeft = () => {
	router.back();
};
const lang = localStorage.getItem("lang")
// console.log();
const RuleArray = ref([])

if (lang == "en") {
	RuleArray.value = [{
		"title": "1、 Satisfy VIP setting conditions and rules",
		"data": ["1.The number of valid invitations reaches the set value",
			"2.You need to open 10 valid stores, and each store will be considered a valid store if the total monthly order volume reaches 5,000 US dollars",
			"For example: "
		]
	}, {
		"title": "2、 VIP logic (very bad)",
		"data": [
			"1. For example: A invites B, C, D, E, F, G, H, etc. When A meets the highest level of set conditions, A can get 15% of the income of subordinates (B, C, D, E, etc.) When B meets the VIP1 set conditions, A can get 10% of the income of subordinates (B, C, D, E, etc.), and B can get 5% of the income of subordinates (C, D, E, F, etc.)",
			"2. ​For example: A invites B, C, D, E, F, G, H, etc. When A meets the highest level of set conditions, A can get 15% of the income of subordinates (B, C, D, E, etc.) When B meets the highest level of set conditions, A can get 0% of the income of subordinates (B, C, D, E, etc.), and B can get 15% of the income of subordinates (C, D, E, F, etc.)"
		]
	}]
} else {
	RuleArray.value = [{
		"title": "1、 满足VIP设置条件规则",
		"data": ["1.邀请有效人数达到设定值", "2. 需要下级开通有效10家店铺，每家店铺每月订单总量达到5千美金 则为有效店铺", "如："]
	}, {
		"title": "2、 VIP逻辑(极差)",
		"data": [
			"1. 例如：A邀请B邀请C邀请D邀请E邀请F邀请G 邀请H 等…… 当A满足设定条件最高级时，A可以得到下级(B.C.D.E.等)的收益15% 当B满足设定条件VIP1时，A可以得下级(B.C.D.E.等)的收益10%， B可以得到下级(C.D.E.F等)收益的5%",
			"2. ​例如：A邀请B邀请C邀请D邀请E邀请F邀请G 邀请H 等…… 当A满足设定条件最高级时，A可以得到下级(B.C.D.E.等)的收益15% 当B满足设定条件最高级时，A可以得下级(B.C.D.E.等)的收益0%， B可以得到下级(C.D.E.F等)收益的15%."
		]
	}]
}
console.log(RuleArray.value);
const getlevel = () => {
	level().then(res => {
		console.log('res')
		res.data.forEach((data, index) => {
			let str = ''
			let item = res.data[res.data.length - index - 1]
			if (lang == 'en') {
				str = item.name_en + ' needs to invite ' + item.merchant_num + ' people to open a store and meet the requirements of a valid store'
			}else{
				str = item.name + ' 需要邀请' + item.merchant_num +'个人开设店铺并达到有效店铺的要求'

			}
			RuleArray.value[0].data.push(str)
		});
	})
}
getlevel()
</script>

<style scoped lang="scss">
:deep(.van-nav-bar) {
	background-color: transparent !important;
}

.bg {
	width: 100%;
	height: 268px;
	background: linear-gradient(180deg, #40A295 0%, #069895 20%, #fff);
	border-radius: 0px 0px 0px 0px;
	position: absolute;
	top: 0;
	z-index: -1;
}
</style>