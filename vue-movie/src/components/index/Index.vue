<template>
	<div class="index-wrap">
		<!-- 头部 -->
		<header id="header">
			<span>光与影</span>
		</header>
		<!-- 头部 -->	
		<!-- 搜索框 -->
		<div class="search-box">
			<span class="searchIcon"></span>
			<div class="search">
				<input type="text" :placeholder="msg" v-model='val' @keyup.enter="toSearch()">
			</div>
			<span class="deleteIcon"  v-show="val.length>0" @click="del()">				
			</span>
		</div>
		<!-- 搜索框 -->
		<!-- swiper组件 -->
		<div class="swiper-wrap">
			<my-swiper :listImg="theater.data" :auto="true" :wait="2"></my-swiper>
		</div>
		<!-- swiper组件 -->
		<!-- 内容区域 -->
		<div class="container">
			<!-- 正在热映 -->
			<div class="box clearfix">
				<div class="movie-header clearfix">
					{{theater.title}}
					<span><router-link to="/theater">更多</router-link></span>
				</div>
				<div class="movie-content">
						<movie-item v-for="(item,index) in theater.data" :info="item" :key="index"></movie-item>
				</div>
			</div>
			<!-- 即将上映 -->
			<div class="box clearfix">
				<div class="movie-header clearfix">
					{{comingsoon.title}}
					<span><router-link to="/comingsoon">更多</router-link></span>
				</div>
				<div class="movie-content">
						<movie-item v-for="(item,index) in comingsoon.data" :info="item" :key="index"></movie-item>
				</div>
			</div>
			<!-- top250 -->
			<div class="box clearfix">
				<div class="movie-header clearfix">
					{{top250.title}}
					<span><router-link to="/top250">更多</router-link></span>
				</div>
				<div class="movie-content">
						<movie-item v-for="(item,index) in top250.data"  :info="item" :key="index"></movie-item>
				</div>
			</div>
		</div>
		<!-- 内容区域 -->
	</div>
</template>

<script>
	/*es6  暴露模块*/
	import Swiper from '../swiper/Swiper.vue'
	import axios from 'axios'
	import tools from '../../assets/js/tools.js'
	import MovieItem from '../movieitem/MovieItem.vue'
	// axios.prototype.$http = axios
	export default{
		name:'Index',
		data(){
			return{
				msg:'hello vue',
				val:'',
				// api:'https://api.douban.com/v2/movie/in_theaters',
				theater: {
                    title: '正在热映',
                    data: []
                },
                comingsoon: {
                    title: "即将上映",
                    data: []
                },
                top250: {
                    title: 'top250',
                    data: []
                },
				imgList:[]
			}
		},
		beforeMount: function() {
			//在没有挂载之前直接调用函数并对数据进行处理
       		this.getData('/v2/movie/in_theaters', 'theater', '正在热映')
            this.getData('/v2/movie/coming_soon', 'comingsoon', '即将上映')
            this.getData('/v2/movie/top250', 'top250', 'top250')
        },		
		methods:{
			del (){
				this.val = "";
			},
			getData(url, category, title){//定义一个得到数据的函数
				var self = this;//防止作用域污染
                var tem = {};//定义一夜空的对象
                tem.title = title;
				axios({
						method: 'get',
						url:'/base'+url+""
						}).then(res=>{
							self.imgList=res.data.subjects;
							let movieData = tools.processData(res.data.subjects, 3);
							tem.data = movieData;
							self[category]= tem;
							// self.category = tem  效果一样
						}).catch(err=>{console.log(err)})
				// axios.get('/base'+'/v2/movie/in_theaters').then(res=>{console.log(res)}).catch(err=>{console.log(err)})
			},
			toSearch(){
				this.$router.push({path:'/search',query:{val:this.val}})
			}
		},
		components:{
			"my-swiper":Swiper,
			'movie-item':MovieItem
		}

	}
	/*接受模块*/
	// import " "

/*	module.exports=function(){
		common.js语法
		暴露模块
	}
	require()
	接受模块
	*/
</script>
<style scoped lang="less">
	@import url("../../assets/less/var.less");
	html{
		overflow: hidden;
		.width(375rem);
	}
	header{
		width: 100%;
		.height(40rem);
		background: #405f80;
		.fontSize(20rem);
		color: #fff;
		text-align: center;
		.lineHeight(40rem)
	}
	.search-box{
		position: relative;
		.height(40rem);
		.searchIcon{
			display: block;
			position: absolute;
			.width(30rem);
			.height(30rem);
			background: url('./icon/search.png') no-repeat;
			background-size: 100%;
			.top(5rem);
			.left(5rem);
			z-index: 10;
		}
		.search{
			position: absolute;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			.paddingLeft(40rem);
			input{
				position: absolute;
				top: 0;
				height: 100%;
				.width(335.5rem);
				box-sizing: border-box;
				.paddingRight(30rem);
				border:none;
				.fontSize(20rem);

			}
		}
		.deleteIcon{
			display: block;
			position: absolute;
			.top(10rem);
			.right(10rem);
			.width(20rem);
			.height(20rem);
			background: url("./icon/xx.png") no-repeat;
			background-size: 100%;
			cursor: pointer;
		}
	}
	/* .container{
		
		.box{
			margin-bottom:10px; 
			.movie-header{
				box-sizing: border-box;
		        position: relative;
		        width: 100%;
		        .paddingLeft(10rem);
		        .paddingRight(10rem);
		        .height(40rem);
		       	.fontSize(16rem);
		        .lineHeight(40rem);
		        .more{
		        	box-sizing: border-box;
			        position: absolute;
			        width: 100%;
			        .height(40rem);
			        top: 0;
			        left: 0;
			        .paddingLeft(10rem);
			        .paddingRight(10rem);
			        text-align: right;
			        color: #2550a7;
		        }
			}
			.movie-list{
				box-sizing: border-box;
	        		width: 100rem;
	        		ul{
	        			li{
	        				box-sizing: border-box;
				        width: 33.3%;
				        .height(190rem);
				        float: left;
				        .paddingLeft(10rem);
		        		.paddingRight(10rem);
		        		background: red;
	        			}
	        		}
			}
		}
	} */
	.container{
		width: 100%;
		// background-color: lightblue;
		.box{
			width: 100%;
			.movie-header{
				.paddingLeft(6rem);
				.paddingRight(6rem);
				.height(40rem);
				// background: red;
				.fontSize(20rem);
				.lineHeight(40rem);
				// border-bottom: 1px solid red;
				span{
					float: right;
					.fontSize(16rem);
				}
			}
		}
	}
</style>