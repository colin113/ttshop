<script setup>
	import {
		baseinfo,
		upload
	} from "@/api/index.js";
	import {
		useUserStore
	} from '@/store/modules/user.js';
	import {
		showSuccessToast
	} from "vant";
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
	//引入仓库信息
	const userStore = useUserStore();

	const formData1 = ref({
		mer_avatar: '',
		mer_name: userStore.MerInfo.mer_name,
		mer_address: userStore.MerInfo.mer_address,
		mer_phone: userStore.MerInfo.mer_phone,
		mer_info: userStore.MerInfo.mer_info,
		mark: userStore.MerInfo.mark,
	});
	//上传信息接口
	const tobaseinfo = async () => {
		const res = await baseinfo(formData1.value);
		await userStore.toGetMerInfo();
		if (res.code === 1) {
			showSuccessToast(res.msg);
		} else {
			showFailToast(res.msg);
		}
	};
	//上传图片
	const uploadRef = ref(null);
	const fileList = ref([]);
	const showUpload = computed(() => {
		return !fileList.value.length;
	});
	const afterRead = file => {
		// toast.loading({msg:'上传中...'})
		const formData = new FormData();
		formData.append('file', file.file);
		upload(formData).then(res => {
			if (res.code === 1) {
				formData1.value.mer_avatar = res.data.fullurl;
				showSuccessToast(res.msg);
			} else {
				showFailToast(res.msg);
			}
		});
	};

	onMounted(() => {
		console.log(userStore.MerInfo);
		fileList.value = [{
			url: userStore.MerInfo.mer_avatar
		}];
		formData1.value.mer_avatar = userStore.MerInfo.mer_avatar;
	});


	const sheet = ref(null);
	//弹出选择层
	const show = ref(false);
	const actions = [{
			name: t("uploader.preview"),
			index: 0,
		},
		{
			name: t("uploader.replace"),
			index: 1,

		}
	];
	//打开选择层
	const openshow = (e) => {
		console.log(e);
		show.value = true;
	};

	const onSelect = (e) => {

		if (e.index == 1) {
			uploadRef.value.chooseFile()
			// document.querySelector("#uploader").click()
		} else if (e.index == 0) {
			showImagePreview([formData1.value.mer_avatar]);
		}
	}
	const beforeRead = (e) => {
		return false
	}
</script>

<template>
	<header>
		<van-nav-bar :left-text="$t('goback')" :title="$t('baseinfo.baseinfo')" left-arrow @click-left="onClickLeft" />
	</header>
	<main>
		<div class="mx-3 my-5 mt-8">
			<span class="ml-3 pt-1 font-semibold text-3xl text-[#141A52]">
				{{$t("baseinfo.title")}}
			</span>
		</div>
		<div class="mt-4">
			<van-cell-group inset>
				<!-- 输入任意文本 -->
				<!-- <div class="flex items-center ml-5 mt-4">
					<div class="mr-10">{{ $t("baseinfo.logo") }}</div>
					<van-uploader ref="uploadRef" v-model="fileList" :after-read="afterRead" :max-count="1"
						:show-upload="showUpload" upload-icon="plus">
					</van-uploader>
				</div> -->
				<div class="mx-3 item-ts" style="height: 6.57rem;">
					<div class="text-black mb-3">
						{{$t("baseinfo.logo") }}
						<!-- stop Logo -->
					</div>
					<div class="right" @click="openshow">
						<img :src="formData1.mer_avatar" alt="" style="width: 4rem;height: 4rem;border-radius: 100%;">
					</div>
					<van-uploader id="uploader" style="position: absolute;top: -9999px;" ref="uploadRef"
						v-model="fileList" :show-upload="showUpload" :preview-full-image="false" :deletable="false"
						reupload :max-count="1" preview-size="4rem" upload-icon="plus" :after-read="afterRead">
						<template #preview-cover="{ file }">
							<!--            <div class="preview-cover van-ellipsis">{{ file.name }}</div>-->
						</template>
					</van-uploader>
					<!-- npm install vue-qrcode --save -->
				</div>
			</van-cell-group>

			<div class="h-5"></div>
			<van-cell-group class="mt-10" inset>
				<van-field v-model="formData1.mer_name" :label="$t('baseinfo.name')"
					:placeholder="userStore.MerInfo.mer_name ? userStore.MerInfo.mer_name:$t('baseinfo.inputname')"
					type="text" />
			</van-cell-group>
			<div class="h-5"></div>
			<van-cell-group class="mt-10" inset>
				<van-field v-model="formData1.mer_phone" :label="$t('baseinfo.tel')"
					:placeholder="userStore.MerInfo.mer_phone ?userStore.MerInfo.mer_phone :$t('baseinfo.inputtel')"
					type="tel" />
			</van-cell-group>
			<div class="h-5"></div>

			<van-cell-group class="mt-10" inset>
				<van-field v-model="formData1.mer_address" :label="$t('baseinfo.address')"
					:placeholder="userStore.MerInfo.mer_address ? userStore.MerInfo.mer_address :$t('baseinfo.inputaddress')"
					type="text" />
			</van-cell-group>
			<div class="h-5"></div>
			<van-cell-group class="mt-10" inset>
				<van-field v-model="formData1.mer_info" :label="$t('baseinfo.introduction')"
					:placeholder="userStore.MerInfo.mer_info ? userStore.MerInfo.mer_info:$t('baseinfo.inputintroduction')"
					autosize label-align="top" rows="1" type="textarea" />
			</van-cell-group>
			<div class="h-5"></div>
			<van-cell-group inset>
				<van-field v-model="formData1.mark" :label="$t('baseinfo.mark')"
					:placeholder="userStore.MerInfo.mark ? userStore.MerInfo.mark :$t('baseinfo.inputmark')" autosize
					label-align="top" rows="1" type="textarea" />
			</van-cell-group>
		</div>
		<div class="px-5 pt-20">
			<van-button class="bg-[] btn" block color="#191919" round
				@click="tobaseinfo()">{{ $t("baseinfo.submit") }}</van-button>
		</div>
	</main>
	<van-action-sheet ref="sheet" v-model:show="show" close-on-click-action :actions="actions" @select="onSelect"
		:cancel-text="$t('uploader.cancel')" />
</template>

<style lang="scss" scoped>
	:deep(.van-uploader__preview-image) {
		border-radius: 50% !important;
	}

	:deep(.van-nav-bar) {
		background-color: #009996 !important;
	}

	.item-ts {
		background-color: #fff;
		padding: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 6px;
		margin-bottom: 1.2rem;

		.right {
			width: 60%;
			display: flex;
			justify-content: flex-end;
		}

		:deep(.van-uploader__upload) {
			border-radius: 100%;
			height: 4rem;
			width: 4rem;
			background: #D9F0EF;

			i {
				color: #009996;
			}
		}
	}

	:deep(.van-field__body) {
		height: 100%;

		input {
			height: 100%;
			text-align: right;
		}
	}

	.btn {
		background-color: #009996 !important;
		height: 4rem !important;
		border: none;
		border-radius: .5rem;

	}
</style>