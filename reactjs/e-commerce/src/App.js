import React from "react";
import styled from "styled-components";
import { Filter } from "./components/Filter/Filter";
import { ProductsField } from "./components/Products/ProductsField";
import { Cart } from "./components/Cart/Cart";
import cartIcon from "./imgs/cart_icon.png";
import { Shopkeeper } from "./components/Products/Shopkeeper";

const AppWrapper = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  > button {
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 70px;
    height: 70px;
  }
  .filterIcon {
    position: absolute;
    top: 5px;
    left: 5px;
    padding: 5px 10px;
    height: 30px;
  }
  .cartIcon {
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 70px;
    height: 70px;
  }
`;

export default class App extends React.Component {
  state = {
    products: [
      {
        id: 1,
        name: "item A",
        value: 10.0,
        imageUrl: "https://picsum.photos/200/200",
      },
      {
        id: 2,
        name: "item B",
        value: 20.0,
        imageUrl: "https://picsum.photos/200/201",
      },
      {
        id: 3,
        name: "item C",
        value: 30.0,
        imageUrl: "https://picsum.photos/201/202",
      },
      {
        id: 4,
        name: "item D",
        value: 40.0,
        imageUrl: "https://picsum.photos/201/203",
      },
      {
        id: 5,
        name: "item E",
        value: 50.0,
        imageUrl: "https://picsum.photos/201/200",
      },
      {
        id: 6,
        name: "item F",
        value: 60.0,
        imageUrl: "https://picsum.photos/202/200",
      },
      {
        id: 7,
        name: "item G",
        value: 70.0,
        imageUrl: "https://picsum.photos/203/200",
      },
    ],
    cart: [],
    totalValue: "",
    selectedOrder: "",
    isCartVisible: false,
    isFilterVisible: false,
    filterData: {
      minValue: -Infinity,
      maxValue: Infinity,
      searchName: "",
    },

    ShopMode: false,
    inputName: "",
    inputValue: "",
    inputImage: "",
  };

  // LOCAL STORAGE ------------------------------------------
  componentDidUpdate() {
    localStorage.setItem("cartData", JSON.stringify(this.state.cart));
    localStorage.setItem("productsData", JSON.stringify(this.state.products));
  }

  componentDidMount() {
    const cartArray = JSON.parse(localStorage.getItem("cartData")) || [];
    this.setState({ cart: cartArray });
    const productsArray =
      JSON.parse(localStorage.getItem("productsData")) || this.state.products;
    this.setState({ products: productsArray });
  }

  // ABRIR COMPONENTE DO CARRINHO
  filterToggle = () => {
    this.setState({ isFilterVisible: !this.state.isFilterVisible });
  };

  cartToggle = () => {
    this.setState({ isCartVisible: !this.state.isCartVisible });
  };

  // FUNÇÕES DO FILTRO ------------------------------------------
  minValue = (event) => {
    this.setState({
      filterData: {
        ...this.state.filterData,
        minValue: Number(event.target.value),
      },
    });
  };

  maxValue = (event) => {
    this.setState({
      filterData: {
        ...this.state.filterData,
        maxValue: Number(event.target.value),
      },
    });
  };

  changeSearchName = (event) => {
    this.setState({
      filterData: { ...this.state.filterData, searchName: event.target.value },
    });
  };

  // FUNCÇÕES DA ÁREA DO PRODUTO ------------------------------------------
  // FUNÇÃO PARA ORDERNAR LISTA
  sortProducts = (productA, productB) => {
    const { selectedOrder } = this.state;

    if (selectedOrder === "a-z") {
      return productA.value - productB.value;
    } else if (selectedOrder === "z-a") {
      return productB.value - productA.value;
    }
  };

  // CAPTURA SE ORDEM É CRESCENTE OU DECRESCENTE
  orderType = (event) => {
    this.setState({
      selectedOrder: event.target.value,
    });
  };

  // FUNÇÕES DO CARRINHO ------------------------------------------
  addToCart = (product) => {
    let newCart = [...this.state.cart];
    const cartIndex = newCart.findIndex((item) => item.id === product.id); //procura no array newCart se existe algum item com id igual ao product.id e retorna o índice dele. Se não existir, retorna índice -1
    if (cartIndex > -1) {
      newCart[cartIndex].quantity += 1;
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        value: product.value,
        quantity: 1,
      };
      newCart.push(newItem);
    }
    this.setState({ cart: newCart });
  };

  onClickDelete = (product) => {
    let newCart = [...this.state.cart];
    const cartIndex = newCart.findIndex((item) => item.id === product.id);
    newCart.splice(cartIndex, 1);
    this.setState({ cart: newCart });
  };

  onClickAddItem = (item) => {
    let newCart = [...this.state.cart];
    const cartIndex = newCart.findIndex((cartItem) => item.id === cartItem.id);
    newCart[cartIndex].quantity += 1;
    this.setState({ cart: newCart });
  };

  onClickRemoveItem = (item) => {
    let newCart = [...this.state.cart];
    const cartIndex = newCart.findIndex((cartItem) => item.id === cartItem.id);
    if (newCart[cartIndex].quantity > 1) {
      newCart[cartIndex].quantity -= 1;
    }
    this.setState({ cart: newCart });
  };

  cleanCart = () => {
    this.setState({cart: []})
  }

  // FUNÇÃO LOJISTA CLIENTE
  ChangeModeStatus = () => {
    this.setState({ ShopMode: !this.state.ShopMode });
  };

  onChangeProductName = (e) => {
    this.setState({ inputName: e.target.value });
  };

  onChangeProductValue = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  onChangeProductImage = (e) => {
    this.setState({ inputImage: e.target.value });
  };

  addProduct = () => {
    const { products, inputName, inputValue, inputImage } = this.state;
    const productIndex = this.state.products.findIndex((item) => item.name === inputName);
    console.log(productIndex)
    if(productIndex > 0) {
      alert("Este produto já existe")
    } else {
      if (inputName.length > 0 && inputValue.length > 0) {
        const newProducts = [...products];
        const newItem = {
          id: Date.now(),
          name: inputName,
          value: inputValue,
          imageUrl: inputImage,
        };
        newProducts.push(newItem);
        this.setState({
          products: newProducts,
          inputName: "",
          inputValue: "",
          inputImage: "",
        });
      } else {
        alert("Preencha os dados do produto.");
      }
    }
  };

  // FUNÇÃO DE RENDERIZAÇÃO DO QUE FOR FILTRADO
  filterProducts = () => {
    const { products } = this.state;
    let filteredItemsByName = products.filter((item) =>
      item.name.includes(this.state.filterData.searchName)
    );
    let filteredItemsByMinValue = filteredItemsByName.filter(
      (item) => item.value >= this.state.filterData.minValue
    );
    let filteredItemsByMaxValue = filteredItemsByMinValue.filter(
      (item) => item.value < this.state.filterData.maxValue
    );

    return filteredItemsByMaxValue;
  };

  render() {
    // RENDERIZA O QUE FOR FILTRADO
    const filteredProducts = this.filterProducts();
    // ORDENA O QUE FOI RENDERIZADO E RENDERIZA
    const orderedProducts = filteredProducts.sort(this.sortProducts);

    // VALOR TOTAL DO CARRINHO
    let totalValue = 0;
    this.state.cart.map((item) => {
      totalValue += item.value * item.quantity;
    });

    if (this.state.ShopMode) {
      return (
        <Shopkeeper
          Modo={this.state.ShopMode}
          products={this.state.products}
          quantity={this.state.products.length}
          ChangeModeStatus={this.ChangeModeStatus}
          inputName={this.state.inputName}
          onChangeProductName={this.onChangeProductName}
          inputValue={this.state.inputValue}
          onChangeProductValue={this.onChangeProductValue}
          inputImage={this.state.inputImage}
          onChangeProductImage={this.onChangeProductImage}
          addProduct={this.addProduct}
        />
      );
    } else if (!this.state.ShopMode) {
      return (
        <AppWrapper>
          <img
            className="filterIcon"
            onClick={this.filterToggle}
            src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTcuNSAwaC0xNS43NWMtLjk2NSAwLTEuNzUuNzg1LTEuNzUgMS43NXYxLjkyNmMwIC43MzUuMjg2IDEuNDI2LjgwNiAxLjk0NWw1LjgyOCA1LjgyNGMuMjMyLjIzMi4zNjYuNTU1LjM2Ni44ODR2Ny45MjFjMCAuMjkzLjE3LjU1OS40MzcuNjgxLjEuMDQ3LjIwNy4wNjkuMzEzLjA2OS4xNzYgMCAuMzUtLjA2Mi40ODgtLjE4MWwyLjgwMS0yLjQwMWMuNjExLS41MjMuOTYxLTEuMjg0Ljk2MS0yLjA4OHYtMy45OGMwLS4zMzcuMTM5LS42NjYuMzgyLS45bDYuMDI3LTUuODE1Yy41MzQtLjUxNS44NC0xLjIzNy44NC0xLjk3OXYtMS45MDZjLjAwMS0uOTY1LS43ODQtMS43NS0xLjc0OS0xLjc1eiIgZmlsbD0iIzRjYWY1MCIvPjxwYXRoIGQ9Im05LjYyNSAwaC03Ljg3NWMtLjk2NSAwLTEuNzUuNzg1LTEuNzUgMS43NXYxLjkyNmMwIC43MzUuMjg2IDEuNDI2LjgwNiAxLjk0NWw1LjgyOCA1LjgyNGMuMjMyLjIzMi4zNjYuNTU1LjM2Ni44ODR2Ny45MjFjMCAuMjkzLjE3LjU1OS40MzcuNjgxLjEuMDQ3LjIwNy4wNjkuMzEzLjA2OS4xNzYgMCAuMzUtLjA2Mi40ODgtLjE4MWwxLjM4Ny0xLjE4OXoiIGZpbGw9IiM0Mjk4NDYiLz48cGF0aCBkPSJtMjIuMjUgMTJoLTYuNWMtLjk2NSAwLTEuNzUuNzg1LTEuNzUgMS43NXY4LjVjMCAuOTY1Ljc4NSAxLjc1IDEuNzUgMS43NWg2LjVjLjk2NSAwIDEuNzUtLjc4NSAxLjc1LTEuNzV2LTguNWMwLS45NjUtLjc4NS0xLjc1LTEuNzUtMS43NXoiIGZpbGw9IiNlY2VmZjEiLz48cGF0aCBkPSJtMjAuMjUgMTcuNWgtMi41Yy0uNDE0IDAtLjc1LS4zMzYtLjc1LS43NXMuMzM2LS43NS43NS0uNzVoMi41Yy40MTQgMCAuNzUuMzM2Ljc1Ljc1cy0uMzM2Ljc1LS43NS43NXoiIGZpbGw9IiM5MGE0YWUiLz48cGF0aCBkPSJtMjAuMjUgMjAuNWgtMi41Yy0uNDE0IDAtLjc1LS4zMzYtLjc1LS43NXMuMzM2LS43NS43NS0uNzVoMi41Yy40MTQgMCAuNzUuMzM2Ljc1Ljc1cy0uMzM2Ljc1LS43NS43NXoiIGZpbGw9IiM5MGE0YWUiLz48cGF0aCBkPSJtMTkgMTJoLTMuMjVjLS45NjUgMC0xLjc1Ljc4NS0xLjc1IDEuNzV2OC41YzAgLjk2NS43ODUgMS43NSAxLjc1IDEuNzVoMy4yNXYtMy41aC0xLjI1Yy0uNDE0IDAtLjc1LS4zMzYtLjc1LS43NXMuMzM2LS43NS43NS0uNzVoMS4yNXYtMS41aC0xLjI1Yy0uNDE0IDAtLjc1LS4zMzYtLjc1LS43NXMuMzM2LS43NS43NS0uNzVoMS4yNXoiIGZpbGw9IiNjZGQwZDIiLz48ZyBmaWxsPSIjN2Q4Zjk3Ij48cGF0aCBkPSJtMTkgMTZoLTEuMjVjLS40MTQgMC0uNzUuMzM2LS43NS43NXMuMzM2Ljc1Ljc1Ljc1aDEuMjV6Ii8+PHBhdGggZD0ibTE5IDE5aC0xLjI1Yy0uNDE0IDAtLjc1LjMzNi0uNzUuNzVzLjMzNi43NS43NS43NWgxLjI1eiIvPjwvZz48L3N2Zz4="
          />
          {this.state.isFilterVisible && (
            <Filter
              changeSearchName={this.changeSearchName}
              minValue={this.minValue}
              maxValue={this.maxValue}
              minFilterValue={this.state.filterData.minValue}
              maxFilterValue={this.state.filterData.maxValue}
              cleanFilter={this.cleanFilter}
            />
          )}
          <ProductsField
            quantity={this.state.products.length}
            orderType={this.orderType}
            orderedProducts={orderedProducts}
            addToCart={this.addToCart}
            ChangeModeStatus={this.ChangeModeStatus}
            Modo={this.state.ShopMode}
          />
          {this.state.isCartVisible && (
            <Cart
              cart={this.state.cart}
              onClickDelete={this.onClickDelete}
              onClickAddItem={this.onClickAddItem}
              onClickRemoveItem={this.onClickRemoveItem}
              cleanCart={this.cleanCart}
              totalValue={totalValue}
            />
          )}
          <img className="cartIcon" src={cartIcon} onClick={this.cartToggle} />
        </AppWrapper>
      );
    }
  }
}
