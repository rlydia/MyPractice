/**
 * 默认画笔线宽
 * @type {number}
 */
var defaultStrokeWidth = 1; //画矩形选取框的线宽
var clipImg

/**
 * 选取划线的canvasExt
 * @type {{drawRect: canvasExt.drawRect}}
 */
var canvasExt = {
  /**
   *  画矩形
   * @param canvasId canvasId
   * @param penColor 画笔颜色
   * @param strokeWidth 线宽
   */
  drawRect: function (canvasId, penColor, strokeWidth, callback) {
    var that = this;

    that.penColor = penColor;
    that.penWidth = strokeWidth;
    var canvas = document.getElementById(canvasId);
    //canvas 的矩形框
    var canvasRect = canvas.getBoundingClientRect();
    //canvas 矩形框的左上角坐标
    var canvasLeft = canvasRect.left;
    var canvasTop = canvasRect.top;

    // 要画的矩形的起点 xy
    var x = 0;
    var y = 0;

    //鼠标点击按下事件，画图准备
    canvas.onmousedown = function(e) {

      //设置画笔颜色和宽度
      var color = that.penColor;
      var penWidth = that.penWidth;
      // 确定起点
      x = e.clientX - canvasLeft;
      y = e.clientY - canvasTop;
      // 添加layer
      $("#"+canvasId).addLayer({
        type: 'rectangle',
        strokeStyle: color,
        strokeWidth: penWidth,
        name:'areaLayer',
        fromCenter: false,
        x: x, y: y,
        width: 1,
        height: 1
      });
      // 绘制
      $("#"+canvasId).drawLayers();
      $("#"+canvasId).saveCanvas();

      //鼠标移动事件，画图
      canvas.onmousemove = function(e){

        // 要画的矩形的宽高
        var width = e.clientX-canvasLeft - x;
        var height = e.clientY-canvasTop - y;

        // 清除之前画的
        $("#"+canvasId).removeLayer('areaLayer');

        $("#"+canvasId).addLayer({
            type: 'rectangle',
            strokeStyle: color,
            strokeWidth: penWidth,
            name:'areaLayer',
            fromCenter: false,
            x: x, y: y,
            width: width,
            height: height
        });

        $("#"+canvasId).drawLayers();
      }
    };
    //鼠标抬起
    canvas.onmouseup=function(e){

      var color = that.penColor;
      var penWidth = that.penWidth;

      canvas.onmousemove = null;

      var width = e.clientX - canvasLeft - x;
      var height = e.clientY- canvasTop - y;

      $("#"+canvasId).removeLayer('areaLayer');

      $("#"+canvasId).addLayer({
        type: 'rectangle',
        strokeStyle: color,
        strokeWidth: penWidth,
        name:'areaLayer',
        fromCenter: false,
        x: x, y: y,
        width: width,
        height: height
      });

      $("#"+canvasId).drawLayers();
      $("#"+canvasId).saveCanvas();

      // 把body转成canvas
      html2canvas(document.body, {
        scale: 1,
        // allowTaint: true,
        useCORS: true  //跨域使用
      }).then(canvas => {
        var capture_x, capture_y
        if (width > 0) {
            //从左往右画
            capture_x = x + that.penWidth - 1
        }else {
            //从右往左画
            capture_x = x + width + that.penWidth - 1
        }
        if (height > 0) {
            //从上往下画
            capture_y = y + that.penWidth - 1
        }else {
            //从下往上画
            capture_y = y + height + that.penWidth - 1
        }
        clipImg = sendClip(canvas, capture_x, capture_y, Math.abs(width), Math.abs(height))
        callback(clipImg)
      });
      // 移除画的选取框
      $("#"+canvasId).removeLayer('areaLayer');
      // 隐藏用于画取框的canvas
      $("#"+canvasId).hide()
    }
  }
};



// 千万不要在本地运行尝试，toDataURL()， 报错跨域问题...
/**
 * 打印截取区域
 * @param canvas 截取的canvas
 * @param capture_x 截取的起点x
 * @param capture_y 截取的起点y
 * @param capture_width 截取的起点宽
 * @param capture_height 截取的起点高
 */
function sendClip(canvas, capture_x, capture_y, capture_width, capture_height) {
  // 创建一个用于截取的canvas
  var clipCanvas = document.createElement('canvas')
  clipCanvas.width = capture_width
  clipCanvas.height = capture_height
  // 截取
  clipCanvas.getContext('2d').drawImage(canvas, capture_x, capture_y, capture_width, capture_height, 0, 0, capture_width, capture_height)
  var clipImgBase64 = clipCanvas.toDataURL()
  // 生成图片
  clipImg = new Image()
  // 先设置图片跨域属性
  clipImg.setAttribute("crossOrigin",'anonymous')
  clipImg.src = clipImgBase64
  return clipImg
}


 /**
 * 选取截屏
 * @param canvasId
 */
function clipScreenshots(canvasId, username, avatar){
  canvasExt.drawRect(canvasId, "red", defaultStrokeWidth, function(clipImg) {
    socket.emit('sendImage', {
      username: username,
      avatar: avatar,
      img: clipImg.src
    })
  })
}