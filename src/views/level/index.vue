<script setup>
import {level} from "@/api/index.js";

const router = useRouter();
//返回上一级
const onClickLeft = () => {
  router.back();
};
//获取信息请求
const List=ref([])
const getlevel=async()=>{
  const res=await level()
  List.value=res.data
  console.log(res)
}
onBeforeMount(()=>{
  getlevel()
})
</script>

<template>
  <header>
    <van-nav-bar
        :title="$t('level.sellerLevel')"
        :left-text="$t('goback')"
        left-arrow
        @click-left="onClickLeft">
    </van-nav-bar>
  </header>
  <main class="mt-4">
    <div class="bg-white  rounded-md mt-3 flex items-center py-3 mx-3 back_4" v-for="item in List">
      <div class="mx-5 flex items-center"><img class="w-[120px]" :src=item.image alt=""></div>
      <div class="mr-3 flex flex-col  flex-1">
        <div class="my-1.5 flex justify-between text-base items-center"><span class="">{{ $t("level.merchantLevel") }}</span><span>{{item.name}}</span></div>
        <div class="my-1.5 flex justify-between text-base items-center"><span class="">{{ $t("level.profitMargin") }}</span><span>{{item.rate}}</span></div>
        <div class="my-1.5 flex justify-between text-base items-center"><span class="">{{ $t("level.productQuantity") }}</span><span>{{ item.product_num }}</span></div>
        <div class="my-1.5 flex justify-between text-base items-center"><span class="">{{ $t("level.upgradePrice") }}</span><span>{{ item.price }}</span></div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>