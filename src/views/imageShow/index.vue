<script setup>
import QRCode from 'vue-qrcode';
import { getBlockchain, recharge, upload, getRate } from "@/api/index.js";
import CustomFloatingPanel from '@/components/CustomFloatingPanel/index.vue'
import { showSuccessToast, showFailToast, showToast } from "vant";
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onBeforeMount } from 'vue';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

//请求参数
const imgUrl = ref('')
imgUrl.value = route.query.imgUrl

const onClickLeft = () => {
  router.back();
};

</script>

<template>
  <header>
    <van-nav-bar :title=title :left-text="$t('goback')" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
  </header>
  <main class="image-container">
    <img class="img" :src="imgUrl">
  </main>
</template>

<style lang="scss" scoped>
.image-container{
  display: flex;
  justify-content: center;
  background-color: #000000;
  align-items: center;
  height: 100vh;
}
</style>
