<template>
	<div class="echart" ref="mychart" id="mychart" :style="{ float: 'left', width: '100%', height: '350px' }"></div>
</template>

<script>
	import * as echarts from "echarts";
	import {
		echart
	} from "@/api/index"

	export default {
		data() {
			return {
				list: {},
				range: {
					range: "seven"
				}
			};
		},
		mounted() {
			this.getList();
		},
		methods: {
			getList() {
				echart(this.range).then(res => {
					this.list = res.data;
					console.log(this.list)
					const option = {
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: this.list.x,
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: this.list.y,
							type: 'line',
							lineStyle: {
								width: 3, //外边线宽度
								color: 'rgba(0,153,150, 1)' //外边线颜色
							},
							areaStyle: { //区域填充渐变颜色
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: 'rgba(0,153,150, 0.8)' // 0% 处的颜色
									}, {
										offset: 1,
										color: 'rgba(255,255,255, 0.8)' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								}
							}
						}]
					};
					const myChart = echarts.init(this.$refs.mychart); // 图标初始化
					myChart.setOption(option); // 渲染页面
					//随着屏幕大小调节图表
					window.addEventListener("resize", () => {
						myChart.resize();
					});
				})

			}
		}
	};
</script>