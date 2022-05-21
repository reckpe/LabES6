// LẤY DS DANH MỤC
const renderListCate = async() => {
    const listElement = document.querySelector("#danhsach tbody");
    if (listElement) {
        const data = await getData(
            "https://fir-372ac-default-rtdb.firebaseio.com/categories.json"
            );
        const html = Object.keys(data)
            .map((key) => {
                if (data[key] === null) return "";
                console.log(data[key])
                const cate = data[key];
                return `<tr>
                <td>${cate.name}</td>                         
                <td>                                                  
                <a href="editCate.html?id=${key}" class="edit"><i class="fa-solid fa-pen"></i></a>                                                   
                <a href="#" onclick="delCategory('${key}', this)" class="delete"><i class="fa-solid fa-x"></i></a>                                       
                </td>
            </tr>`;
            })
            .join("");
        listElement.innerHTML = html;
    }
};
renderListCate();

//THÊM CATE
async function createCategory(uri, data) {
    console.log(data)
    const res = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(data),
    });
    return res;
}
var btnAdd = document.querySelector("#btnAdd");
const id = document.querySelector("#id");
const nameAdd = document.querySelector("#name");
if (btnAdd) {
    btnAdd.onclick = async (e) => {
        console.log(id.value)
        console.log(nameAdd)
        e.preventDefault();
        const res = await createCategory(
            "https://fir-372ac-default-rtdb.firebaseio.com/categories.json",
            {
                id: id.value,
                name: nameAdd.value,
            }
        );
    };
}


// Hiển thị danh mục đã chọn
let params = new URLSearchParams(location.search);
let key = params.get("id"); 
if (key) {
    getCategoryItem();
}
function getCategoryItem() {
    const url = `https://fir-372ac-default-rtdb.firebaseio.com/categories/${key}.json`;
    fetch(url).then(res => res.json())
        .then(CategoryItem => {
            document.querySelector("#id").value = CategoryItem.id;
            document.querySelector("#name").value = CategoryItem.name;
        })
}

// EDIT CATE
async function editCate(url, data) {
    const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    return res;
}

var btnLuu = document.querySelector("#btnLuu");
if (btnLuu) {
    btnLuu.onclick = async (e) => {
        e.preventDefault();
        const id = document.querySelector("#id");
        const name= document.querySelector("#name");
        const res = await editCate(
            `https://fir-372ac-default-rtdb.firebaseio.com/categories/${key}.json`,
            {       
                id: id.value,
                name: name.value,
            }
        );
    };
}
