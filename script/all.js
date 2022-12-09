const productList = document.querySelector(".productWrap") //選取產品列表
let productListData = []; //產品資料



// 取得產品列表
function getProductList() {
  axios.get(getProductsUrl)
    .then(function (response) {
      productListData = response.data.products;
      console.log(productListData)
      //1. 新增字串
      let str = ""
      //2. foreach處理資料 放新增的資料
      productListData.forEach(function (item) {
        str += `<li class="productCard">
          <h4 class="productType">新品</h4>
          <img src="${item.images}"  alt="">
          <a href="#" class="addCardBtn">加入購物車</a>
          <h3>${item.title}</h3>
          <del class="originPrice">NT$${item.origin_price}</del>
          <p class="nowPrice">NT$${item.price}</p>
        </li>`
      })
      //3.渲染畫面
      productList.innerHTML =str;
    })
}

//2. 初始化
function init() {
  getProductList();

}
init();






// C3.js
let chart = c3.generate({
  bindto: '#chart', // HTML 元素綁定
  data: {
    type: "pie",
    columns: [
      ['Louvre 雙人床架', 1],
      ['Antony 雙人床架', 2],
      ['Anty 雙人床架', 3],
      ['其他', 4],
    ],
    colors: {
      "Louvre 雙人床架": "#DACBFF",
      "Antony 雙人床架": "#9D7FEA",
      "Anty 雙人床架": "#5434A7",
      "其他": "#301E5F",
    }
  },
});