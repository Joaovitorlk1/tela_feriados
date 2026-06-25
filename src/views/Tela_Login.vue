<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

//Função Para ir para tela de feriados
function fazerlogin() {
    router.push('/feriados')
}
// Função para ir para tela de cadastro
function cadastroUsuario() {
    router.push('/cadastroUsuario')
}
</script>

<template>
    <link rel="stylesheet" href="/dist/css/style.css">
    <div class="vh-100 bg-primary-subtle d-flex align-content-center align-items-center ">
        <div class="card-login row card-lg rounded-4 m-auto bg-secondary-subtle shadow-lg ">
            <div class="row m-auto">
                <h1 class="col-auto m-auto mb-3 fst-italic fw-bolder mt-3">
                    <div>Login Feriados</div>
                </h1>
            </div>
            <form class="" @submit.prevent="fazerlogin">
                <div class=" m-auto col-lg-11 mb-3">
                    <input placeholder="Digite seu Email" type="email" class="form-control" id="emailtxt"
                        aria-describedby="emailHelp">
                </div>
                <div class="m-auto col-lg-11 mb-3">
                    <input placeholder="Digite sua Senha" type="password" class="form-control"
                        id="exampleInputPassword1">
                </div>
                <div class="row justify-content-between">
                    <div class="ms-4 col-auto mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="txt-check">
                        <label class="form-check-label ">Lembrar Minha Senha</label>
                    </div>
                    <div class="col-auto me-4">
                        <label>
                            <a class="link-underline-opacity-100-hover" @click="cadastroUsuario">Sem usuário?Cadastre-se</a>
                        </label>
                    </div>
                </div>
                <div class="col-lg-3 m-auto d-flex justify-content-center mt-3 mb-3">
                    <button type="button" class="btn btn-lg btn-primary" @click="fazerlogin">Entrar</button>
                </div>
            </form>
        </div>
    </div>
</template>