<template>
	<div class="bg"></div>
	<header>
		<van-nav-bar :title="$t('prizePoolRanking.title')" :border="false" :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft" />
	</header>
	<main>
		<div class="flex justify-center absolute top-[var(--van-nav-bar-height)] w-[100%]">
			<img src="@/assets/image/prizePoolRanking/banner.png" class="h-[16rem]" alt="">
		</div>
		<div class="relative top-[12rem] bg-[#F8F8F8] py-[1.8rem] px-[1.4rem]"
			style="border-radius: 30px 30px 0px 0px;">
			<!-- height: calc(100vh - var(--van-nav-bar-height) - 12rem); -->
			<div class="title text-[#141A52] text-[1.2rem] font-semibold">{{$t('prizePoolRanking.subtitle')}} $1,000,000
			</div>
			<div class="mt-[2.5rem] grid grid-cols-3 gap-x-2 items-end">
				<div class="h-[11.43rem] bg-white pt-[.7rem] px-[.9rem] rounded-[.5rem] back_4 relative"
					v-if="top.length>1">
					<div
						style="position: absolute;top:-1.2rem;left:0;z-index:10; width: 100%;display: flex;justify-content: center;">
						<img src="@/assets/image/product/top2.png" class="w-[4rem]" alt="">
					</div>
					<div class="h-[70%] ">

						<div class="flex justify-center">
							<van-image width="3.8rem" height="3.8rem" round fit="cover" :src="top[1].mer_avatar" />
						</div>
						<div class="mt-[.7rem] flex justify-center font-semibold text-[1.2rem] text-[#181818] ">
							<div class="block ellipsis text-center">{{top[1].mer_name}}</div>
						</div>
						<div class="mt-[.4rem] flex justify-center">
							<span class="text-[.8rem] text-[#888888] ">{{$t('prizePoolRanking.Promotion')}}</span>
							<span
								class="text-[.8rem] text-[#009996] ml-2 font-semibold">{{top[1].rank_invite_num}}</span>
						</div>
					</div>
					<div class="mt-[.8rem] flex justify-center h-[20%]">
						<span class="text-[.8rem] text-[#888888] ">TOP2{{$t('prizePoolRanking.Rewards')}}</span>
						<span class="text-[.8rem] text-[#009996] ml-1 font-semibold">{{top[1].rate}}%</span>
					</div>
				</div>
				<div class="h-[12rem] bg-white pt-[.7rem] px-[.9rem] rounded-[.5rem] back_4 relative"
					v-if="top.length>0">
					<div
						style="position: absolute;top:-1.2rem;left:0;z-index:10; width: 100%;display: flex;justify-content: center;">
						<img src="@/assets/image/product/top1.png" class="w-[4rem]" alt="">
					</div>
					<div class="h-[70%]">

						<div class="flex justify-center">
							<van-image width="3.8rem" height="3.8rem" round fit="cover" :src="top[0].mer_avatar" />
						</div>
						<div class="mt-[.7rem] flex justify-center font-semibold text-[1.2rem] text-[#181818] ">
							<div class="block ellipsis text-center">{{top[0].mer_name}}</div>
						</div>
						<div class="mt-[.4rem] flex justify-center">
							<span class="text-[.8rem] text-[#888888] ">{{$t('prizePoolRanking.Promotion')}}</span>
							<span
								class="text-[.8rem] text-[#009996] ml-2 font-semibold">{{top[0].rank_invite_num}}</span>
						</div>
					</div>
					<div class="mt-[.8rem] flex justify-center h-[20%]">
						<span class="text-[.8rem] text-[#888888] ">TOP1{{$t('prizePoolRanking.Rewards')}}</span>
						<span class="text-[.8rem] text-[#009996] ml-1 font-semibold">{{top[0].rate}}%</span>
					</div>
				</div>
				<div class="h-[11.43rem] bg-white pt-[.7rem] px-[.9rem] rounded-[.5rem] back_4 relative"
					v-if="top.length>2">
					<div
						style="position: absolute;top:-1.2rem;left:0;z-index:10; width: 100%;display: flex;justify-content: center;">
						<img src="@/assets/image/product/top3.png" class="w-[4rem]" alt="">
					</div>
					<div class="h-[70%]">

						<div class="flex justify-center">
							<van-image width="3.8rem" height="3.8rem" round fit="cover" :src="top[2].mer_avatar" />
						</div>
						<div class="mt-[.7rem] flex justify-center font-semibold text-[1.2rem] text-[#181818] ">
							<div class="block ellipsis text-center">{{top[2].mer_name}}</div>
						</div>
						<div class="mt-[.4rem] flex justify-center">
							<span class="text-[.8rem] text-[#888888] ">{{$t('prizePoolRanking.Promotion')}}</span>
							<span
								class="text-[.8rem] text-[#009996] ml-2 font-semibold">{{top[2].rank_invite_num}}</span>
						</div>
					</div>
					<div class="mt-[.8rem] flex justify-center h-[20%]">
						<span class="text-[.8rem] text-[#888888] ">TOP3{{$t('prizePoolRanking.Rewards')}}</span>
						<span class="text-[.8rem] text-[#009996] ml-1 font-semibold">{{top[2].rate}}%</span>
					</div>
				</div>
			</div>
			<div v-if="List.length<=0 ">
				<van-empty :description="$t('prizePoolRanking.noRecords')" />
			</div>
			<div class="mt-[2.5rem] mx-3 block relative pb-[2rem]" v-if="List.length>0 ">
				<div class="h-[5.2rem] flex justify-between bg-[#fff] mt-4 py-[1.2rem] px-[.7rem] rounded-[.5rem]"
					v-for="(item,index) in List" :key="index">
					<div class="h-[3rem] w-[3rem] flex items-center justify-center relative mr-[0.3rem]">
						<van-image height="3rem" round :src="pm" />
						<div
							class="h-[100%] w-[100%] flex justify-center items-center absolute text-[1rem] text-[#FFFFFF]">
							{{(index+4)}}
						</div>
					</div>
					<div class="h-[3rem] w-[3rem] flex items-center">
						<van-image height="3rem" width="3rem" round :src="item.mer_avatar" />
					</div>
					<div class="pl-3 flex flex-col justify-between" style="width: calc(70% - 6.2rem);">
						<div class="text-[#181818] font-semibold">{{item.mer_name}}</div>
						<div>
							<span class="text-[#888888]">{{$t('prizePoolRanking.Promotion')}}</span>
							<span class="text-[#009996] ml-1 font-semibold">{{item.rank_invite_num}}</span>
						</div>
					</div>
					<div class="w-[30%]">
						<div class="flex justify-end items-end h-[100%]">
							<span class="text-[#888888]">top{{(index+4)+$t('prizePoolRanking.Rewards')}}</span>
							<span class="text-[#FE4938] ml-1 font-semibold">{{item.rate}}%</span>
						</div>
					</div>
				</div>
				<div class="mt-4">
					<div class="text-[#888888] text-[.8rem]">{{$t('prizePoolRanking.Description')}}</div>
					<div class="text-[#888888] text-[.8rem]">{{$t('prizePoolRanking.DescriptionContent')}}</div>
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
		ranklist
	} from "@/api/index.js";
	import pm from "@/assets/image/prizePoolRanking/PM.png";
	//多语言
	const {
		t
	} = useI18n();
	const router = useRouter();
	const onClickLeft = () => {
		router.back();
	};
	const lang = localStorage.getItem("lang")
	const top = ref([])
	const List = ref([])
	const getList = async () => {
		const res = await ranklist()


		top.value = res.data.list.filter((item, index) => index < 3)
		List.value = res.data.list.filter((item, index) => index >= 3)
		// console.log(List);
		// List2.value = res.data.list.filter(item => item.is_active != 1)
		// console.log(List2);
	}
	const Goto = ((path) => {
		router.push(path);
	});
	getList()
</script>

<style scoped lang="scss">
	:deep(.van-nav-bar) {
		background-color: transparent !important;
	}

	.bg {
		width: 100%;
		height: 268px;
		background: linear-gradient(180deg, #40A295 0%, #069895 20%, #F8F8F8);
		border-radius: 0px 0px 0px 0px;
		position: absolute;
		top: 0;
		z-index: -1;
	}

	.ellipsis {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>