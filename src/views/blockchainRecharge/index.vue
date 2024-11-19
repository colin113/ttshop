<script setup>
import {
	recharge,
	getBlockchain,
	upload,
	RechargeType
} from '@/api/index.js'
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
const router = useRouter();
const route = useRoute();

//请求参数
const rechargeType = ref('')
rechargeType.value = route.query.recharge_type

const onClickLeft = () => {
	router.back();
};

const rechargeRate = ref(0)


const rechargeQuery = ref({
	"bank_card": "",
	"bank_name": "",
	"blockchain": "", //区块链地址 TWSLzeHqFoB2HsAsiFhoPd2QqHdaDeiQSr
	"currency_type": "USD",
	"image": "", ///uploads/20241112/b22bcff086e7c41ea9d183b24f0af465.png
	"network": "TRC20",
	"order": "", //哈希值 123132966
	"price": 0,
	"real_name": "",
	recharge_type: rechargeType.value,
})
// const type = ref('TRC20')
const typeList = ref([
	'TRC20',
	'BEP20',
	//   'ERC20'
])
//提交充值请求
const onSubmit = () => {
	if (rechargeImageUrl.value == "") {
		showFailToast(t("walletrecharge.uprechargevoucher"));
		return;
	}
	loadingToast();
	rechargeQuery.value.image = rechargeImageUrl.value;
	const res = recharge(rechargeQuery.value).then(res => {
		closeToast();
		if (res.code === 1) {
			// goToExternalSite(res.data.url)
			if (rechargeType.value == "2") {
				// router.push({ path: '/imageShow', query: { imgUrl: url } })
				// showSuccessToast('');
				showSuccessToast(res.msg);
			} else {
				showSuccessToast(res.msg);

				setTimeout(onClickLeft,1000)
				// window.location.href = res.data.url
			}
			//  showSuccessToast(res.msg);
		} else {
			showFailToast(res.msg);
		}
	})
}
//校验函数
const validator = (val) => /^[1-9]\d*$/.test(val)

const changePrice = (e) => {
	// rechargeQuery.value.price = ;
	rechargeQuery.value.price = Number(e.target.value);

}

onBeforeMount(() => {
	getBlockchaindata()
	// getRechargeType()
})

const fileList1 = ref([]);
const showUpload1 = computed(() => {
	return !fileList1.value.length;
});
const rechargeImageUrl = ref("")
const imgdelete = () => {
	rechargeImageUrl.value = ''
	fileList1.value = []
}

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
	}).catch(err => {
		console.log(err);
	});
};

const imgUrl = ref([])
const getBlockchaindata = async () => {
	imgUrl.value = ''
	const res = await getBlockchain({
		type: rechargeType.value,
		network: rechargeQuery.value.network
	});
	imgUrl.value = res.data.url;
	rechargeQuery.value.blockchain = res.data.account;
}
const loadingToast = () => {
	showLoadingToast({
		message: '',
		forbidClick: true,
		duration: 0
	});
}

const setNetwork = (e) => {
	rechargeQuery.value.network = e
	getBlockchaindata()
}
</script>

<template>
	<view class="bg"></view>
	<header>
		<van-nav-bar :title="$t('withdraw.blockchain')" :border='false' :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft">

		</van-nav-bar>
	</header>
	<main class="mt-3 mx-6">
		<div class="flex mb-3 rounded justify-center w-[100%]">
			<div class="imgs bg-white ">
				<van-image :src="imgUrl" class="imgs2">
					<template v-slot:loading>
						<van-loading type="spinner" size="20" />
					</template>
				</van-image>
			</div>
		</div>
		<van-form @submit="onSubmit" class="mt-4 relative z-10">
			<div class="bg-white px-3 py-[1.2rem] rounded-[6px]">
				<div>{{ $t('withdraw.blockchainselection') }}</div>
				<div class="grid grid-cols-2 gap-x-4 mt-2">
					<div v-for="(item, index) in typeList" :key="index" @click="setNetwork(item)"
						class="bg-[#E5F4F4] px-[1.8rem] py-[.8rem] flex justify-center items-center rounded-[6px]"
						:class="{ active: rechargeQuery.network == item }">
						{{ item }}
					</div>
				</div>
			</div>
			<div class="mt-[1.2rem]">
				<van-cell :title="$t('withdraw.blockchainAddress')" center style="font-size: 20px">
					<template #right-icon>
						<van-icon name="arrow" class="arrow" />
					</template>
				</van-cell>
				<van-field :placeholder="$t('withdraw.enterBlockchainAddress')" disabled
					v-model="rechargeQuery.blockchain"
					:rules="[{ required: true, message: $t('withdraw.enterBlockchainAddress') }]" />
			</div>
			<!-- <div>
				<van-cell title="选择货币*" center style="font-size: 20px" />
				<van-field placeholder="请输入货币类型" v-model="rechargeQuery.currency_type"
					:rules="[{ required: true, message: '请填写货币类型' }]" />
			</div>
			<div>
				<van-cell title="区块链网络" center style="font-size: 20px" />
				<van-field placeholder="请输入区块链网络" />
			</div>
			<div>
				<van-cell title="地址" center style="font-size: 20px" />
				<van-field placeholder="请输入地址" />
			</div> -->
			<div class="money mt-[1.2rem]">
				<!-- <van-cell :title="金额*" center style="font-size: 20px" /> -->
				<van-field :label="$t('withdraw.amount')" :placeholder="$t('withdraw.enterAmount')" input-align="right"
					v-model="rechargeQuery.price" @input="changePrice"
					:rules="[{ required: true, message: $t('withdraw.enterAmount') }, { validator, message: $t('withdraw.nozero') }]">
					<!-- 	<template #button>
						<span class="text-blue-500">全部</span>
					</template> -->
				</van-field>
			</div>

			<div class="money mt-[1.2rem]">
				<!-- <van-cell :title="金额*" center style="font-size: 20px" /> -->
				<van-field :label="$t('withdraw.Hash_value')" placeholder-class="placeholder"
					:placeholder="$t('withdraw.enterHash_value')" input-align="right" v-model="rechargeQuery.order"
					:rules="[{ required: true, message: $t('withdraw.enterHash_value') }]">
					<!-- 	<template #button>
						<span class="text-blue-500">全部</span>
					</template> -->
				</van-field>
			</div>
			<div class="bg-white rounded-[0.5rem] flex justify-between items-center p-3 mt-[1.2rem]">
				<h5 class="mt-3 text-base"><span class="text-[#ee0a24] mr-[2px]">*</span>{{
					$t("walletrecharge.uprechargevoucher") }}</h5>
				<van-uploader ref="uploadRef1" @delete="imgdelete" v-model="fileList1" :after-read="afterRead1"
					:max-count="1" :show-upload="showUpload1" upload-icon="plus">
					<template #preview-cover="{ file }">
					</template>
				</van-uploader>
			</div>
			<div class="h-10"></div>
			<!-- <div class="text-sm mt-3 text-green-500 mx-3">当前余额:
				<span>956,702.91</span>
				USDT ≈
				<span>956,702.91</span>
				USDC
			</div>
			<div class="flex text-blue-500 justify-between mt-3 mx-3 text-sm">
				<span>
					实际到账金额:0.00USDC
				</span>
				<span>
					手续费:3.00%
				</span>
			</div> -->
			<div class="btn mt-[1.2rem] flex justify-center rounded-md  ">
				<van-button block color="#009996" class="h-[8rem] " native-type="submit">{{ $t("walletrecharge.submit")
					}}</van-button>
			</div>
			<div class="h-5"></div>
		</van-form>
	</main>
</template>

<style scoped lang="scss">
.van-button--default {
	color: white;
	background-color: black;
	border: 0 solid white;
}

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

.active {
	background-color: #009996;
	color: #fff
}

.money :deep(.van-field__error-message) {
	text-align: right;
}

* {
	--van-field-disabled-text-color: #141A52 !important;
	--van-field-input-disabled-text-color: #181818 !important;
}

:deep(.van-field__control) {
	font-weight: bold;
}

:deep(.placeholder) {}
</style>