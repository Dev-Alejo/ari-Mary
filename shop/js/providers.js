async function getProviders() {
  try {
    const BASE_URL = 'http://localhost/shop-server/api/providers/getProviders.php';
    const request = await fetch(BASE_URL);
    const response = await request.json();

    if (response.length) {
      for (let i = 0; i < response.length; i++) {
        document.querySelector('.tbody').innerHTML += `
                    <tr>
                        <td>${response[i].id}</td>
                        <td>${response[i].name}</td>
                        <td>${response[i].phone}</td>
                        <td>${response[i].email}</td>
                        <td>${response[i].address}</td>
                        <td class="text-center">
                        <a href="./editar-proveedor.html?id=${response[i].id}" class="btn btn-outline-success m-1 px-lg-3"
                            ><i class="fas fa-edit"></i>
                            <span class="d-none d-lg-inline-flex"> Editar</span></a
                        >
                        <form
                            action="eliminar_usuario.php?id=1"
                            method="post"
                            class="confirmar d-inline"
                        >
                            <button class="btn btn-outline-danger m-1" type="button" onclick="deleteProvider(${response[i].id})">
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

async function getProviderId() {
  const providerId = window.location.search.slice(4);

  try {
    const BASE_URL = `http://localhost/shop-server/api/providers/getProvider.php?id=${providerId}`;
    const request = await fetch(BASE_URL);
    const response = await request.json();

    document.querySelector('#nombre').value = response.Name;
    document.querySelector('#correo').value = response.Email;
    document.querySelector('#telefono').value = response.Phone;
    document.querySelector('#direccion').value = response.Address;
  } catch (error) {
    console.log(error);
  }
}

async function updateProvider() {
  const id = window.location.search.slice(4);

  const name = document.querySelector('#nombre').value;
  const email = document.querySelector('#correo').value;
  const phone = document.querySelector('#telefono').value;
  const address = document.querySelector('#direccion').value;

  const json = {
    id,
    name,
    email,
    phone,
    address,
  };

  try {
    const BASE_URL = `http://localhost/shop-server/api/providers/updateProviders.php`;
    const request = await fetch(BASE_URL, {
      method: 'PUT',
      body: JSON.stringify(json),
    });
    const response = await request.json();

    if (response.message) {
      window.location.reload();
    }
  } catch (error) {}
}

async function addProvider() {
  const name = document.querySelector('#nombre').value;
  const email = document.querySelector('#correo').value;
  const phone = document.querySelector('#telefono').value;
  const address = document.querySelector('#direccion').value;

  const json = {
    name,
    email,
    phone,
    address,
  };

  try {
    const BASE_URL = `http://localhost/shop-server/api/providers/addProviders.php`;
    const request = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(json),
    });
    const response = await request.json();

    if (response.success) {
      alert('¡Proveedor añadido!');

      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteProvider(id) {
  try {
    const BASE_URL = `http://localhost/shop-server/api/providers/deleteProviders.php?id=${id}`;
    const request = await fetch(BASE_URL, {
      method: 'DELETE',
    });
    const response = await request.json();

    if (response.success) {
      alert('Proveedor eliminado con éxito');

      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}
