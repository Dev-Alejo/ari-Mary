async function getUsers() {
  try {
    const BASE_URL = 'http://localhost/shop-server/api/users/getUsers.php';
    const request = await fetch(BASE_URL);
    const response = await request.json();

    if (response.length > 0) {
      for (let i = 0; i < response.length; i++) {
        document.querySelector('.tbody').innerHTML += `
                <tr>
                    <td>${response[i].id}</td>
                    <td>${response[i].name}</td>
                    <td>${response[i].lastname}</td>
                    <td>${response[i].username}</td>
                    <td>${response[i].rol === '1' ? 'Administrador' : 'Empleado'}</td>
                    <td class="text-center">
                    <a href="./editar-usuario.html?id=${
                      response[i].id
                    }" class="btn btn-outline-success m-1 px-lg-3"
                        ><i class="fas fa-edit"></i>
                        <span class="d-none d-lg-inline-flex"> Editar</span></a
                    >
                    <form
                        action="eliminar_usuario.php?id=1"
                        method="post"
                        class="confirmar d-inline"
                    >
                        <button class="btn btn-outline-danger m-1" type="button" onclick="deleteUser(${
                          response[i].id
                        })">
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
    console.log(error);
  }
}

async function getUserId() {
  const userId = window.location.search.slice(4);

  try {
    const BASE_URL = `http://localhost/shop-server/api/users/getUser.php?id=${userId}`;
    const request = await fetch(BASE_URL);
    const response = await request.json();

    document.querySelector('#nombre').value = response.Name;
    document.querySelector('#apellido').value = response.Lastname;
    document.querySelector('#usuario').value = response.Username;
    document.querySelector('#clave').value = response.Password;

    if (response.Rol === '1') {
      return document.querySelector('#administrador').setAttribute('selected', true);
    }

    document.querySelector('#empleado').setAttribute('selected', true);
  } catch (error) {
    console.log(error);
  }
}

async function updateUser() {
  const id = window.location.search.slice(4);
  const name = document.querySelector('#nombre').value;
  const lastname = document.querySelector('#apellido').value;
  const username = document.querySelector('#usuario').value;
  const password = document.querySelector('#clave').value;
  const rol = document.querySelector('#rol').value;

  const json = {
    id,
    name,
    lastname,
    username,
    password,
    rol,
  };

  try {
    const BASE_URL = `http://localhost/shop-server/api/users/updateUsers.php`;
    const request = await fetch(BASE_URL, {
      method: 'PUT',
      body: JSON.stringify(json),
    });
    const response = await request.json();

    if (response.message) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

async function addUser() {
  const name = document.querySelector('#nombre').value;
  const lastname = document.querySelector('#apellido').value;
  const username = document.querySelector('#usuario').value;
  const password = document.querySelector('#clave').value;
  const rol = document.querySelector('#rol').value;

  const json = {
    name,
    lastname,
    username,
    password,
    rol,
  };

  try {
    const BASE_URL = 'http://localhost/shop-server/api/users/addUsers.php';
    const request = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(json),
    });
    const response = await request.json();

    if (response.success) {
      alert(response.message);

      window.location.reload();
    }
  } catch (error) {}
}

async function deleteUser(id) {
  try {
    const BASE_URL = `http://localhost/shop-server/api/users/deleteUsers.php?id=${id}`;
    const request = await fetch(BASE_URL, {
      method: 'DELETE',
    });
    const response = await request.json();

    if (response.success) {
      alert('¡Usuario eliminado con éxito');

      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}
