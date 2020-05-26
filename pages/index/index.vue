<template>
	<view class="container">
		<view class="top-container">
			<view class="row">{{date}}</view>
			<view class="row">
				<!-- <input class="input" type="text" :value="action" @input="action = $event.detail.value" /> -->
				<input class="input" type="number" :value="value" @input="value = $event.detail.value" placeholder="Fill in the number completed today" />
			</view>
			<button type="default" @tap="changeData">submit</button>
		</view>
		<canvas class="charts" canvas-id="canvas-id" id="canvas-id" disable-scroll=true @touchstart="touchLine" @touchmove="moveLine"
		 @touchend="touchEndLine"></canvas>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.min.js'

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
				return `${month}-${day}`
			}
			return {
				// date: getDate(),
				date: '05-28',
				action: '',
				value: '',

				chartsData: this.$.getData('chartsData') || {
					categories: [],
					series: [{
						name: 'action',
						data: [],
					}]
				}
			}
		},
		onLoad() {
			this.initCharts()
		},
		methods: {
			bindDateChange(e) {
				this.date = e.target.value
			},
			initCharts() {
				this.charts = new uCharts({
					$this: this, // this实例组件内使用图表，必须传入this实例
					canvasId: 'canvas-id', //页面组件canvas-id，支付宝中为id
					type: 'line',
					fontSize: 11,
					padding: [20, 20, 20, 20],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 5,
					},
					dataLabel: true,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: 1,
					categories: this.chartsData.categories,
					series: this.chartsData.series,
					animation: true,
					enableScroll: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						boundaryGap: 'center',
						rotateLabel: true,

						itemCount: 5, //x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'left', //滚动条初始位置
						scrollBackgroundColor: '#F7F7FF', //默认为 #EFEBEF
						scrollColor: '#DEE7F7', //默认为 #A6A6A6
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
					},
					width: uni.upx2px(750),
					height: uni.upx2px(500),
					extra: {
						line: {
							type: 'curve'
						}
					}
				});

			},
			touchLine(e) {
				this.charts.scrollStart(e);
			},
			moveLine(e) {
				this.charts.scroll(e);
			},
			touchEndLine(e) {
				this.charts.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				this.charts.touchLegend(e);
				this.charts.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			changeData() {
				// 修改chartsData
				if (this.chartsData.categories[this.chartsData.categories.length - 1] == this.date) {
					this.chartsData.series[0].data[this.chartsData.series[0].data.length - 1] = this.value
				} else {
					this.chartsData.categories.push(this.date)
					this.chartsData.series[0].data.push(this.value)
				}
				
				this.charts.updateData(this.chartsData)
				this.$.setData('chartsData', this.chartsData)
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
				margin: 20rpx;
			}

			.row {
				justify-content: center;
				margin: 20rpx;
				display: flex;

				.input {
					width: 100%;
					margin: 10rpx;
					border: 1px solid #efefef;
					border-radius: 10rpx;
					padding: 10rpx 20rpx;
				}
			}
		}

		.charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}
	}
</style>
