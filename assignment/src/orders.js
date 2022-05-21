// LẤY DS DANH MỤC
const renderListOrders = async () => {
    const listElement = document.querySelector("#danhsach tbody");
    if (listElement) {
        const data = await getData(
            "https://fir-372ac-default-rtdb.firebaseio.com/orders.json"
        );
        const html = Object.keys(data)
            .map((key) => {
                if (data[key] === null) return "";
                console.log(data[key])
                const or = data[key];
                return `<tr>      
                <td>${or.name}</td>
                <td>${or.address}</td>                        
                <td>${or.email}</td>
                <td>${or.phone}</td>
                <td>${or.create_date}</td>
                <td>${or.status}</td>
                <td>                                                                                                                       
                <a href="#" onclick="xoadonhang(${key})" class="delete"><i class="fa-solid fa-x"></i></a>                                       
                </td>
            </tr>`;
            })
            .join("");
        listElement.innerHTML = html;
    }
};
renderListOrders();