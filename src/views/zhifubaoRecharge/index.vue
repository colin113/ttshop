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
		showToast
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

	const {
		t
	} = useI18n();
	const router = useRouter();
	const route = useRoute();

	//请求参数
	const rechargeType = ref('')
	rechargeType.value = route.query.recharge_type
	const imgUrl = ref('')

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
		address.value = data;
		name.value = itemName;
		account.value = itemAccount;
	}

	const title = ref('');
	const unit = ref('');
	const address = ref('');
	const orderNumberText = ref('');
	const name = ref(''); // New addition for name
	const account = ref(''); // New addition for account
	const blockchaindata = ref([]);
	const getBlockchaindata = async () => {
		const res = await getBlockchain({
			type: rechargeType.value,
		});
		blockchaindata.value = res.data;
		imgUrl.value = res.data.url;
		if (blockchaindata.value.length > 0) {
			address.value = blockchaindata.value[0]?.blockchain;
			name.value = blockchaindata.value[0]?.name; // Set initial name
			account.value = blockchaindata.value[0]?.account; // Set initial account
		}
	}


	const rechargeRate = ref(0);
	const rechargeFact = ref(0);
	const uploadRef1 = ref(null);
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
	//获取汇率
	const requestRate = async () => {
		const res = await getRate();
		rechargeRate.value = res.data.rate
	}

	const price1 = ref(null);
	const torechargedata = ref({
		image: '',
		price: 0,
		recharge_type: rechargeType.value,
		currency_type: 'USD',
		network: '',
		blockchain: '',
		real_name: '',
		bank_card: '',
		bank_name: '',
		order: ''
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
		torechargedata.value.blockchain = address.value;
		torechargedata.value.image = rechargeImageUrl.value;
		torechargedata.value.order = orderNumberText.value;
		recharge(torechargedata.value).then(res => {
			closeToast();
			if (res.code === 1) {
				// goToExternalSite(res.data.url)
				if (rechargeType.value == "2") {
					// router.push({ path: '/imageShow', query: { imgUrl: url } })
					// showSuccessToast('');
					showSuccessToast(res.msg);
					setTimeout(onClickLeft,1000)
				} else {
					window.location.href = res.data.url
				}
				//  showSuccessToast(res.msg);
			} else {
				showFailToast(res.msg);
			}
		})
	}

	const goToExternalSite = (url) => {
		// console.log("type----:"+rechargeType.value)
		console.log("type----11111:" + url)
		if (rechargeType.value == "2") {
			// router.push({ path: '/imageShow', query: { imgUrl: url } })
			showSuccessToast(res.msg);
		} else {
			window.location.href = url
		}
	}

	const validator = (val) => /^[1-9]\d*$/.test(val);

	const loadingToast = () => {
		showLoadingToast({
			message: '',
			forbidClick: true,
			duration: 0
		});
	}

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
</script>

<template>
	<view class="bg"></view>
	<header>
		<van-nav-bar :title=title :border='false' :left-text="$t('goback')" left-arrow @click-left="onClickLeft">
			<template #right>
				<span @click="router.push('/rechargeRecord')" class="text-white">{{ $t("walletrecharge.rechargerecord")
          }}</span>
			</template>
		</van-nav-bar>
	</header>
	<main class="mx-3">
		<div class="flex mb-3 rounded justify-center w-[100%]">
			<div class="imgs bg-white ">
				<van-image :src="imgUrl" class="imgs2">
					<template v-slot:loading>
						<van-loading type="spinner" size="20" />
					</template>
				</van-image>
			</div>
		</div>
		<van-form @submit="onSubmit()" class="px-3">
			<div class="" style="height: calc(100vh - var(--van-nav-bar-height) - 8rem - (100vw - 3rem))">
				<div class="bg-white mt-3 mh rounded-[0.5rem]">
					<!-- <van-cell :title="$t('changePayPassword.oldpwd')" center style="font-size: 20px" /> -->
					<van-field class="mh rounded-[0.5rem]" :label="unit" label-width="8rem" input-align="right"
						:placeholder="$t('walletrecharge.inputmoney')" v-model="price1" required @input="changePrice"
						:rules="[{ required: true, message: $t('walletrecharge.inputmoney') }, { validator, message: $t('walletrecharge.nozero') }]" />
				</div>
				<div class="bg-white mt-3 mh rounded-[0.5rem]">
					<!-- <van-cell :title="$t('changePayPassword.oldpwd')" center style="font-size: 20px" /> -->
					<van-field class="mh rounded-[0.5rem]" :label="$t('rechargerecord.orderNumber')" label-width="8rem"
						input-align="right" :placeholder="$t('rechargerecord.orderNumber')" v-model="orderNumberText"
						required :rules="[{ required: true, message: $t('rechargerecord.orderNumber') }]" />
				</div>
				<!-- <h5 class="mt-3 text-base font-semibold">{{ unit }}</h5> -->
				<!-- 	<van-field :label="unit" class="bg-white w-full rounded-md mt-3 flex items-center py-3 px-3"
				v-model="price1" :placeholder="$t('walletrecharge.inputmoney')" /> -->
				<!-- 
			<h5 class="mt-3 text-base font-semibold">{{ $t('rechargerecord.orderNumber') }}</h5>
			<van-field class="bg-white w-full rounded-md mt-3 flex items-center py-3 px-3" v-model="orderNumberText"
				:placeholder="$t('rechargerecord.orderNumber')"
				:rules="[{ required: true, message: $t('rechargerecord.orderNumber') }]" /> -->

				<div class="flex text-[#009996] justify-between mt-5  text-sm">
					<span>
						{{ $t("withdraw.actualAmountReceived") }}{{ rechargeFact }} $
					</span>
				</div>

				<div class="bg-white rounded-[0.5rem] flex justify-between items-center p-3 mt-5">
					<h5 class="mt-3 text-base"><span
							class="text-[#ee0a24] mr-[2px]">*</span>{{ $t("walletrecharge.uprechargevoucher") }}</h5>
					<van-uploader ref="uploadRef1" v-model="fileList1" @delete="imgdelete" :after-read="afterRead1"
						:max-count="1" :show-upload="showUpload1" upload-icon="plus">
						<template #preview-cover="{ file }">
						</template>
					</van-uploader>
				</div>
				<div class="h-10"></div>
			</div>
			<div class="btn mt-3 flex justify-center rounded-md h-[8rem] bg-white">
				<van-button block color="#009996" native-type="submit">{{ $t("walletrecharge.submit") }}</van-button>
			</div>
			<!-- <div class="pt-10">
				<van-button native-type="submit" round block
					color="#191919">{{ $t("walletrecharge.submit") }}</van-button>
			</div> -->
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

	.bg {
		width: 100%;
		height: 268px;
		background: linear-gradient(180deg, #40A295 0%, #069895 35%, #F8F8F8);
		border-radius: 0px 0px 0px 0px;
		position: absolute;
		top: 0;
		z-index: -1;
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

	.btn {
		position: fixed;
		bottom: 0;
		// left: 0;
		right: 0;
		width: 100vw;
		height: 8rem;
		padding: 1rem 2rem;
		display: flex;
		justify-content: center;

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

	:deep(.van-field__body) {
		height: 3.2rem;
	}

	:deep(.van-field__label) {
		height: 3.2rem;
		display: flex;
		align-items: center;
	}

	.mh {
		min-height: 3.2rem !important;
		display: flex;
	}

	:deep(.van-field__error-message) {
		text-align: right;
	}

	.imgs {
		width: calc(100vw - 3rem);
		height: calc(100vw - 3rem);
		box-shadow: 0px 30px 50px -20px rgba(0, 153, 150, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;

		.imgs2 {
			width: calc(100vw - 6rem);
			height: calc(100vw - 6rem);
		}
	}
</style>