/**
 * Created by 张尚坤 on 2016/5/16.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};
var reg = /[\u4e00-\u9fa5]/g;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var num = /^\+?[1-9][0-9]*$/g;
    var city = (document.getElementById("aqi-city-input").value).trim(),
        aqiVale = (document.getElementById("aqi-value-input").value).trim();
    if (!reg.test(city)) {
        alert("城市名字必须为中文");
    }
    else if (!num.test(aqiVale)) {
        alert("空气质量指数必须为正整数");
    } else if ((num.test(aqiVale) && reg.test(city)) !== null) {
        aqiData[city] = aqiVale;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTab = document.getElementById("aqi-table");
    var frag = [];
    for (p in aqiData) {
        frag.push("<tr><td>" + p + "</td><td>" + aqiData[p] + "<td><button type='button' onclick='delBtnHandle(this)'>删除</button></td></tr>");
    }
    if (aqiData !== null) {
        frag.unshift("<tr><th>城市</th><th>空气指数</th><th>操作</th></tr>");
    }
    aqiTab.innerHTML = frag.join(" ");
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(nod) {
    var useNod = nod.parentNode.parentNode.firstChild;
    delete aqiData[useNod.innerText];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("add-btn").onclick = addBtnHandle;

}

init();