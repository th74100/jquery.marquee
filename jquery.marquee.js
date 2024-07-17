;(function($) {
    $.fn.marquee = function(config) {
        var step = 1; // 移动的步长
        var options = $.extend({}, $.fn.marquee.defaults, config); // 合并对象
        return this.each(function() {
            // 滚动元素容器
            var $marquee = $(this);
            
            // 滚动元素容器DOM节点
            var $marqueeEle = $marquee.get(0);
            
            // 滚动元素容器宽度
            var $marqueeEleWidth = $marquee.width();
            
            // 滚动元素容器高度
            var $marqueeEleHeight = $marquee.height();
            
            // 滚动元素
            var $marqueeEleChild = $marquee.children();
            
            // 滚动子元素
            var $marqueeEleChildKids = $marqueeEleChild.children();
            
            // 滚动定时器
            var $marqueeTimer = null;

            // 已经滚动的距离
            var $scrollMoveed = 0;

            // 默认滚动距离
            var $scrollMoveTotal = 0;

            // 获取滚动的距离，赋值给$scrollMoveedTotal
            $marqueeEleChildKids.each(function(index) {
                
                // 滚动子元素间距
                if(options.spaceBetween > 0) {
                    
                    if((options.direction == 'up' || options.direction == 'down')) {
                        $($marqueeEleChildKids[index]).css({
                            'marginBottom': options.spaceBetween + 'px'
                        });
                    } else {
                        $($marqueeEleChildKids[index]).css({
                            'marginRight': options.spaceBetween + 'px'
                        });
                    }
                    $scrollMoveTotal += options.spaceBetween;
                }
                
                // 左右滚动时，赋值滚动元素容器宽度给 $scrollMoveTotal
                if(options.direction == 'left' || options.direction == 'right') {
                    $scrollMoveTotal += $(this).outerWidth();
                } else {
                    $scrollMoveTotal += $(this).outerHeight();
                }
            });
            // 滚动元素容器宽度小于滚动子元素宽度时，不滚动
            if($scrollMoveTotal < $marqueeEleWidth && $scrollMoveTotal < $marqueeEleHeight) {
                return;
            }

            // 克隆滚动元素，追加到滚动元素容器中
            $marqueeEleChild.append($marqueeEleChildKids.clone());

            // 向左，向上滚动
            function scrollLeftUp(direction) {
                var pos = $marqueeEle[direction] + step;
                if (pos >= $scrollMoveTotal) {
                    pos -= $scrollMoveTotal;
                }
                
                $marqueeEle[direction] = pos;
            }

            // 向右，向下滚动
            function scrollRightDown(direction) {
                var pos = $marqueeEle[direction] - step;
                if (pos <= 0) {
                    pos += $scrollMoveTotal;
                }
                
                $marqueeEle[direction] = pos;
            }


            // 初始化滚动
            function scrollInit() {
                var direction = (options.direction == 'up' || options.direction == 'down') ? 'scrollTop' : 'scrollLeft';

                // 是否循环滚动
                if(!options.loop) {
                    // 记录当前已经滚动的距离
                    $scrollMoveed += step;
                    
                    // 如果滚动到末尾了，停止滚动
                    if($scrollMoveed >= $scrollMoveTotal) {
                        $marqueeEle[direction] = 0;
                        clearInterval($marqueeTimer);
                    }
                }

                // 根据滚动方向，滚动
                switch (options.direction) {
                    case 'left':
                        scrollLeftUp(direction);
                        break;
                    case 'right':
                        scrollRightDown(direction);
                        break;
                    case 'up':
                        scrollLeftUp(direction);
                        break;
                    case 'down':
                        scrollRightDown(direction);
                        break;
                    default:
                }
            }

            // 初始化
            $marqueeTimer = setInterval(scrollInit, options.speed);
            
            // 鼠标移入，停止滚动。移出恢复滚动
            if(options.pausehover) {
                $marquee.hover(function() {
                    clearInterval($marqueeTimer);
                }, function() {
                    $marqueeTimer = setInterval(scrollInit, options.speed);
                });
            }
        });
    };
    
    $.fn.marquee.defaults = {
        direction: 'left', // 滚动方向
        speed: 20, // 滚动速度，越大越慢，单位毫秒
        loop: true, // 是否循环滚动
        pausehover: false, // 鼠标经过是否暂停滚动
        spaceBetween: 10 // 元素之间的间距
    }
})(jQuery);
