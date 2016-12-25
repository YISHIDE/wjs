/**
 * Created by 80474 on 2016/9/28.
 */
(function(w){
    //需要考虑的事情，1.父盒子元素2.要滑动的子元素3.滑动的方向4.缓冲距离
    function Swiper(){
       this.parentEle=null;
       this.childEle=null;
       this.direction="x";
       this.distance=10;
    };
    //—.添加部，执行滑动所需要的材料
    Swiper.prototype.add=function(options){
        //通过拷贝方法，覆盖默认值
        for(var k in options){
            this[k]=options[k];
        }
        //实现链式编程
        return this;
    };
    //二.策略部(js策略模式)
    //滑动方向策略 1.向x轴滑动或是向y轴滑动
    Swiper.prototype.x=function(){
       //先计算所需要的材料
       // 父盒子与滑动盒子的宽度
       this.parentEleX=this.parentEle.offsetWidth;//父盒子的宽度；
       this.childEleX=this.childEle.offsetWidth;//滑动盒子的宽度；
       //向右滑动最大定位与向左滑动最小定位距离
       this.maxX=0;
       this.minX=this.parentEleX-this.childEleX;
       //向右滑动最大缓冲与向左滑动最小缓冲距离；
       this.maxDistanceX=this.maxX+this.distance;
       this.minDistanceX=this.minX-this.distance;
        //对滑动盒子进行事件的添加;
        var startX=0;//手指触发的开始x轴距离；
        var endX=0;//手指弹起时的x轴距离；
        var moveX=0;//盒子移动的x轴距离；
        var currentX=0;//盒子的当前位置；
        var _that=this;//this陷阱;
        this.childEle.addEventListener("touchstart",function(e){
             startX=e.touches[0].clientX;//记录手指触摸盒子的x轴坐标;
        });
        this.childEle.addEventListener("touchmove",function(e){
             endX=e.touches[0].clientX;//记录手指移动盒子的x轴坐标;
             moveX=endX-startX;//盒子移动的距离；
            if(currentX+moveX>_that.maxDistanceX ){
                _that.clearTransition();
                _that.setTransform(_that.maxDistanceX,0);
                return;
            }
            if(currentX+moveX<_that.minDistanceX){
                _that.clearTransition();
                _that.setTransform(_that.minDistanceX,0);
                return;
            }
            //清除过渡动画属性
            _that.clearTransition();
            _that.setTransform(currentX+moveX,0);
            //_that.childEle.style.transform="translateX("+moveX+"px)";
        });
        this.childEle.addEventListener("touchend",function(e){
            //moveX=endX-startX;//盒子移动的距离；
           //如果结束后的盒子在最大定位和最小定位之外的话
            if(currentX+moveX>_that.maxX){
               //需要过渡属性
                _that.setTransition();
                _that.setTransform(_that.maxX,0);
                currentX=_that.maxX;
                return clear();
            }
            if(currentX+moveX<_that.minX){
                //需要过渡属性
                _that.setTransition();
                _that.setTransform(_that.minX,0);
                currentX=_that.minX;
                return clear();
            }
            //如果没超出定位方位则盒子的宽度，则最后盒子的定位就是moveX；
            _that.clearTransition();
            _that.setTransform(currentX+moveX,0);
            currentX=currentX+moveX;
            clear();
            function clear(){
                startX=0;//手指触发的开始x轴距离；
                endX=0;//手指弹起时的x轴距离；
                moveX=0
            }
        });
    };
    //2.向y轴滑动
    Swiper.prototype.y=function(){
        //先计算所需要的材料
        // 父盒子与滑动盒子的高度
        this.parentEleY=this.parentEle.offsetHeight;//父盒子的高度；
        this.childEleY=this.childEle.offsetHeight;//滑动盒子的高度；
        //向下滑动最大定位与向上滑动最小定位距离
        this.maxY=0;
        this.minY=this.parentEleY-this.childEleY;
        //向下滑动最大缓冲与向上滑动最小缓冲距离；
        this.maxDistanceY=this.maxY+this.distance;
        this.minDistacneY=this.minY-this.distance;
        //对滑动盒子进行事件的添加;
        this.childEle.addEventListener("touchstart",function(e){

        });
        this.childEle.addEventListener("touchmove",function(e){

        });
        this.childEle.addEventListener("touchend",function(e){

        });
    };
    //未来可以扩充策略，解耦合符合模块之间的单一职责原则
    //是否需要在滑动盒子设置过渡属性，当滑动盒子处于最大定位与最大缓冲距离之间或是最小定位与最小缓冲距离之间需要过渡返回
    Swiper.prototype.setTransition=function(){
       //对滑动盒子设置过度属性
        this.childEle.style.transition ="all .5s linear";
        this.childEle.style.webkitTransition ="all .5s linear";//兼容低版本的谷歌浏览器
    };
    Swiper.prototype.clearTransition=function(){
       //对滑动盒子清除过渡属性
        this.childEle.style.transition ="none";
        this.childEle.style.webkitTransition ="none";//兼容低版本的谷歌浏览器
    };
    //设置盒子移动的距离
    Swiper.prototype.setTransform=function(x,y){
        this.childEle.style.transform="translate("+x+"px,"+y+"px)";
        this.childEle.style.webkitTransform="translate("+x+"px,"+y+"px)";//兼容低版本的谷歌浏览器；
    };
    //三.运行部门
    Swiper.prototype.run=function(){
        //接受策略
        this[this.direction]();//接收哪种滑动方式提供的材料,并运行该策略；
    };
    w.swiper=new Swiper();
})(window);





















//var swipe ={};
//swipe.slide =function(options){
//    var parentNode =options.ele;
//    var childNode =parentNode.children[0];
//    var direction =options.directionType;
//    var distance =options.distance;
//    var setTransition =function(){
//        childNode.style.transition ="all .4s";
//        childNode.style.webkitTransition ="all .4s";
//    }
//    var clearTransition =function(){
//        childNode.style.transition ="none";
//        childNode.style.webkitTransition ="none";
//    }
//    var setTranslate =function(x,y){
//        childNode.style.transform ="translate("+x+"px,"+y+"px)";
//        childNode.style.webkitTransform ="translate("+x+"px,"+y+"px)";
//    }
//    if(direction =="y"){
//        var startY=0;
//        var moveY=0;
//        var distanceY=0;
//        var curr=0;
//        var isMove =false;
//        var parentNodeHeight =parentNode.offsetHeight;
//        var childNodeHeight =childNode.offsetHeight;
//        var max =0;
//        var min =parentNodeHeight-childNodeHeight;
//        var maxSlide=max+distance;
//        var minSlide =min-distance;
//        childNode.addEventListener("touchstart",function(e){
//            startY = e.touches[0].clientY;
//        })
//        childNode.addEventListener("touchmove",function(e){
//           isMove =true;
//            moveY = e.touches[0].clientY;
//            distanceY =moveY -startY;
//             if(curr+distanceY>=maxSlide)
//             {
//               clearTransition();
//                 curr=maxSlide;
//                 setTranslate(0,curr);
//             }
//            else if(curr+distanceY<=minSlide){
//                 clearTransition();
//                 curr=minSlide;
//                 setTranslate(0,curr);
//             }
//            else{
//                 clearTransition();
//                 setTranslate(0,curr+distanceY);
//             }
//        })
//        childNode.addEventListener("touchend",function(){
//            if(isMove)
//            {
//                if(curr+distanceY>=max)
//                {
//                    setTransition();
//                    curr =max;
//                    setTranslate(0,curr);
//                }
//                else if(curr+distanceY<=min)
//                {
//                    setTransition();
//                    curr =min;
//                    setTranslate(0,curr);
//                }
//                else{
//                    clearTransition();
//                    curr=curr+distanceY;
//                    setTranslate(0,curr);
//                }
//            }
//            startY=0;
//            moveY=0;
//            distanceY=0;
//            isMove=false;
//        })
//    }
//    else if(direction=="x"){
//        var startX=0;
//        var moveX=0;
//        var distanceX=0;
//        var curr=0;
//        var isMove =false;
//        var parentNodeWidth =parentNode.offsetWidth;
//        var childNodeWidth =childNode.offsetWidth;
//        var max =0;
//        var min =parentNodeWidth-childNodeWidth;
//        var maxSlide=max+distance;
//        var minSlide =min-distance;
//        childNode.addEventListener("touchstart",function(e){
//            startX = e.touches[0].clientX;
//        })
//        childNode.addEventListener("touchmove",function(e){
//            isMove =true;
//            moveX = e.touches[0].clientX;
//            distanceX =moveX -startX;
//            if(curr+distanceX>=maxSlide)
//            {
//                clearTransition();
//                curr=maxSlide;
//                setTranslate(curr,0);
//            }
//            else if(curr+distanceX<=minSlide){
//                clearTransition();
//                curr=minSlide;
//                setTranslate(curr,0);
//            }
//            else{
//                clearTransition();
//                setTranslate(curr+distanceX,0);
//            }
//        })
//        childNode.addEventListener("touchend",function(){
//            if(isMove)
//            {
//                if(curr+distanceX>=max)
//                {
//                    setTransition();
//                    curr =max;
//                    setTranslate(curr,0);
//                }
//                else if(curr+distanceX<=min)
//                {
//                    setTransition();
//                    curr =min;
//                    setTranslate(curr,0);
//                }
//                else{
//                    clearTransition();
//                    curr=curr+distanceX;
//                    setTranslate(curr,0);
//                }
//            }
//            startX=0;
//            moveX=0;
//            distanceX=0;
//            isMove=false;
//        })
//    }
//
//}