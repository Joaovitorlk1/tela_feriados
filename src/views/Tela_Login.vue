<script setup>
</script>

<template>
    <link rel="stylesheet" href="/dist/css/style.css">
    <div class="vh-100 bg-primary-subtle d-flex align-content-center align-items-center ">
        <div class="row card-lg rounded-4 m-auto bg-secondary-subtle shadow-lg ">
            <div class="row m-auto">
                <h1 class="col-lg-8 col-md-8 col-sm-12 m-auto mb-3 fst-italic fw-bolder mt-3">
                    <div>Login Feriados</div>
                </h1>
            </div>
            <form class="">
                <div class=" m-auto col-lg-11 mb-3">
                    <input placeholder="Digite seu Email" type="email" class="form-control" id="emailtxt"
                        aria-describedby="emailHelp">
                </div>
                <div class="m-auto col-lg-11 mb-3">
                    <input placeholder="Digite sua Senha" type="password" class="form-control"
                        id="exampleInputPassword1">
                </div>
                <div class="col mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label " for="exampleCheck1">Lembrar Minha Senha</label>
                </div>
                <div class="col m-auto d-flex justify-content-center mb-3"><button type="submit"
                        class="btn btn-lg btn-primary">Submit</button></div>
            </form>
        </div>
    </div>
</template>