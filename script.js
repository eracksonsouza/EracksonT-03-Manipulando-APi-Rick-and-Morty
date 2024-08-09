const urlAPi = 'https://rickandmortyapi.com/api/character/';
const dadosDoPersonagem = document.querySelector('.swiper-wrapper'); 
const filterSpecies = document.querySelector('#species-filter'); 

async function mostrandoPersonagem() {
    try {
        const response = await fetch(urlAPi);
        if (response.status !== 200) throw new Error('Falha na resposta da API');

        const objeto = await response.json();
        const swiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 2500, 
                disableOnInteraction: false, 
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            spaceBetween: 30,
        });

        function renderSlides(personagens) {
            dadosDoPersonagem.innerHTML = ''; 
            personagens.forEach((personagem) => {
                const statusClass = personagem.status === "Dead" ? 'status-dead' :
                    personagem.status === "unknown" ? 'status-unknown' : '';

                dadosDoPersonagem.innerHTML += `
                    <div class="swiper-slide">
                        <div class="dados-personagem">
                            <div class="image-personagem">
                                <img src="${personagem.image}" alt="${personagem.name}">
                            </div>
                            <div class="informacoes-personagem">
                                <h1 class="nome-personagem">${personagem.name}</h1>
                                <p class="especie-personagem">${personagem.species}</p>
                                <p class="background-status status ${statusClass}">${personagem.status}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            swiper.update(); 
        }

        
        renderSlides(objeto.results);

      
        filterSpecies.addEventListener('change', (event) => {
            let selectedSpecies = event.target.value;

            let personagensFiltrados = objeto.results.filter(personagem =>
                selectedSpecies === 'all' || personagem.species.toLowerCase() === selectedSpecies.toLowerCase()
            );

            
            renderSlides(personagensFiltrados);
        });

    } catch (error) {
        console.error('Erro ao buscar os personagens:', error);
    }
}

mostrandoPersonagem();
