const contenedor = document.querySelector(".pokemon-container");
const showMoreBtn = document.querySelector(".ver-mas_btn")

const catergoriesContainer = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")

const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".navbar-list")
const menuBtn = document.querySelector(".menu-label")

const productsCart = document.querySelector(".cart-container")
const total = document.querySelector(".total")
const succesModal = document.querySelector(".active-modal")





const createProductTemplate = (product) => {
    const { id, name, cardImg, price } = product;
    return `
    <div class="products">
            <div class="card-img">
                <img src= ${cardImg} alt="poke">
            </div>
        <div class="products-info">
            <h3 class="name_card">${name}</h3>
            <p class="price-card">$${price}</p><br>
        </div>
            <div class="products-btn">
                <button class="btn-card"
                data-id="${id}"
                data-name="${name}"
                data-price="${price}"
                data-img="${cardImg}" >Capturar
            </button>
        </div>
    </div>`;
};

const renderPokemones = (productsData) => {
    contenedor.innerHTML += productsData.map(createProductTemplate).join("");
};


const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderPokemones(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }
};

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
};

// filtros para clases*
const applyfilter = ({ target }) => {
    if (!isInactiveFilterBtn(target)) return;
    changeFilterState(target)
    contenedor.innerHTML = '';
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    };
    renderPokemones(appState.products[0]);
};

const isInactiveFilterBtn = (element) => {
    return  (element.classList.contains("category") &&
            !element.classList.contains("active"));
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
};

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        };
        categoryBtn.classList.add("active");
    });
};

    const renderFilteredProducts = () => {
        const FilteredProducts = productsData.filter(
            (product) => product.category === appState.activeFilter);
        renderPokemones(FilteredProducts);
};


//menues 992*
const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return;
    };
};

const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    };
};

const closeOnScroll = () => {
    if (!barsMenu.classList.contains("open-menu") &&
        !cartMenu.classList.contains("open-cart")) 
        {
        return
        };
        barsMenu.classList.remove("open-menu");
        cartMenu.classList.remove("open-cart");
};

const closeOnClick = (e) => {
    if (e.target.classList);
}

//carritos render
let cart =JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const renderCart = () => {
    if(!cart.length) {
        productsCart.innerHTML = `<p class="mensaje-vacio"> Aun no Capturaste Ningun Pokemon! </p> `;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

const createCartProductTemplate = (cartproduct) => {
    const {id, name, price, img, quantity} = cartproduct;
    return `
<div class="cart-item">
    <img src= "${img}" alt="">
    <div class="item-data">
        <div class="item-info">
            <h2>${name}</h2>
            <span class="item-price">Valor $${price}</span>
        </div>
        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
</div>
        `
};

const showCartTotal = () => {
    total.innerHTML = `$${getCartTotal()}`;
};

const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0)
};

//cargarproductos
const addProduct = (e) => {
    if(!e.target.classList.contains("btn-card")) {
        return }
    const product = createProductData(e.target.dataset);
    if(isExistingCartProduct(product)) {
        addUnitToProduct(product);
        showSuccesModal();
    }
    else {
        createCartProduct(product);
        showSuccesModal()
    };
    updateCartState();
};



const createProductData = (product) => {
    const {img, id, name, price} = product;
    return {img, id, name, price};
};

const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
};

const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
        ? {...cartProduct, quantity: cartProduct.quantity + 1}
        : cartProduct );
};

const showSuccesModal = (msg) => {
    succesModal.classList.add("active-modal");
    succesModal.textContent = msg;
    setTimeout(() => {
        succesModal.classList.remove("active-modal")
    }, 1500);
};

const createCartProduct = (product) => {
    cart = [...cart, {...product, quantity: 1}];
};

const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
};




//incio 
const init = () => {
    renderPokemones(appState.products[0]);
    showMoreBtn.addEventListener("click", showMoreProducts);
    catergoriesContainer.addEventListener("click", applyfilter)
    cartBtn.addEventListener("click", toggleCart)
    menuBtn.addEventListener("click", toggleMenu)
    window.addEventListener("scroll", closeOnScroll);
    barsMenu.addEventListener("click" , closeOnClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    contenedor.addEventListener("click", addProduct);

};
init();