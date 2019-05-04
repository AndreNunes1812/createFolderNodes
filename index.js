const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const testFolder = "./Servidores";

app.get("/", (req, res) => {
  let contFile = 1;

  //Criar a Pasta se não existir
  fs.mkdir(testFolder, err => {
    if (err && err.code != "EEXIST") throw "up";
  });
  // faz a leitura se houver a pasta
  fs.readdirSync(testFolder).forEach(file => {
    contFile++;
  });
  // cria de fato as pastas
  if (contFile === 1) {
    fs.mkdir(testFolder + "/Server1", err => {
      if (err && err.code != "EEXIST") throw "up";
    });
  } else {
    fs.mkdir("./Servidores/Server" + contFile, err => {
      if (err && err.code != "EEXIST") throw "up";
    });
  }

  res.send({
    mensagem: "pasta criada com sucesso: Server" + contFile
  });
});

app.listen(8000, () => console.log("Express: port 8000"));
