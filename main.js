document.addEventListener('DOMContentLoaded', () => {
    // 1. Gerenciamento do Menu Hamburguer para Mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // 2. Destacar link ativo na navegação com efeito neon
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = '#ffffff';
            link.style.textShadow = '0 0 10px #39ff14, 0 0 20px #39ff14';
            link.style.borderBottom = '2px solid #39ff14';
        }
        
        // Fechar menu mobile ao clicar em qualquer link
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // 3. Gerenciamento do Formulário de Contato com Validação Básica
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (name.length < 3) {
                alert('Por favor, insira seu nome completo.');
                return;
            }

            // Simulação de processamento (Loading)
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'PROCESSANDO...';
            btn.disabled = true;

            setTimeout(() => {
                contactForm.style.display = 'none';
                formResponse.style.display = 'block';
                console.log(`Mensagem de ${name} (${email}) recebida.`);
            }, 1500);
        });
    }

    // 4. Efeito de Revelação ao Scroll (Scroll Reveal Básico)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .content-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // 5. Log de Boas-vindas no Console (Debug Básico)
    console.log('%c AgroSustentável v2.0 - Sistema Carregado ', 'background: #000; color: #39ff14; font-weight: bold; border: 1px solid #39ff14;');
});