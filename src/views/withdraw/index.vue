<script setup>
	import {
		useRouter
	} from 'vue-router'
	import {
		getwithdrawInfo,
		withdraw,
		payPwdconfirm,
		getRate
	} from "@/api/index.js";
	import {
		useI18n
	} from 'vue-i18n';
	import {
		useUserStore
	} from "@/store/modules/user.js";
	import {
		showFailToast
	} from "vant";
	//多语言
	const {
		t
	} = useI18n();

	const router = useRouter();
	const onClickLeft = () => {
		router.back();
	};
	const userStore = useUserStore();
	/*
	  选项卡模块
	*/
	//提现方式选项卡
	const showtype = ref(true);
	const actionstype = [{
			name: t("withdraw.card")
		},
		{
			name: t("withdraw.zhifubao")
		},
		{
			name: t("withdraw.blockchain")
		},
	];
	const currencytype = ref('')
	const extracttype = ref('')
	const moneyUnit = ref('')
	const onSelecttype = (item) => {
		showtype.value = false;
		extracttype.value = item.name
		//感觉提现方式，设置选择货币类型
		if (extracttype.value === t("withdraw.card") || extracttype.value === t("withdraw.zhifubao")) {
			actionscurrency.shift();
			actionscurrency.push({
				name: 'CNY'
			});
			moneyUnit.value = 'CNY'
      currencytype.value = 'CNY'
		} else {
			actionscurrency.shift();
			actionscurrency.push({
				name: 'USDT'
			});
			moneyUnit.value = 'USDT'
      currencytype.value = 'USDT'
		}
	};
	//选择货币选项卡
	const showcurrency = ref(false);
	const actionscurrency = [
		// { name: 'CNY' },
		{
			name: 'USD'
		},
	];
	const onSelectcurrency = (item) => {
		showcurrency.value = false;
		currencytype.value = item.name
	};
	//区块链网络和地址选项卡
	const shownetwork = ref(false);
	const actionsnetwork = [{
			name: 'USDT-TRC20'
		}, {
			name: 'USDT-BEP20'
		},
		// {
		// 	name: 'USDT-ERC20'
		// },
	];
	const networktype = ref('')
	const onSelectnetwork = (item) => {
		shownetwork.value = false;
		console.log(item)
		networktype.value = item.name
	};


	//提交参数
	const price1 = ref()
	const changePrice = (e) => {
		price1.value = Number(e.target.value);
	}


	//提现信息请求
	const info = ref({})
	const getWithdrawData = async () => {
		const res = await getwithdrawInfo();
		console.log(res)
		info.value = res.data
		requestRate()
	}
	//校验函数
	const validator1 = (val) => {
		if (val <= false) {
			return false;
		}
	}
	const validator2 = (val) => {
		if (val > info.value.balance) {
			return false;
		}
	}
	//控制余额小数点
	const formattedPrice = computed(() => {
		if (price1.value) {
			// return (price1.value * (1 - info.value.service_charge)).toFixed(2);
			return (price1.value * rechargeRate.value).toFixed(2);
		} else {
			return '0.00';
		}
	});

	const rechargeRate = ref(0);
	//获取汇率
	const requestRate = async () => {
		const res = await getRate();
		rechargeRate.value = res.data.rate
	}

	//提交接口
	const withdrawQuery = ref({
		extract_price: price1,
		extract_type: "",
		currency_type: "",
		network: "",
		blockchain: "",
		real_name: "",
		bank_card: "",
		alipay_code:"",
		bank_name: ""
	})
	//提交提现请求
	const onSubmit = () => {
		if (userStore.MerInfo.status === 1) {
			showActionSheet.value = true
			if (extracttype.value === t("withdraw.card")) {
				withdrawQuery.value.extract_type = '0'

			} else if (extracttype.value === t("withdraw.zhifubao")) {
				withdrawQuery.value.extract_type = '2'
			} else {
				withdrawQuery.value.extract_type = '1'
			}
			withdrawQuery.value.currency_type = currencytype.value
			withdrawQuery.value.network = networktype.value
			withdrawQuery.value.blockchain = blockchain.value
		} else {
			showFailToast(t("over"))
		}
	}

	/*
	  支付密码模块
	*/
	//展现支付密码
	const showActionSheet = ref(false)
	//定义支付密码
	const payPwd = ref({
		password_pay: ''
	})
	//支付密码确认接口
	const confirm = async () => {
		console.log(withdrawQuery.value)
		const res = await payPwdconfirm(payPwd.value)
		if (res.code == 1) {
			showSuccessToast(res.msg);
			withdraw(withdrawQuery.value).then(res => {
				if (res.code === 1) {
					showSuccessToast(res.msg);
					showActionSheet.value = false
          setTimeout(onClickLeft,1000)
				} else {
					showFailToast(res.msg);
				}
			})
		} else {
			showFailToast(res.msg);
			router.push('/setPaypwd')
		}
	}
	//输入完成之后触发
	const confirmdata = (data) => {
		payPwd.value.password_pay = data
		console.log(data)
		confirm()
	}

	onBeforeMount(() => {
		getWithdrawData()
	})
</script>

<template>
	<view class="bg"></view>
	<header>
		<van-nav-bar :title="$t('withdraw.withdrawal')" :border="false" :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft">
			<template #right>
				<span @click="router.push('/withdrawRecord')" class="text-white">{{ $t("withdraw.withdrawalRecords")
					}}</span>
			</template>
		</van-nav-bar>
	</header>
	<main class="mt-3 mx-6">
		<van-form @submit="onSubmit" class="">
			<div>
				<div>
					<span class="withdrawalMethod">{{$t('withdraw.withdrawalMethod')}}</span>
				</div>
				<van-field class="rounded-[0.5rem] bold" :placeholder="$t('withdraw.enterWithdrawalMethod')"
					v-model="extracttype" @focus="showtype = true" readonly
					:rules="[{ required: true, message: $t('withdraw.enterWithdrawalMethod') }]" />
			</div>
			<div class="mt-6">
				<!-- 	<div>
					<span class="withdrawalMethod">{{$t('withdraw.selectCurrency')}}</span>
				</div> -->
				<van-field class="rounded-[0.5rem]" input-align="right" :label="$t('withdraw.selectCurrency')"
					label-width="8rem" label-class="bold" :placeholder="$t('withdraw.enterCurrencyType')"
					v-model="currencytype" @focus="showcurrency = true" readonly
					:rules="[{ required: true, message: $t('withdraw.enterCurrencyType') }]" />
			</div>
			<div v-if="extracttype === $t('withdraw.blockchain')" class="mt-6">

				<van-field class="rounded-[0.5rem]" input-align="right" :label="$t('withdraw.blockchainNetwork')"
					label-width="10rem" label-class="bold" :placeholder="$t('withdraw.enterBlockchainNetwork')"
					v-model="networktype" @focus="shownetwork = true" readonly
					:rules="[{ required: true, message: $t('withdraw.enterBlockchainNetwork') }]" />

				<!-- <div>
					<span class="withdrawalMethod">{{$t('withdraw.blockchainNetwork')}}</span>
				</div>
				<van-field :placeholder="$t('withdraw.enterBlockchainNetwork')" v-model="networktype"
					@focus="shownetwork = true" readonly
					:rules="[{ required: true, message: $t('withdraw.enterBlockchainNetwork') }]" /> -->
			</div>
			<div v-if="extracttype === $t('withdraw.card') || extracttype === $t('withdraw.zhifubao')" class="mt-6">
				<van-field class="rounded-[0.5rem]" input-align="right" :label="$t('withdraw.fullName')"
					:placeholder="$t('withdraw.enterFullName')" v-model="withdrawQuery.real_name" label-width="10rem"
					label-class="bold" :rules="[{ required: true, message: $t('withdraw.enterFullName') }]" />
			</div>
			<div v-if="extracttype === $t('withdraw.card')" class="mt-6">
				<van-field class="rounded-[0.5rem]" input-align="right" :label="$t('withdraw.bankName')"
					:placeholder="$t('withdraw.enterBankName')" v-model="withdrawQuery.bank_name" label-width="10rem"
					label-class="bold" :rules="[{ required: true, message: $t('withdraw.enterBankName') }]" />

				<!-- <van-cell :title="$t('withdraw.bankName')" center style="font-size: 20px" />
				<van-field :placeholder="$t('withdraw.enterBankName')" v-model="withdrawQuery.bank_name"
					:rules="[{ required: true, message: $t('withdraw.enterBankName') }]" /> -->
			</div>
			<div v-if="extracttype === $t('withdraw.blockchain')" class="mt-6">
				<van-field class="rounded-[0.5rem]" input-align="right" :label="$t('withdraw.blockchainAddress')"
					:placeholder="$t('withdraw.enterBlockchainAddress')" v-model="withdrawQuery.blockchain"
					label-width="10rem" label-class="bold"
					:rules="[{ required: true, message: $t('withdraw.enterBlockchainAddress') }]" />

				<!-- <van-cell :title="$t('withdraw.blockchainAddress')" center style="font-size: 20px" />
				<van-field :placeholder="$t('withdraw.enterBlockchainAddress')" v-model="blockchaintype"
					:rules="[{ required: true, message: $t('withdraw.enterBlockchainAddress') }]" /> -->
			</div>
			<div v-if="extracttype === $t('withdraw.card')" class="mt-6">
				<van-field class="rounded-[0.5rem]" input-align="right" :label="$t('withdraw.bankCardNumber')"
					:placeholder="$t('withdraw.enterBankCardNumber')" v-model="withdrawQuery.bank_card"
					label-width="10rem" label-class="bold"
					:rules="[{ required: true, message: $t('withdraw.enterBankCardNumber') }]" />

				<!-- <van-cell :title="$t('withdraw.bankCardNumber')" center style="font-size: 20px" />
				<van-field :placeholder="$t('withdraw.enterBankCardNumber')" v-model="withdrawQuery.bank_card"
					:rules="[{ required: true, message: $t('withdraw.enterBankCardNumber') }]" /> -->
			</div>
			<div v-if="extracttype === $t('withdraw.zhifubao')" class="mt-6">
				<van-field class="rounded-[0.5rem]" input-align="right" :label="$t('withdraw.zhifubaoNumber')"
					:placeholder="$t('withdraw.enterZhifubaoNumber')" v-model="withdrawQuery.alipay_code"
					label-width="10rem" label-class="bold"
					:rules="[{ required: true, message: $t('withdraw.enterZhifubaoNumber') }]" />

				<!-- <van-cell :title="$t('withdraw.bankCardNumber')" center style="font-size: 20px" />
				<van-field :placeholder="$t('withdraw.enterBankCardNumber')" v-model="withdrawQuery.bank_card"
					:rules="[{ required: true, message: $t('withdraw.enterBankCardNumber') }]" /> -->
			</div>
			<div class="mt-6 bg-white pb-6 ts ">
				<van-cell :title="$t('withdraw.amount')" center
					style="font-size: 20px;padding-top: 1.5rem;padding-bottom: 1.5rem;" />
				<van-field :placeholder="$t('withdraw.enterAmount')" v-model="price1" @input="changePrice"
					:rules="[{ required: true, message: $t('withdraw.enterAmount') }, { validator: validator1, message: $t('withdraw.nozero') }]">
					<template #button>
						<span class="text-blue-500" @click="price1 = ((info.balance * rechargeRate).toFixed(2))">{{
							$t("withdraw.all") }}</span>
					</template>
				</van-field>

				<div class="text-sm mt-3 text-green-500 mx-4">{{ $t("withdraw.currentBalance") }}
					<span>{{ info.balance }}</span>
					USDT ≈
					<span>{{ (info.balance * rechargeRate).toFixed(2) }}</span>
					CNY
				</div>
				<div class="flex text-blue-500 justify-between mt-3 mx-4 text-sm">
					<span>
						{{ $t("withdraw.actualAmountReceived") }}{{ price1 == null ? 0 :
						((extracttype == $t('withdraw.card') ||extracttype == $t('withdraw.zhifubao')) ? (price1 * (1 - info.service_charge)).toFixed(2) : (price1 * (1 - info.wallet_service_charge)).toFixed(2))
						}}
						{{ moneyUnit }}
					</span>
					<span v-if="extracttype === $t('withdraw.card')">
						{{ $t("withdraw.fee") }}{{ info.service_charge }}
					</span>
          <span v-if="extracttype === $t('withdraw.zhifubao')">
						{{ $t("withdraw.fee") }}{{ info.service_charge }}
					</span>
          <span v-if="extracttype === $t('withdraw.blockchain')">
						{{ $t("withdraw.fee") }}{{ info.wallet_service_charge }}
					</span>
				</div>
			</div>
			<div class="my-8" style="line-height: 1.8rem;color: #888888;">
				1. 提现条件:<br>
				用户账户余额需达到最低提现金额110元起。<br>
				2. 处理时间:<br>
				- 提现申请提交后，通常会在24小时到账。<br>
				-提现申请通常在24小时内处理完毕，但具体到账时间可能因银行或支付平台而有所不同，通常1-3个工作日到账。<br>
				3. 注意事项:<br>
				请确保您的账户信息和提现方式信息填写准确，提现申请一旦提交，通常不可修改。<br>

				<!-- 如有任何疑问，请随时联系客服，我们将竭诚为您服务。 -->
			</div>
			<div class="bg-[#009996] mt-3 h-[4rem] flex justify-center items-center rounded-md ">
				<van-button native-type="submit" class="submit">{{ $t("withdraw.submit") }}</van-button>
			</div>
			<div class="mt-10 h-[1rem]"></div>
		</van-form>



	</main>
	<!--  支付密码-->
	<van-action-sheet :overlay="false" :round="false" v-model:show="showActionSheet">
		<payPassword :price="price1" @close="() => showActionSheet = false" @send-data="confirmdata" />
	</van-action-sheet>
	<van-overlay :show="showActionSheet" @click="showActionSheet = false" />
	<!--提现方式-->
	<van-action-sheet :overlay="true" v-model:show="showtype" :actions="actionstype" @select="onSelecttype"
		:close-on-click-overlay="false" />
	<!--  选择货币-->
	<van-action-sheet :overlay="true" v-model:show="showcurrency" :actions="actionscurrency"
		@select="onSelectcurrency" />
	<!--  充值网络-->
	<van-action-sheet :overlay="true" v-model:show="shownetwork" :actions="actionsnetwork" @select="onSelectnetwork" />
</template>


<style scoped lang="scss">
	:deep(.van-nav-bar) {
		background-color: transparent !important;
	}


	.van-button--default {
		color: white;
		background-color: black;
		border: 0 solid white;
	}

	.notify {
		padding: 20px;
		background-color: white;
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

	.withdrawalMethod {
		font-family: Poppins;
		font-weight: bold;
		font-size: 1.5rem;
		color: #FFFFFF;
		line-height: 48px;
	}

	.bold {
		font-weight: bold;
	}

	:deep(.bold) {
		font-weight: bold;
	}

	:deep(.van-field__error-message) {
		text-align: right;
	}

	.ts {
		:deep(.van-field__error-message) {
			text-align: left;
		}
	}

	.submit,
	:deep(.van-button__text) {
		background-color: transparent;
		font-family: Poppins;
		font-weight: 600;
		font-size: 1.2rem;
		color: #FFFFFF;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:deep(.van-cell__title label),
	:deep(.van-field__body) {
		height: 2.8rem;
		display: flex;
		align-items: center;

		input {
			height: 100%;
		}
	}
</style>