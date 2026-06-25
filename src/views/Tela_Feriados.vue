<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { obterTodosFeriados } from '../services/holidaysApi.js';


// Array que irá guardar os feriados:
const feriados = ref([]);
// Filtros externos
const filtros = reactive({
    dataInicial: '',
    dataFinal: '',
    descricao: '',
    tipo: 'Nacional'
});
// Constante para armazenar feriados no LocalStorage:
const STORAGE_KEY = "feriados"

const novoFeriado = reactive({
    descricaoFeriado: '',
    feriadoTipo: 'Nacional',
    feriadoData: ''
});

// Computed para feriados filtrados
const feriadosFiltrados = computed(() => {
    let filtrados = feriados.value;

    if (filtros.dataInicial) {
        filtrados = filtrados.filter(f => f.feriadoData >= filtros.dataInicial);
    }
    if (filtros.dataFinal) {
        filtrados = filtrados.filter(f => f.feriadoData <= filtros.dataFinal);
    }
    if (filtros.descricao) {
        const desc = filtros.descricao.toLowerCase();
        filtrados = filtrados.filter(f =>
            f.descricaoFeriado.toLowerCase().includes(desc)
        );
    }
    if (filtros.tipo && filtros.tipo !== 'Nacional') { // Nacional mostra todos, outros filtram
        filtrados = filtrados.filter(f => f.feriadoTipo === filtros.tipo);
    }

    return filtrados;
});

// Função auxiliar para Salvar no LocalStorage
function salvarFeriadosStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feriados.value))
}

// Função auxiliar para pegar os feriados já salvos e carregar no LocalStorage
function carregarFeriadosStorage() {
    const feriadosSalvos = localStorage.getItem(STORAGE_KEY)
    return feriadosSalvos ? JSON.parse(feriadosSalvos) : []
}

//onMounted para Carregar feriados
onMounted(() => {
    // Carregar PRIMEIRO no LocalStorage (Se existir!)
    const feriadosSalvosnoStorage = carregarFeriadosStorage()
    // Carregar feriados da Api
    const feriadosApi = obterTodosFeriados().map(f => ({
        descricaoFeriado: f.nome,
        feriadoTipo: 'Nacional', // API não tem tipo, assumir Nacional
        feriadoData: f.data
    }));
    // Carregar do LocalStorage + Api :
    feriados.value = feriadosSalvosnoStorage.length > 0
        ? feriadosSalvosnoStorage : feriadosApi
    //Por fim Salvar tudo em LocalStorage
    salvarFeriadosStorage()
});

//Adicionar feriados:
function adicionarFeriado() {
    if (!novoFeriado.descricaoFeriado?.trim() || !novoFeriado.feriadoData) {
        return; // Sem validação visual
    }
    // Valida se o ano adicionado é menor que o ano atual?
    const anoAtual = new Date().getFullYear()
    const anoSelecionado = new Date(novoFeriado.feriadoData).getFullYear()

    if (anoSelecionado < anoAtual) {
        alert("Erro!!! Não é permitido adicionar um Ano anterior ao atual")
        novoFeriado.feriadoData = ""
        return
    }

    // Valida se um número foi digitado no input:
    if (/\d/.test(novoFeriado.descricaoFeriado)) {
        alert("ERRO! Não adicione números ao input")
        novoFeriado.descricaoFeriado = ""
        return
    }
    const [ano, mes, dia] = novoFeriado.feriadoData.split('-')
    const dataFormatada = `${dia}-${mes}-${ano}`

    // 'push' adiciona valores as variáveis em 'novoFeriado'
    feriados.value.push({
        descricaoFeriado: novoFeriado.descricaoFeriado,
        feriadoTipo: novoFeriado.feriadoTipo,
        feriadoData: dataFormatada,
    })
    salvarFeriadosStorage()
    // Resetar o objeto:
    novoFeriado.descricaoFeriado = '';
    novoFeriado.feriadoTipo = 'Nacional';
    novoFeriado.feriadoData = '';
}

// Funções para filtros
function limparFiltros() {
    filtros.dataInicial = '';
    filtros.dataFinal = '';
    filtros.descricao = '';
    filtros.tipo = 'Nacional';
}
</script>

<template>
    <div class=" container-xxl card border-secondary mb-3 mt-3">
        <div class="card-header bg-secondary-subtle row">
            <div class="border-success row">Cadastro de feriados</div>
            <div class="btn-sm btn-close ms-auto"></div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-2 col-md-6 ">
                    <div class="m-auto">Date Inicial</div>
                    <input v-model="filtros.dataInicial" class="col-sm-12 form-control-sm form-control" type="date" name="" id="">
                </div>
                <div class="col-lg-2 col-md-6 ">
                    <div class="m-auto">Date Final</div>
                    <input v-model="filtros.dataFinal" class="form-control-sm form-control col-sm-12" type="date" name="" id="">
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="w-auto m-auto">Descrição</div>
                    <input v-model="filtros.descricao" class=" form-control form-control-sm" type="text" name="" id="">
                </div>
                <div class="col-lg-1 col-md-6 ">
                    <div>Tipo</div>
                    <select v-model="filtros.tipo" class="form-select-sm form-control col-sm-12" aria-label="Default select example">
                        <option value="Nacional">Nacional</option>
                        <option value="Regional">Regional</option>
                        <option value="Estadual">Estadual</option>
                    </select>
                </div>
                <div class="col-auto mt-4 me-auto">
                    <button @click="limparFiltros" type="button"
                        class="btn btn-sm col-sm-12 btn-secondary">Limpar</button>
                </div>
                <div class="col-auto ms-auto mt-4">
                    <!-- Button abrir modal -->
                    <button type="button" class="btn btn-sm btn-primary col-sm-12" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">
                        Adicionar
                    </button>
                </div>
            </div>
            <div class="table-responsive mt-3" style="max-height: 70vh; overflow-y:auto;">
                <table class="table mb-0 table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Tipo</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <div id="loading" class="d-flex justify-content-end me-5">
                            <div class="spinner-border" role="status" style="display:none;">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <tr v-for="(feriado, index) in feriadosFiltrados" :key="index">
                            <td>{{ feriado.descricaoFeriado }}</td>
                            <td>{{ feriado.feriadoTipo }}</td>
                            <td>{{ feriado.feriadoData }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Modal -->
            <div v-show="mostrarModal" class="modal fade modal-lg" id="staticBackdrop" data-bs-backdrop="static"
                data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
                style="display: block;">
                <div class="modal-dialog">
                    <div class="modal-content bg-secondary-subtle">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Adicionar</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="w-auto m-auto">Descrição</div>
                                <input v-model="novoFeriado.descricaoFeriado" class="form-control form-control-sm"
                                    type="text" name="" id="">
                            </div>
                            <div class="col-lg-4 col-md-6 ">
                                <div>Tipo</div>
                                <select v-model="novoFeriado.feriadoTipo" class="form-control form-select-sm col-sm-12">
                                    <option value="Nacional">Nacional</option>
                                    <option value="Regional">Regional</option>
                                    <option value="Estadual">Estadual</option>
                                </select>
                            </div>
                            <div class="col-lg-4 col-md-6 ">
                                <div class="m-auto">Date</div>
                                <input v-model="novoFeriado.feriadoData" class="col-sm-12" type="date" name="" id="">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="d-flex justify-content-between w-100">
                                <button @keyup.enter="adicionarFeriado" @click="adicionarFeriado"
                                    :disabled="!novoFeriado.descricaoFeriado?.trim() || !novoFeriado.feriadoData"
                                    type="button" class="btn btn-primary ">Adicionar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer bg-transparent border-secondary d-flex justify-content-between align-items-center">
            <div class="text-primary fw-bolder">{{ feriadosFiltrados.length }} Registros</div>
            <button class="btn btn-sm btn-primary">Fechar <i class="bi bi-x"></i></button>
        </div>
    </div>
</template>
