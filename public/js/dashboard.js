// const items = [{
//     _id : 1,
//     img : "../assets/apple.jpg",
//     item_name : "Apple",
//     item_category : "Fruit",
//     item_quantity : 1,
//     item_price : 10.00
// },
// {
//     id : 1,
//     img : "../assets/cauli.jpg",
//     item_name : "Apple",
//     item_category : "Fruit",
//     item_quantity : 1,
//     item_price : 10.00
// },
// {
//     id : 1,
//     img : "../assets/apple.jpg",
//     item_name : "Apple",
//     item_category : "Fruit",
//     item_quantity : 1,
//     item_price : 10.00
// }
// ]


function individualItem(item)
{
    return `
    <div class="container-item">
        <div class="image-content">
            <img src=${item.img} alt="">
        </div>
        <div class="item-content">
            <h3 class="item-name">${item.item_name}</h3>
            <div class="item-info">
                <span><span>${item.item_available_qt}</span> Kg</span>
                <button class="btn" id=${item._id} onclick=addtoCart(event)><i class="fa-solid fa-cart-plus fa-2xl"></i></button>
                <span><i class="fa-solid fa-indian-rupee-sign"></i> <span>${parseFloat(item.item_price).toFixed(2)}</span></span>
            </div>
        </div>
    </div>`
}

function createSection(section_Heading, items)
{
    const section = document.createElement('section')
    section.classList.add("item-section"); 

    const h2 = document.createElement('h2')
    h2.innerText = section_Heading;
    
    const div1 = document.createElement('div')
    div1.classList.add("container-flex"); 
    
    items.forEach(item => {
        div1.innerHTML += individualItem(item);
    });
    
    section.appendChild(h2);
    section.appendChild(div1);
    
    return section;
}

const loadDatainDOM = (items)=>{
    const main = document.getElementsByTagName('main')[0]

    // separate the items into their own categories
    let arr = {}
    
    items.forEach(item =>{
        let x = item.item_category;
        if(!arr[x]){
            arr[x] = [] 
        }
        arr[x].push(item)
    })
    console.log(arr)
    
    for(const key in arr)
    {
        const section = createSection(`Fresh ${key}`, arr[key])
        main.appendChild(section);
    }
}

const addtoCart = (e)=>{
    const itemId = e.target.parentNode.id;
    console.log(itemId)
}

window.addEventListener("load", (event) => {
    axios.post('/pantry/get')
    .then(response => {
        if(response.status == 201) // data received
        {
            loadDatainDOM(response.data);
        }
    })
    .catch(error => {
        const status = error.response.status
        if(status == 404 ||status == 400 || status == 500)
        {
            $.notify(error.response.data.message, "error");
        }
    });




});


