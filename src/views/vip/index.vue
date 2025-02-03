<template>
  <div class="bg"></div>
  <header>
    <van-nav-bar :title="$t('VipRule.title')" :border="false" :left-text="$t('goback')" left-arrow
                 @click-left="onClickLeft"/>
  </header>
  <main>
    <div class="mx-3 mt-6 pb-3"
         style="height: calc(100vh - var(--van-nav-bar-height) - 2rem); overflow: hidden;overflow-y: auto;">
      <div class="flex justify-center h-[15.5rem] vip">
        <img src="@/assets/image/vip/VIPbg.png" class="h-[15.5rem]" alt=""/>
        <div class="px-[3rem] pr-[3.9rem] pt-[3.5rem] ">

          <div class="grade">
            <span class="text-[2.6rem]">V</span>
            <span class="text-[3.5rem] ml-2">{{ level }}</span>
          </div>
          <div class="level text-[0.9rem] text-[#fff] mt-2">
            <span>{{ $t("vip.profit") }}</span>
            <span class="text-[#FFE570]"> ${{ profit }}</span>
          </div>
          <div class="level text-[0.9rem] text-[#fff] mt-2">
            <span>{{ $t("vip.totalCost") }}</span>
            <span class="text-[#FFE570]"> ${{ totalCost }}</span>
          </div>

          <!--					<div class="level text-[0.85rem] text-[#C0E5E3] mt-4 ">
                      {{$t("vip.Overview") }}
                    </div>-->
          <!--					<div class="mt-4 h-[2.7rem] text-[#FFF] rounded flex justify-center items-center"
                      style="background-color: #45B0AA;" @click="Goto('/VipRule')">
                      {{$t("vip.btn") }}
                    </div>-->
        </div>
      </div>
      <div class="items-center grid grid-cols-2 bg-[#FDFEFE] text-[#009996] back_4 rounded-2xl h-[4rem] mt-3">
        <div class="p-3 h-[4rem] rounded-2xl flex" :class="{'active':active===0}" @click="active=0">
          <div class="w-[100%] h-[100%] flex items-center justify-center text-center">
            {{ $t("vip.vipMerch") }}
          </div>
        </div>
        <div class="py-3 h-[4rem] rounded-2xl flex" :class="{'active':active===1}" @click="active=1">
          <div class="w-[100%] h-[100%] flex items-center justify-center text-center">
            {{ $t("vip.dataCount") }}
          </div>
        </div>
      </div>
      <div class="h-[2.5rem]" v-show="active===0"></div>
      <div class="mx-3 mt-[1.2rem] container flex items-center font-bold text-[#000000]" v-show="active===1">
        <span style="margin-right: 10px">{{ $t('vip.checkTime') }}</span>
        <van-button type="primary" size="small" style="margin-right: 10px" @click="isShowPicker=true">{{ daysSearchText }}</van-button>
        <van-button type="primary" size="small" @click="isShowTimer=true">{{ $t('vip.timeSearch') }}</van-button>
      </div>

      <div class="mt-[1rem] container flex items-center font-bold text-[1.7rem]"
           v-show="active===1">
        <span class="w-1/2 text-center">{{ $t('vip.orderCount') }}:{{dataCountResponse.next_order_num}}</span>
        <span class="w-1/2 text-center">{{ $t('vip.orderTotal') }}:{{dataCountResponse.next_pick_price}}</span>
      </div>

      <div class="mt-[1rem] container flex items-center font-bold text-[#335FD7] text-[1.7rem]"
           v-show="active===1">
        <span class="w-1/3 text-center">{{ $t('vip.timeCount') }}</span>
        <span class="w-1/3 text-center">{{ $t('vip.orderCount') }}</span>
        <span class="w-1/3 text-center">{{ $t('vip.orderTotal') }}</span>
      </div>
      <div v-if="(List.length<=0 && active===0)||(List2.length<=0 && active===1)">
        <van-empty :description="$t('vip.noRecords')"/>
      </div>
      <div class=" mx-3 block relative" style="height: calc(100% - 23rem);"
           v-if="(List.length>0 && active===0)||(List2.length>0 && active===1)">
        <!-- VIP商家列表 -->
        <div class="h-[6.2rem] flex justify-between bg-[#fff] py-[1.2rem] px-[.7rem] "
             v-for="(item,index) in List" :key="index" v-if="active===0">
          <div class="h-[3.8rem] w-[3.8rem]">
            <van-image width="3.8rem" height="3.8rem" round :src="item.mer_avatar"/>
          </div>
          <div class="flex items-center justify-between" style="width: calc(100% - 3.8rem);">
            <div class="pl-3 flex items-center" style="width: calc(30%);">
              <div class="text-[#181818] font-semibold" style="line-height: 1.8rem;overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;">{{ item.mer_name }}
              </div>

            </div>
            <div class="w-[70%] flex items-center justify-end">
              <!-- <div style="line-height: 1.8rem;" class="flex justify-end items-end h-[100%]">
              <span class="text-[#888888]">{{$t('vip.number')}}</span>
              <span class="text-[#009996] ml-1 font-semibold">{{item.mer_level}}</span>
            </div> -->
              <div style="line-height: 1.8rem;" class="">
                <span class="text-[#888888]">{{ $t('vip.payment') }}</span>
                <span class="text-[#FE4938] ml-1 font-semibold"> $ {{ item.total_cost }}</span>
              </div>
            </div>
          </div>
          <div class="absolute top-0 right-0  py-[0.2rem] px-[.6rem]" :style="`background:${active===1?'rgba(254,73,56,0.35)':'#F2FAFA'} ;
border-radius: 0px 6px 0px 6px;`">
            <span v-if="active===1" class="text-[#fff] text-[0.7rem]">{{ $t('vip.no') }}</span>
            <span v-if="active===0" class="text-[#CBCBCB] text-[0.7rem]">{{ $t('vip.ok') }}</span>
          </div>
        </div>
        <!-- 数据统计列表 -->
        <van-list v-model:loading="loading" :finished="finished" :finished-text="$t('distribution.nomore')"
                  :immediate-check="false" @load="getDataCount()">
        <div class="h-[4rem] flex justify-between bg-[#fff] py-[1.2rem] px-[.7rem]"
             v-for="(item,index) in List2" :key="index" v-if="active===1">

          <div class="container flex items-center">
            <span class="w-1/3 pl-3">2025-{{ item.month }}-{{ item.day }}</span>
            <span class="w-1/3 text-center">{{ item.next_order_num }}</span>
            <span class="w-1/3 text-center">{{ item.next_pick_price }}</span>
          </div>

        </div>
        </van-list>
      </div>
    </div>
    <van-popup v-model:show="isShowPicker" destroy-on-close round position="bottom">
      <van-picker
          :columns="columns"
          @cancel="isShowPicker = false"
          @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model:show="isShowTimer" destroy-on-close round position="bottom" :close-on-click-overlay="false">
      <van-date-picker
          v-model="currentDate"
          :title="timeTitle"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="onCancelTimer"
          @confirm="onConfirmTimer"
      />
    </van-popup>

    <!-- <van-popup v-model:show="showBottom" round position="bottom">
      <template #default>
        <div class="h-[100%] px-[1.6rem] py-[2rem] ">

          <div class="text-[1.6rem] text-[#141A52]">{{$t('vip.Rule')}}
          </div>
          <div class="mt-[1.5rem] pb-[3rem] text-[#888888] ">
            <div class="mt-[1.2rem] text-[0.9rem]" style="word-wrap:break-word">
              {{$t('vip.RuleDetail.V1')}}
            </div>
            <div class="mt-[1.2rem] text-[0.9rem]" style="word-wrap:break-word">
              {{$t('vip.RuleDetail.V2')}}
            </div>
            <div class="mt-[1.2rem] text-[0.9rem]" style="word-wrap:break-word">
              {{$t('vip.RuleDetail.VN')}}
            </div>
            <div class="mt-[1.2rem] text-[0.9rem]" style="word-wrap:break-word">
              {{$t('vip.RuleDetail.remark')}}
            </div>
          </div>
        </div>
      </template>
    </van-popup> -->
  </main>
</template>

<script setup>
import {
  useI18n
} from 'vue-i18n';
import {
  dataCount,
  viplist
} from "@/api/index.js";
import {onBeforeMount} from "vue";
import {showToast} from "vant";
//多语言
const {
  t
} = useI18n();
const router = useRouter();
const onClickLeft = () => {
  router.back();
};
const lang = localStorage.getItem("lang")
const level = ref(1) //vip点击
const profit = ref() //vip收益
const totalCost = ref() //vip收益
const active = ref(0) //0有效商家，1无效商家
const showBottom = ref(false)

const List = ref([])
const getList = async () => {
  const res = await viplist()
  // console.log(res)
  level.value = res.data.level
  profit.value = res.data.profit
  totalCost.value = res.data.total_cost
  // List.value = res.data.list.filter(item => item.is_active == 1)
  // console.log(List);
  // List2.value = res.data.list.filter(item => item.is_active != 1)
  // console.log(List2);
  List.value = res.data.list
}

const List2 = ref([])
const dataCountResponse = ref()
const dataCountParam = ref({})
const daysSearchText = ref("")
const getDataCount = async () => {
  if(dataCountParam.page==0){
    List2.value = [];
  }
  let number = parseInt(dataCountParam.page);
  number++;
  dataCountParam.page = number.toString();
  const res = await dataCount(dataCountParam)
  dataCountResponse.value=res.data
  loading.value = false;
  if (res.data.list.length <= 0) {
    finished.value = true;
  }
  // console.log(res)
  // List2.value = res.data.list
  List2.value.push(...res.data.list);
}
const Goto = ((path) => {
  router.push(path);
});

//7/15选择器
const isShowPicker = ref(false);
const columns = [
  {text: t("vip.qiDays"), value: '7'},
  {text: t("vip.swDays"), value: '15'}
];
const onConfirm = ({selectedValues, selectedOptions}) => {
  // console.log(`selectedValues--${selectedValues}`)
  isShowPicker.value = false
  dataCountParam.starttime = null
  dataCountParam.endtime = null
  dataCountParam.day = selectedValues.join(',')
  if (dataCountParam.day == 7) {
    daysSearchText.value = t("vip.qiDays")
  } else {
    daysSearchText.value = t("vip.swDays")
  }
  dataCountParam.page = 0
  getDataCount()
};

//时间选择
const loading = ref(false);
const finished = ref(false);
const timeTitle = ref('');
const isShowTimer = ref(false);
const timerStep = ref(1);
const currentDate = ref([]);
const minDate = new Date(2020, 0, 1);
const maxDate = ref([]);
const onConfirmTimer = ({selectedValues, selectedOptions, selectedIndexes}) => {
  // console.log(`onConfirmTimer--${selectedValues.join('-')}`)
  isShowTimer.value = false
  //判断是起始时间 还是 结束时间
  if (timerStep.value == 1) {
    timerStep.value = 2
    timeTitle.value = t("vip.endTime")
    isShowTimer.value = true
    dataCountParam.starttime = selectedValues.join('-') + " 00:00:00"
  } else {
    let isRightTimeDuring = compareDates(dataCountParam.starttime.replace(" 00:00:00", ""), selectedValues.join('-'))
    // console.log(`isRightTimeDuring--:${isRightTimeDuring}`)
    if (isRightTimeDuring) {
      timerStep.value = 1
      timeTitle.value = t("vip.startTime")
      dataCountParam.endtime = selectedValues.join('-') + " 00:00:00"
      dataCountParam.day = null
      dataCountParam.page = 0
      getDataCount()
    } else {
      onCancelTimer()
      showToast( t("vip.timeDuringError"))
    }
  }
}
const onCancelTimer = () => {
  isShowTimer.value = false
  timerStep.value = 1
  timeTitle.value = t("vip.startTime")
  dataCountParam.starttime = null
  dataCountParam.endtime = null
}
const getCurrentDate = () => {
  const today = new Date();
  // 获取年、月、日
  const year = today.getFullYear();
  // 在 JavaScript 中，月份是从0开始计数的
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  // 返回格式化的日期字符串
  currentDate.value = [year, month, day];
  maxDate.value = today;
}

const compareDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
}

onBeforeMount(() => {
  getList()
  dataCountParam.page = 0
  dataCountParam.day = 7
  dataCountParam.limit = 10
  daysSearchText.value = t("vip.qiDays")
  timeTitle.value = t("vip.startTime")
  getCurrentDate()
  // currentDate = new Date();
  // console.log(`selectedValues--${new Date()}---${minDate}`)
  getDataCount()
})
</script>

<style scoped lang="scss">
:deep(.van-nav-bar) {
  background-color: transparent !important;
}

.bg {
  width: 100%;
  height: 268px;
  background: linear-gradient(180deg, #40A295 0%, #069895 20%, #F8F8F8);
  border-radius: 0px 0px 0px 0px;
  position: absolute;
  top: 0;
  z-index: -1;
}

.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.label {
  margin-right: 10px;
}

.time-options {
  display: flex;
  align-items: center;
}

.text-center {
  align-items: center;
}

.time-options span {
  margin-right: 10px;
}

.vip {
  position: relative;

  img {
    // position: absolute;
    top: 0;
  }

  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    // top: -14rem;
    z-index: 3;

    .grade {
      font-family: PangMenZhengDao !important;
      font-weight: 400;
      color: #FFE570;
      line-height: 1.8rem;
    }
  }
}

.active {
  background-color: #009996;
  color: #fff;
}
</style>