<template>
	<div class="star-wrap">
		<span v-for="(item,index) in starlist" :class="item"></span>
		<em>{{averges}}</em>
	</div>
</template>
<script>
	export default{
		name:'Star',
		data(){
			return{

			}
		},
		props:{
			starnum:{
				type:Number,
				required:true
			},
			averges:{
				type:Number,
				required:true
			}
		},
		computed:{
			starlist(){
				let STAR_NUM=this.starnum,
					STAR_NO="no",
					STAR_YES="yes",
					listArr=[];
					for(let i=0;i<STAR_NUM;i++){
						//将星星的个数直接push进一个新的数组，通过改变class名来生成star
						listArr.push(STAR_YES);
					}
					for(let j=0;j<5-STAR_NUM;j++){
						listArr.push(STAR_NO);
					}
					return listArr;

			}
		}
	}
</script>
<style lang="less" scoped>
	@import url('../../assets/less/var.less');
	.star-wrap{
		width: 100%;
		.height(20rem); 
		span{
			.width(10rem);
			.height(10rem);
			display: inline-block;
			margin: 0 2px;
			&.yes{
				background: url('./icon/star.png') no-repeat;
				background-size: 100%;
			}
			&.no{
				background: url('./icon/none-star.png') no-repeat;
				background-size: 100%;
			} 
		}
		em{
			float:right;
		}
	}
</style>