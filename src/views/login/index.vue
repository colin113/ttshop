<script setup>

import {useUserStore} from '@/store/modules/user.js';
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import {upload, register, languageList, changelanguage} from "@/api/index.js";
import {showSuccessToast} from "vant";
import {useI18n} from 'vue-i18n';
//多语言
const {locale, t} = useI18n();
const router = useRouter();
//获取路径mer
const params = new URLSearchParams(window.location.search);
const mer = params.get('mer');
//返回
const onClickLeft = () => {
  router.go(-1);
};

//切换语言
//点击展示选项卡
const Goto = () => {
  show.value = true;
}
//定义选项卡内容
const actions = ref([])
//从后端拿取默认语言,并且渲染语言列表
const langList = ref([])
const actionList = ref([])
const defautlanguage = () => {
  languageList({page: 1, limit: 10}).then(res => {
    langList.value = res.data.list;
    //提取里面属性组成新的数组渲染选项卡
    actionList.value = langList.value.map(item => ({name: item.language_name, file_name: item.file_name}));
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
  })
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
  localStorage.setItem('lang', item.file_name);
  changelanguage(lang1.value).then(res => {
    if (res.code === 1) {
      console.log(1)
      showSuccessToast(res.msg)
    } else {
      showFailToast(res.msg)
    }
  })
  location.reload()
};


//*=====登录注册====*/
//引入仓库中登录函数
const userStore = useUserStore();
const loginAction = userStore.loginAction;
const loginInfo = ref({
  account: '',
  password: ''
})





//登录
const showLogin = ref('')
const onSubmit1 = async () => {
  await loginAction(loginInfo.value)
}



//注册信息
const query = ref({
  mer_avatar: '',
  mer_name: '',
  mer_address: '',
  real_name: '',
  country: '',
  images: '',
  mer_email: '',
  mer_phone: '',
  password: '',
  repassword: '',
  code: '',
  mer: ''
})
if (mer) {
  query.value.mer = mer
}
//提交注册信息
const onSubmit2 = async () => {
  if (!logo1.value) {
    return showFailToast("Please upload the front of your ID photo");
  }
  if (!logo2.value) {
    return showFailToast("Please upload the back of your ID photo");
  }
  const res = await register(query.value)
  if (res.code === 1) {
    showSuccessToast(res.msg);
    showLogin.value = t("login.login")
  } else {
    showFailToast(res.msg);
  }
}


//上传图片
const logo1 = ref('')
const logo2 = ref('')
const logo3 = ref('')
const uploadRef1 = ref(null)
const fileList1 = ref([])
const showUpload1 = computed(() => {
  return !fileList1.value.length
})
const uploadRef2 = ref(null)
const fileList2 = ref([])
const showUpload2 = computed(() => {
  return !fileList2.value.length
})
const uploadRef3 = ref(null)
const fileList3 = ref([])
const showUpload3 = computed(() => {
  return !fileList3.value.length
})
const afterRead1 = file => {
  // toast.loading({msg:'上传中...'})
  const formData1 = new FormData();
  formData1.append('file', file.file);
  upload(formData1).then(res => {
    if (res.code === 1) {
      query.value.mer_avatar = res.data.fullurl
      showSuccessToast(res.msg)
    } else {
      showFailToast(res.msg)
    }
  })
}
const afterRead2 = file => {
  // toast.loading({msg:'上传中...'})
  const formData2 = new FormData();
  formData2.append('file', file.file);
  upload(formData2).then(res => {
    if (res.code === 1) {
      showSuccessToast(res.msg)
      logo1.value = res.data.fullurl
      console.log(logo1.value)
    } else {
      showFailToast(res.msg)
    }
  })
}
const afterRead3 = file => {
  // toast.loading({msg:'上传中...'})
  const formData3 = new FormData();
  formData3.append('file', file.file);
  upload(formData3).then(res => {
    if (res.code === 1) {
      showSuccessToast(res.msg)
      logo2.value = res.data.fullurl
      query.value.images = logo1.value + ',' + logo2.value;
      // console.log(logo2.value)
    } else {
      showFailToast(res.msg)
    }
  })
}
onMounted(() => {
  defautlanguage()
});
</script>

<template>
  <div class="page text-white">
    <header>
      <div class="mx-3  flex justify-between items-center mt-3">
         <span class="ml-3 pt-0.5">
          <icon-park name="left" @click="onClickLeft" size="1.6rem"/>
        </span>
        <span class="ml-3 pt-0.5">
          <icon-park name="earth" size="1.6rem" @click="Goto()"/>
        </span>
      </div>
    </header>
    <main>
      <div class="flex justify-center items-center flex-col mt-20">
        <!--        <img class="w-40" src="https://shop.zcm.bio/www/png/name-93a01558.png" alt="">-->
        <div class="mt-28">
          <span class="font-semibold text-5xl text-black">SHOP</span>
        </div>
      </div>
      <div class="mt-60">
        <div class="pt-10 px-10">
          <van-button style="height:45px" round block color="#191919" @click="showLogin=$t('login.register')">
            {{ $t("login.register") }}
          </van-button>
        </div>
        <div class="pt-6 px-10">
          <van-button style="height:45px ;background-color:white ;border:1px solid black" round block color="#191919"
                      plain @click="showLogin=$t('login.login')">{{ $t("login.login") }}
          </van-button>
        </div>
      </div>
      <!--登录-->
      <transition name="van-slide-up">
        <div class="h-3/5 bg-white rounded-t-2xl fixed bottom-0" v-if="showLogin===$t('login.login')"
             style="width:100vw">
          <van-form @submit="onSubmit1()" class="mx-3 mt-6">
            <div class="mx-3">
              <div class="text-black mb-3">
                {{ $t("login.phoneNumber") }}
              </div>
              <div>
                <van-field class="border border-gray-500 border-dotted rounded-lg"
                           :placeholder="$t('login.enterPhoneNumberOrEmail')"
                           v-model="loginInfo.account"
                           :rules="[{ required: true, message: $t('login.enterPhoneNumberOrEmail') }]"
                />
              </div>
            </div>
            <div class="mx-3">
              <div class="text-black my-3">
                {{ $t("login.Password") }}
              </div>
              <div>
                <van-field class="border border-gray-500 border-dotted rounded-lg"
                           :placeholder="$t('login.enterPassword')"
                           v-model="loginInfo.password" type="password"
                           :rules="[{ required: true, message: $t('login.enterPassword') }]"/>
              </div>
            </div>
            <div class="flex mx-3 justify-between mt-6">
              <div>
                <span class="text-black"> {{ $t("login.noAccount") }}</span>
                <span class="pl-1.5 text-blue-500"
                      @click="showLogin=$t('login.register')"> {{ $t("login.clickToRegister") }}</span>
              </div>
              <div>
                <span class="text-blue-500" @click="router.push('/forgetPwd')">{{ $t("login.forgotPassword") }}</span>
              </div>
            </div>
            <div class="bg-black mx-3 h-16 rounded-lg flex justify-center items-center text-white mt-10">
              <van-button native-type="submit" @click="toHome"> {{ $t("login.login") }}</van-button>
            </div>
          </van-form>
        </div>
      </transition>

      <!--注册-->
      <transition name="van-slide-up">
        <div class="h-5/6 bg-white overflow-y-auto rounded-t-2xl fixed bottom-0 pb-6 "
             v-if="showLogin===$t('login.register')"
             style="width:100vw">
          <div>
            <van-form @submit="onSubmit2()" class="mx-3 mt-6">
              <div class="mx-3">
                <div class="text-black mb-3">
                  {{ $t("login.storeLogo") }}
                </div>
                <div>
                  <van-uploader
                      ref="uploadRef1"
                      v-model="fileList1"
                      :show-upload="showUpload1"
                      :max-count="1"
                      upload-icon="plus"
                      :after-read="afterRead1"
                  >
                    <template #preview-cover="{ file }">
                      <!--            <div class="preview-cover van-ellipsis">{{ file.name }}</div>-->
                    </template>
                  </van-uploader>
                </div>
                npm install vue-qrcode --save
              </div>
              <div class="mx-3">
                <div class="text-black mb-3">
                  {{ $t("login.storeName") }}
                </div>
                <div>
                  <van-field class="border border-gray-500 border-dotted rounded-lg" v-model="query.mer_name"
                             :rules="[{ required: true, message:$t('login.enterStorename') }]"/>
                </div>
              </div>
              <div class="mx-3">
                <div class="text-black my-3">
                  {{ $t("login.storeAddress") }}
                </div>
                <div>
                  <van-field class="border border-gray-500 border-dotted rounded-lg"
                             :placeholder="$t('login.enterStoreAddress')"
                             v-model="query.mer_address"
                             :rules="[{ required: true, message: $t('login.enterStoreAddress') }]"/>
                </div>
              </div>
              <div class="mx-3">
                <div class="text-black my-3">
                  {{ $t("login.country") }}
                </div>
                <div>
                  <van-field class="border border-gray-500 border-dotted rounded-lg"
                             :placeholder="$t('login.enterCountry')"
                             v-model="query.country" :rules="[{ required: true, message: $t('login.enterCountry') }]"/>
                </div>
              </div>
              <div class="mx-3">
                <div class="text-black my-3">
                  {{ $t("login.phoneNumber") }}
                </div>
                <div>
                  <van-field class="border border-gray-500 border-dotted rounded-lg"
                             :placeholder="$t('login.uploadPhoneNumber')"
                             v-model="query.mer_phone"
                             :rules="[{ required: true, message: $t('login.uploadPhoneNumber') }]"/>
                </div>
              </div>
              <div class="mx-3">
                <div class="text-black my-3">
                  {{ $t("login.realName") }}
                </div>
                <div>
                  <van-field class="border border-gray-500 border-dotted rounded-lg"
                             :placeholder="$t('login.enterRealName')"
                             v-model="query.real_name"
                             :rules="[{ required: true, message: $t('login.enterRealName') }]"/>
                </div>
              </div>
              <div class="mx-3">
                <div class="text-black my-3">
                  {{ $t("login.idCardUpload") }}
                </div>
                <div class="text-black flex justify-between">
                  <div class="flex flex-col justify-center items-center">
                    <!--                    <van-uploader class="" :multiple="true" v-model="fireList1" :after-read="afterRead1"-->
                    <!--                                  :max-count="1"/>-->
                    <van-uploader
                        ref="uploadRef2"
                        v-model="fileList2"
                        :show-upload="showUpload2"
                        :max-count="1"
                        upload-icon="plus"
                        :after-read="afterRead2"
                    >
                      <template #preview-cover="{ file }">
                      </template>
                    </van-uploader>
                    <div class="mt-3">
                      <span class="text-gray-600">{{ $t("login.idCardFront") }}</span>
                    </div>
                  </div>
                  <div class="flex flex-col justify-center items-center">
                    <!--                    <van-uploader class="" :multiple="true" :after-read="afterRead2" v-model="fireList2"-->
                    <!--                                  :max-count="1"/>-->
                    <van-uploader
                        ref="uploadRef3"
                        v-model="fileList3"
                        :show-upload="showUpload3"
                        :max-count="1"
                        upload-icon="plus"
                        :after-read="afterRead3"
                    >
                      <template #preview-cover="{ file }">
                        <!--            <div class="preview-cover van-ellipsis">{{ file.name }}</div>-->
                      </template>
                    </van-uploader>
                    <div class="mt-3">
                      <span class="text-gray-600">{{ $t("login.idCardback") }}</span>
                    </div>
                  </div>
                 
                </div>
              </div>
              <div class="mx-3">
                <div class="text-black my-3">
                  {{ $t("login.email") }}
                </div>
                <div>
                  <van-field class="border border-gray-500 border-dotted rounded-lg"
                             :placeholder="$t('login.enterEmail')"
                             v-model="query.mer_email" :rules="[{ required: true, message: $t('login.enterEmail') }]"/>
                </div>
              </div>
              <div class="mx-3">
                <div class="text-black my-3">
                  {{ $t("login.loginPassword") }}
                </div>
                <div>
                  <van-field class="border border-gray-500 border-dotted rounded-lg"
                             :placeholder="$t('login.enterLoginPassword')"
                             v-model="query.password"
                             :rules="[{ required: true, message: $t('login.enterLoginPassword') }]"/>
                </div>
              </div>
              <div class="mx-3">
                <div class="text-black my-3">
                  {{ $t("login.confirmLoginPassword") }}
                </div>
                <div>
                  <van-field class="border border-gray-500 border-dotted rounded-lg"
                             :placeholder="$t('login.enterPasswordAgain')"
                             v-model="query.repassword"
                             :rules="[{ required: true, message: $t('login.enterPasswordAgain') }]"/>
                </div>
              </div>
              <div class="mx-3">
                <div class="text-black my-3">
                  {{ $t("login.invitationCode") }}
                </div>
                <div>
                  <van-field class="border border-gray-500 border-dotted rounded-lg"
                             :placeholder="$t('login.enterInvitationCode')"
                             v-model="query.mer"
                             :rules="[{ required: true, message: $t('login.enterInvitationCode') }]"/>
                </div>
              </div>
              <div class="flex text-black mx-3 mt-3">
                <span class=""> {{ $t("login.alreadyHaveAccount") }}</span>
                <span class="text-blue-500 pl-3" @click="showLogin=$t('login.login')"> {{
                    $t("login.backToLogin")
                  }}</span>
              </div>
              <div class="bg-black mx-3 h-10 rounded-lg flex justify-center items-center text-white mt-6">
                <van-button native-type="submit"> {{ $t("login.register") }}</van-button>
              </div>
            </van-form>
          </div>
        </div>
      </transition>

    </main>
  </div>
  <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect"/>
</template>

<style scoped lang="scss">
.van-cell {
  padding: 10px 0 10px 10px;
}

:deep(.van-uploader__upload) {
  margin: 0;
}

.van-button--default {
  height: 100%;
  width: 100%;
  color: white;
  background-color: black;
  border: 0 solid white;
}
</style>

<style>

</style>
