<template>	
	<div class="swiper-container" 
	@touchstart="Totouchstart($event)"
	@touchmove="Totouchmove($event)"
	@touchend="Totouchend($event)">
		<div class="swiper">
			<ul>
				<transition-group :name="moveName" tag="div">
					<li v-for="(item,index) in listImg" v-show="index == zIndex" :key="index">
						<img :src="item.images" alt="">
					</li>
				</transition-group>
			</ul>
			<div class="dot-list">
                    <span v-for="(item, index) in listImg" v-bind:class="{active:index==zIndex}"></span>
            </div>
		</div>
	</div>
</template>
<script>
	export default{
		name:"Swiper",
		data(){
			return{
				zIndex:0,//定义当前的index
				beginX:0,//定义点击屏幕开始的clientX值
				isMove:false,
			/*	wait:2,
				auto:true,*/
				timer:'',
				moveName:'left'				
			}
		},
		props:{
			listImg:{

			},
			auto:{
				type:Boolean,
				default:true,
				required:true
			},
			wait:{
				type:Number,
				default:2,
				required:true
			}
		},
		mounted(){
			this.autoPlay();
		},
		methods:{
			Totouchstart(e){
				//先获取到开始点击屏幕的client X
				let startX = e.changedTouches[0].clientX;
				this.beginX = startX;	
				clearInterval(this.timer);//清除定时器			
			},
			Totouchmove(e){
				this.isMove = true;

			},
			Totouchend(e){
				// 获取手指离开屏幕的clientX
				let endX = e.changedTouches[0].clientX
					// console.log(endX)
				let	beginX = this.beginX;//获取到初始触摸是的clientX值
				let distance = Math.abs(endX-beginX);
					// console.log(distance)
				if(this.isMove){
					if(distance>30){
						if(beginX>endX){//判断是向左还是向右
							this.moveName="left";
							this.zIndex ++;
							if(this.zIndex>this.listImg.length-1)this.zIndex=0;

						}else{
							this.moveName = "right";
							this.zIndex--;
							if (this.zIndex<0)this.zIndex=this.listImg.length-1
						}
					}
				}
				this.autoPlay();//调用定时器
			},
			autoPlay(){
				let self = this;//防止作用域污染
                let len = self.listImg.length;
                let auto = self.auto;
                if (auto) {
                    self.timer = setInterval(function() {
                        self.zIndex++;
                        if (self.zIndex > len - 1) {
                            self.zIndex = 0;

                        }
                    }, self.wait * 1000)
                }
			}	
		}
	}
</script>

<style lang="less" scoped>
/* 导入less样式 */
@import url('../../assets/less/var.less');
		.swiper-container{
			box-sizing: border-box;
			width: 100%;
			.height(190rem);
			border: 1px solid #ccc;
			.swiper{
				width: 100%;
				height: 100%;
				position: relative;
					ul{
						overflow: hidden;
						li{
						width: 100%;
						.height(190rem);
						position: absolute;
							img{
								display: block;
								width: 100%;
								.height(190rem);
							}
						}
					}
					.dot-list{
						position: absolute;
				        z-index: 10;
				        width: 100%;
				        height: 30px;
				        left: 0;
				        bottom: 0;
				        text-align: center;
				        line-height: 30px;
				        // background: rgba(63,150,254,0.7);
				        span{
				        	display: inline-block;
					        margin: 0 2px;
					        width: 10px;
					        height: 10px;
					        border-radius: 50%;
					        background: white;
					        &.active{
					        	background: yellow;
					        }
				        }
					}
			}
		}
	.left-leave-to,
    .right-enter {
        transform: translateX(-100%)
    }
    
    .left-enter-active,
    .left-leave-active,
    .right-leave-active,
    .right-enter-active {
        transition: all 1s;
    }
    
    .left-enter,
    .right-leave-to {
        transform: translateX(100%)
    }
</style>