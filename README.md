<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Netlify Status][netlify-shield]][netlify-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Create Release - Node.js][github-action]][github-action-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/otakuryo/mutiny-music-svelte">
    <img src="z_readme_images/logo_mutiny.png" alt="Logo" width="160" height="80">
  </a>

<h3 align="center">Mutiny Music</h3>

  <p align="center">
    Music Web player, compatible with subsonic api web client, suport gonic, navidrone, supysonic.
    <br />
    <a href="https://github.com/otakuryo/mutiny-music-svelte"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://mutynic.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/otakuryo/mutiny-music-svelte/issues">Report Bug</a>
    ·
    <a href="https://github.com/otakuryo/mutiny-music-svelte/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Music Web Player, with `howlerjs` multiple code support (MP3, MPEG, OPUS, OGG, OGA, WAV, AAC, CAF, M4A, MP4, WEBA, WEBM, FLAC), compatible with API subsonic client.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Vite][Vite.js]][Vite-url]
* [![Svelte][Svelte.dev]][Svelte-url]
* [![tailwindcss][tailwindcss.com]][tailwindcss-url]
* [![howler][howler.com]][howler-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites for development

This is an example of how to list things you need to use the software and how to install them.
* with pnpm (can use npm or yarn)
  ```sh
  pnpm install pnpm@latest -g
  ```

### Installation for development

### Local

1. Clone the repo
   ```sh
   git clone https://github.com/otakuryo/mutiny-music-svelte.git
   ```
2. Copy `.env.example` to `.env`
3. Install PNPM packages
   ```sh
   pnpm install
   ```
4. Configure `package.json` ports for `dev` (default 3000)
5. Run dev environment
    ```sh
    pnpm run dev
    ```
6. Open [https://localhost:3000](https://localhost:3000) (on macos use [https://127.0.0.1:3000](https://127.0.0.1:3000))

### Docker

1. Clone the repo
   ```sh
   git clone https://github.com/otakuryo/mutiny-music-svelte.git
   ```
2. Run 
   ```sh
   docker-compose up -d
   ```
3. Open [https://localhost:3000](https://localhost:3000) (on macos use [https://127.0.0.1:3000](https://127.0.0.1:3000))


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### For use with ssl

Can use SSL with docker, for this you need to create a folder called `cert` in the root of the project, and inside it place the files `cert.pem` and `key.pem` (or rename them in the `docker-compose.yml` file).

On macos can use mkcert for create self-signed certificates.

```sh
mkcert -install
cd cert
mkcert -key-file key.pem -cert-file cert.pem localhost
```

| More info [https://stackoverflow.com/questions/73205096/run-sveltekit-dev-with-https](https://stackoverflow.com/questions/73205096/run-sveltekit-dev-with-https)

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Write and detail readme project
- [ ] Custom domain public
- [ ] Clear spanish comments
- [ ] Move SRC folder to LIB folder

See the [open issues](https://github.com/otakuryo/mutiny-music-svelte/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Apache License 2.0. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

<!-- Agustin Mita - [@twitter_handle](https://twitter.com/twitter_handle) -->

Project Link: [https://github.com/otakuryo/mutiny-music-svelte](https://github.com/otakuryo/mutiny-music-svelte)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Nothing](Nothing)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[netlify-shield]: https://api.netlify.com/api/v1/badges/66e93619-a168-4a44-bdf7-3e8ecb1e29de/deploy-status
[netlify-url]: https://app.netlify.com/sites/mutynic/deploys
[contributors-shield]: https://img.shields.io/github/contributors/otakuryo/mutiny-music-svelte.svg?style=for-the-badge
[contributors-url]: https://github.com/otakuryo/mutiny-music-svelte/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/otakuryo/mutiny-music-svelte.svg?style=for-the-badge
[forks-url]: https://github.com/otakuryo/mutiny-music-svelte/network/members
[stars-shield]: https://img.shields.io/github/stars/otakuryo/mutiny-music-svelte.svg?style=for-the-badge
[stars-url]: https://github.com/otakuryo/mutiny-music-svelte/stargazers
[issues-shield]: https://img.shields.io/github/issues/otakuryo/mutiny-music-svelte.svg?style=for-the-badge
[issues-url]: https://github.com/otakuryo/mutiny-music-svelte/issues
[license-shield]: https://img.shields.io/github/license/otakuryo/mutiny-music-svelte.svg?style=for-the-badge
[license-url]: https://github.com/otakuryo/mutiny-music-svelte/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/agustin-mita
[product-screenshot]: z_readme_images/demo.gif
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[tailwindcss.com]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwindcss-url]: https://tailwindcss.com/
[howler.com]: https://img.shields.io/badge/howlerjs-786956.svg?style=for-the-badge&logo=howlerjs&logoColor=white
[howler-url]: https://howlerjs.com/
[Vite.js]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[github-action]: https://github.com/otakuryo/mutiny-music-svelte/actions/workflows/build.js.yml/badge.svg?branch=build%2Fnginx-production
[github-action-url]: https://github.com/otakuryo/mutiny-music-svelte/actions/workflows/build.js.yml