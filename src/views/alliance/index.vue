<script setup>
import {alliance} from "@/api/index.js";
// import QRCode from "vue-qrcode";
import QrcodeVue from 'qrcode.vue'
import { ref } from "vue";
import { useI18n } from 'vue-i18n';
//多语言
const { t } = useI18n();
const mode = ref(1)
const router = useRouter();
const onClickLeft = () => {
  router.back();
};
// 接口请求
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
  <header>
    <van-nav-bar
        :title="$t('alliance.alliance')"
        :left-text="$t('goback')"
        left-arrow
        @click-left="onClickLeft"
    />
  </header>
  <main class="mx-3">
    <div class="imgs">
      <div class="pt-24  flex flex-col justify-center justify-items-center">
        <span class="pl-16 pr-14 text-center">{{ $t("alliance.title1") }} </span>
      </div>
      <!--      <img class="w-32 h-32 mt-6" src="@/assets/image/img.png" alt="">-->
      <!--      <QRCode :value="address" :size="150"></QRCode>-->
      <qrcode-vue class="mt-8" :value="address" size:300></qrcode-vue>


    </div>

    <div class="py-4 flex justify-center ml-11 mr-12 bg-gradient-to-r from-[#6B6B6B]  to-[#1C1B1B] rounded" @click="copy(address)"><span
        class="text-white">{{ $t("alliance.invite") }}</span></div>
    <div class="mt-8">
      <div class="flex justify-around items-center py-3 back_4 bg-white">
        <div @click="mode=1" :class="mode==1?'activclass':''"><span>{{ $t("alliance.one") }}</span></div>
        <div @click="mode=2" :class="mode==2?'activclass':''"><span>{{ $t("alliance.two") }}</span></div>
      </div>
      <div v-if="mode==1">
        <div v-if="List.length<=0">
        <van-empty :description="$t('alliance.norecord')"/>
      </div>
      <div class="mt-2 back_4">
        <div class="flex flex-col px-5 py-3 mb-1 bg-white" v-for="item in List">
          <div class="pb-1 text-lg">{{ $t("alliance.name") }}{{ item.mer_name }}</div>
          <div class="flex justify-between ">
            <div><span class="text-xs mr-1">{{ $t("alliance.income") }}{{ item.income }}</span><span
                class="text-xs">{{ $t("alliance.order") }}{{ item.order_count }}</span></div>
            <div><span class="text-xs">{{ $t("alliance.createtime") }}{{ item.createtime }}</span></div>
          </div>
        </div>
      </div>
      </div>
      <div v-if="mode==2">
        <div v-if="List2.length<=0">
        <van-empty :description="$t('alliance.norecord')"/>
      </div>
      <div class="mt-2 back_4">
        <div class="flex flex-col px-5 py-3 mb-1 bg-white" v-for="item in List2">
          <div class="pb-1 text-lg">{{ $t("alliance.name") }}{{ item.mer_name }}</div>
          <div class="flex justify-between ">
            <div><span class="text-xs mr-1">{{ $t("alliance.income") }}{{ item.income }}</span><span
                class="text-xs">{{ $t("alliance.order") }}{{ item.order_count }}</span></div>
            <div><span class="text-xs">{{ $t("alliance.createtime") }}{{ item.createtime }}</span></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.activclass{
  font-weight: bold;
  font-size: 16px;
}
.imgs {
  width: 350px;
  height: 280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("@/assets/image/图.svg");
}
</style>