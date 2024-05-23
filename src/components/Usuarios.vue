<template>
  <div>
    
    <loader v-if="loading"></loader>
    
    <fwb-table v-if="!loading" class="bg-slate-400 max-w-[90%] mx-auto">
      <fwb-table-head class="text-center">        
        <fwb-table-head-cell>ID</fwb-table-head-cell>
        <fwb-table-head-cell>Nombre</fwb-table-head-cell>
        <fwb-table-head-cell>Apellido paterno</fwb-table-head-cell>
        <fwb-table-head-cell>Apellido materno</fwb-table-head-cell>
        <fwb-table-head-cell>Fecha de nacimiento</fwb-table-head-cell>
        <fwb-table-head-cell>Correo</fwb-table-head-cell>
        <fwb-table-head-cell>Telefono</fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body class="text-center">
        <fwb-table-row v-for="usuario in usuarios" :key="usuario.id">
          <fwb-table-cell>{{ usuario.id }}</fwb-table-cell>
          <fwb-table-cell>{{ usuario.nombre }}</fwb-table-cell>
          <fwb-table-cell>{{ usuario.ap_paterno }}</fwb-table-cell>
          <fwb-table-cell>{{ usuario.ap_materno }}</fwb-table-cell>
          <fwb-table-cell>{{ usuario.fecha_nacimiento }}</fwb-table-cell>
          <fwb-table-cell>{{ usuario.correo }}</fwb-table-cell>
          <fwb-table-cell>{{ usuario.telefono }}</fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>

    <a class="bg-sky-300 p-3 rounded-full fixed bottom-12 right-12 hover:scale-105 active:scale-95 cursor-pointer" href="#navbar">↑</a>

  </div>
</template>

<script setup>
import { FwbTable, FwbTableBody, FwbTableCell, FwbTableHead, FwbTableHeadCell, FwbTableRow} from "flowbite-vue";
import axios from "axios";
import { ref } from "vue";
import Loader from './Loader.vue';

const usuarios = ref([]);
const loading = ref(true);

const getData = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL_BETO}usuarios`);
    usuarios.value = data.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    loading.value = false;
  }
};

getData();
</script>