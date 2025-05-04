// Matrizes de adjacência do metrô e do ônibus
const M_metro = [
    [0, 1, 0, 0, 0, 1],  // Avenida
    [1, 0, 0, 1, 0, 0],  // Centro
    [0, 0, 0, 1, 0, 0],  // Praça
    [0, 1, 1, 0, 0, 1],  // Parque
    [0, 0, 0, 0, 0, 1],  // Shopping
    [1, 0, 0, 1, 1, 0]   // Terminal
];

const M_onibus = [
    [0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0]
];

// Funções para verificar as propriedades da matriz
function ehReflexiva(M) {
    return M.every((row, i) => row[i] === 1);
}

function ehSimetrica(M) {
    return M.every((row, i) => row.every((value, j) => value === M[j][i]));
}

function ehAntissimetrica(M) {
    for (let i = 0; i < M.length; i++) {
        for (let j = 0; j < M.length; j++) {
            if (i !== j && M[i][j] === 1 && M[j][i] === 1) {
                return false;
            }
        }
    }
    return true;
}

function ehAssimetica(M) {
    return ehAntissimetrica(M) && M.every((row, i) => row[i] === 0);
}

function ehTransitiva(M) {
    for (let i = 0; i < M.length; i++) {
        for (let j = 0; j < M.length; j++) {
            for (let k = 0; k < M.length; k++) {
                if (M[i][j] && M[j][k] && !M[i][k]) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Função para calcular a composição de M_metro e M_onibus
function composicao(M1, M2) {
    const resultado = Array(M1.length).fill().map(() => Array(M2.length).fill(0));
    for (let i = 0; i < M1.length; i++) {
        for (let j = 0; j < M2.length; j++) {
            for (let k = 0; k < M1.length; k++) {
                if (M1[i][k] && M2[k][j]) {
                    resultado[i][j] = 1;
                }
            }
        }
    }
    return resultado;
}

// Funções para calcular os fechos
function fechoReflexivo(M) {
    const fecho = M.map((row, i) => row.slice());
    for (let i = 0; i < M.length; i++) {
        fecho[i][i] = 1;
    }
    return fecho;
}

function fechoSimetrico(M) {
    const fecho = M.map((row, i) => row.slice());
    for (let i = 0; i < M.length; i++) {
        for (let j = 0; j < M.length; j++) {
            if (fecho[i][j] === 1) {
                fecho[j][i] = 1;
            }
        }
    }
    return fecho;
}

function fechoTransitivo(M) {
    const fecho = M.map(row => row.slice());
    for (let k = 0; k < M.length; k++) {
        for (let i = 0; i < M.length; i++) {
            for (let j = 0; j < M.length; j++) {
                fecho[i][j] = fecho[i][j] || (fecho[i][k] && fecho[k][j]);
            }
        }
    }
    return fecho;
}

// Função para exibir uma matriz de forma legível
function exibirMatriz(matriz) {
    return matriz.map(row => row.join(" ")).join("\n");
}

// Exibindo os resultados no HTML
document.getElementById('metro-matrix').textContent = exibirMatriz(M_metro);
document.getElementById('composition-matrix').textContent = exibirMatriz(composicao(M_metro, M_onibus));
document.getElementById('reflexive').textContent = ehReflexiva(M_metro) ? "Sim" : "Não";
document.getElementById('symmetric').textContent = ehSimetrica(M_metro) ? "Sim" : "Não";
document.getElementById('antisymmetric').textContent = ehAntissimetrica(M_metro) ? "Sim" : "Não";
document.getElementById('asymmetric').textContent = ehAssimetica(M_metro) ? "Sim" : "Não";
document.getElementById('transitive').textContent = ehTransitiva(M_metro) ? "Sim" : "Não";

document.getElementById('reflexive-closure').textContent = exibirMatriz(fechoReflexivo(M_metro));
document.getElementById('symmetric-closure').textContent = exibirMatriz(fechoSimetrico(M_metro));
document.getElementById('transitive-closure').textContent = exibirMatriz(fechoTransitivo(M_metro));
