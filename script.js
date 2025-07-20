document.addEventListener('DOMContentLoaded', () => {
    // Este código JavaScript foi feito para adicionar interatividade e dinamismo ao portfólio.
    // Ele complementa o HTML e CSS, trazendo a página à vida.

    // 1. Rolagem suave para links de navegação
    // Ao clicar em um item do menu que leva a uma seção (ex: "Sobre Mim"),
    // a página rola suavemente até essa seção, em vez de pular. Isso melhora a experiência do usuário.
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão de salto abrupto do navegador

            const targetId = this.getAttribute('href'); // Pega o ID da seção alvo (ex: "#about")
            const targetElement = document.querySelector(targetId); // Encontra o elemento HTML correspondente

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // A chave para a rolagem suave
                    block: 'start'      // Rola até o início do elemento alvo
                });
            }
        });
    });

    // 2. Efeito de Digitação Dinâmica para o Subtítulo (Tagline)
    // Eu queria que a frase de impacto abaixo do meu nome aparecesse como se estivesse sendo digitada.
    // Isso cria um efeito visual inicial interessante e moderno.
    const taglineElement = document.querySelector('.tagline');
    const originalTagline = taglineElement.textContent; // Guardo o texto original
    taglineElement.textContent = ''; // Limpo o texto para começar a digitar

    let i = 0; // Contador para as letras
    const typeSpeed = 70; // Velocidade da digitação em milissegundos (quanto menor, mais rápido)

    function typeWriter() {
        if (i < originalTagline.length) {
            taglineElement.textContent += originalTagline.charAt(i); // Adiciona uma letra por vez
            i++;
            setTimeout(typeWriter, typeSpeed); // Chama a função novamente após um tempo
        }
    }
    // Inicio o efeito de digitação após um pequeno atraso para a página carregar.
    setTimeout(typeWriter, 500);

    // 3. Animação de Entrada para as Seções (Fade-in ao rolar)
    // Para tornar a rolagem mais dinâmica, faço com que cada seção apareça gradualmente (fade-in)
    // e suba um pouco quando entra na área visível da tela.
    const sections = document.querySelectorAll('.section-card'); // Pego todas as seções com a classe 'section-card'

    // Opções para o Intersection Observer: Ele me permite saber quando um elemento entra ou sai da viewport.
    const observerOptions = {
        root: null, // Observa em relação à viewport (a janela do navegador)
        rootMargin: '0px', // Nenhuma margem extra
        threshold: 0.1 // A seção é considerada "intersecting" (visível) quando 10% dela está na viewport
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Se a seção estiver visível
                entry.target.classList.add('visible'); // Adiciono a classe 'visible' para disparar a animação CSS
                observer.unobserve(entry.target); // Paro de observar a seção para que a animação não se repita
            }
        });
    }, observerOptions);

    // Itero sobre cada seção e começo a observá-la.
    sections.forEach(section => {
        sectionObserver.observe(section);
        // Também verifico se a seção já está visível na carga inicial da página para aplicar a animação.
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add('visible');
        }
    });

    // 4. Botão "Voltar ao Topo" Dinâmico
    // Para facilitar a navegação em páginas mais longas, adicionei um botão que aparece quando o usuário rola a página
    // e permite voltar ao topo com um clique suave.
    const backToTopButton = document.createElement('button'); // Crio o elemento <button>
    backToTopButton.textContent = '↑ Topo'; // Texto do botão
    backToTopButton.id = 'backToTopBtn'; // ID para estilização específica no CSS
    document.body.appendChild(backToTopButton); // Adiciono o botão ao final do corpo do HTML

    // Estilos inline básicos para o botão (melhor seria no CSS, mas para agilizar, deixei aqui alguns)
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        background-color: #007bff;
        color: white;
        border: none;
        padding: 12px 18px;
        border-radius: 50%; /* Deixa o botão redondo */
        cursor: pointer;
        font-size: 1.2em;
        display: none; /* Oculto por padrão */
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000; /* Garante que o botão fique acima de outros elementos */
        transition: opacity 0.3s ease, background-color 0.3s ease;
    `;

    // Evento de rolagem da janela para mostrar/ocultar o botão
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Se o usuário rolou mais de 300px
            backToTopButton.style.display = 'block'; // Mostra o botão
            backToTopButton.style.opacity = '1'; // Torna-o totalmente visível
        } else {
            backToTopButton.style.opacity = '0'; // Começa a desaparecer
            // Uso um pequeno atraso para 'display: none' para permitir que a transição de opacidade termine.
            setTimeout(() => {
                if (backToTopButton.style.opacity === '0') {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });

    // Evento de clique para rolar a página para o topo
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Rola suavemente para o topo
        });
    });

    // 5. Destacar Habilidades ao passar o mouse
    // Queria que as tags de habilidades fossem mais interativas.
    // Ao passar o mouse sobre elas, elas aumentam um pouco e mudam de cor, dando um feedback visual.
    const skillTags = document.querySelectorAll('.skill-tag'); // Pego todas as tags de habilidade
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => { // Evento quando o mouse entra na tag
            tag.style.transform = 'scale(1.1)'; // Aumenta o tamanho em 10%
            tag.style.backgroundColor = '#0056b3'; // Altera a cor de fundo
            tag.style.transition = 'all 0.2s ease-in-out'; // Transição suave para a animação
        });
        tag.addEventListener('mouseleave', () => { // Evento quando o mouse sai da tag
            tag.style.transform = 'scale(1)'; // Volta ao tamanho normal
            tag.style.backgroundColor = '#007bff'; // Volta à cor original
        });
    });

    // 6. Contador de Tempo de Experiência Dinâmico (para o cargo "Atual")
    // Para manter meu currículo sempre atualizado, este script calcula automaticamente
    // quanto tempo estou no meu cargo atual (assumindo que é a primeira experiência listada com "Atual").
    const currentJobDuration = document.querySelector('.job-entry:first-child .job-duration');
    if (currentJobDuration && currentJobDuration.textContent.includes('Atual')) {
        const startDateStr = currentJobDuration.textContent.split(' - ')[0]; // Ex: "Fev-2023"
        const [monthStr, yearStr] = startDateStr.split('-');
        // Mapeio os nomes dos meses para seus índices (0-11 para Date em JS)
        const monthMap = {
            'Jan': 0, 'Fev': 1, 'Mar': 2, 'Abr': 3, 'Mai': 4, 'Jun': 5,
            'Jul': 6, 'Ago': 7, 'Set': 8, 'Out': 9, 'Nov': 10, 'Dez': 11
        };
        const startDate = new Date(parseInt(yearStr), monthMap[monthStr], 1); // Crio a data de início
        const today = new Date(); // Pego a data de hoje

        // Função para calcular anos e meses entre duas datas
        function calculateDuration(start, end) {
            let years = end.getFullYear() - start.getFullYear();
            let months = end.getMonth() - start.getMonth();

            if (months < 0) { // Se os meses forem negativos, ajusta anos e meses
                years--;
                months += 12;
            }
            return { years, months };
        }

        const { years, months } = calculateDuration(startDate, today);
        let durationText = ''; // Texto final da duração

        if (years > 0) {
            durationText += `${years} ano${years > 1 ? 's' : ''}`;
        }
        if (months > 0) {
            durationText += `${years > 0 ? ' e ' : ''}${months} mês${months > 1 ? 'es' : ''}`;
        }

        if (durationText) {
            // Atualiza o texto no HTML
            currentJobDuration.textContent = `${startDateStr} - Atual (${durationText})`;
        }
    }

});