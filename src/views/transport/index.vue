<script setup>
	import {
		useRoute,
		useRouter
	} from "vue-router";
	import {
		orderDetail
	} from "@/api/index.js";
	import {
		useI18n
	} from 'vue-i18n';
	//多语言
	const {
		t
	} = useI18n();
	//路由
	const router = useRouter();
	const route = useRoute()
	//返回
	const onClickLeft = () => {
		router.back();
	};
	//请求参数
	const id = ref({
		id: "",
	})
	id.value.id = route.query.id

	//订单信息
	const getdata = ref({})
	//商品信息
	const product = ref([])
	//物流信息
	const delivery = ref([])
	const delivery_no = ref('')
	const delivery_status = ref('')
	const delivery_data = ref('')
	//获取请求数据
	const getorderDetail = async () => {
		const res = await orderDetail(id.value)
		// console.log(res)
		if (res.data === null) return
		getdata.value = res.data
		// console.log(getdata.value)
		product.value = getdata.value.product
		// console.log(product.value)
		delivery.value = res.data.delivery
		// console.log(delivery.value)
		delivery_no.value = delivery.value[0]?.delivery_no
		// console.log(delivery_no.value)
		getDeliveryStatus()
	}

	//复制函数
	const copy = () => {
		// 获取 <span> 元素的值
		const textToCopy = document.getElementById('ts-order').textContent;
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
		showToast(t('transoprt.copySuccess'));
	};

	//传入日期加7天，2024-08-09
	const addDaysToDate = (dateStr) => {
		const date = new Date(dateStr);
		date.setDate(date.getDate() + 7);
		return date.toISOString().split('T')[0];
	}

	const getDeliveryStatus = () => {
		//1=运输中,2=已到达,3=待结算,4=已收货',
		if (getdata.value.delivery_status == 1) {
			delivery_status.value = t('transoprt.incoming')
			delivery_data.value = t('transoprt.arrivedData') + " " + addDaysToDate(getdata.value.createtime)
			// } else if (getdata.value.delivery_status == 2) {
			//   delivery_status.value = t('transoprt.arrived')
			//   delivery_data.value = t('transoprt.arrivedData') + " " + addDaysToDate(getdata.value.createtime)
		} else if (getdata.value.delivery_status == 4) {
			delivery_status.value = t('order.received')
			delivery_data.value = ""
		} else if (getdata.value.delivery_status == 2 || getdata.value.delivery_status == 3) {
			delivery_status.value = t('transoprt.arrived')
			delivery_data.value = ""
		} else {
			delivery_status.value = t('transoprt.notStart')
			delivery_data.value = ""
		}
	}

	onMounted(() => {
		getorderDetail()
	})
</script>

<template>
	<div class="w-[100vw] h-[100vh] bg-[#fff] fixed" style="z-index: -2;"></div>
	<header>
		<van-nav-bar :title="$t('orderDetail.shippingProgress')" :left-text="$t('goback')" left-arrow
			@click-left="onClickLeft" />
	</header>
	<main>
		<div class="mt-3 rounded-md" style="display: flex;flex-direction: column;height: 100vh;">
			<div class="bg-white back_4 rounded-md mx-3" style="height: 100px;">
				<van-row>
					<van-col span="10" class="t_num h-[2rem]" style="background-color: #252728 !important;">
						<div class="text-[#009996] w-[100%] h-[100%] flex justify-center items-center pr-4">
							{{ $t("orderDetail.trackingNumber") }}
						</div>


					</van-col>
					<van-col span="14" class="bg-[#252728] h-[2rem]">
						<div class="text-white w-[100%] h-[100%] flex justify-center items-center" @click="copy">
							{{ delivery_no }}
						</div>
						<!-- <img class="btn_copy" src="@/assets/image/transport/ic_copy.png" > -->
						<!-- <span>电子存根</span>
                                  <van-icon name="arrow" /> -->
					</van-col>
				</van-row>
				<div>
					<van-row>
						<van-col span="24" class="ts_data">
							<span id="ts_state" style="color: #252728;font-size: 18px;font-weight: 600;">{{ delivery_status
              }}</span><br>
							<span id="ts_data" style="color: #666;font-size: 11px;">{{ delivery_data }}</span>
						</van-col>
						<!-- <van-col span="13" class="ts_status">
                                          <span class="city">台湾&#160;&#160;&#160;</span>
                                          <img src="@/assets/image/transport/ic_to_ts.png"
                                            style="display: inline-block; align-content: center;padding-bottom: 5px;">
                                          <span class="city">&#160;&#160;&#160;台湾</span>
                                        </van-col> -->
					</van-row>
				</div>
			</div>

			<div class="image-container">
				<div class="div-send">
					<van-row class="">
						<van-col span="24">
							<img src="@/assets/image/transport/bg_tip.png" class="car-image">
							<span class="dis_tip_child relative z-10">{{ $t("transoprt.start") }}</span>
						</van-col>
						<!-- <van-col span="0">
                        <span class="dis_tip_child">台湾省</span>
                      </van-col> -->
					</van-row>
				</div>
				<img src="@/assets/image/transport/bg_path.png" class="path-image">

				<div class="div-receive">
					<van-row>
						<van-col span="24">
							<img src="@/assets/image/transport/bg_tip.png" class="car-image">
							<span class="dis_tip_child relative z-10">{{ $t("transoprt.destination") }}</span>
						</van-col>
						<!-- <van-col span="12">
                        <span class="dis_tip_child">台湾省</span>
                      </van-col> -->
					</van-row>
				</div>
			</div>

			<div class="bg-white rounded-t-lg bottom_contain">
				<div class="text-lg font-semibold" style="font-size: 18px;color: #252728;">
					<h3>{{ $t("orderDetail.shippingProgress") }}</h3>
					<div class="mt-2">
						<van-icon name="location" color="#009996" />
						<span
							style="font-size: 12px;color: #888;margin-left: 5px;">{{ $t("orderDetail.shippingAddress") }}
							{{
              getdata.user_address }}</span>
					</div>
				</div>
				<van-steps direction="vertical" :active="0" active-color="#009996">
					<van-step v-for="item in delivery" :key="item.id">
						<div>
							<p>{{ $t("orderDetail.shippingStatus") }}{{ item.mark }}</p>
							<p>{{ $t("orderDetail.executionTime") }}{{ item.updatetime }}</p>
						</div>
					</van-step>
				</van-steps>

				<!-- <span class="text-lg font-semibold" style="font-size: 18px;color: #252728;">{{ $t("transoprt.detail") }}</span>
                    <div class="mt-2">
                      <van-icon name="location" color="#6C91FF" />
                      <span style="font-size: 12px;color: #888;margin-left: 5px;">收货地址：收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址</span>
                    </div>
                    <van-steps direction="vertical" :active="0" class="mt-2">
                      <van-step>
                        <h3>【城市】物流状态1</h3>
                        <p>2016-07-12 12:40</p>
                      </van-step>
                      <van-step>
                        <h3>【城市】物流状态2</h3>
                        <p>2016-07-11 10:00</p>
                      </van-step>
                      <van-step>
                        <h3>快件已发货</h3>
                        <p>2016-07-10 09:30</p>
                      </van-step>
                    </van-steps> -->

			</div>
		</div>

	</main>
</template>

<style scoped lang="scss">
	:deep(.van-nav-bar) {
		background-color: #009996 !important;
		height: 5rem;
	}

	.t_num {
		width: 100%;
		height: 28px;
		background: #FCF1D8;
		background-image: url("@/assets/image/transport/bg_num.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
		// background-size: contain;
		color: #FCF1D8;
		padding: 0 10px;

		// text-align: center;
		span {
			height: 100%;
			line-height: 28px;
		}
	}

	.btn_copy {
		display: inline;
		float: right;
		margin-right: 10px;
		padding: 10px;
	}

	.right_bg {
		height: 28px;
		width: 100%;
		border-radius: 0px 10px 0px 0px;
		opacity: 1;
		background: #FCF1D8;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0 20px;
	}

	.city {
		font-size: 16px;
		font-weight: bold;
	}

	.ts_data {
		padding-top: 12px;
		text-align: center;
		height: 73px;
	}

	.ts_status {
		text-align: center;
		height: 73px;
		line-height: 73px;
		background: #F0F0F0;
	}

	.image-container {
		position: relative;
		margin: 0 auto;
		margin-top: 100px;
		width: 190px;
	}

	.div-send {
		position: absolute;
		width: 120px;
		height: 38px;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: url("@/assets/image/transport/bg_tip.png");
		text-align: center;
		top: -40px;
		right: -50%;
		transform: translateX(-45%);
	}

	.dis_tip_child {
		width: 60px;
		line-height: 30px;
		font-size: 12px;
		color: #333;
		font-weight: bold;
	}

	.path-image {
		display: block;
		width: 190px;
		height: 138px;
	}

	.car-image {
		position: absolute;
	}

	.div-receive {
		position: absolute;
		width: 120px;
		height: 38px;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: url("@/assets/image/transport/bg_tip.png");
		text-align: center;
		bottom: 15px;
		left: -50%;
		transform: translate(34%);
	}

	.bottom_contain {
		flex: 1;
		width: 100%;
		margin-top: 30px;
		padding: 20px 16px;
	}

	.back_4 {
		box-shadow: 0px 10px 13px 0 rgba(0, 0, 0, 0.08);
	}
</style>