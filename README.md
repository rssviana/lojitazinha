# Lojitazinha

Uma loja fake de produtos fakes apenas para aprender desenvolvimento front-end com as novas ferramentas do mercado

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# API

Utilizamos o json-server para criar uma api local, além disso se quiser criar items diferentes, sinta-se a vontade para manipular o código de 'generateItems.js'. Precisamos das seguintes dependencias para rodar: 

Caso queira rodar o generateItems, precisamos ter o uuid instalado;

```shell
 $: cd api/
```

```shell
 $: npm install json-server --save-dev
 $: npm install uuid --save-dev
```

Para rodar:

```shell
 $: node generateItems.js
```

Por consequencia, teremos de saída um arquivo chamado 'items.json', copie o array que esta dentro dele e cole em db.json dentro de uma propriedade

Agora para rodar-mos a api de fato, temos que ter o json-server, para isso temos que rodar os seguintes comandos:

```shell
 $: npm install 
```

```shell
 $: npm start
```

Para testar utilize o seguinte comando:

```shell

curl --location 'http://localhost:9000/products?_page=1&_limit=10'

```