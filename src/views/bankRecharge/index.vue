<script setup>
	import QRCode from 'vue-qrcode';
	import {
		getBlockchain,
		recharge,
		upload,
		getRate
	} from "@/api/index.js";
	import CustomFloatingPanel from '@/components/CustomFloatingPanel/index.vue'
	import {
		showSuccessToast,
		showFailToast,
		showToast,
	} from "vant";
	import {
		useI18n
	} from 'vue-i18n';
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	import {
		ref,
		computed,
		onBeforeMount
	} from 'vue';
	import {
		useUserStore
	} from "@/store/modules/user.js";
	import copy from '@/assets/image/copy.png'

	const copyFun =  (text)=>{
		navigator.clipboard.writeText(text)
	}
	const {
		t
	} = useI18n();
	const router = useRouter();
	const route = useRoute();
	const userStore = useUserStore();
	const lang = localStorage.getItem('lang')
	//请求参数
	const rechargeType = ref('')
	rechargeType.value = route.query.recharge_type

	const onClickLeft = () => {
		router.back();
	};

	const floatingPanel = ref(null);
	const handleChooseCoin = () => {
		floatingPanel.value.show = true;
	}

	const network1 = ref('');
	const change = (item, data, itemName, itemAccount) => {
		floatingPanel.value.show = false;
		network1.value = item;
		bank_name.value = data;
		name.value = itemName;
		account.value = itemAccount;
	}

	const title = ref('');
	const unit = ref('');
	const bank_name = ref('');
	const name = ref(''); // New addition for name
	const account = ref(''); // New addition for account
	const blockchaindata = ref([]);
	const getBlockchaindata = async () => {
		const res = await getBlockchain({
			recharge_type: rechargeType.value,
		});
		blockchaindata.value = res.data;
		// if (blockchaindata.value.length > 0) {
		bank_name.value = blockchaindata.value?.blockchain;
		name.value = blockchaindata.value?.name; // Set initial name
		account.value = blockchaindata.value?.account; // Set initial account
		// }
	}


	const rechargeRate = ref(0);
	const rechargeFact = ref(0);

	//获取汇率
	const requestRate = async () => {
		const res = await getRate();
		rechargeRate.value = res.data.rate
	}

	const price1 = ref(0);
	const torechargedata = ref({
		image: '',
		price: 0,
		recharge_type: rechargeType.value,
		currency_type: 'CNY',
		network: '',
		blockchain: '',
		real_name: '',
		bank_card: '',
		bank_name: ''
	});

	const changePrice = (e) => {
		price1.value = Number(e.target.value);
		torechargedata.value.price = price1.value;
		rechargeFact.value = (price1.value / rechargeRate.value).toFixed(2);
	}

	const onSubmit = () => {
		if (rechargeImageUrl.value == "") {
			showFailToast(t("walletrecharge.uprechargevoucher"));
			return;
		}

		loadingToast();
		torechargedata.value.network = network1.value;
		torechargedata.value.real_name = name.value;
		torechargedata.value.bank_card = account.value;
		torechargedata.value.bank_name = bank_name.value;
		torechargedata.value.blockchain = bank_name.value;
		torechargedata.value.image = rechargeImageUrl.value;
		recharge(torechargedata.value).then(res => {
			if (res.code === 1) {
				// goToExternalSite(res.data.url)
				showSuccessToast(res.msg);

				setTimeout(onClickLeft,1000)
			} else {
				showFailToast(res.msg);
			}
			closeToast();
		})
	}

	const goToExternalSite = (url) => {
		// console.log("type----:"+rechargeType.value)
		if (rechargeType.value == "2") {
			router.push({
				path: '/imageShow',
				query: {
					imgUrl: url
				}
			})
		} else {
			// window.location.href = url
		}
	}

	const validator = (val) => /^[1-9]\d*$/.test(val);


	onBeforeMount(() => {
		getBlockchaindata();
		requestRate();
		if (rechargeType.value == "0") {
			title.value = t("recharge.chainDeposit")
			unit.value = t("withdraw.amount")
		} else if (rechargeType.value == "2") {
			title.value = t("recharge.zfbDeposit")
			unit.value = t("walletrecharge.number")
		} else {
			title.value = t("recharge.wxDeposit")
			unit.value = t("walletrecharge.number")
		}
	})

	const fileList1 = ref([]);
	const showUpload1 = computed(() => {
		return !fileList1.value.length;
	});
	const rechargeImageUrl = ref("");
	const afterRead1 = (file) => {
		// toast.loading({msg:'上传中...'})
		const formData1 = new FormData();
		formData1.append("file", file.file);
		loadingToast();
		upload(formData1).then((res) => {
			if (res.code === 1) {
				rechargeImageUrl.value = res.data.fullurl;
				showSuccessToast(res.msg);
			} else {
				showFailToast(res.msg);
			}
			closeToast();
		});
	};

	const imgdelete = () => {
		rechargeImageUrl.value = ''
		fileList1.value = []
	}
	const loadingToast = () => {
		showLoadingToast({
			message: '',
			forbidClick: true,
			duration: 0
		});
	}
</script>

<template>
	<div class="fixed h-[100vh] w-[100vw] top-0 bg-[#F8F8F8] z-[-3]"></div>
	<div class="bg">
	</div>
	<header>
		<van-nav-bar :title=title :left-text="$t('goback')" :border="false" left-arrow @click-left="onClickLeft">
			<template #right>
				<span @click="router.push('/rechargeRecord')" class="text-white">{{ $t("walletrecharge.rechargerecord")
          }}</span>
			</template>
		</van-nav-bar>
	</header>
	<main>
		<van-form @submit="onSubmit()">
			<div class="py-[2.3rem] px-[1.8rem]" style="border-radius: 30px 30px 0px 0px;">
				<!-- <h5 class="text-base font-semibold mb-[2.3rem]">{{ $t("recharge.depositMethod") }}</h5> -->
				<div class="bg-white rounded-md  mb-[1.1rem] h-[3.5rem] flex items-center py-3">
					<van-field class="mh rounded-[0.5rem]" :label="$t('walletrecharge.bank_name')" disabled
						label-width="8rem" input-align="right" v-model="bank_name" right-icon="arrow" />
				</div>
				<div class="bg-white rounded-md  mb-[1.1rem] h-[3.5rem] flex items-center py-3">
					<van-field class="mh rounded-[0.5rem]" :label="$t('walletrecharge.name')" disabled
						label-width="6rem" input-align="right" v-model="name" right-icon="arrow" />
				</div>
				<div class="bg-white rounded-md  mb-[1.1rem] h-[3.5rem] flex items-center py-3">
					<van-field class="mh rounded-[0.5rem]" :label="$t('walletrecharge.Card_Number')" disabled
						label-width="8rem" input-align="right" v-model="account" :right-icon="copy" @click-right-icon="copyFun(account)"/>
				</div>
				<div class=" py-3 mb-[1.1rem]">
					<div class="flex mt-[.2rem]">
						<img src="@/assets/image/jg.png" class="h-[1.2rem] w-[1.2rem]" alt="">
						<span
							class="ml-1 text-[#AEAEAE] text-[0.9rem]">{{lang=='en'?`The official system - exchange rate ${rechargeRate} RMB is equal to 1 US dollar`:`官方统-汇率 ${rechargeRate} 人民币等于1美元`}}</span>
					</div>
					<div class="flex mt-[.2rem]">
						<img src="@/assets/image/jg.png" class="h-[1.2rem] w-[1.2rem]" alt="">
						<span class="ml-1 text-[#AEAEAE] text-[0.9rem]">{{$t('walletrecharge.submit2')}}</span>
					</div>
					<div class="flex mt-[.2rem]">
						<img src="@/assets/image/jg.png" class="h-[1.2rem] w-[1.2rem]" alt="">
						<span class="ml-1 text-[#AEAEAE] text-[0.9rem]">{{$t('walletrecharge.title13')}}</span>
					</div>
					<div class="flex mt-[.2rem]">
						<img src="@/assets/image/jg.png" class="h-[1.2rem] w-[1.2rem]" alt="">
						<span class="ml-1 text-[#AEAEAE] text-[0.9rem]">{{$t('walletrecharge.title14')}}</span>
					</div>
					<div class="flex mt-[.2rem]">
						<img src="@/assets/image/jg.png" class="h-[1.2rem] w-[1.2rem]" alt="">
						<span class="ml-1 text-[#AEAEAE] text-[0.9rem]">{{$t('walletrecharge.title15')}}</span>
					</div>
				</div>
				<div class="bg-white rounded-md  mb-[1.1rem] h-[3.5rem] flex items-center py-3">
					<van-field class="mh rounded-[0.5rem]" :label="unit" @input="changePrice" label-width="8.8rem"
						input-align="right"
						:rules="[{ required: true, message: $t('walletrecharge.inputmoney') }, { validator, message: $t('walletrecharge.nozero') }]"
						:placeholder="$t('walletrecharge.inputmoney')" type="number" v-model="price1" required />
				</div>
				<div class="text-[#009996] mt-4 text-right">{{$t("withdraw.actualAmountReceived")}}：$ {{rechargeFact}}
				</div>
				<div class="bg-white rounded-[0.5rem] flex justify-between items-center p-3 mt-5">
					<h5 class="mt-3 text-base"><span
							class="text-[#ee0a24] mr-[2px]">*</span>{{ $t("walletrecharge.uprechargevoucher") }}</h5>
					<van-uploader ref="uploadRef1" @delete="imgdelete" v-model="fileList1" :after-read="afterRead1"
						:max-count="1" :show-upload="showUpload1" upload-icon="plus">
						<template #preview-cover="{ file }">
						</template>
					</van-uploader>
				</div>
			</div>

			<!-- 
		<van-form @submit="onSubmit()">
			<h5 class="mt-3 text-base font-semibold">{{ unit }}</h5>
			<van-field class="bg-white w-full rounded-md mt-3 flex items-center py-3 px-3" @input="changePrice"
				v-model="price1" :placeholder="$t('walletrecharge.inputmoney')"
				:rules="[{ required: true, message: $t('walletrecharge.inputmoney') }, { validator, message: $t('walletrecharge.nozero') }]" />
			<div class="flex text-blue-500 justify-between mt-3 mx-3 text-sm">
				<span>
					{{ $t("withdraw.actualAmountReceived") }}{{ rechargeFact }} $
				</span>
			</div> -->
			<div class="py-10 px-8">
				<van-button native-type="submit" class="rounded h-[4.5rem]" style="height: 4.5rem !important; background: #009996;
box-shadow: 0px 20px 48px -18px rgba(0,153,150,0.3);
border-radius: 6px 6px 6px 6px;" block color="#009996">{{ $t("walletrecharge.submit") }}</van-button>
			</div>
		</van-form>
	</main>
	<custom-floating-panel ref="floatingPanel" height="800px">
		<div class="coins-container">
			<div class="title-row">
				{{ $t("walletrecharge.title2") }}
			</div>
			<div class="tip-row">
				{{ $t("walletrecharge.title3") }}
			</div>
			<van-space direction="vertical" size="1rem">
				<div class="coin-card" v-for="(item, index) in blockchaindata" :key="index"
					@click="change(item.network, item.blockchain, item.name, item.account)">
					<div class="name-row">{{ item.network }}</div>
					<div class="other-row">{{ $t("walletrecharge.title4") }} 0.00000001 USDT</div>
					<div class="other-row">{{ $t("walletrecharge.title5") }}</div>
				</div>
			</van-space>
		</div>
	</custom-floating-panel>
</template>

<style lang="scss" scoped>
	:deep(.van-nav-bar) {
		background-color: transparent !important;
	}

	// :deep(.van-nav-bar__title),
	// :deep(.van-nav-bar__left .van-icon),
	// :deep(.van-nav-bar__text) {
	// 	color: #141A52 !important;
	// }

	.bg {
		width: 100%;
		height: 228px;
		background: linear-gradient(180deg, #40A295 0%, #069895 35%, #F8F8F8);
		border-radius: 0px 0px 0px 0px;
		position: absolute;
		top: 0;
		z-index: -1;
	}

	.money {
		font-family: Poppins, Poppins;
		font-weight: 500;
		font-size: 1.2rem;
		color: #141A52;
		line-height: 24px;
	}

	.moneyValue {
		font-family: Poppins;
		font-weight: 800;
		font-size: 1.8rem;
		line-height: 2.2rem;
		color: #FE4938;
	}

	.coins-container {
		padding: 0 1rem 1rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: stretch;

		.title-row {
			padding-top: 1rem;
			text-align: center;
			font-weight: 500;
			font-size: 1.2rem;
			color: #191919;
			line-height: 1rem;
		}

		.tip-row {
			padding: 1rem 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-weight: 400;
			font-size: 0.8rem;
			color: #191919;
			line-height: 1rem;
		}

		.coin-card {
			background: #ffffff;
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
			border-radius: 4px 4px 4px 4px;
			padding: 0.5rem;
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.name-row {
				font-weight: 500;
				font-size: 1rem;
				color: #191919;
				line-height: 1.2rem;
				padding-bottom: 0.3rem;
			}

			.other-row {
				font-weight: 400;
				font-size: 0.8rem;
				color: #191919;
				line-height: 1rem;
			}
		}
	}


	:deep(.van-field__error-message) {
		text-align: right;
	}

	* {
		--van-field-disabled-text-color: #141A52 !important;
		--van-field-input-disabled-text-color: #141A52 !important;
	}
</style>