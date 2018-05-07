<template>
	<div class="movie-item-wrap">
		<li>
			<router-link :to="{path:'/moviedes',query:{movieid:info.id}}">
				<div class="img">
					<img :src='info.images' alt="">
				</div>
				<div class="text">
					<p class="title">{{info.title}}</p>
					<p class="ranting"><my-star :starnum="info.star" :averges="info.average"></my-star></p>
				</div>
			</router-link>
		</li>
	</div>
</template>
<script>
	import Star from '../star/Star.vue'
	export default{
		name:'MovieItem',
		data(){
			return {
				
			}
		},
		props:{
			info:{
				type:Object,
				required:true
			}
		},
		components:{
			"my-star":Star
		}
	}
</script>
<style lang="less" scoped>
@import url('../../assets/less/var.less');
	.movie-item-wrap{
		overflow: hidden;
		// width: 33%;
		.width(125rem);
		.height(190rem);
		

		float: left;
		// background: aqua;
		.img{
			width: 100%;
			box-sizing: border-box;
			.height(130rem);
			.paddingLeft(6rem);
			.paddingRight(6rem);
			img{
				width: 100%;
				height: 100%;
			}	
		} 
		.text{
			width: 100%;
			.paddingLeft(6rem);
			box-sizing: border-box;
			.paddingRight(6rem);
			// height:
			.title{
				.fontSize(14rem);
				// text-align: center;
			}
			.ranting{
				.fontSize(12rem);
				.height(20rem);
			} 
		}
	}
</style>