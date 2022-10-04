const products = [];
let selectedProducts = [];

async function addTicket() {
  const code = document.getElementById('dni_cliente').value;
  const name = document.getElementById('nombre_cliente').value;
  const phone = document.getElementById('tel_cliente').value;
  const address = document.getElementById('dir_cliente').value;

  let total = 0;
  for (let i = 0; i < selectedProducts.length; i++) {
    const totalPrice = selectedProducts[i].Total;

    total += Number(totalPrice);
  }

  const json = JSON.stringify({
    code,
    name,
    phone,
    address,
    products: selectedProducts,
    total,
  });

  try {
    const BASE_URL = 'http://localhost/shop-server/api/ticket/addTicket.php';
    const request = await fetch(BASE_URL, {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
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
        products.push(response[i]);

        document.querySelector(
          '#product'
        ).innerHTML += `<option value=${response[i].ProductID}>${response[i].Name}</option>`;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function addProduct() {
  const productId = document.getElementById('product').value;

  if (productId === '') {
    return;
  }

  const product = products.filter((product) => product.ProductID === productId)[0];

  const isExist = selectedProducts.find((p) => p.ProductID === product.ProductID);

  if (!isExist) {
    const Quantity = 1;
    const SalePrice = Number(product.SalePrice);
    const Total = Number(Quantity) * Number(SalePrice);

    const newProduct = {
      ProductID: product.ProductID,
      Quantity,
      SalePrice,
      Total,
      Name: product.Name,
    };

    selectedProducts.push(newProduct);

    document.querySelector('.tbody').innerHTML = '';

    for (let i = 0; i < selectedProducts.length; i++) {
      const element = selectedProducts[i];

      document.querySelector('.tbody').innerHTML += `
       <tr>
          <td>${element.Name}</td>
          <td>${element.Quantity}</td>
          <td>${element.SalePrice}</td>
          <td>${element.Total}</td>
          <td class="text-center">
              <a id="eliminar_product_venta" class="btn btn-outline-danger" onclick="deleteProduct(${element.ProductID})">
              <i class='fas fa-trash-alt'></i> <span class="d-none d-lg-inline-flex "> Eliminar</span></a>
         </td>
         </tr>
      `;
    }

    return;
  }

  // Existe...
  const Quantity = isExist.Quantity + 1;
  const Total = isExist.SalePrice * Quantity;

  const newState = { ...isExist, Quantity, Total };

  for (let i = 0; i < selectedProducts.length; i++) {
    if (selectedProducts[i].ProductID === newState.ProductID) {
      selectedProducts[i] = newState;
    }
  }

  document.querySelector('.tbody').innerHTML = '';

  for (let i = 0; i < selectedProducts.length; i++) {
    const element = selectedProducts[i];

    document.querySelector('.tbody').innerHTML += `
     <tr>
        <td>${element.Name}</td>
       <td>${element.Quantity}</td>
        <td>${element.SalePrice}</td>
        <td>${element.Total}</td>
        <td class="text-center">
            <a id="eliminar_product_venta" onclick="deleteProduct(${element.ProductID})" class="btn btn-outline-danger"><i
                   class='fas fa-trash-alt'></i> <span class="d-none d-lg-inline-flex "> Eliminar</span></a>
       </td>
       </tr>
    `;
  }
}

function deleteProduct(id) {
  const product = selectedProducts.find((p) => Number(p.ProductID) === Number(id));

  selectedProducts = selectedProducts.filter(
    (p) => Number(p.ProductID) !== Number(product.ProductID)
  );

  document.querySelector('.tbody').innerHTML = '';

  for (let i = 0; i < selectedProducts.length; i++) {
    const element = selectedProducts[i];

    document.querySelector('.tbody').innerHTML += `
     <tr>
        <td>${element.Name}</td>
       <td>${element.Quantity}</td>
        <td>${element.SalePrice}</td>
        <td>${element.Total}</td>
        <td class="text-center">
            <a id="eliminar_product_venta" onclick="deleteProduct(${element.ProductID})" class="btn btn-outline-danger"><i
                   class='fas fa-trash-alt'></i> <span class="d-none d-lg-inline-flex "> Eliminar</span></a>
       </td>
       </tr>
    `;
  }
}

async function getTickets() {
  try {
    const BASE_URL = 'http://localhost/shop-server/api/ticket/getTickets.php';
    const request = await fetch(BASE_URL);
    const response = await request.json();

    for (let i = 0; i < response.length; i++) {
      const element = response[i];
      const date = element.Created.split(' ')[0];

      const products = JSON.parse(element.Products);

      document.querySelector('tbody').innerHTML += `
        <tr>
          <td>${element.TicketID}</td>
          <td>${element.Name}</td>
          <td>${element.Code}</td>
          <td>${element.Phone}</td>

          <td>${element.Address}</td>
          <td>
            ${products.map((p) => `<div>${p.Name} x ${p.Quantity}</div>`).join('')}
           
          </td>
          <td>${element.Total}</td>
          <td>${date}</td>
        </tr>
      `;
    }
  } catch (error) {
    console.error(error);
  }
}
