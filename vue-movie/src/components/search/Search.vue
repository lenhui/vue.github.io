<template>
	<div id="search-wrap">
		<header>
			<span class="back-icon" @click="back"><</span>
			{{title}}
		</header>
		<div class="search-box">
			<span class="searchIcon"></span>
			<div class="search">
				<input type="text" :placeholder="msg" v-model='val' @keyup.enter="toSearch()">
			</div>
			<span class="deleteIcon"  v-show="val.length>0" @click="msg ==''">				
			</span>
		</div>
		<div class="container">
			<ul class="clearfix">
				<movie-item v-for="(item,index) in movieInfo" :key="index"></movie-item>
			</ul>
		</div>
	</div>
</template>
<script>
import MovieItme from '../movieitem/MovieItem.vue'
import axios from 'axios';
import tools from '../../assets/js/tools.js'
	export default{
		name:'Search',
		data(){
			return{
				title:'搜索结果',
				msg:'',
				val:'',
				movieInfo:[]
			}
		},
		mounted(){
			let val  = this.$route.query.val;
			this.getData(val)
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			getData(val){
				let that = this;
				axios.get('/base'+'/v2/movie/search/',{
					params:{
						q:val
					}}).then(res=>{
					// console.log(res.data)
					that.movieInfo =tools.processData(res.data.subjects,res.data.subjects.length) ;
				}).catch(err=>{console.log(err)})

			},
			toSearch(){
				this.$router.push({path:'/search',query:{val:this.val}})
			}
		},
		components:{
			"movie-item":MovieItme
		}
	}
</script>
<style lang="less" scoped>
	@import url("../../assets/less/var.less");
	#search-wrap{
		// width: 100%;
		.width(375rem);
		header{
			.height(40rem);
			
			background: green;
			text-align: center;
			.fontSize(20rem) ;
			.lineHeight(40rem);
			// text-indent: -10px;
			position: relative;

			color: #fff;
			// .margin(0,0,0,-40rem);
			.back-icon{
				// float: left;
				position: absolute;
				.top(0);
				.left(0);
				.width(40rem);
				.height(40rem);
				font-weight: bolder;
				cursor: pointer;

			}
		}
		.search-box{
		position: relative;
		.height(40rem);
		margin-bottom:5px;
		.searchIcon{
			display: block;
			position: absolute;
			.width(30rem);
			.height(30rem);
			background: url('../index/icon/search.png') no-repeat;
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
			background: url("../index/icon/xx.png") no-repeat;
			background-size: 100%;
			cursor: pointer;
		}
	}
	}
</style>