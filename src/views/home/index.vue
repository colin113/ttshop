<script setup>
import tabbers from '@/components/tabbar/index.vue';

import firstecharts from '@/components/firstecharts.vue';
import {
  test,
  home,
  tanNotice
} from '@/api/index';
import {
  useRouter
} from 'vue-router'
import {
  useUserStore
} from '@/store/modules/user.js';
import {
  useI18n
} from 'vue-i18n';
import {Modal} from 'ant-design-vue';


//多语言
const {
  t
} = useI18n();
const router = useRouter();
//仓库中获取商户信息请求函数
const userStore = useUserStore();
//测试接口
test().then(res => {
  console.log(res);
});
//今日售出
const imgs2 = ref([{
  title: t("home.todayOrderSold"),
  icon: new URL('@/assets/image/home2/1.png', import.meta.url).href,
  data: ''
},
  {
    title: t("home.todayTotalsales"),
    icon: new URL('@/assets/image/home2/2.png', import.meta.url).href,
    data: ''
  },
  {
    title: t("home.todaysEstimatedProfit"),
    icon: new URL('@/assets/image/home2/3.png', import.meta.url).href,
    data: ''
  },
])
//请求首页数据
const homeData = ref({})
const getHomeData = async () => {
  const res = await home()
  // console.log(res)
  homeData.value = res.data
  imgs2.value[0].data = homeData.value.today_order
  imgs2.value[1].data = homeData.value.today_sales
  imgs2.value[2].data = homeData.value.today_profit
  // console.log(imgs2.value)
}


/*=====公告数据====*/
const startRequest = ref(true)
const noticeData = ref({})
const noticeDataCount = ref(0)
const noticeDataList = ref({})
const getNoticeData = async () => {
  const res = await tanNotice()
  // console.log(res)
  noticeData.value = res.data
  noticeDataCount.value = noticeData.value.total
  noticeDataList.value = noticeData.value.list
  console.log(noticeDataCount.value)
  if (noticeDataCount.value > 0) {
    startRequest.value = false
    showNotice()
  }
  // noticeVisible.value = true
  // currentNotice.value={title:"123123","content":"123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123"}
}


const currentNotice = ref({})
const noticeVisible = ref(false)
const showNotice = () => {
  const data = getNextData();
  if (data == null) {
    startRequest.value = true
    noticeVisible.value = false
    return
  }
  noticeVisible.value = true
  currentNotice.value = data;
  // 显示模态框
  // Modal.info({
  //   title: data.title,
  //   // content: text, // 动态插入 HTML 内容
  //   content: data.content,
  //   onOk() {
  //     showNotice(); // 递归调用，显示下一条通知
  //   },
  // });
};


const currentNoticeIndex = ref(0)
const getNextData = () => {
  currentNoticeIndex.value++
  // console.log(noticeDataCount.value+'---'+currentNoticeIndex.value)
  if (noticeDataCount.value >= currentNoticeIndex.value) {
    return noticeDataList.value[currentNoticeIndex.value - 1]
  } else {
    currentNoticeIndex.value = 0
    return null
  }
}

const getNoticeDataInterval = () => {
  setInterval(async () => {
    if (startRequest.value) {
      await getNoticeData()
    }
  }, 5000);
}

/*=====数据折叠====*/
const foldHeight = ref('400px');
const fold = () => {
  foldHeight.value = foldHeight.value === '400px' ? '80px' : '300px';
};

//header图标
const img = ref({
  icon1: new URL('@/assets/image/home1/1.png', import.meta.url).href,
  icon2: new URL('@/assets/image/home1/2.png', import.meta.url).href,
})

//店铺数据--店铺展示卡
const list = [{
  name: t("home.shopFollowers"),
  data: userStore.MerInfo.follow_count, //店铺关注
  icon: new URL('@/assets/image/home3/shopFollowers.png', import.meta.url).href
}, {
  name: t("home.shopRating"),
  data: userStore.MerInfo.grade, //店铺评分
  icon: new URL('@/assets/image/home3/shopRating.png', import.meta.url).href
},
  {
    name: t("home.shopCreditScore"),
    data: userStore.MerInfo.credit, //店铺信用分
    icon: new URL('@/assets/image/home3/shopCreditScore.png', import.meta.url).href
  }
];
//页面导航选项卡
const imgs = ref([{
  title: t("home.refundOrders"), //退款订单
  icon: new URL('@/assets/image/home1/refundOrders.png', import.meta.url).href,
  path: '/refundRequest'
},
  {
    title: t("home.shopExpressLane"), //店铺直通车
    icon: new URL('@/assets/image/home1/shopExpressLane.png', import.meta.url).href,
    path: '/storeExpress'
  },

  {
    title: t("home.withdrawal"), //提现
    icon: new URL('@/assets/image/home1/withdrawal.png', import.meta.url).href,
    path: '/withdraw'
  },
  {
    title: t("home.distributionCenter"), //铺货中心
    icon: new URL('@/assets/image/home1/distributionCenter.png', import.meta.url).href,
    path: '/distribution'
  }
])
const userSettings = ref([{
  title: t("home.humanCustomerService"), //人工客服
  icon: new URL('@/assets/image/home1/humanCustomerService.png', import.meta.url).href,
  path: '/service'
}, {
  title: t("home.shopSettings"), //店铺设置
  icon: new URL('@/assets/image/home1/shopSettings.png', import.meta.url).href,
  path: '/baseinfo'
},])
onBeforeMount(() => {
  getHomeData()
  getNoticeData()
  getNoticeDataInterval()
  userStore.toGetMerInfo()
})
const lang = localStorage.getItem('lang')
</script>

<template>
  <!--头部-->
  <div class="container_mix" style="background-color: #FEFEFE;">
    <div class="bg">
      <img src="@/assets/image/BG.png">
    </div>
    <header style="position: relative;z-index: 3;">
      <div class="flex my-6 mx-6  text-white ">
        <div class="flex items-center mr-auto w-[70%]">
          <van-image width="4.6rem" height="4.6rem" round :src="userStore.MerInfo.mer_avatar"/>
          <div class="flex flex-col ml-[.6rem] justify-around"
               style="height: 100%;width: calc(100% - 5.2rem);">
            <div class="mt-1 flex justify-left ">
							<span
                  class="text-lg text-white ml-1.5 font-semibold ">{{ userStore.MerInfo.mer_name }}</span>
            </div>
            <div class="mt-1 flex justify-left ">
							<span class="text-lg text-white ml-1.5" style="overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;">{{ userStore.MerInfo.mer_info }}</span>
            </div>
            <!--            <div class="ml-1 mt-2">-->
            <!--              <span class="text-sm  px-3 py-2 rounded-xl bg-gradient-to-r from-[#6B6B6B]  to-[#1C1B1B]">未认证</span>-->
            <!--            </div>-->
          </div>
        </div>
        <div class="flex items-center ml-auto">
          <div class="flex items-center ml-auto">
            <van-badge class="mr-3" :content="userStore.MerInfo.unread_notice"
                       @click="router.push('/message')" style="position: relative;">
              <div
                  style="background: #FFFFFF;opacity: 0.35;width: 3rem;height: 3rem;position: absolute;border-radius: 100%;">
              </div>
              <div
                  style="width: 3rem;height: 3rem;display: flex;justify-content: center;align-items: center;">
                <img class="h-8 w-8" src="@/assets/image/my/chat.png" alt="">
              </div>

            </van-badge>
          </div>
        </div>
        <div class="h-10">
        </div>
      </div>
    </header>

    <main class="mx-3" style="position: relative;z-index: 3;">
      <a-modal
          :visible="noticeVisible"
          :title="currentNotice.title"
          :closable="false"
          :footer="footer"
          :centered="true">
        <div
            class="modal-content-scrollable"
            v-html="currentNotice.content"></div>
        <template #footer> <!-- 自定义底部内容 -->
          <a-button type="primary" @click="showNotice">
            {{ $t("confirm") }}
          </a-button>
        </template>
      </a-modal>
      <!--数据展示-->
      <div class="bg-white mx-3 p-4 rounded-md back_4" style="padding-bottom: 0;">
        <div class="z-10 rounded-md overflow-hidden" :style="{ 'max-height': foldHeight }"
             style="transition: max-height 1s ease-in-out;">
          <div class="flex justify-between mr-3">
            <div class=" antialiased text-lg shopData">{{ $t("home.shopData") }}
            </div>
            <!-- <div class="flex justify-between align-middle " @click="fold">
              <div class="flex justify-end items-center text-gray-500 w-60 mr-1">{{ $t("home.expandDetails") }}</div>
              <div class="flex justify-center items-center ">
                <img :src="img.icon2" alt="">
              </div>
            </div> -->
          </div>
          <div class="bg-white z-10 rounded-md py-7 pb-4">
            <div class="grid grid-cols-2 grid-flow-col gap-4 rounded-b-lg">
              <div class="flex flex-col justify-center items-start">
                <div class="antialiased  font-semibold totalsales"> {{
                    $t("home.totalsales")
                  }}
                </div>
                <div class="antialiased  font-semibold text-2xl moneyValue">
                  <!-- <van-icon name="cart-circle-o" /> -->
                  $ {{ homeData.total_sales || 0.00 }}
                </div>
              </div>
              <div class="flex flex-col justify-center items-start">
                <div class="antialiased  font-semibold totalsales">{{ $t("home.totalprofit") }}</div>
                <div class="antialiased  font-semibold text-2xl moneyValue red">
                  $ {{ homeData.total_profit || 0.00 }}
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="grid grid-cols-3 grid-flow-row gap-4 rounded-b-lg ">
              <div class="rounded-md  flex-none flex justify-center" style="background: #E5F4F4;"
                   v-for="(item, index) in imgs2" :key="index">
                <div class="flex flex-col justify-center items-center">
                  <div class="antialiased pt-2 text-black text-center px-2" style="font-size: .8rem;">
                    {{ item.title }}
                  </div>
                  <div style="margin: .6rem;">
										<span class="text-lg antialiased font-semibold" style="line-height: 2rem;"
                          :class="{ red: index == 2, 'text-black': index == 0, greed: index == 1 }">{{
                        String(item.data) || 0
                      }}</span>
                  </div>
                </div>
                <!--              <div class="w-3/12 mt-4 mr-4">-->
                <!--                <img :src="item.icon" alt="">-->
                <!--              </div>-->
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 grid-flow-row gap-4 rounded-b-lg mt-3"
               style="border-top: 1px solid #F3F7FC;padding:1rem 0;">
            <!--数据详情-->
            <div class="flex justify-center items-center back_2 rounded-md" v-for="(item, index) in list"
                 :key="index" style="background: #E5F4F4;">
              <div class="flex  justify-between items-center" style="flex: 1;padding:0 .3rem;">
                <div class=" text-neutral-500 " style="font-size: .8rem;">
                  {{ item.name }}
                </div>
                <div class="antialiased font-semibold " style="font-size: .9rem;">{{
                    index == 2 ?
                        (item.data / 20).toFixed(1) : item.data
                  }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="bg-white mx-3 mt-3 p-4 rounded-md back_4">
        <div class="z-10 rounded-md overflow-hidden" :style="{ 'max-height': foldHeight }"
             style="transition: max-height 1s ease-in-out;">
          <div class="grid grid-cols-3 grid-flow-row gap-4 rounded-b-lg" style="padding:1rem 0;">
            <!--数据详情-->
            <div class="flex justify-center items-center  rounded-md">
              <div class="flex flex-col justify-between items-center p-1 text-center"
                   style="height: 4rem;color: #141A52;">
                <div class="antialiased font-semibold  text-lg  text-black">
                  {{ homeData.today_visit || 0 }}
                </div>
                <div class="antialiased text-neutral-500 text-sm" style="font-weight: 800;">{{
                    $t("home.visitorsToday")
                  }}
                </div>
              </div>
            </div>
            <div class="flex justify-center items-center  rounded-md">
              <div class="flex flex-col justify-between  items-center p-1 text-center"
                   style="height: 4rem;color: #141A52;">
                <div class="antialiased font-semibold  text-lg  text-black">{{
                    homeData.seven_visit || 0
                  }}
                </div>
                <div class="antialiased text-neutral-500 text-sm" style="font-weight: 800;">{{
                    $t("home.visitorsLast7Days")
                  }}
                </div>
              </div>
            </div>
            <div class="flex justify-center items-center  rounded-md">
              <div class="flex flex-col justify-between  items-center p-1 text-center"
                   style="height: 4rem;color: #141A52;">
                <div class="antialiased font-semibold  text-lg  text-black">
                  {{ homeData.thirty_visit || 0 }}
                </div>
                <div class="antialiased text-neutral-500 text-sm text-center" style="font-weight: 800;">
                  {{
                    $t("home.visitorsLast30Days")
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--路由按钮-->
      <div class="mx-3 bg-white  mt-3 rounded-md back_4">
        <div class="grid grid-cols-4 grid-flow-row gap-x-2 mx-3 rounded-b-lg mt-3 text-center">
          <div class="flex flex-col justify-center items-center py-3" v-for="item in imgs"
               @click="router.push(item.path)" :key="index">
            <div class="flex justify-center container" style="height: 50%;">
              <img :src="item.icon" class="w-7 h-7 my-2" alt="">
            </div>
            <div style="height: 50%;">
              <span class="text-sm text-neutral-500">{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
      <view class="mx-3">
        <view class="grid grid-cols-2 grid-flow-row gap-x-6 mx-3  py-0">
          <div class="flex justify-center items-center py-3 p-4 bg-white back_4" v-for="item in userSettings"
               @click="router.push(item.path)" :key="index">
            <div class="flex container" style="width: 20%;">
              <img :src="item.icon" class="w-7 h-7 my-2" alt="">
            </div>
            <div style="width: 70%;padding-left: .4rem;">
              <span class="text-sm text-neutral-500">{{ item.title }}</span>
            </div>
            <div
                style="width:10%;height: 100%;align-items: center;display: flex;justify-content: flex-end;">
              <van-icon name="arrow"/>
            </div>
          </div>
        </view>
      </view>
      <!--图表组件-->
      <div class="mx-3 bg-white mt-3 rounded-md back_4">
        <div class="p-6 text-[#141A52] -mb-10">{{ $t("home.salesDataCurve") }}</div>
        <div style="height: 350px">
          <firstecharts/>
        </div>
      </div>
      <!--店铺信息-->
      <!--<div>-->
      <!--  <div class="mx-3 bg-white  mt-3 rounded-md" v-for="item in 2" :key="item">-->
      <!--    <div class="grid grid-cols-2 grid-flow-col gap-4 py-3 pl-3 rounded-b-lg">-->
      <!--      <div class="flex items-center  mr-auto ml-3">-->
      <!--        <img src="@/assets/image/set.png" class="w-10 h-10" alt="">-->
      <!--        <span class="antialiased text-lg pl-3">店铺关注</span>-->
      <!--      </div>-->
      <!--      <div class="flex items-center ml-auto mr-3">-->
      <!--        <span class="antialiased font-semibold text-lg pl-3">350</span>-->
      <!--      </div>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--  <div class="mx-3 bg-white  mt-3 rounded-md">-->
      <!--    <div class="grid grid-cols-2 grid-flow-col gap-4 py-3 pl-3 rounded-b-lg">-->
      <!--      <div class="flex items-center  mr-auto ml-3">-->
      <!--        <img src="@/assets/image/set.png" class="w-10 h-10" alt="">-->
      <!--        <span class="antialiased text-lg pl-3">店铺关注</span>-->
      <!--        <van-icon class="ml-1.5" name="info-o"/>-->
      <!--      </div>-->
      <!--      <div class="flex items-center ml-auto mr-3">-->
      <!--        <span class="antialiased font-semibold text-lg pl-3">350</span>-->
      <!--      </div>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
      <!--订单信息-->
      <!--商品分类-->
      <!--<div>-->
      <!--  <h5 class="antialiased font-semibold text mx-3">-->
      <!--    商品分类-->
      <!--  </h5>-->
      <!--  <div class="scroll-content">-->
      <!--    <div class="item" v-for="item in 5">-->
      <!--      <van-image-->
      <!--          radius="10px"-->
      <!--          width="100%"-->
      <!--          height="100%"-->
      <!--          lazy-load-->
      <!--          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"-->
      <!--      />-->
      <!--      <div class="info">-->
      <!--        <p>奢侈品</p>-->
      <!--        <p>(18)</p>-->
      <!--      </div>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
      <!--热销商品TOP10-->
      <!--<div>-->
      <!--  <h5 class="antialiased font-semibold text mx-3">-->
      <!--    热销商品TOP10-->
      <!--  </h5>-->
      <!--  <div class="bg-white p-3 mx-3 rounded-md mt-3 flex" v-for="item in 6" @click="router.push('/goodsDetail')">-->
      <!--    <div class="w-auto">-->
      <!--      <van-image-->
      <!--          class=""-->
      <!--          width="78"-->
      <!--          height="78"-->
      <!--          lazy-load-->
      <!--          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"-->
      <!--      />-->
      <!--    </div>-->
      <!--    <div class="flex flex-col justify-center   flex-nowrap pl-3">-->
      <!--      <div class="flex-initial leading-5"><span class="text-ellipsis line-clamp_2">Shy Velvet Balaclava 防风冬季面罩，男女抓绒滑雪面罩，保暖面罩帽子围巾</span>-->
      <!--      </div>-->
      <!--      <div class="flex-auto">-->
      <!--        <span class="text-neutral-500 text-sm">浏览: 3,029</span>-->
      <!--        <span class="text-neutral-500 text-sm pl-6">销量: 201</span>-->
      <!--      </div>-->
      <!--      <div class="antialiased text-lg text-blue-500">$14.69</div>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
      <view class="h-20" style="display: block;width: 100%;"></view>
    </main>
  </div>
  <tabbers style="z-index: 99;position: relative;"></tabbers>
</template>


<style></style>

<style scoped lang="scss">
body {
  background-color: #F7F7F7;
}

.bg {
  width: 100%;
  height: 268px;
  background: linear-gradient(180deg, #40A295 0%, #069895 35%, #fff);
  border-radius: 0px 0px 0px 0px;
  position: absolute;
  top: 0;
  z-index: 1;
}
.modal-content-scrollable {
  max-height: calc(30vh - 120px); /* 减去标题、边距和底部空间 */
  overflow-y: auto;
}
.scroll-content {
  width: 100%;
  height: 140px;
  margin-top: 13px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;


  .item {
    width: 120px;
    height: 140px;
    display: block;
    margin-left: 15px;
    position: relative;
    flex: 0 0 auto;


    .info {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #EFF2F6;
      background-color: rgba(0, 0, 0, .4);
      border-radius: 10px;
    }
  }
}

.shopData {
  font-family: YouSheBiaoTiHei;
  font-size: 2rem;
  color: #40A295;
}

.totalsales {
  font-family: Poppins;
  font-weight: 500;
  font-size: 1.2rem;
  color: #181818;
  line-height: 1.2rem;
  margin-bottom: .8rem;
}

.moneyValue {
  font-family: Poppins;
  font-weight: 800;
  font-size: 1.5rem;
  color: #009996;
  line-height: 2.2rem;
}

.greed {
  color: #009996;
}

.red {
  color: #FE4938;
}
</style>