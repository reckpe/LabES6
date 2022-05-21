// Render categories
const renderListCate = async() => {
    const listElement = document.querySelector("#main_menu");
    if (listElement) {
        const data = await getData(
            "https://fir-372ac-default-rtdb.firebaseio.com/categories.json"
            );
        const html = Object.keys(data)
            .map((key) => {
                if (data[key] === null) return "";
                console.log(data[key])
                const cate = data[key];
                return `<li><a href="index.html">${cate.name}</a></li>`;
            })
            .join("");
        listElement.innerHTML = html;
    }
};
renderListCate();

// render product
const renderListProduct = async () => {
    const listElement = document.querySelector("#listProducts");
    if (listElement) {
        const data = await getData(
            "https://fir-372ac-default-rtdb.firebaseio.com/products.json"
        );
        const html = Object.keys(data).reverse()
            .map((key) => {
                if (data[key] === null) return "";
                const product = data[key];
                return `<div class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
                            <div class="featured__item">
                               <div class="featured__item__pic set-bg">
                                   <img src="images/${product.image}">
                                     <ul class="featured__item__pic__hover">
                                         <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                         <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                         <li><a href="shoping-cart.html" onclick="themVaoGio(${product.id},'${product.name}',${product.price},'${product.image}')"><i class="fa fa-shopping-cart"></i></a></li>
                                     </ul>
                                 </div>
                                <div class="featured__item__text">
                                     <h6><a href="product-detail.html?id=${product.id}">${product.name}</a></h6>
                                     <h5>${product.price} VNĐ</h5>
                                 </div>
                             </div>
                         </div>`;
            })
            .join("");
        listElement.innerHTML = html;
    }

};
renderListProduct();
