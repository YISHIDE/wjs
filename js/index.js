/**
 * Created by 80474 on 2016/9/30.
 */
(function($,swiper,_,w){
    //jQuery的入口函数
    $(document).ready(function(){
     //分为模块1.加载轮播图片2.判断是移动设备还是pc端3.渲染到页面上
        var setData=""; //设置图片缓存；
        var isMobile=false;
        //封装ajx远程获取图片的函数
        function load(callback){
            //先判断缓存里是否有图片信息，如果有的话就不用请求ajax了；
            if(setData){
                return callback&&callback(setData);
            }
            $.ajax({
               url:"services/index.json",
               type:"get",
               dataType:"json",
               success:function(data){
                   //如果是第一次请求ajax的话，把请求到的数据进行缓存
                   setData=data;
                   if(callback){
                       callback(setData);
                   }
               }
            })
        };
        //渲染数据到模板页面上，还要判断是否是移动端还是pc端
        function renderData(data){
           platform();
            var circle = _.template($("#circle").html());
            //渲染轮播图中的小圆点
            $(".carousel-indicators").html(circle({model:data}));
            //渲染轮播图中的图片
            var image = _.template($("#image").html());
            var info ={
                dataList:data,
                isApp:isMobile
            }
            $(".carousel-inner").html(image({model:info}));
            if(isMobile){slider();tabSwiper();}
        };
        //判断设备的模块
        function platform(){
            isMobile=$(w).width()<768?true:false;
        };
        //监听resize事件
        $(w).resize(function(){
            load(renderData);
        }).trigger("resize");
        //给移动端轮播图适配滑动事件
        function slider(){
            var imageBox =$(".lunbo");
            var startX=0;
            var moveX=0;
            var distanceX=0;
            var isMove=false;
            imageBox.on("touchstart",function(e)
            {
                startX=e.originalEvent.touches[0].clientX;
            });
            imageBox.on("touchmove",function(e){
                isMove=true;
                moveX=e.originalEvent.touches[0].clientX;
                distanceX=moveX-startX;
            });
            imageBox.on("touchend",function(e){
                if(Math.abs(distanceX)>=50&&isMove){
                    if(distanceX>0){
                        $(this).carousel('prev');
                    }
                else{
                        $(this).carousel('next');
                    }
                }
                startX=0;
                moveX=0;
                distanceX=0;
            })
                };
        //移动端tab栏滑动事件
        function tabSwiper(){
            var ul =$(".wjs_product  .nav-tabs");
            var lis =ul.children("li");
            var totalwidth=0;
            lis.each(function(index,val){
                totalwidth= totalwidth+$(val).outerWidth(true);//outerwidth(true):计算的宽度包括外边距,innerWidth:包括内边距
            });
            ul.width(totalwidth);
            swiper.add({
            parentEle:$(".wjs_product .container ")[0],
            childEle:$(".wjs_product .container ")[0].children[0],
            distance:50
            }).run();
            };
    });
})(jQuery,swiper,_,window);































//$(document).ready(function(){
//    var setData ="";//设置缓存
//
//    var load =function(callback){
//       if(setData){
//           callback(setData);
//           return false;
//       }
//        $.ajax({
//            url:"services/index.json",
//            data:{},
//            dataType:"json",
//            type:"get",
//            success:function(data){
//                //执行回调函数
//                setData =data;
//                callback && callback(setData);
//            }
//        })
//    }
//    //模板引擎
//    var getData =function(){
//        load(function(data){
//            //原点模板
//            var circle = _.template($("#circle").html());
//            var isMobile =false;
//            if($(window).width()<768)
//            {
//                isMobile =true;
//            }
//            $(".carousel-indicators").html(circle({model:data}));
//            //图片模版渲染
//            var image = _.template($("#image").html());
//            var info ={
//                dataList:data,
//                isApp:isMobile
//            }
//            $(".carousel-inner").html(image({model:info}));
//        });
//    }
//    $(window).resize(function(){
//        getData();
//    }).trigger("resize");
//
//    //移动端手势事件
//  var imageBox =$(".lunbo");
//    var startX=0;
//    var moveX=0;
//    var distanceX=0;
//    isMove=false;
//    imageBox.on("touchstart",function(e)
//    {
//        startX=e.originalEvent.touches[0].clientX;
//    })
//    imageBox.on("touchmove",function(e){
//        isMove=true;
//        moveX=e.originalEvent.touches[0].clientX;
//        distanceX=moveX-startX;
//    });
//    imageBox.on("touchend",function(e){
//        if(Math.abs(distanceX)>=50&&isMove){
//            if(distanceX>0){
//                $(this).carousel('prev');
//            }
//
//        else{
//                $(this).carousel('next');
//            }
//        }
//
//        startX=0;
//        moveX=0;
//        distanceX=0;
//    })
//    //移动端tab栏的滑动事件
//     var ul =$(".wjs_product  .nav-tabs");
//    var lis =ul.children("li");
//    var totalwidth=0;
//    lis.each(function(index,val){
//        totalwidth= totalwidth+$(val).outerWidth(true);//outerwidth(true):计算的宽度包括外边距,innerWidth:包括内边距
//    });
//    ul.width(totalwidth);
//    //移动端手势滑动事件
//    //swipe.slide({
//    //    ele:$(".wjs_product .container ")[0],
//    //    directionType:"x",
//    //    distance:10
//    //})
//    swiper.add({
//       parentEle:$(".wjs_product .container ")[0],
//        childEle:$(".wjs_product .container ")[0].children[0],
//        distance:50
//    }).run();
//})