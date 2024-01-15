var box = document.querySelector('#box');

const projects = [
  {
    Image: './images/projects/siteBar.png',
    link: 'https://cabecas-bar.online',
    name: 'Site Do Bar e Restaurante Cabeças Bar',
    description: 'O site foi desenvolvido para que o restaurante Cabeças Bar tenha presença na internet, uma vez que o restaurante não possuía um site anteriormente. O objetivo deste site é fornecer informações sobre o restaurante, incluindo dados de contato, localização e cardápio, para que futuros clientes possam encontrar o restaurante com facilidade.',
  },
  {
    Image: './images/projects/novaLands.png',
    link: 'https://novalands.vercel.app/',
    name: 'Site Nova Lands',
    description: 'O site que eu criei é uma versão aprimorada do site oficial, que apresentava alguns problemas de design responsivo, acessibilidade e internacionalização. Eu me encarreguei de todo o desenvolvimento do site e de todas as melhorias. Agora, o site está mais bonito, funcional e adaptado para diferentes públicos e dispositivos.',
  },
  // {
  //   Image: './images/projects/siteBar.png',
  //   link: 'https://picsum.photos/200/300',
  //   name: 'Project 3',
  //   description: 'This is project 3',
  // },
  // {
  //   Image: './images/projects/siteBar.png',
  //   link: 'https://picsum.photos/200/300',
  //   name: 'Project 4',
  //   description: 'This is project 4',
  // },
];

projects.forEach(project => {
  box.innerHTML += `
    <div class="max-h-[600px] max-w-[800px] rounded p-2 bg-white hover:scale-105">
      <a href="${project.link}" target="_blank">
        <div class="flex flex-col">
          <figure class="h-full m-auto max-h-[250px] max-w-[500px]">
            <img src="${project.Image}" alt="${project.name}" class="w-full h-full bg-cover"/>
          </figure>
          <div class="text-center">
            <span class="text-2xl font-extrabold mb-4">${project.name}</span>
            <p class="indent-8 font-semibold md:text-lg text text-justify">${project.description}</p>
          </div>
        </div>
      </a>
    </div>
  `;
});
