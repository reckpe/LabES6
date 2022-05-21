// =======LIST PRODUCT ===========
const renderListProduct = async () => {
    const listElement = document.querySelector("#danhsach tbody");
    if (listElement) {
        const data = await getData(
            "https://fir-372ac-default-rtdb.firebaseio.com/products.json"
        );
        const html = Object.keys(data).reverse()
            .map((key) => {
                if (data[key] === null) return "";
                const product = data[key];
                return `<tr>            
                <td>${product.name}</td>
                <td><img src="./assets/images/${product.image}" width="50"/></td>                        
                <td>${product.price}</td>
                <td>${product.idLoai}</td>
                <td>                                                  
                <a href="editProduct.html?id=${key}" class="edit"><i class="fa-solid fa-pen"></i></a>                                                   
                <a href="#" onclick="deleteProduct(${key}, this)" class="delete"><i class="fa-solid fa-x"></i></a>                                       
                </td>
            </tr>`;
            })
            .join("");
        listElement.innerHTML = html;
    }

};
renderListProduct();



//=========ADD PRODUCT=====
//lay id loai 
const renderListCate = async () => {
    const categorieId = document.querySelector("#idLoai");
    if (categorieId) {
        const data = await getData(
            "https://fir-372ac-default-rtdb.firebaseio.com/categories.json"
        );
        const html = Object.keys(data)
            .map((key) => {
                if (data[key] === null) return "";
                console.log(data[key])
                const cate = data[key];
                return `<option value="${cate.id}">${cate.name}</option>`;
            })
            .join("");
        categorieId.innerHTML = html;
    }
};

renderListCate();


// Thêm product
async function createProduct(url, data) {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    });
    return res;
}

const addBtn = document.querySelector("#btnAdd");
const idLoai = document.querySelector("#idLoai");
const idProduct = document.querySelector("#id");
const nameProduct = document.querySelector("#name");
const priceProduct = document.querySelector("#price");
const imageProduct = document.querySelector("#image");
const detailProduct = document.querySelector("#description");
if (addBtn) {
    addBtn.onclick = async (e) => {
        e.preventDefault();
        const res = await createProduct(
            "https://fir-372ac-default-rtdb.firebaseio.com/products.json",
            {
                idLoai: idLoai.value,
                id: idProduct.value,
                name: nameProduct.value,
                price: priceProduct.value,
                image: imageProduct.value,
                description: detailProduct.value,
            }
        );
    };
}


// // ====EDIT PRODUCT=========
// lay id cate
const renderListCateEdit = async () => {
    const categorieId = document.querySelector("#idLoai");
    if (categorieId) {
        const data = await getData(
            "https://fir-372ac-default-rtdb.firebaseio.com/categories.json"
        );
        const html = Object.keys(data)
            .map((key) => {
                if (data[key] === null) return "";
                console.log(data[key])
                const cate = data[key];
                return `<option value="${cate.id}">${cate.name}</option>`;
            })
            .join("");
        categorieId.innerHTML = html;
    }

};

renderListCateEdit();

// Hiển thị 1 sp
let params = new URLSearchParams(location.search);
let key = params.get("id");
function getProductItem() {
    const url = `https://fir-372ac-default-rtdb.firebaseio.com/products/${key}.json`;
    fetch(url).then(res => res.json())
        .then(ProductItem => {
            document.querySelector("#name").value = ProductItem.name;
            document.querySelector("#id").value = ProductItem.id;
            document.querySelector("#price").value = ProductItem.price;
            document.querySelector("#image").value = ProductItem.image;
            document.querySelector("#description").value = ProductItem.description;
        })
}
if (key) {
    getProductItem();
}

// Sửa
async function editProduct(url, data) {
    const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    return res;
}
var btnLuu = document.querySelector("#btnLuu");
const idLoaiE = document.querySelector("#idLoai");
const idProductE = document.querySelector("#id");
const nameProductE = document.querySelector("#name");
const priceProductE = document.querySelector("#price");
const imageProductE = document.querySelector("#image");
const detailProductE = document.querySelector("#description");
if (btnLuu) {
    btnLuu.onclick = async (e) => {
        e.preventDefault();

        const res = await editProduct(
            `https://fir-372ac-default-rtdb.firebaseio.com/products/${key}.json`,
            {
                idLoai: idLoaiE.value,
                id: idProductE.value,
                name: nameProductE.value,
                price: priceProductE.value,
                image: imageProductE.value,
                description: detailProductE.value,
            }
        );
    };
    document.reload();
}
