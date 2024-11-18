<script setup>
	import {
		alliance
	} from "@/api/index.js";
	// import QRCode from "vue-qrcode";
	import QrcodeVue from 'qrcode.vue'
	import {
		useI18n
	} from 'vue-i18n';
	//多语言
	const {
		t
	} = useI18n();
	const router = useRouter();
	const onClickLeft = () => {
		router.back();
	};
	// 接口请求
	const active = ref(0)
	const List = ref([])
	const List2 = ref([])
	const address = ref(null);
	const getalliance = async () => {
		const res = await alliance()
		console.log(res)
		address.value = res.data.url
		List.value = res.data.list
		List2.value = res.data.list2
	}
	getalliance()
	// onBeforeMount(()=>{
	//   getalliance()
	// })

	//复制函数
	const copy = (textToCopy) => {
		// 创建一个临时的textarea元素
		const textarea = document.createElement('textarea');

		// 将要复制的文本设置为textarea的值
		textarea.value = textToCopy;

		// 将textarea隐藏
		textarea.style.position = 'fixed';
		textarea.style.opacity = 0;

		// 将textarea添加到DOM中
		document.body.appendChild(textarea);

		// 选择textarea中的文本
		textarea.select();

		// 执行复制命令
		document.execCommand('copy');

		// 删除textarea元素
		document.body.removeChild(textarea);

		showToast('复制成功');
	};
</script>

<template>
	<div class="bg"></div>
	<header>
		<van-nav-bar :title="$t('vip.title')" :border="false" :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft" />
	</header>
	<main class="mx-3">
		<div class="imgs py">
			<div class="pt-24 flex flex-col justify-center justify-items-center">
				<span class="pl-12 pr-12 text-center">{{ $t("alliance.title1") }} </span>
			</div>
			<!--      <img class="w-32 h-32 mt-6" src="@/assets/image/img.png" alt="">-->
			<!--      <QRCode :value="address" :size="150"></QRCode>-->
			<qrcode-vue class="mt-8" :value="address" size:300></qrcode-vue>


		</div>


		<div class="mt-8">
			<div class="items-center grid grid-cols-2 bg-[#FDFEFE] text-[#009996] back_4 rounded-2xl">
				<div class="p-3  h-[4rem] rounded-2xl flex" :class="{'active':active===0}" @click="active=0">
					<div class="w-[100%] h-[100%] flex items-center justify-center text-center">
						{{ $t("alliance.one") }}
					</div>
				</div>
				<div class="py-3 h-[4rem] rounded-2xl flex" :class="{'active':active===1}" @click="active=1">
					<div class="w-[100%] h-[100%] flex items-center justify-center text-center">
						{{ $t("alliance.two") }}
					</div>

				</div>
				<!-- <div><span class="text-[#009996]">{{ $t("alliance.one") }}</span></div> -->
				<!--      <div><span>二级总部</span></div>-->
				<!--      <div><span>三级总部</span></div>-->
			</div>
			<div v-if="List.length<=0 && active===0">
				<van-empty :description="$t('alliance.norecord')" />
			</div>
			<div v-if="List2.length<=0 && active===1">
				<van-empty :description="$t('alliance.norecord')" />
			</div>
			<div class="mt-4 back_4 Poppins">
				<div class="flex flex-col px-5 py-3 mb-1 bg-white h-[6.5rem]"
					v-for="(item,index) in (active===0?List:List2)" :key="index">
					<div class="pb-1 text-lg flex">
						<div class="mr-3"> {{ $t("alliance.name") }}</div>
						<div class="">{{ item.mer_name }}</div>
					</div>
					<div class="flex  ">
						<div>
							<span class="text-xs mr-1">{{ $t("alliance.income") }}</span>
							<span class="text-xs mr-1">{{ item.income }}</span>

						</div>
						<div class="ml-3">
							<span class="text-xs mr-1">{{ $t("alliance.order") }}</span>
							<span class="text-xs mr-1">{{ item.order_count }}</span>
						</div>
					</div>
					<div class="pb-1 text-lg flex">
						<div><span class="text-xs">{{ $t("alliance.createtime") }}{{ item.createtime }}</span></div>
					</div>
				</div>
			</div>
		</div>

	</main>
	<div class="btn bg-white back_4 pt-5">
		<div class="py-4 flex justify-center ml-11 mr-12 bg-gradient-to-r from-[#6B6B6B]  to-[#1C1B1B] rounded"
			@click="copy(address)"><span class="text-white">{{ $t("alliance.invite") }}</span></div>
	</div>
</template>

<style scoped lang="scss">
	.imgs {
		width: 350px;
		height: 280px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url("@/assets/image/tu.svg");
	}

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

	header {
		height: --van-nav-bar-height;
	}

	main {
		height: calc(100vh - 44px - 8rem);
		overflow: hidden;
		overflow-y: auto;
	}

	.btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 8rem;

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

	.Poppins {
		* {
			font-family: Poppins, Poppins !important;
		}
	}

	.active {
		background-color: #009996;
		color: #fff;
	}
</style>