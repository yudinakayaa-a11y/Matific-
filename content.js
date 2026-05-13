alert("🤖 Robô Matific Ativado! Aguardando o término da atividade para injetar 5 estrelas...");

const originalFetch = window.fetch;
window.fetch = async function(...args) {
    let url = args[0];
    
    if (typeof url === 'string' && (url.includes('score') || url.includes('submit') || url.includes('save') || url.includes('episode'))) {
        console.log('🎯 Requisição do Matific detectada! Injetando acertos máximos...');
        try {
            if (args[1] && args[1].body) {
                let data = JSON.parse(args[1].body);
                
                if (data.score !== undefined) data.score = 100;
                if (data.stars !== undefined) data.stars = 5;
                if (data.correct !== undefined) data.correct = data.total || 10;
                
                args[1].body = JSON.stringify(data);
            }
        } catch(e) {
            console.log('Erro ao modificar dados...');
        }
    }
    return originalFetch.apply(this, args);
};
