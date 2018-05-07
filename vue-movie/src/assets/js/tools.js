function setGlobleSize(n) {//设置全局的字体样式
    var oHtml = document.querySelector("html");
    var width = window.screen.width;
    if (width > 750) {
        width = 750;
    }
    oHtml.style.fontSize = width / n + 'px';
}
function processData(data, count) {//数据处理函数
    var movieData = data;//
    var result = [];//定义一个空的数组以便存储数据
    for (var i = 0; i < count; i++) {
        var currentObj = movieData[i];
        var tem = {//定义一个临时对象，将遍历的每一项都赋值给这个对象
            title: currentObj.title.length > 7 ? currentObj.title.substring(0, 6) + '...' : currentObj.title,//title超过7个字符直接截取前六个字符
            id: currentObj.id,
            images: currentObj.images.medium,
            average: currentObj.rating.average,
            star: parseInt(currentObj.rating.stars.substring(0, 1))//截取两个字符
        }
        result.push(tem);//把临时对象push到这个空数组中
    }
    return result;
}

/*module.exports = {
    setGlobleSize: setGlobleSize
}*/
export default{
    setGlobleSize: setGlobleSize,
    processData:processData
}