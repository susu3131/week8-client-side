const productList = document.querySelector(".productWrap") //選取產品列表
const productSelect = document.querySelector(".productSelect") //選取產品列表
const shoppingCart = document.querySelector(".shoppingCart-tablebody") //選取購物車
const shoppingCartList = document.querySelector(".shoppingCart")


let cartData = []; //購物車資料
let productListData = []; //產品資料


// 取得產品列表
function getProductList() {
  axios.get(getProductsUrl)
    .then(function (response) {
      productListData = response.data.products;
      //顯示資料 渲染畫面
      renderProductList()

    })
}

//初始化
function init() {
  getProductList();
  getCartList()
}
init();

//顯示全部資料
function renderProductList() {
  //1. 新增字串
  let str = ""
  //2. foreach處理資料 放新增的資料
  productListData.forEach(function (item) {
    str += strRefactor(item);
  })
  productList.innerHTML = str;
}

//字串組合- 產品列表(優化程式碼)
function strRefactor(item) {
  return `<li class="productCard">
        <h4 class="productType">新品</h4>
        <img src="${item.images}"  alt="">
        <a href="#" class="addCardBtn" data-id="${item.id}">加入購物車</a>
        <h3>${item.title}</h3>
        <del class="originPrice">NT$${item.origin_price}</del>
        <p class="nowPrice">NT$${item.price}</p>
      </li>`

}

//篩選產品
productSelect.addEventListener('change', function (e) {
  const category = e.target.value;
  if (category == "全部") {
    renderProductList();
    return; //中止程式
  }
  let str = "";
  productListData.forEach(function (item) {
    if (item.category == category) {
      str += strRefactor(item);
    }
  })
  productList.innerHTML = str;

})


//加入購物車
productList.addEventListener("click", function (e) {
  e.preventDefault(); //取消網站預設事件


  let addBtn = e.target.getAttribute("class")
  if (addBtn !== "addCardBtn") {
    return
  }
  let productId = e.target.getAttribute("data-id") //當點擊加入購物車，取得訂單id
  console.log(productId)
  let num = 1;
  //假如取得的id 跟購物車的id相同，則表示已有相同存在購物車，則預設+1
  cartData.forEach(function (item) {
    if (item.product.id === productId) {
      num = item.quantity++;
    }
  })
  //post購物車資料
  axios.post(getCartsUrl, {
    "data": {
      "productId": productId,
      "quantity": num
    }
  }).then(function (res) {
    console.log(res);
    rendershoppingCart();
    init();
    alert("加入購物車")
  })


})

//取得購物車資料
function getCartList() {
  axios.get(getCartsUrl)
    .then(function (res) {
      cartData = res.data.carts;
      rendershoppingCart();
    })


}

//購物車資料
function rendershoppingCart() {
  //1. 新增字串
  let str = ""
  //2. foreach處理資料 放新增的資料
  cartData.forEach(function (item) {
    str += strCarts(item);
  })
  shoppingCart.innerHTML = str;
}

//字串組合- 購物車列表(優化程式碼)
function strCarts(item) {
  return `               
<tr>
  <td>
      <div class="cardItem-title">
          <img src="./photo/HvT3zlU.png" alt="">
          <p>${item.product.title}</p>
      </div>
  </td>
  <td>${item.product.price}</td>
  <td>${item.quantity}</td>
  <td>${item.product.price * item.quantity}</td>
  <td class="discardBtn">
      <a href="#" class="material-icons" data-id="${item.id}">
          clear
      </a>
  </td>
</tr>

`

}


//監聽、刪除購物車資料
shoppingCartList.addEventListener("click", function (e) {
  e.preventDefault();
  const card_id = e.target.getAttribute("data-id")
  const cartDeleteBtn = e.target.getAttribute("class")
  console.log(card_id);

  if (cartDeleteBtn == "discardAllBtn") {
    axios.delete(getCartsUrl)
      .then(function (res) {
        alert('刪除所有購物車資料')
        rendershoppingCart();
        init();
      })
  } 
  else if (card_id !== null) {
    axios.delete(`${getCartsUrl}/${card_id}`)
      .then(function (res) {
        alert('刪除單筆購物車資料');
        rendershoppingCart();
        init();
      })
  }

})