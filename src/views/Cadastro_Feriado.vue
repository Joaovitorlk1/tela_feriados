<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function cadastrarUsuario() {
    router.push('/cadastrarUsuario')
}
</script>

<template>
    <link rel="stylesheet" href="/dist/css/style.css">
    <div class="vh-100 bg-primary-subtle d-flex align-content-center align-items-center ">
        <div class="card-cadastro row card-lg rounded-4 m-auto bg-secondary-subtle shadow-lg ">
            <div class="row m-auto">
                <h1 class="col-auto m-auto mb-3 fst-italic fw-bolder mt-3">
                    <div>Cadastrar Usuário </div>
                </h1>
            </div>
            <form class="" @submit.prevent="cadastrarUsuario">
                <div class="row">
                    <div class=" m-auto col-lg-5 mb-3">
                        <input placeholder="Digite seu Nome Completo" type="text" class="form-control form-control-sm" id="txt-name">
                    </div>
                    <div class="m-auto col-lg-5 mb-3">
                        <input placeholder="Digite seu Email" type="email" class="form-control form-control-sm" id="txt-email">
                    </div>
                </div>

                <div class="row">
                    <div class=" m-auto col-lg-5 mb-3">
                        <input placeholder="Digite sua Senha" type="password" class="form-control form-control-sm" id="txt-senha">
                    </div>
                    <div class="m-auto col-lg-5 mb-3">
                        <input placeholder="Confirme sua Senha" type="password" class="form-control form-control-sm" id="txt-senha">
                    </div>
                </div>

                <div class="row">

                    <div class=" m-auto col-lg-5 mb-3">
                        <input type="date" class="form-control form-control-sm" id="input-date">
                    </div>

                    <div class="m-auto col-lg-5 mb-3">
                        <select class="form-control form-select form-select-sm">
                            <option selected>Sexo / Masculino </option>
                            <option value="1">Sexo / Feminino</option>

                        </select>
                    </div>
                </div>

                <div class="col-lg-3 m-auto d-flex justify-content-center mb-3 mt-3">
                    <button type="button" class="btn btn-lg btn-primary" @click="fazerlogin">Cadastrar</button>
                </div>
            </form>
        </div>
    </div>
</template>