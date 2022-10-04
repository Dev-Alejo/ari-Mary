async function getProviders() {
  try {
    const BASE_URL = 'http://localhost/shop-server/api/providers/getProviders.php';
    const request = await fetch(BASE_URL);
    const response = await request.json();

    if (response.length) {
      for (let i = 0; i < response.length; i++) {
        document.querySelector(
          '#proveedor'
        ).innerHTML += `<option value=${response[i].id}>${response[i].name}</option>`;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function addProduct() {
  const name = document.querySelector('#nombre').value;
  const provider = document.querySelector('#proveedor').value;
  const quantity = document.querySelector('#cantidad').value;
  const costPrice = document.querySelector('#costo').value;
  const salePrice = document.querySelector('#venta').value;

  const json = {
    name,
    provider,
    quantity,
    costPrice,
    salePrice,
  };

  try {
    const BASE_URL = 'http://localhost/shop-server/api/products/addProduct.php';
    const request = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(json),
    });
    const response = await request.json();

    if (response.success) {
      alert(response.message);

      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}

async function getProducts() {
  try {
    const BASE_URL = 'http://localhost/shop-server/api/products/getProducts.php';
    const request = await fetch(BASE_URL);
    const response = await request.json();

    if (response.length) {
      for (let i = 0; i < response.length; i++) {
        document.querySelector('.tbody').innerHTML += `
                    <tr>
                        <td>${response[i].ProductID}</td>
                        <td>${response[i].Name}</td>
                        <td>${response[i].Quantity}</td>
                        <td>${response[i].SalePrice}</td>
                        <td>${response[i].CostPrice}</td>
                        <td class="text-center">
                        <a href="./editar-producto.html?id=${response[i].ProductID}" class="btn btn-outline-success m-1 px-lg-3"
                            ><i class="fas fa-edit"></i>
                            <span class="d-none d-lg-inline-flex"> Editar</span></a
                        >
                        <form
                            action="eliminar_usuario.php?id=1"
                            method="post"
                            class="confirmar d-inline"
                        >
                            <button class="btn btn-outline-danger m-1" type="button" onclick="deleteProduct(${response[i].ProductID})">
                            <i class="fas fa-trash-alt"></i>
                            <span class="d-none d-lg-inline-flex"> Eliminar</span>
                            </button>
                        </form>
                        </td>
                </tr>
                `;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function getProduct() {
  const id = window.location.search.slice(4);

  try {
    const BASE_URL = `http://localhost/shop-server/api/products/getProduct.php?id=${id}`;
    const request = await fetch(BASE_URL);
    const response = await request.json();

    if (response) {
      document.querySelector('#nombre').value = response.Name;
      document.querySelector('#cantidad').value = response.Quantity;
      document.querySelector('#costo').value = response.CostPrice;
      document.querySelector('#venta').value = response.SalePrice;
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateProduct() {
  const id = window.location.search.slice(4);
  const name = document.querySelector('#nombre').value;
  // const provider = document.querySelector('#proveedor').value;
  const quantity = document.querySelector('#cantidad').value;
  const costPrice = document.querySelector('#costo').value;
  const salePrice = document.querySelector('#venta').value;

  const json = {
    id,
    name,
    // provider,
    quantity,
    costPrice,
    salePrice,
  };

  try {
    const BASE_URL = 'http://localhost/shop-server/api/products/updateProduct.php';
    const request = await fetch(BASE_URL, {
      method: 'PUT',
      body: JSON.stringify(json),
    });
    const response = await request.json();

    if (response.message) {
      alert(response.message);

      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteProduct(id) {
  try {
    const BASE_URL = `http://localhost/shop-server/api/products/deleteProduct.php?id=${id}`;
    const request = await fetch(BASE_URL, {
      method: 'DELETE',
    });
    const response = await request.json();

    if (response.success) {
      alert('¡Producto eliminado con éxito!');

      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}
