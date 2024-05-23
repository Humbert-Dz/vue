<template>
  <div>
    <loader v-if="loading"></loader>

    <div v-if="!loading" class="w-6/12 mx-auto mb-8 flex justify-evenly">
      <fwb-button
        gradient="teal-lime"
        outline
        class="hover:scale-105 active:scale-95"
        @click="showModal"
        >Confirmar compra</fwb-button
      >
      <fwb-button
        gradient="pink-orange"
        outline
        class="hover:scale-105 active:scale-95"
        @click="eliminarProducts"
        >Cancelar compra</fwb-button
      >
    </div>

    <fwb-table v-if="!loading" class="bg-slate-400 max-w-[90%] mx-auto">
      <fwb-table-head class="text-center">
        <fwb-table-head-cell>Compra</fwb-table-head-cell>
        <fwb-table-head-cell>ID</fwb-table-head-cell>
        <fwb-table-head-cell>ID Categoría</fwb-table-head-cell>
        <fwb-table-head-cell>Nombre</fwb-table-head-cell>
        <fwb-table-head-cell>Descripción</fwb-table-head-cell>
        <fwb-table-head-cell>Precio</fwb-table-head-cell>
        <fwb-table-head-cell>Estatus</fwb-table-head-cell>
        <fwb-table-head-cell>Fecha agregado</fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body class="text-center">
        <fwb-table-row v-for="producto in productos" :key="producto.id">
          <fwb-table-cell>
            <input
              type="checkbox"
              class="rounded-md"
              @change="toggleSelection(producto.id)"
            />
          </fwb-table-cell>
          <fwb-table-cell>{{ producto.id }}</fwb-table-cell>
          <fwb-table-cell>{{ producto.id_categorias }}</fwb-table-cell>
          <fwb-table-cell>{{ producto.nombre }}</fwb-table-cell>
          <fwb-table-cell>{{ producto.descripcion }}</fwb-table-cell>
          <fwb-table-cell>{{ producto.precio }}</fwb-table-cell>
          <fwb-table-cell>{{ producto.status }}</fwb-table-cell>
          <fwb-table-cell>{{ producto.fecha_agregado }}</fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
  </div>

  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">Identificate</div>
    </template>
    <template #body>
      <label for="usuario" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Selecciona un usuario </label>
      <select v-if="!loading" v-model="selectedUserId" name="usuario" id="usuario" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
          {{ usuario.id + " - " + usuario.nombre + " " + usuario.ap_paterno + " " + usuario.ap_materno}}
        </option>
      </select>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative"> Cancelar </fwb-button>
        <fwb-button @click="enviarData" color="green"> Confirmar </fwb-button>
      </div>
    </template>
  </fwb-modal>

  <a class="bg-sky-300 p-3 rounded-full fixed bottom-12 right-12 hover:scale-105 active:scale-95 cursor-pointer" href="#navbar" >↑</a>
</template>

<script setup>
import { FwbButton, FwbTable, FwbTableBody, FwbTableCell, FwbTableHead, FwbTableHeadCell, FwbTableRow, FwbModal} from "flowbite-vue";
import axios from "axios";
import { ref } from "vue";
import Loader from "./Loader.vue";

const productos = ref([]);
const usuarios = ref([]);
const loading = ref(true);
const selectedUserId = ref(null);

const isShowModal = ref(false);

function closeModal() {
  isShowModal.value = false;
}

const enviarData = async () => {
  const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
  const userId = selectedUserId.value;
  const post = { "id_usuario": userId, "productos": selectedProducts };

  console.log(post);

  const headers = {
    'Accept': "/",
    "Content-Type": "application/json"
  };

  try{

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL_ESME_CENTRAL}pedidosAdd`, post, { headers});
    
    console.log(response);
    
    closeModal();
    
  }catch(error){
  console.log(error)
  }
};

function showModal() {
  isShowModal.value = true;
}

// funcion para agregar el id de un producto al array en el localStorage
const toggleSelection = (productId) => {
  const selectedProducts =
    JSON.parse(localStorage.getItem("selectedProducts")) || [];
  const index = selectedProducts.indexOf(productId);
  if (index !== -1) {
    selectedProducts.splice(index, 1);
  } else {
    selectedProducts.push(productId);
  }
  localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
};

// funcion que elimina el array de ids de productos del localStorage
const eliminarProducts = () => {
  localStorage.removeItem("selectedProducts");
};

// funcion que hace la llamada al endppoint que retorna productos
const getData = async () => {
  try {
    // obtener usuarios
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL_ESME}productos`
    );
    const { data: dats } = await axios.get(
      `${import.meta.env.VITE_BASE_URL_BETO}usuarios`
    );

    productos.value = data.data;
    usuarios.value = dats.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    loading.value = false;
  }
};

getData();
</script>
