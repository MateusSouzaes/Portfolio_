document.addEventListener('DOMContentLoaded', () => {
    // Rolagem suave para links de navegação
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Você pode adicionar mais funcionalidades JavaScript aqui.
    // Por exemplo, um botão "voltar ao topo" que aparece após a rolagem:
    // const backToTopButton = document.createElement('button');
    // backToTopButton.textContent = 'Top';
    // backToTopButton.style.cssText = `
    //     position: fixed;
    //     bottom: 20px;
    //     right: 20px;
    //     background-color: #0056b3;
    //     color: white;
    //     border: none;
    //     padding: 10px 15px;
    //     border-radius: 5px;
    //     cursor: pointer;
    //     display: none; /* Oculto por padrão */
    // `;
    // document.body.appendChild(backToTopButton);

    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 200) { // Mostra o botão após rolar 200px
    //         backToTopButton.style.display = 'block';
    //     } else {
    //         backToTopButton.style.display = 'none';
    //     }
    // });

    // backToTopButton.addEventListener('click', () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // });
});