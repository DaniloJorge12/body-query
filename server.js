// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const { bruxos, casas, varinhas, animais, pocoes } = dados;


// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

// Aqui vão todas suas Rotas

// Rota de Bruxos com Filtros (Query Parameters)
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

//Rota de Varinhas com filtros (Query Params)
app.get('/varinhas', (req, res) => {
    const { material, nucleo, id, comprimento} = req.query;
    let resultado = varinhas;
  
    if (material) {
      resultado = resultado.filter(b => b.material.toLowerCase() === material.toLowerCase());
    }
  
    if (nucleo) {
      resultado = resultado.filter(b => b.nucleo == nucleo);
    }
  
    if (id) {
      resultado = resultado.filter(b => b.id.toLowerCase().includes(id.toLowerCase()));
    }
  
    if (comprimento) {
      resultado = resultado.filter(b => b.comprimento.toLowerCase().includes(comprimento.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

//Rota de Poções com filtros (Query Params)
app.get('/pocoes', (req, res) => {
    const { id, nome, efeito} = req.query;
    let resultado = pocoes;
  
    if (efeito) {
      resultado = resultado.filter(b => b.efeito.toLowerCase().includes(efeito.toLowerCase()));
    }
    
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

//Rota de Animais com filtros (Query Params)
app.get('/animais', (req, res) => {
    const { id, nome, tipo} = req.query;
    let resultado = animais;
  
    if (tipo) {
      resultado = resultado.filter(b => b.tipo.toLowerCase().includes(tipo.toLowerCase()));
    }
  
    if (id) {
      resultado = resultado.filter(b => b.id.toLowerCase().includes(id.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

//Body

app.post("/bruxos", (req, res) => {
    const {nome, casa, ano, varinha, mascote, patrono, especialidade, vivo} = req.body;

    if(!nome || !casa || !ano || !vivo) {
        return res.status(400).json({
            success: false,
            message: "Nome, casa, ano e estar vivo são obrigatórios para um bruxo!"
        })
    }

    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa: casa,
        ano: parseInt(ano),
        varinha: varinha || "Ainda não definido",
        mascote: mascote || "Ainda não definido",
        patrono: patrono || "Ainda não definido",
        especialidade: especialidade || "Ainda não realizado",
        vivo: vivo
    }

    //Adicione ele no Array
    bruxos.push(novoBruxo);

    res.status(201).json({
        sucess: true,
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo
    });
})

app.post("/varinhas", (req, res) => {
    const {id, material, nucleo, comprimento} = req.body;

    if(!material || !nucleo || !comprimento) {
        return res.status(400).json({
            success: false,
            message: "Precisa ter material, núcleo e comprimento!"
        })
    }

    const novaVarinha = {
        id: varinhas.length + 1,
        material,
        nucleo: nucleo,
        comprimento: comprimento || "Ainda não definido"
    }

    //Adicione ele no Array
    varinhas.push(novaVarinha);

    res.status(201).json({
        success: true,
        message: "Nova Varinha adicionado a Hogwarts!",
        data: novaVarinha
    });
})


// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});