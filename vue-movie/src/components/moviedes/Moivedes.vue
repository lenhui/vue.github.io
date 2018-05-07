<template>
	<div class="moviedes-wrap">
		<header>
			<span class="back-icon" @click="back"><</span>
			{{movieInfo.title}}
		</header>
		<div class="movie-box">
			<div class="movie-wrap">
				<div class="bg-img">
					<img :src="movieInfo.images.medium" alt="" v-if="movieInfo.images">
				</div>
				<div class="show-img">
					<img :src="movieInfo.images.medium" alt="" v-if="movieInfo.images">
				</div>
				<div class="title"><i>{{movieInfo.title}}</i></div>
				<div class="city">
					<span  v-if="movieInfo.countries">{{movieInfo.countries[0]}}</span>·<span>{{movieInfo.year}}</span>
				</div>
				<div class="like">
					<span>{{movieInfo.collect_count}}</span><i>人喜欢</i>
					<span>{{movieInfo.comments_count}}</span><i>评论</i>
				</div>
			</div>
			<div class="ranting">
				<div class="ranting-header">
					<i>{{movieInfo.original_title}}</i>
				</div>
				<div class="ranting-list">
					<ul>
						<li>
							<i>评分：</i><span v-if="movieInfo.rating">{{movieInfo.rating.average}}</span>
						</li>
						<li>
							<i>导演：</i><span v-if="movieInfo.directors">{{movieInfo.directors[0].name}}</span>
						</li>
						<li>
							<i>影人：</i>
							<span v-for="(item,index) in movieInfo.casts" v-if="movieInfo.casts" :key="index">{{item.name}}<b v-if='index < movieInfo.casts.length-1'>/</b> </span>
						</li>
						<li>
							<i>类型：</i><span v-for="(item,index) in movieInfo.genres" v-if="movieInfo.genres">{{item}}<b v-if='index<movieInfo.genres.length-1'>/</b></span>
						</li>
					</ul>
				</div>
			</div>
			<hr>
			<div class="intro">
				<div class="intro-title">剧情介绍</div>
				<p>{{movieInfo.summary}}</p>
			</div>
			<hr>
			<div class="actor">
				<div class="actor-header">
					影人
				</div>
				<div class="actor-list">
					<ul class="clearfix actor-box" 
						@touchstart="touchS($event)"
						@touchmove="touchM($event)"
						:style="{transform:'translateX('+distance+'px)'}">
							<li class="actor-item" v-for="(item,index) in movieInfo.casts" :key='index' v-if="movieInfo.casts">
								<img :src="item.avatars.small" alt="">
								<span>{{item.name}}</span>
							</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
	export default {
		name:'Moivedes',
		data(){
			return {
				title:'美女一号',
				movieInfo:[],
				startX:0,
				distance:0,
				maxWidth:0,
				init:0
			}
		},
		beforeMount(){
			
		},
		mounted(){
			let id = this.$route.query.movieid;
			let that = this;
			this.getData(id,function(){
				that.setUlWidth();
			});						
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			getData(id,call){
				let that = this;
				axios.get('/base'+'/v2/movie/subject/'+id).then(res=>{
					// console.log(res.data)
					that.movieInfo =res.data ;
					call&&call();
				}).catch(err=>{console.log(err)})

			},
			setUlWidth(){
				this.$nextTick(function(){
					let actorLi = document.getElementsByClassName('actor-item')	;
					let liWidth = actorLi[0].offsetWidth;
					let actorUl = document.getElementsByClassName('actor-box');

					actorUl[0].style.width = (liWidth+10)*this.movieInfo.casts.length +'px';
					// console.log(this.movieInfo.casts.length);	
					this.maxWidth=parseInt(actorUl[0].style.width)-document.getElementsByClassName('actor-list')[0].offsetWidth;
				})				
			},
			touchS(e){
				let startX = e.changedTouches[0].clientX; //获取touch时的clientX值
				this.startX = startX;  //将值保存到data中
				this.init = this.distance;//获取上次移动的距离   0
			},
			touchM(e){
				let movieX = e.changedTouches[0].clientX;
				let distance = movieX-this.startX;//移动的距离
				this.distance = this.init + distance;//将上次移动的距离和这次移动的距离相加可以得到此处距离最左边的距离  
				if(this.distance>0){//判断移动是否能够继续
					this.distance = 0;
				}else if(this.distance <-this.maxWidth){
					this.distance = -this.maxWidth;
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	@import url('../../assets/less/var.less');
	.moviedes-wrap{
		width: 100%;
		text-align: justify;

	}
	img{
		display: block;
		width: 100%;
		height: 100%;
	}
	header{
		.height(40rem);	
		background: green;
		text-align: center;
		.fontSize(20rem) ;
		.lineHeight(40rem);
		position: relative;
		color: #fff;
		.back-icon{
			position: absolute;
			.top(0);
			.left(0);
			.width(40rem);
			.height(40rem);
			font-weight: bolder;
			cursor: pointer;
		}
	}
	.movie-box{
		width: 100%;
		.movie-wrap{
			width: 100%;
			.height(150rem);
			position: relative;
			color:#fff;
			.bg-img{
				position: absolute;
				z-index: -1;
				width: 100%;
				height: 100%;
				img{
					filter:blur(6px);
				}
			}
			.show-img{
				.width(90rem);
				.height(120rem);
				position: absolute;
				.right(10rem);
				.bottom(-20rem);
			}
			.title{
			
				.height(30rem);
				.fontSize(20rem);
				.paddingLeft(10rem);
				font-weight: 600;
				box-sizing: border-box;
			}
			.city{
				.paddingLeft(10rem);
				box-sizing: border-box;
				.height(50rem);
				.fontSize(16rem);
				.lineHeight(50rem);
				span{
					.margin(0,5rem,0,5rem);
				}
			}
			.like{
				.height(30rem);
				.fontSize(16rem);
				span{
					.paddingLeft(10rem);
					.paddingRight(10rem);
					color: red;
				}
				i{
					color: #111;
				}
			}

		}
	}
	.ranting{
		.paddingLeft(10rem);
		.paddingRight(10rem);
		.paddingBottom(20rem);
		box-sizing: border-box; 
		.ranting-header{
			.fontSize(20rem);
			.height(55rem);
			.lineHeight(55rem);
		}
		.ranting-list{
			.fontSize(14rem);
			li{
				color: #666;
				i{
					color: #999;
				}
				span{
					.fontSize(12rem);
				}
			}
		}
	}
	.intro{
			.paddingTop(20rem);
			.paddingLeft(10rem);
			.paddingRight(10rem);
			.paddingBottom(20rem);
			box-sizing: border-box;
			.intro-title{
				.height(25rem);
				.fontSize(20rem);
				.lineHeight(25rem);
				color:#999;
			}
			p{
				.fontSize(12rem);
				.lineHeight(18rem);
				.paddingTop(10rem);
			}
		}
	.actor{
		.paddingTop(20rem);
		.paddingLeft(10rem);
		.paddingRight(10rem);
		.paddingBottom(20rem);
		box-sizing: border-box;
		.actor-header{
			.height(25rem);
			.fontSize(20rem);
			.lineHeight(25rem);
			color:#999;
		}
		.actor-list{
			.paddingTop(10rem);
			overflow: hidden;
			ul{
				// .paddingLeft(-10rem);
				li{
					.height(120rem);
					.width(90rem);
					.margin(0,0,0,10rem);
					float: left;
					position: relative;
					&:nth-of-type(1){
						margin: 0;
					}
					span{
						display: block;
						.height(20rem);
						width:100%;
						position: absolute;
						bottom: 0;
						left: 0;
						.fontSize(12rem);
						.lineHeight(20rem);
						text-indent: 1em;
						background: rgba(160, 143, 143,.5);
						color: #fff;
					}
				}
			}
		}
	}
</style>