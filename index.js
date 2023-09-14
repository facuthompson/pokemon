const contenedor = document.querySelector(".pokemon-container");
const showMoreBtn = document.querySelector(".ver-mas_btn")

const catergoriesContainer = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")

const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".navbar-list")
const menuBtn = document.querySelector(".menu-label")
const overlay = document.querySelector(".overlay")





const createProductTemplate = (products) => {
    const { id, name, cardImg, price } = products;
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
    let {products, currentProductsIndex} =appState;
    renderPokemones(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }
};

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit -1;
};




const applyfilter = ({ target }) => {
    changeFilterState(target);
    productsConteiner.innerHTML = " " ;
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    renderPokemones(appState.products[0]);
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
};

const changeBtnActiveState = (selectCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if(categoryBtn.dataset.category !== selectCategory) {
            categoryBtn.classList.remove ("remove");
            return;
        }
        categoryBtn.classList.add("active");
    });

const renderFilteredProducts = () => {
    const FilteredProducts = productsData.filter(
        (products) => products.category === appState.activeFilter);
    renderPokemones(FilteredProducts);
};
};

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if(barsMenu.classList.contains("open-menu")){
        barsMenu.classList.remove("open-menu");
        return;
    }
    overlay.classList.toggle(".show-overlay")
};


const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if(cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    }
    overlay.classList.toggle("show-overlay");
};




const init = () => {
    renderPokemones(appState.products[0]);
    showMoreBtn.addEventListener("click", showMoreProducts);
    catergoriesContainer.addEventListener("click", applyfilter )
    cartBtn.addEventListener("click", toggleCart)
    menuBtn.addEventListener("click", toggleMenu)
};
init();


