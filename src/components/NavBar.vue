<template>
<fwb-navbar solid class="mb-5" id="navbar">
    <template #logo class="font-black"> API TIENDA </template>
    <template #default="{ isShowMenu }">
    <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <router-link to="/usuarios" class="fwb-navbar-link"> Usuarios </router-link>
        <router-link to="/productos" class="fwb-navbar-link"> Productos </router-link>
    </fwb-navbar-collapse>
    </template>
</fwb-navbar>
</template>

<script setup>
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink, FwbNavbarLogo } from "flowbite-vue";
</script>
