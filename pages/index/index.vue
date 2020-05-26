<template>
	<view class="container">
		<view class="top-container">
			<picker class="picker" mode="date" :value="date" @change="bindDateChange">
				<view class="uni-input">{{date}}</view>
			</picker>
			<view class="row">
				<input type="text" value="" />
				<input type="number" value="" />
			</view>
		</view>

		<view class="qiun-charts">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.min.js'

	// import  { isJSON } from '@/common/checker.js';

	var _self;
	var canvaLineA = null;
	export default {
		components: {},
		data() {
			const getDate = function() {
				const date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				month = month > 9 ? month : '0' + month
				day = day > 9 ? day : '0' + day
				return `${year}-${month}-${day}`
			}
			return {
				date: getDate(),


				pixelRatio: 1,
			}
		},
		onLoad() {
			_self = this;

			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			bindDateChange(e) {
				this.date = e.target.value
			},
			getServerData() {
				let res = {}
				res.data = {
					"success": true,
					"data": {

						"LineA": {
							"categories": ["2012", "2013", "2014", "2015", "2016", "2017"],
							"series": [{
								"name": "成交量A",
								"data": [35, 8, 25, 37, 4, 20]
							}, {
								"name": "成交量B",
								"data": [70, 40, 65, 100, 44, 68]
							}, {
								"name": "成交量C",
								"data": [100, 80, 95, 150, 112, 132]
							}, {
								"name": "成交量C",
								"data": [100, 80, 95, 150, 112, 132]
							}, {
								"name": "成交量C",
								"data": [100, 80, 95, 150, 112, 132]
							}, {
								"name": "成交量C222",
								"data": [100, 80, 95, 150, 112, 162]
							}]
						},
					}
				}
				let LineA = {
					categories: [],
					series: []
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				LineA.categories = res.data.data.LineA.categories;
				LineA.series = res.data.data.LineA.series;
				_self.showLineA("canvasLineA", LineA);

			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,// this实例组件内使用图表，必须传入this实例
					canvasId: canvasId,//页面组件canvas-id，支付宝中为id
					type: 'line',
					fontSize: 11,
					padding: [15, 20, 20, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					dataLabel: true,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						boundaryGap: 'justify'
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						format: (val) => {
							return val.toFixed(0) + '元'
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'curve'
						}
					}
				});
				//下面是默认选中索引
				let cindex = 3;
				//下面是自定义文案
				let textList = [{
					text: '我是一个标题',
					color: null
				}, {
					text: '自定义1：值1',
					color: '#2fc25b'
				}, {
					text: '自定义2：值2',
					color: '#facc14'
				}, {
					text: '自定义3：值3',
					color: '#f04864'
				}];
				//下面是event的模拟,tooltip的Y坐标值通过这个mp.changedTouches[0].y控制
				let tmpevent = {
					mp: {
						changedTouches: [{
							x: 0,
							y: 80
						}]
					}
				};
				// setTimeout(() => {
				// 	canvaLineA.showToolTip(tmpevent, {
				// 		index: cindex,
				// 		textList: textList
				// 	});
				// }, 200)
			},
			touchLineA(e) {
				// canvaLineA.touchLegend(e);
				// canvaLineA.showToolTip(e, {
				// 	format: function(item, category) {
				// 		return category + ' ' + item.name + ':' + item.data
				// 	}
				// });
			},
			changeData() {
				if (isJSON(_self.textarea)) {
					let newdata = JSON.parse(_self.textarea);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		// padding: 20px;
		// font-size: 14px;
		// line-height: 24px;

		.top-container {
			.picker {
				border: 1px solid #efefef;
				text-align: center;
				background-color: #6b9ef0;
				padding: 10rpx;
				border-radius: 10rpx;
				color: #fff;
			}
		}

		.charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}

		.qiun-charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}
	}
</style>
