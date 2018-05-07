<template>
	<div id="theater-wrap">
		<header>
			<span class="back-icon" @click="back"><</span>{{title}}</header>
		<div class="container ">
			<ul class="clearfix">
				<movie-item v-for="(item,index) in movieList" :info="item" :key="index"></movie-item>
			</ul>
		</div>
	</div>
</template>
<script>
import MovieItme from '../movieitem/MovieItem.vue';
import axios from 'axios';
import tools from '../../assets/js/tools.js';
	export default{
		name:'Theater',
		data(){
			return{
				title:'正在热映',
				movieList:[]
			}
		},
		beforeMount(){
			this.getData()
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			getData(){
				let that = this;
				axios.get('/base'+'/v2/movie/in_theaters').then(res=>{
					// console.log(res.data.subjects)
					that.movieList =tools.processData(res.data.subjects,res.data.subjects.length) ;
				}).catch(err=>{console.log(err)})
			}
		},
		components:{
			"movie-item":MovieItme
		}
	}
</script>
<style lang="less" scoped>
	@import url("../../assets/less/var.less");
	#theater-wrap{
		width: 100%;
		overflow: hidden;
		header{
			.height(40rem);
			width: 100%;
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
	}
</style>