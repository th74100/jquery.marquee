# 基于jQuery的无缝滚动

<a href="https://th74100.github.io/jquery.marquee/" target="_blank">Demo</a>

## 结构
```html
<div id="marquee">
    <ul class="flex">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
    </ul>
</div>
```

## 使用方法
```javascript
<script src="jquery-3.7.1.min.js"></script>
<script src="jquery.marquee.min.js"></script>
<script>
    $(function() {
        $("#marquee").marquee();

        // 或者
        $("#marquee").marquee({
            direction: 'left' // 'left', 'right', 'up', 'down'。默认： 'left'
            speed: 20, // 滚动速度，越大越慢，单位毫秒。 默认： 20
            loop: true, // 是否循环滚动，默认：true
            pausehover: false, // 鼠标经过是否暂停滚动，默认: false
            spaceBetween: 10 // 元素之间的间距，默认：10px
        });
    })
</script>
```
