<script setup>
import { ref } from 'vue';
import Modal from '../components/Modal.vue';
import ImgModal from '../components/ImgModal.vue';

let modal1Active = ref(false);
let modal2Active = ref(false);
</script>

<template>
    <div class="container">
        <button class="button is-primary" @click="modal1Active = true">Open Modal 1</button>
        <button class="button is-info" @click="modal2Active = true">Open Modal 2</button>
        <Modal :active="modal1Active" @close="modal1Active = false">
            <div class="box">Hello</div>
        </Modal>
        <ImgModal :active="modal2Active" @close="modal2Active = false" url="https://funny.klev.club/uploads/posts/2024-03/funny-klev-club-p-smeshnie-kartinki-na-avatarku-krutie-22.jpg"></ImgModal>
    </div>
</template>

<style></style>