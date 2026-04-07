fetchAndDisplayUsers();

const userCardsContainer = document.getElementById('user-cards');
const paginationContainer = document.getElementById('pagination');

const defaultProfileImage = [
    "_4e04ee6b-823f-4708-9517-5bbe1fecab8e.jpg", "_5d5575ae-ee8b-4d79-b5f4-5494f680e937.jpeg ","_980b1f4e-710e-474b-87a4-ff98d1544a39.jpeg",      
    "_5da1cfb2-76d7-4aa0-955d-baad190c9825.jpg",       "_9ca6f510-11e6-40c0-af98-4e5308971e01.jpeg",
    "_073f4da9-33dc-4cc8-8d12-db77963c8bf1.jpeg",      "_5e1307c6-dea8-4658-bc7f-8ca4e11c8227.jpeg" ,     "_a0d79560-3d22-40d9-abbb-c677f16b1e6b.jpeg",
    "_0a89193a-9c94-43f9-9d2b-d01e67f92aaa.jpeg",      "_5e535aa2-b0f8-4d6c-97da-0ca5ae99ea19.jpeg"  ,    "_abb55139-a908-4bc2-bec2-ee66929fca1e.jpeg",
    "_0f5977b8-4965-448b-9a94-09e3245e878e.jpeg",      "_5eb6b2fa-d841-44d4-89e2-9d8734e0faf9.jpg"    ,   "_b1406e4a-646b-4cb6-aeec-81aba1d61194.jpeg",
    "_1051cf00-1652-4568-9af8-6e744f330b48.jpeg",     "_609ada2b-b9ed-491b-8474-032b14b242eb.jpeg"     , "_b69cd7a8-8100-4b39-bcc7-564dd5781d0d.jpeg",
    "_1380b998-5b49-4899-93a9-b734d5543874.jpeg",     "_62d484ba-dbaa-4d06-b9d7-ae15781f0029.jpeg",      "_b6aa74d0-0c49-483e-99fb-b3f8a4b1dd42.jpg",
    "_1675300c-de3b-4d6d-b0ee-d00daec139b5.jpeg" ,     "_62ec53dc-4727-445b-9a32-f2256bc10254.jpeg",      "_b8826fd8-62f7-4180-a474-c0381934e6ca.jpeg",
    "_194a6927-cf6d-4883-9349-1892ca9848b1.jpeg"  ,    "_642059e2-fba8-4f4a-95c5-c9786ca0d394.jpg"  ,     "_bfa17642-0a3a-4ff1-bb9b-58d90df2a00d.jpg",
    "_1ae45778-864f-4731-86ba-a8080170b5d0.jpeg"   ,   "_65ce0860-bb49-4972-a519-b47f4a7125b9.jpeg"  ,    "_c2406b4f-3a3d-4054-a4cc-0e194896f277.jpg",
    "_2254933d-2bae-4ec5-942c-15c71fea4d6b.jpeg"    ,  "_6b43ad9c-3ee4-485a-ab59-d15bca371090.jpeg"   ,   "_c907c0d3-b9b9-4227-a526-138b16cd64a3.jpg",
    "_23987cf0-c55a-439c-a203-26a379502ff5.jpeg"     , "_6c49a4a1-7267-483a-966f-e85ad91fe83a.jpeg",     "_c9dd38d5-b70a-4aaa-a5f4-4622d2d1c934.jpeg",
    "_27e43318-c388-4bb9-97a9-51dc56008f80.jpeg",      "_6cce718d-bb98-4763-89ea-2d8f0f0815f3.jpeg" ,     "_cef42939-4b8d-46c7-b5e4-8d36e94c8fb4.jpg",
    "_2c564bb4-3f55-4567-8294-b2ce8e8e477a.jpg"  ,     "_7082b548-f04f-4f70-ae3c-ba7798767472.jpg"   ,    "_d486a17b-dbfd-4029-978a-0c1c05a0d1b7.jpeg",
    "_2e68057b-7e09-422a-82b8-3cc98d1ad10d.jpg"   ,    "_75e578ba-9f49-4948-a89d-1550e89c8160.jpeg"   ,   "_d6e9d6f6-2a75-445b-b331-5f0b1b897659.jpg",
    "_300abdfd-aa1e-4af3-b938-59c43e4bbc7c.jpg"    ,   "_774ec150-d990-4aa3-8972-674833db8544.jpeg",      "_dacede14-be6c-48bb-85f5-9f51da1926d5.jpeg",
    "_318fc6a8-3278-44fc-bba2-b31b6cbf1e5a.jpeg"    ,  "_790a94f3-427e-44fd-9198-d3874e48efab.jpeg" ,     "_e329e94d-5085-4f9f-99ae-9f698575e798.jpg",
    "_3602adcf-4258-484d-9bd2-e9ea7157bd97.jpg" ,      "_7adc4481-cefa-4037-8d22-693579ea978f.jpg"   ,    "_eb152da8-b54b-4d6c-88bd-33f0ab2c1bb1.jpeg",
    "_3627fb74-c3a7-40fd-9f71-d9df1d662d08.jpeg" ,    "_7e5c7a33-e8d3-4db4-87df-e7cdd269dd33.jpeg"    ,  "_f6814e18-a338-4ab7-baef-fe1e07607f82.jpg",
    "_3d6bd8b1-0904-4041-9688-451cdc457967.jpeg"  ,    "_7ef1458f-1775-4730-9c3f-bc57920ac80e.jpeg",      "_f758529f-75c1-41b9-9772-913cd45dafe9.jpeg",
    "_471d5ca7-cca8-4b06-81ce-3934aa1ebdab.jpeg"   ,   "_8049f7cb-2dfc-4117-8b89-df0f028e22a3.jpeg" ,     "_f8064763-5ff6-4700-9627-47bb748c2ba8.jpg",
    "_4e04ee6b-823f-4708-9517-5bbe1fecab8e.jpg"     ,  "_83fae5c3-f074-4544-a71e-5c9eb85e9989.jpeg"  ,    "_f9d12534-c6b5-4efa-a4b9-e1e5b6c447b7.jpeg",
    "_4f4cbb91-bc9d-4a16-bddd-deb2923c38bf.jpg" ,      "_8b7b72ed-5e6f-4eee-b386-2aca3aa58de8.jpg"    ,  "_ff428b57-f497-4cbe-8c71-142991dc73f5.jpeg",
    "_58bc2e9a-d366-4448-93ce-4110af5bca16.jpeg" ,     "_91c9d2ec-d2ed-4ca1-8947-e7cce34b3828.jpeg",     
    "_5bf20204-cce9-4277-b12c-e34760768049.jpg"   ,    "_9586b2f3-4200-43cc-9cbb-4e37feedaf72.jpeg",
    "_5cfbc706-470b-48de-a167-8722c8fd9dbc.jpeg"   ,   "_964b03df-78a0-47af-902e-969420db5540.jpeg"


];
const backgroundImages = [
    "https://images.pexels.com/photos/2781760/pexels-photo-2781760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg",
    "https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/459203/pexels-photo-459203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1643403/pexels-photo-1643403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2834219/pexels-photo-2834219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2582905/pexels-photo-2582905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/8093445/pexels-photo-8093445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1548111/pexels-photo-1548111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2693036/pexels-photo-2693036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4067727/pexels-photo-4067727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2203062/pexels-photo-2203062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2837572/pexels-photo-2837572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/8986019/pexels-photo-8986019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/46178/teddy-bear-bear-children-toys-forest-46178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2860705/pexels-photo-2860705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1322444/pexels-photo-1322444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/7723276/pexels-photo-7723276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3509971/pexels-photo-3509971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

const usersPerPage = 10;
let currentPage = 1;
let users = [];

async function fetchAndDisplayUsers() {
    try {
        let response = await fetch('/getplatformusers'); // Ajuste o endpoint conforme necessário
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários: ' + response.statusText);
        }

        // Atualiza os dados dos usuários conforme o novo JSON
        users = await response.json();

        // Ordena os usuários com base no selo de verificação
        users.sort((a, b) => {
            const priorityOrder = { 'golden': 1, 'blue': 2, 'none': 3 };
            return priorityOrder[a.verification_seal || 'none'] - priorityOrder[b.verification_seal || 'none'];
        });

        displayUsers();
        setupPagination();
    } catch (error) {
        console.error('Erro:', error);
    }
}


function displayUsers() {
    const userCardsContainer = document.getElementById('user-cards');
    userCardsContainer.innerHTML = ''; // Limpa qualquer conteúdo existente

    let startIndex = (currentPage - 1) * usersPerPage;
    let endIndex = startIndex + usersPerPage;
    let paginatedUsers = users.slice(startIndex, endIndex);

    paginatedUsers.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundImage = `url(${user.background_image_url && user.background_image_url !== "/" 
            ? user.background_image_url 
            : getRandomBackgroundImage()})`;
        card.style.backgroundColor = user.background_color || '#ffffff';
        card.style.color = user.text_color || '#000000';
        card.style.fontFamily = user.font_family || 'Arial, sans-serif';
        card.style.fontStyle = user.font_style || 'normal';
        card.style.fontWeight = user.font_weight || '400';

        const profileImage = document.createElement('img');
        profileImage.src = user.profile_image_url && user.profile_image_url !== "/"
            ? user.profile_image_url
            : `public/images/profile/${getRandomProfileImage()}`;
        profileImage.alt = `${user.user_name} Profile Image`;
        profileImage.className = 'profile-img';

        const userName = document.createElement('h2');
        userName.textContent = user.user_name;

        // Criação do selo de verificação
        const verificationSeal = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        verificationSeal.setAttribute("width", "24");
        verificationSeal.setAttribute("height", "24");
        verificationSeal.setAttribute("viewBox", "0 0 24 24");
        verificationSeal.setAttribute("class", "verified-badge");

        let sealColor;
        switch (user.verification_seal) {
            case 'golden':
                sealColor = '#FFD700';
                break;
            case 'blue':
                sealColor = '#1DA1F2';
                break;
            case 'green':
                sealColor = '#0cba2f';
                break;
            default:
                sealColor = '#ccc';
        }

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "12");
        circle.setAttribute("cy", "12");
        circle.setAttribute("r", "10");
        circle.setAttribute("fill", sealColor);

        const check = document.createElementNS("http://www.w3.org/2000/svg", "path");
        check.setAttribute("d", "M9 12l2 2 4-4");
        check.setAttribute("stroke", "#fff");
        check.setAttribute("stroke-width", "2");
        check.setAttribute("fill", "none");
        check.setAttribute("stroke-linecap", "round");
        check.setAttribute("stroke-linejoin", "round");

        verificationSeal.appendChild(circle);
        verificationSeal.appendChild(check);

        const userDetails = document.createElement('div');
        userDetails.className = 'user-details';

        userDetails.appendChild(profileImage);
        userDetails.appendChild(userName);

        if (user.verification_seal && user.verification_seal !== 'none') {
            userDetails.appendChild(verificationSeal);
        }

        card.appendChild(userDetails);
        userCardsContainer.appendChild(card);
    });
}




// Copie as listas originais de imagens
let availableProfileImages = [...defaultProfileImage];
let availableBackgroundImages = [...backgroundImages];

function getRandomProfileImage() {
    if (availableProfileImages.length === 0) {
        // Reinicia a lista quando todas as imagens foram usadas
        availableProfileImages = [...defaultProfileImage];
    }
    // Seleciona um índice aleatório
    const index = Math.floor(Math.random() * availableProfileImages.length);
    // Remove a imagem da lista para evitar repetição
    const image = availableProfileImages.splice(index, 1)[0];
    return image;
}

function getRandomBackgroundImage() {
    if (availableBackgroundImages.length === 0) {
        // Reinicia a lista quando todas as imagens foram usadas
        availableBackgroundImages = [...backgroundImages];
    }
    // Seleciona um índice aleatório
    const index = Math.floor(Math.random() * availableBackgroundImages.length);
    // Remove a imagem da lista para evitar repetição
    const image = availableBackgroundImages.splice(index, 1)[0];
    return image;
}



function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    let totalPages = Math.ceil(users.length / usersPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#';
        a.textContent = i;
        a.onclick = (e) => {
            e.preventDefault();
            currentPage = i;
            displayUsers();
            setupPagination();
        };
        li.appendChild(a);
        pagination.appendChild(li);
    }
}

window.onload = fetchAndDisplayUsers;
