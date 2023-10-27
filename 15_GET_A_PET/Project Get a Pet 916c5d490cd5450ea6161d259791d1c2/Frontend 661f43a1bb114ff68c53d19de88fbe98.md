# Frontend

### Configurações/instalações iniciais do projeto

O projeto do front será feito em React, então precisamos criar a nossa aplicação do **React**, para isso precisaremos executar um comando, ele irá executará o pacote do React criando a aplicação React.

`npx create-react-app .`

Então temos a aplicação React criada.

![Untitled](Frontend%20661f43a1bb114ff68c53d19de88fbe98/Untitled.png)

Também precisaremos instalar mais alguns pacotes, segue os commands:

`npm install axios events react-icons react-router-dom`

O axios será para o fazer consumo da nossa api,  o events para envio das mensagem entre components, react-icons para se houver a necessidade de uso de algum icone e o react-router-dom nos dará as funções do roteamento das páginas do React.

Também criaremos um **dotEnv** para armazenar a URL da API pois ela sempre será a mesma, então armazenaremos em um variável, se posteriormente for necessário mudar a URL, apenas precisaremos alterar no dotEnv.

![Untitled](Frontend%20661f43a1bb114ff68c53d19de88fbe98/Untitled%201.png)

```jsx
// ./.env.local

REACT_APP_API:'http://localhost:5000/'
```

### Estruturando o projeto

Depois da instalação do **React**, precisamos limpar um pouco os arquivos padrões do pacote e deixa apenas o que iremos precisar, após a limpeza ficaremos apenas com os seguintes estrutura:

![Untitled](Frontend%20661f43a1bb114ff68c53d19de88fbe98/Untitled%202.png)

Também faremos uma limpeza dentro do arquivos, removendo as importações dos arquivos que removemos e também uma limpeza o **App.js** deixando-o pronto para ser utilizado.

```jsx
// ./src/App.js

function App() {
  return (
    <div className="App">
      <h1>Get A Pet</h1>
    </div>
  );
}

export default App;
```

Agora sim partiremos para a estruturação, iniciaremos criando a pasta **assets** onde ficará as imagens que serão utilizadas no projeto.

Criaremos também a pasta **components** onde ficaram armazenados os components do React que poderam ser reutilizáveis dentro do projeto.

Criaremos a pasta **context**, onde ficaram armazenados os contextos que também é um recurso do React onde será armazenadas algumas variáveis dentro destes contextos e é possível determinar no código onde tais variáveis irão ser utilizadas.

Também teremos uma pasta para **hooks** que é um recurso mais recente do React que nós dará umas ferramentas a mais principalmente na criação de flash messages.

E por fim criaremos a pasta **utils** que se assemelha bastante a os nosso helpers, nela ficará armazenadas algumas funções que nos ajudaram em algumas partes do código.

Então teremos a seguinte estrutura:

![Untitled](Frontend%20661f43a1bb114ff68c53d19de88fbe98/Untitled%203.png)

# LEMBETE SOBRE ATUALIZAÇÃO DO REACT DOM V6

**<Switch> passa a ser o <Routes>**

**useHistory() passa a ser useNavigate()**

**history.push(’/pets/mypets’) passa a ser apenas navigate(’/pets/mypets’)**

**O login e outros são alterado**

![Untitled](Frontend%20661f43a1bb114ff68c53d19de88fbe98/Untitled%204.png)

**e passão para dentro de uma prop:** 

![Untitled](Frontend%20661f43a1bb114ff68c53d19de88fbe98/Untitled%205.png)

# 

### Inserção do React Router no projeto

Damos inicio a criação do roteamento do projeto, então precisaremos importar alguns componentes do react-router-dom.

E iniciamos a criação do nosso roteamento cada rota(path) ficará responsável por renderizar um componente, a nossa estrutura ficará da seguinte forma, onde o path será as nossa rotas e o element o componente a ser renderizado.

```jsx
// ./src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

Segue um exemplo do componente de login:

```jsx
// ./src/components/pages/Auth/Login.js

const Login = () => {
  return (
    <section>
        <h1>Login</h1>
    </section>
  )
}

export default Login;
```

### Estruturando a NavBar e o Footer

Iremos trabalhar de inicio na navbar e no footer que serão componentes estáticos da nossa página, diferente das pages, eles ficaram fora do Rotes fazendo com que eles fiquem visíveis independente da pages em que for renderizada, eles passão a ser componentes fixo da página, semelhante ao layout do handlebars. A criação deles é semelhantes aos outros componentes, criamos eles e fazemos a importação no App.js.

```jsx
// ./src/App.js

...
function App() {
  return (
    <BrowserRouter>
      **<Navbar />**
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/' element={<Home />} />
        </Routes>
      **<Footer />**
    </BrowserRouter>
  );
}
...
```

Agora focaremos na criação da navbar, e como em toda navbar precisaremos criar o menu de navegação, então precisaremos fazer uso de um tag ancora, no React Router utilizamos o componente Link, ele terá a mesma função de uma tag ancora do html, onde passaremos a rota na prop “to” e também fazemos a importação da logo, utilizamos ela como um variável na tag img.

```jsx
// ./src/components/layout/Navbar.js

import { Link } from "react-router-dom";

import Logo from '../../assets/img/logo.png'

const Navbar = () => {
  return (
    <nav>
        <div>
            <img src={Logo} alt="Get A Pet" />
            <h2>Get A Pet</h2>
        </div>
        <ul>
            <li>
                <Link to="/">Adotar</Link>
            </li>
            <li>
                <Link to="/login">Entrar</Link>
            </li>
            <li>
                <Link to="/register">Cadastrar</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;
```

O footer é ainda mais simples, teremos apenas a tag footer para manter a semântica e um tag p com a class bold.

```jsx
const Footer = () => {
  return (
    <footer>
        <p><span className="bold">Get A Pet</span>  &copy; 2023</p>
    </footer>
  )
}

export default Footer;
```

### Estilização com CSS Modules

Para utilizar o CSS modules é muito simples, criamos um css a nivel do componente com o .module.css.

![Untitled](Frontend%20661f43a1bb114ff68c53d19de88fbe98/Untitled%206.png)

E fazemos a importação no nosso componente importando como styles e utilizamos como variável chamando a classe css.

```jsx
// ./css/components/layout/Navbar.js

...
import styles from './Navbar.module.css';
...
<nav className={**styles.navbar**}>
<div className={styles.navbar_logo}>
      <img src={Logo} alt="Get A Pet" />
      <h2>Get A Pet</h2>
</div>
...
</nav>

```

### Criando componente de container

Este componente será responsável por ser envolver as nossas pages, a criação dele será semelhante aos outros componentes, criamos o arquivo principal do componente e o seu ccs module na pasta de layouts.

![Untitled](Frontend%20661f43a1bb114ff68c53d19de88fbe98/Untitled%207.png)

Fazemos a importação e uso dele no App.js envolvendo as peges do Routes.

```jsx
// ./src/App.js

...
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      **<Container>**
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/' element={<Home />} />
          </Routes>
      **</Container>**
      <Footer />
    </BrowserRouter>
  );
}
...
```

E o componente em si é bem básico, ele será o nosso main, mantendo o nosso html semântico, e também adicionamos a className passando no nosso css module, porém ele passa a não renderizar as nossas pages, pois precisamos sinalizar ao react que os componentes filhos serão posicionados  dentro do nosso container, então importamos uma props chamas children e informar aonde ela irá ser posicionada ele precisa entender onde especificamente as nossa pages irão ficar possicionadas.

```jsx
// ./src/components/layout/Container.js

import styles from './Container.module.css';

const Container = ({ **children** }) => {
  return (
    <main className={styles.container}>
				{ **children** }
    </main>
  )
}

export default Container;
```

### Criando a página e o formulário de registro

O formulário que utilizaremos na página de registro também será reutilizado no nosso código, então para fazer esse reaproveitamento vamos criar um componente para o formulário de input, as alterações que ele sofrerá de acordo com página será feita através de dados dinâmicos, então de acordo com a página que ele será renderizado ele terá informações diferentes e desta forma poderemos reaproveitar este componente. Então vamos cria-lo!

![Untitled](Frontend%20661f43a1bb114ff68c53d19de88fbe98/Untitled%208.png)

Como este componente receberá dados dinâmicos, precisaremos fazer a importação destes dados através de props e preenchemos os dados nas nossa tags.

```jsx
// ./src/components/form/Input.js

import styles from './Input.module.css';

const Input = ({type, text, name, placeholder, handleOnChange, value, multiple}) => {
  return (
    <div className ={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <input type={type} name={name} id={name} placeholder={placeholder} onChange={handleOnChange} value={value} {...(multiple ? {multiple} : '')} />
    </div>
  )
}

export default Input;
```

Também criaremos um css module para a estrutura do formulário, o module anterior está vinculado apenas ao input. Em todos as pages com formulários nos apenas precisaremos importar o css e utilizar na className como styles.form_container como utilizado no Register.

![Untitled](Frontend%20661f43a1bb114ff68c53d19de88fbe98/Untitled%209.png)

Com o auxilio do componente Input, a criação do formulário fica mais simples, precisamos apenas chamar o componente e definir os valores que queremos em cada uma das props. Obs: A função handleOnChange ainda não foi criada, só foi feita a estrutura inicial para remover os erros pois na prop do input nos estamos chamando ela entra chaves, isso significa que estamos executando-a, então criamos uma estrutura sem função inicial apenas para remoção dos erros.

```jsx
// ./src/components/page/Auth/Register.js

import Input from "../../form/Input";
import { Link } from "react-router-dom";

import styles from "../../form/Form.module.css";

const Register = () => {

  function handleOnChange(e) {

  }

  return (
    <section className={styles.form_container}>
        <h1>Registrar</h1>
        <form>
          <Input text="Nome" type='text' name='name' placeholder='Digite o seu nome' handleOnChange={handleOnChange} />
          <Input text="Telefone" type='text' name='phone' placeholder='Digite o seu telefone' handleOnChange={handleOnChange} />
          <Input text="E-mail" type='email' name='email' placeholder='Digite o seu e-mail' handleOnChange={handleOnChange} />
          <Input text="Senha" type='password' name='password' placeholder='Digite a sua senha' handleOnChange={handleOnChange} />
          <Input text="Confirmação de senha" type='password' name='confirmpassword' placeholder='Confirme a sua senha' handleOnChange={handleOnChange} />
          <input type="submit" value="Cadastrar" />
        </form>
        <p>
          Já tem conta? <Link to="/login">Clique aqui.</Link>
        </p>
    </section>
  )
}

export default Register;
```

### Criando o objeto de usuário

Para conseguimos fazer o registro de um usuário no banco precisaremos cria um objeto, onde ficaram armazenados os dados que irão para nossa API onde ela executará a operação de registro utilizando o método register no UserController, para criação deste objeto utilizaremos um hook do React, o useState nele faremos um destructuring e temos nossa variável name e a função que irá mudar o estado desta variável o setName, com isso fazemos uso da função handleOnChange onde ela irá capturar toda mudança feita nos inputs através do evento e trazendo eles atraves do value do target e fazendo a atualização do estado através do useState fazendo assim a criação do nosso objeto que será enviado para o nosso backend, também precisaremos da função handleSubmit que será responsável pelo envio destes dados, fazemos uso do preventDefault do evento de submit para previnir o recarregamento da página no momento de envia do form.

```jsx
// ./src/components/pages/Auth/Register.js

...
const [ user, setUser ] = useState({});

  function handleOnChange(e) {

    setUser({...user, [e.target.name]: e.target.value})

  }

  function handleSubmit(e) {

    e.preventDefault();

    // send user for the db
  

  }
...
```

Também será necessário fazer algumas operações antes de realmente enviar os dados para o back e criar o usuário no banco. Como queremos que no momento do registro o usuário já saia autenticado precisamos fazer essas operações, e para isso precisaremos criar nosso primeiro hook, o useAuth que fará a operação de autenticação. No hook utilizaremos o axios para fazer o consumo da nossa API mas antes precisaremos fazer uma configuração simples no axios, para isso criaremos uma utils que fará essa configuração, nela importamos o axios e passamos a URL base da nossa API.

 

```jsx
// ./src/utils/api.js

import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000'
})
```

Então partimos para o hook, iniciamos com o import da nossa api e também já importaremos alguns hook que iremos utilizar como o useState e o useEffect do React e também o hook useNavigate do React Router Dom. Em seguida já criamos e exportamos a função useAuth, e também criamos o primeiro método, o register onde passaremos como argumento o user que criamos com o useState no Register e então fazemos um try/catch fazendo um solicitação na api de post na rota de registro de usuários passando o user e então fazemos uso do then retornando o que recebemos de resposta para uma constante data. Então retornamos o nosso método na função e então damos inicio ao hook, ele ainda vai ser trabalhado pois serão adicionadas mais funções mas para agora tem o suficiente para o que precisamos no momento.

```jsx
// ./src/hooks/useAuth.js

import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {

    async function register(user) {

        try {

            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            console.log(data)

        } catch (err) {

           console.log(err)

        }

        return { register }
    }

}
```

### Criando o contexto de usuário

Então partimos para a criação do nosso primeiro contexto, a função dele é fornecer dados apenas onde especificarmos no código, no “contexto” em que ele está inserido. Para criarmos precisaremos importar o método createContext do react e também importaremos o no hook useAuth pois ele que será passado pelo contexto. Dando inicia a criação executamos o createContext fazendo a criação do contexto, em seguida precisamos criar um provedor do contexto neste caso criaremos o UserProvider pois será ele que passará o contexto para as outra entidades e passaremos para ele com argumento a prop children que onde definiremos o que ele irá envolver. Dentro do provedor desestruturamos o nosso hook para utilizarmos as funções que existem nele, neste momento temos apenas o register e com isso iremos prover o contexto através do Context fazendo acesso ao Provider, ele funcionará como uma tag HTML fazendo o encapsulamento do children o tornando o nosso contexto, então o que especificarmos no children passa a receber os dados que passamos pela prop value, que nesta situação será o  método register. Lembrando de exportar o Context e o UserProvider.

 

```jsx
// ./src/context/UserContext.js

import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {

    const { register } = useAuth();

    return (
        <Context.Provider value={{register}}>
            { children }
        </Context.Provider>
    )

}

export { Context, UserProvider };
```

O contexto ainda não funciona pois não definimos onde ele irá atuar, então precisamos inserir o contexto onde precisamos, que neste caso será no App.js. Então precisamos fazer a importação o Provider e então envolvemos onde queremos o contexto seja inserido, neste caso em praticamente todos os componentes após o BrowserRouter.

```jsx
// ./src/App.js

...
// context
import { **UserProvider** } from './context/UserContext';

function App() {
  return (
    <BrowserRouter>
      **<UserProvider>**
        <Navbar />
        <Container>
          <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/' element={<Home />} />
            </Routes>
        </Container>
        <Footer />
      **</UserProvider>**  
    </BrowserRouter>
  );
}

```

### Executando a rota da API no formulário

Bom, depois de definirmos o contexto podemos fazer uso do nosso método la no Register, só que para isso ainda precisaremos importar Context que exportamos la no nosso hook, pois só assim conseguiremos fazer uso dos dados que inserimos context. Porém para fazer uso deste contexto precisamos de um hook de react, o useContext nele poderemos passar o Context e agora sim, conseguimos fazer uso do nosso método register. E por fim executamos o método passando o user como argumento e então teremos a função de registro de usuário sendo acionado pelo formulário.

```jsx
// ./src/components/pages/Auth/Register.js

...
import { useState, useContext } from "react";
...
...
// contexts
import { Context } from '../../../context/UserContext'

const Register = () => {

  const [ user, setUser ] = useState({});
  const { **register** } = useContext(Context);

  function handleOnChange(e) {

    setUser({...user, [e.target.name]: e.target.value})

  }

  function handleSubmit(e) {

    e.preventDefault();

    // send user for the db
    **register**(user)

  }
...
```

### Criando o hook de flash message

Para criarmos o nosso recurso de flash message iremos criar um hook, também vamos usar o event bus que instalamos nos nosso módulos, ele consegue disparar eventos para componentes de uma maneira mais simples, então criaremos um utils bem simples onde faremos a importação do EventEmitter, fazendo a exportação junto da invocação dele.

```jsx
// ./src/utils/bus.js

import EventEmitter from 'events';
export default new EventEmitter();
```

Então fazemos a importação do bus no nosso hook e então criamos o hook já fazendo a exportação dele, e no hook criaremos a função onde faremos as definições de emissão através do bus event que importamos, nela passamos com arg o nome do evento neste caso flash e também passamos como segundo argumento um object onde terá os parâmetros da mensagem e o tipo da mensagem que viram do argumento da função. Então retornamos a função através de um destructuring, com isso conseguimos sempre reutilizar este hook quando precisarmos de uma mensagem flash e como podemos definir o tipo, conseguiremos personalizar os componentes de acordo com a função da mensagem, como por exemplo uma mensagem de erro, que passaríamos na cor vermelha, evidenciando o erro. Essa função de emissão server para ativar um componente que a principio estaria oculto, se tornando visível quando necessário.

```jsx
// ./src/hooks/useFlashMessage.js

import bus from '../utils/bus';

export default function useFlashMessage() {

    function setFlashMessage(msg, type) {

        bus.emit('flash', {
            message: msg,
            type: type,
        })

    }

    return { setFlashMessage }
}
```

### Criando componente de mensagem

E então partimos para criação do componente das flash messages, será este componente que será ativo no momento que o evento de flash for emitido. Este componente terá uma parte visual e também terá uma parte funcional, que neste caso é de exibição que terá interação com a emissão o evento. Para a etapa visual faremos apenas a importação da nossa estilização, já para a funcional, faremos uso do useState pois ele será responsável pela mudança de estado da nossa mensagem e do tipo. O tipo da mensagem que recebemos será a definição de um class css que criaremos, então dependo do tipo de mensagem que queremos exibir utilizaremos a classe do css para definir as configurações de estilo, então precisamos passar o type atravéss do className e para isso fazemos uso o template string, que permitirá o uso de variáveis dentro das strings.

```jsx
// ./src/components/layout/Message.js

import { useState } from 'react';

import styles from './Message.module.css'

const Message = () => {

    const [ type, setType ] = useState('');

  return (
    <div className={`${styles.message} ${styles[type]}`}>Minha mensagem</div>
  )
}

export default Message;
```

Para que o nosso componente fique visível nas nossa pages, precisamos definir o componente no App.js. Fazemos a importação do mesmo e definimos onde ele ficará dentro da nossa estrutura, neste caso entre o Container e a Navbar.

```jsx
// ./src/App.js

...
import Message from './components/layout/Message';
...

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        **<Message />**
        <Container>
          <Routes>
```

Agora partiremos para a funcionalidade da nossa flash message. Primeiro criaremos a funcionalidade de visibilidade da mensagem que também usaremos o state para isso que inicialmente terá como estado inicial um false. Precisaremos criar um condicional que fará com que a mensagem aparece/desaparece de acordo com o estado da minha variável(true/false). Também já fazemos a adição da nossa message fazendo uso o useState e passamos para a nossa div. Para fazer com que as nossas variáveis tenha a mudança de estado precisamos  da emissão do nosso event e também um forma de monitorar esse emit para isso utilizaremos o hook useEffect pois ele permite a observação o evento apenas um vez quando componente for renderizado, pois toda vez que há a mudança de estado o componente é renderizado, isso criaria um loop pois toda vez com que acontece-se um renderização seria provocado um mudança de estado levando novamente a uma renderização e assim por diante gerando este loop, com o useEffect isso só acontece uma única vez evitando o loop. No useEffect nos precisamos passar um lista de dependências que será o que vai ser observado, neste caso deixaremos vazia, e quando isso ocorre ele observará todos os os evento que ocorreram dentro do useEffect, na nossa sitação, observaremos o bus event, então precisamos da importação do mesmo. Então adicionaremos o monitoramento do evento “flash” no bus através do addListener, se este evento for acionado executaremos a callback onde passaremos como argumento um object contendo a message e o type e executando as mudanças de estados, também adicionamos um setTimeOut pra fazer com que a mensagem suma depois de um tempo determinado.

```jsx
// ./src/components/layout/Message.js

import { useEffect, useState } from 'react';
import bus from '../../utils/bus'

import styles from './Message.module.css'

const Message = () => {

    const [ visibility, setVisibility ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ type, setType ] = useState('');

    useEffect(() => {

        bus.addListener('flash', ({message, type}) => {

            setVisibility(true);
            setMessage(message);
            setType(type);

            setTimeout(() => {
                setVisibility(false);
            }, 3000)

        })

    }, [])

  return (
    visibility && (
        <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  )
}

export default Message;
```

Agora precisaremos que o evento seja disparado na autenticação. Primeiro importaremos o hook da flash message, em seguida faço a criação das mensagem e do type da mensagem que será passada quando a função de registro for acionada, se o registro for efetuado com sucesso e se acontecer algum error. Na mensagem de erro ela virá de acordo com o tratamento de erro do catch. E por fim fazemos a execução  da função de flash message fazendo o envio das mensagem que serão exibidas de acordo com o que ocorrer no nosso registro, para utilizar a função setFlashMessage fazemos uma simples destructuring no useFlashMessage, precisamos fazer isso fora da nossa função register.

```jsx
// ./src/hooks/useAuth.js

import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from './useFlashMessage';

export default function useAuth() {

    const { setFlashMessage } = useFlashMessage();

    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!';
        let type = 'success'

        try {

            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            console.log(data)

        } catch (err) {
            msgText = err.response.data.message;
            type = 'error'
        }

        setFlashMessage(msgText, type);
    }

    return { register }

}
```

### Autenticando um usuário cadastrado

Quando um usuário faz um cadastro no sistema é interessante manter esse usuário já logado e autenticado, fazendo com que ele não tenho a necessidade de efetuar o login depois de se cadastrar. Para fazer esta autenticação iremos criar uma função no nosso hook useAuth onde ela receberá os dados de autenticação do usuário, também precisaremos criar um state que indicará para o front se o usuário está ou não autenticado ele receberá um valor inicial de false e quando a função authUser tiver sua execução o valor será alterado para true, outra coisa que precisaremos fazer é armazenar o token no localStorage, pois ele servirá para verificar as autenticações, isso será feito através do método setItem do localStorage e logo após faremos uso de mais um hook do react o useNavigate, ele serve para fazer um redirecionamento de rotas, então quando o usuário efetuar o cadastro ele já sairá autenticado e será redirecionado para a page home. Depois da criação do authUser, apenas inserimos no nosso register passando com argumento o data que nada mais é do que os dados que vem da resposta de sucesso da nossa requisição de registro.

```jsx
// ./src/hooks/useAuth.js

...
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
...
export default function useAuth() {

    **const [ authenticated, setAuthenticated ] = useState(false);**
		 ...
    **const navigate = useNavigate();**

    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!';
        let type = 'success'

        try {

            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            await **authUser(data)**;

        } catch (err) {
            msgText = err.response.data.message;
            type = 'error'
        }

        setFlashMessage(msgText, type);
    }

    **async function authUser(data) {

        setAuthenticated(true);

        localStorage.setItem('token', JSON.stringify(data.token))

        navigate('/');

    }**

    return { **authenticated,** register }

}
```

Seguindo, precisamos enviar para o nosso contexto a nossa variável  authenticated do state, pois será com ela que faremos as alterações no front quando o usuário está autenticado ou não. Então precisamos retorna-lo no código acima e no contexto recebemos ele através do destructuring e enviaremos essa variável pelo value do context.

```jsx
// ./src/context/UserContext.js

...
function UserProvider({ children }) {

    const { **authenticated**, register } = useAuth();

    return (
        <Context.Provider value={{ **authenticated**,  register }}>
            { children }
        </Context.Provider>
    )

}
...
```

Outra coisa que precisamos fazer é inserir o nosso token diretamente na api, isso de forma automática, através do hook useEffect, pois toda vez que o token for alterado e fará essa inserção na nossa api fazendo com que não precisamos ficar reinserindo o token a todo momento. Para isso buscamos o token anteriormente armazenado no localStorage através do método getItem passando o nome que definimos quando o inserimos, fazemos um verificação para ver so o token chegou. Se tudo certo, inserimos ele no Authorization dos headers igual como era feito no postman nas requisições. Também setamos a autenticação com true.

```jsx
// ./src/hooks/useAuth.js

export default function useAuth() {

...

    useEffect(() => {

        const token = localStorage.getItem('token');

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        }
				setAuthenticated(true)

    })
...
```

### Autenticação no front-end

Agora que temos a autenticação do usuário sendo exportada para o nosso context, conseguimos resgatar na nossa navbar dando a possibilidade de fazer alterações com base nessa autenticação. Então iremos importa no nosso context no componente navbar, para fazer uso do context iremos também importa o useContext e assim conseguindo trazer a nossa variável authenticated. Essa variável será utilizada em uma condicional onde irá validar a autenticação do usuário, mostrando uma coisa se estiver e outra se não estiver neste nosso caso serão os links da navbar. 

```jsx
// ./src/components/layout/Navbar.js

// Context
**import { Context } from '../../context/UserContext'
import { useContext } from "react";**

const Navbar = () => {

    **const { authenticated } = useContext(Context);**

  return (
    <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
            <img src={Logo} alt="Get A Pet" />
            <h2>Get A Pet</h2>
        </div>
        <ul>
            <li>
                <Link to="/">Adotar</Link>
            </li>
            **{authenticated ? (
                <>
                    <p>Logado</p>
                </>  
            ) : (
                <>
                    <li>
                        <Link to="/login">Entrar</Link>
                    </li>
                    <li>
                        <Link to="/register">Cadastrar</Link>
                    </li>
                </>
            )}**
            
        </ul>
    </nav>
  )
}
...
```

### Criando a função de logout

Iremos criar essa função no nosso hook useAuth, é uma função bem simples onde praticamente invertemos os dados de autenticação, primeiro criamos uma mensagem para ser enviada nas flash messages confirmando o logout, em seguida mudamos o estado da autenticação para false, fazemos a remoção do token do localStorage, e setamos a Authorization nos headers para undefined, após apenas fazemos um redirecionamento e informamos na flash message que o logout foi feito com sucesso.

```jsx
// ./src/hooks/useAuth.js

...
function logout () {
        const msgText = 'Logout realizado com sucesso!'
        const msgType = 'success'

        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        navigate('/')

        setFlashMessage(msgText, msgType)
    }

return { authenticated, register, logout }
```

Para fazer uso da função precisamos retorna-la e importamos ela no context fazendo o envio dela para no nosso contexto pelo value do provider

```jsx
// ./src/context/UserContext.js

import useAuth from "../hooks/useAuth";
...

function UserProvider({ children }) {

    const { authenticated, register, **logout** } = useAuth();

    return (
        <Context.Provider value={{ authenticated,  register, **logout** }}>
            { children }
        </Context.Provider>
    )

}
...
```

Agora que temos a função no contexto, precimos apenas puxa-la no nosso componente da navbar e executa-la, criamos um li onde terá um evento de onClick que executará a função de logout.

```jsx
// ./src/components/layout/Navbar.js

const { authenticated, **logout** } = useContext(Context);

...
{authenticated ? (
                <>
                    <li onClick={**logout**}>Sair</li>
                </>  
) : (
                <>
                    <li>
                        <Link to="/login">Entrar</Link>
                    </li>
                    <li>
                        <Link to="/register">Cadastrar</Link>
                    </li>
                </>
)}
...
```

### Criando formulário de login

Para iniciarmos iremos fazer algumas importaçõess no componente de Login como o useState, useContext, o nosso componente de Input, os estilos do form e no Context. Então partiremos para criação do layout do login, começamos a construção do form fazendo uso do componente Input passando todos os dados e também adicionando o evento handleOnChange onde executará a função handleChange que irá capturar os valores que serão utilizados para efetuar o login, então temos a page de login estruturada.

```jsx
// ./src/components/pages/Auth/Login.js

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../form/Input";

import styles from '../../form/Form.module.css';

// context
import { Context } from "../../../context/UserContext";

const Login = () => {

  function handleChange(e) {

  }

  return (
    <section className={styles.form_container}>
        <h1>Login</h1>
        <form>
          <Input text="E-mail" type='email' name='email' placeholder='Digite o seu e-mail' handleOnChange={handleChange} />
          <Input text="Senha" type='password' name='password' placeholder='Digite a sua senha' handleOnChange={handleChange} />
          <input type="submit" value="Entrar" />
        </form>
        <p>
          Não tem conta? <Link to='/register'>Clique aqui.</Link>
        </p>
    </section>
  )
}

export default Login;
```

### Criando a função de login

No useAuth damos inicia a criação da função de login, ela será um função assíncrona pois precisamos requisitar o banco para validar o usuário, essa função é semelhante a função register, apenas mudamos a requisição para a rota de login passando o user e esperamos o token autenticado como resposta e passamos ele pra a função authUser onde fará o armazenamento do token no localStorage e define a autenticação do usuário com true. Para fazer uso da função precisamos importa-la, então fazemos o retorno dela.

```jsx
// ./src/hooks/useAuth.js

async function login (user) {

        let msgText = 'Login realizado com sucesso'
        let msgType = 'success'

        try {

            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            })

            await authUser(data);

        } catch (err) {

            msgText = err.response.data.message;
            msgType = 'error'

        }

        setFlashMessage(msgText, msgType);
...

return { authenticated, register, logout, login }
```

Fazemos o mesmo processo da função anterior, passamos a função para o nosso contexto, fazemos a importação e o enviamos pelo value do provider.

```jsx
// ./src/context/UserContext.js

const { authenticated, register, logout, login } = useAuth();

    return (
        <Context.Provider value={{ authenticated,  register, logout, login }}>
            { children }
        </Context.Provider>
    )
```

Agora partiremos para a page de login onde a função será executada, primeiro criamos um state de usuário para armazenar os dados que vem dos inputs e fazemos isso através do evento handleOnChange que executará uma função que recebe como argumentos os dados do input e passamos para o nosso user através de um spread operator, tendo os dados do usuário no state criamos outra função que será executada através do evento de submit, removemos o redirecionamento da page quando o submit for ativado através do método preventDefault e também executamos a função de login passando os dados do user como argumento, assim, finalizando o processo de login.

```jsx
// ./src/components/page/Auth/Login.js

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../form/Input";

import styles from '../../form/Form.module.css';

// context
import { Context } from "../../../context/UserContext";

const Login = () => {

  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {

    setUser({ ...user, [e.target.name]: e.target.value })

  }

  function handleSubmit(e) {

    e.preventDefault();

    login(user);

  }

  return (
    <section className={styles.form_container}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input text="E-mail" type='email' name='email' placeholder='Digite o seu e-mail' handleOnChange={handleChange} />
          <Input text="Senha" type='password' name='password' placeholder='Digite a sua senha' handleOnChange={handleChange} />
          <input type="submit" value="Entrar" />
        </form>
        <p>
          Não tem conta? <Link to='/register'>Clique aqui.</Link>
        </p>
    </section>
  )
}

export default Login;
```

### Criando a página de perfil do usuário

Então damos inicia a criação da page de profile do usuário, iniciamos pela criação do componente.

```jsx
// ./src/components/pages/User/Profile.js

import styles from './Profile.module.css';

const Profile = () => {
  return (
    <section>
        <h1>Profile</h1>
    </section>
  )
}

export default Profile;
```

Também precisamos criar uma forma do usuário acessar esse componente. No App.js fazemos a importação do componente e adicionamos a rota /profile que nos dá acesso ao nosso componente.

```jsx
// ./src/App.js

...
import Profile from './components/pages/User/Profile';
...
...
		<Routes>
         <Route path='/login' element={<Login />}/>
         <Route path='/register' element={<Register />}/>
         <Route path='/user/profile' element={<Profile />} />
         <Route path='/' element={<Home />} />
		</Routes>
...
```

Depois de definirmos a rota, adicionaremos o acesso a navbar passando o acesso através da rota.

```jsx
// ./src/components/layout/Navbar.js
			
				<>
            <li>
                <Link to='/user/profile'>Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
        </>
```

### Criando o formulário de edição de usuário

Agora patiremos para o formulário de edição, começamos pelas importações necessárias como o componente de Input, estilos e também os hooks useState e o useEffect. Fazemos a criação do form passando os dados para o componente de cada Input e também criamos as funções que serão acionadas pelos eventos de change.

```jsx
// ./src/components/pages/User/Profile.js

import { useState, useEffect } from 'react';

import formStyles from '../../form/Form.module.css';
import styles from './Profile.module.css';

import Input from '../../form/Input'

const Profile = () => {

  const [user, setUser] = useState({});

  function onFileChange(e) {

  }

  function handleChange(e) {

  }

  return (
    <section>
        <div className={styles.profile_header}>
            <h1>Perfil</h1>
            <p>Preview Imagem</p>
        </div>
        <form className={formStyles.form_container}>
          <Input text='Image' type='file' name='image' handleOnChange={onFileChange} />
          <Input text='Nome' type='text' name='name' placeholder='Digite o seu nome' handleOnChange={handleChange} value={user.name || ''} />
          <Input text='E-mail' type='email' name='email' placeholder='Digite o seu email' handleOnChange={handleChange} value={user.email || ''} />
          <Input text='Telefone' type='text' name='phone' placeholder='Digite o seu telefone' handleOnChange={handleChange} value={user.phone || ''} />
          <Input text='Senha' type='password' name='password' placeholder='Digite a sua senha' handleOnChange={handleChange} />
          <Input text='Confirmação de senha' type='password' name='confirmpassword' placeholder='Confirme a sua senha' handleOnChange={handleChange} />
          <input type="submit" value="Editar" />
        </form>
    </section>
  )
}

export default Profile;
```

### Criando o resgate do usuário para preencher o formulário

Para esse resgate precisamos importar a api e também precisaremos do token que podemos resgatar no localStorage e armazenar em um state. Agora partiremos para o useEffect que terá como dependêcia o token,  e ficará responsável pelo resgate do usuário pelo token, para isso fazemos uso do método get da api passando a rota de resgate e um objeto com token onde ficará armazenado no Authorization dentro dos headers lembrando de transforma o token pois ele firá em formato JSON e adicionar o Bearer a string através do template string. E agora para resgatarmos os dados utilizamos um then onde a nossa response será setada no state user através do setUser passando o data que vem da response como argumento.

```jsx
// ./src/components/pages/User/Profile.js

...
const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {

    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
        setUser(response.data)
    })

  }, [token])
...
```

### Executando a atualização do usuário

Anteriormente tinhamos criados duas funções onde eram executadas pelo evento de mudança dos inputs, sendo uma do input de image e a outra dos input de dados do usuário, cada uma dessas funções irá ter como objetivo setar dados do usuário no nosso state user no momento em que algum desses inputs sofrerem alguma alteração pois criaremos outra função que será a função de submit que será executada pelo evento de envio do formulário, ela será assíncrona pois precisaremos aguardar uma requisição ser concluida, nela executamos o preventDefault para remover a atualização quando executamos o submit, também definiremos um tipo de mensagem que será utilizado nas flash messages e como iremos enviar imagens neste form essa função será um pouco mais complexa onde precisaremos trazer o form data através da class e precisamos acessa-lo através do método de objeto keys passando o user como arg e em seguida utilizando um forEach que irá executar em cada uma das keys o método append gerando um objeto preenchido de form data preenchido com os dados do usuário. Em seguida, fazemos a chama da api, passando um patch pois é um atualização na rota de edit passando o id do usuário, também precisamos enviar os dados que acabamos de armazenar no formData e por fim passamos os headers com o Authorization e também preciamos informar que esse formulário contem imagens através do content-type. Agora executamos um then/catch para tratar os erros dessa requisição passando a mensagem de erro para flash message, então precisaremos importar as flashMessages e executa-la passando a mensagem de retorno da nossa requisição e o tipo da mensagem. No then que seria sucesso na requisição, apenas passamos a resposta da requisição.

```jsx
// ./src/components/pages/User/Profile.js

...
function onFileChange(e) {
      setUser({...user, [e.target.name]: e.target.files[0]})
  }

  function handleChange(e) {
      setUser({...user, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e) {
      e.preventDefault();

      let msgType = 'success';

      const formData = new FormData ()

      await Object.keys(user).forEach((key) => {
        formData.append(key, user[key])
      })

      const data = await api.patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {

        return response.data

      }).catch((err) => {

        msgType = 'error';
        return err.response.data

      }) 

      setFlashMessage(data.message, msgType)

  }
...
```

### Executando a atualização da imagem do usuário

Bom agora iremos fazer a atualização do preview da imagem do usuário, para isso criaremos uma condicional que irá mostrar a imagem quando ela for carregada no input e também quando ela for atualizada no sistema, precisamos criar o state de preview através do useState. Para carregarmos a imagem utilizaremos a rota da api, fazendo uso do dotenv para obter a url do server e acessamos as imagens de usuário e buscamos ela user.image.

```jsx
// ./src/components/pages/User/Profile.js

...
const [preview, setPreview] = useState();
...
<div className={styles.profile_header}>
            <h1>Perfil</h1>
            {(user.image || preview) && (
              <img src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.image}`} alt={user.name}/>
            )}
</div>
...
```

### Criando componente de imagem

Bom, este componente ficará responsável pela exibição de imagens com arredondamento, vamos utilizar ele algumas vezes no código, então é interessante criar um componente para isso. Este componente é bem simples, ele irá receber alguns args como o src, alt e width da image e só vamos passar essas config para a tag img e o resto fica com a estilização do css.

```jsx
// ./src/components/layout/RoutedImage.js

import styles from './RoundedImage.module.css'

const RoundedImage = ({src, alt, width}) => {
  return (
    <img className ={`${styles.rounded_image} ${styles[width]}`} src={src} alt={alt} />
  )
}

export default RoundedImage;
```

Para usar este componente na nossa imagem de preview é só importar o componente no Profile e substutuir a tag de image pelo componente. 

```jsx
// ./src/components/pages/User/Profile.js

...
import RoundedImage from '../../layout/RoundedImage';
...
<div className={styles.profile_header}>
            <h1>Perfil</h1>
            {(user.image || preview) && (
              <RoundedImage src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.image}`} alt={user.name} />
            )}
</div>
...
```

### Criando página da lista de pets

Bom, agora partiremos para a criação das páginas de pets, começaremos pela criação da página onde ficará os pets do usuário, essa é um etapa que já conhecemos, precisamos criar o componente e adiconar as rotas, vamos lá. Começaremos pelo componente, faremos a importação de alguns hooks e do Link e desenvolvemos já a estrutura da nossa página.

```jsx
// ./src/components/pages/Pet/MyPets.js

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import styles from './MyPets.module.css';

const MyPets = () => {
  const [ pets, setPets ] = useState([])

  return (
    <section>
      <div>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div>
        {pets.length > 0 && (
          <p>Meus Pets cadastrados</p>
        )}
        {pets.length === 0 && (
          <p>Não há Pets cadastrados</p>
        )}
      </div>
    </section>
  )
}

export default MyPets;
```

Agora iremos para a adição da rota para o componente, fazemos a importação e criamos a rota.

```jsx
// ./src/App.js

...
import **MyPets** from './components/pages/Pet/MyPets';
...
<Routes>
  <Route path='/login' element={<Login />}/>
  <Route path='/register' element={<Register />}/>
  <Route path='/user/profile' element={<Profile />} />
  <Route path='/pet/mypets' element={**<MyPets />**} />
  <Route path='/' element={<Home />} />
</Routes>
...
```

Também precisamos de uma forma do usuário poder acessar essa rota, então precisamos adicionar um Link a Navbar com acesso á rota.

```jsx
// ./src/components/layout/Navbar.js

...
<>
    <li>
        <Link to='/pet/mypets'>Meus Pets</Link>
    </li>
    <li>
        <Link to='/user/profile'>Perfil</Link>
    </li>
    <li onClick={logout}>Sair</li>
</>
...
```

### Criando a página de cadastro de Pets

Aqui iremos executar os mesmo métodos feitos anteriormente, criaremos o componente já estruturando o html e também faremos já as importações que serão necessárias para a funcionalidade página, adicionamos também o componente que será criado para o formulário, precisamos importa-lo e inseri-lo na estrutura.

```jsx
// ./src/components/pages/Pet/AddPet.js

import api from '../../../utils/api'

import styles from './AddPet.module.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import PetForm from '../../form/PetForm';

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage';

const AddPet = () => {
  return (
    <section className={styles.addpet_header}>
        <div>
            <h1>Cadastre um pet</h1>
            <p>Depois ele ficará disponível para adoção</p>
        </div>
        <PetForm />
    </section>
  )
}

export default AddPet;
```

E também importamos o componente e definimos a rota no App.js.

```jsx
// ./src/App.js

...
import **AddPet** from './components/pages/Pet/AddPet';
...
<Routes>
...
      <Route path='/pet/add' element={**<AddPet />**} />
...
</Routes>
...
```

### Criação do formulário de cadastro de Pets

Agora criaremos a estrutura do componente de formulário que está inserido no nosso componente de cadastro de pet. Iniciaremos fazendo algumas importações necessárias, importaremos o useState, o estilos de formulários e o componente de input. Em seguida criamos o state do pet onde receberá como valor padrão um objeto petData que será enviado pela props do componente ou um objeto vazio, também enviaremos mais alguns valores pela prop, que seria o btnText e o handleSubmit. Também precisaremos criar um state para o preview da imagem que terá um array  vazio como valor inicial, e criaremos também um array de cores dos pets que serão utilizadas no form. Então criamos a estrutura do form utilizando o componente de input e também criamos as funções que serão acionadas nos eventos de mudança e submit do form.

```jsx
// ./src/components/form/PetForm.js

import { useState } from 'react';

import formStyles from './Form.module.css';

import Input from './Input';

const PetForm = ({handleSubmit, petData, btnText}) => {

  const [ pet, setPet ] = useState(petData || {});
  const [ preview, setPreview ] = useState([]);
  const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Mesclado']

  function onFileChange(e) {

  }

  function handleChange (e) {

  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <Input text="Imagens do Pet" type="files" name="images" handleOnChange={onFileChange} multiple={true} />
      <Input text="Nome do Pet" type="text" name="name" placeholder='Digite o nome' handleOnChange={handleChange} value={pet.name || ''} />
      <Input text="Idade do Pet" type="text" name="age" placeholder='Digite a idade' handleOnChange={handleChange} value={pet.age || ''} />
      <Input text="Peso do Pet" type="text" name="weight" placeholder='Digite o peso' handleOnChange={handleChange} value={pet.weight || ''} />
      <input type="submit" value={btnText} />
    </form>
  )
}

export default PetForm;
```

Para o input select precisaremos criar um componente apenas para ele onde receber algumas props que serão dados utilizados para criar a estrutura do select.

```jsx
// ./src/components/form/Select.js

import styles from './Select.module.css'

const Select = ({text, name, options, handleOnChange, value}) => {
  return (
    <div className={styles.form_control}>
        <label htmlFor={name}>{text}</label>
        <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
            <option>Selecione uma opção</option>
            {options.map((option) => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default Select
```

### Definindo as funções do formulário de Pets

Agora desenvolveremos as funções que serão responsáveis pela captura de dados do form e pelo envio destes dados para o banco.

Começaremos pelas imagens inserindo elas no objeto pet através de um spread operator e faremos a mesma coisa com os valores dos outros inputs e também da cor. E por fim teremos a função de submit que executará a função que é enviada pela prop;

```jsx
// ./src/components/form/PetForm.js

...
function onFileChange(e) {

		setPreview(Array.from(e.target.files))
    setPet({...pet, images: [...e.target.files]})

  }

  function handleChange (e) {

    setPet({...pet, [e.target.name] : e.target.value})

  }

  function handleColor (e) {

    setPet({...pet, color: e.target.options[e.target.selectedIndex].text})

  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(pet);
  }
...
```

Faremos também a preview das imagens, criaremos uma div e faremos uma condicional se a imagem for carregada no nosso input.

```jsx
// ./src/components/form/PetForm.js

...
<div className={formStyles.preview_pet_images}>
        {preview.length > 0 ? preview.map((image, index) => (
          <img src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name}+${index}`} />
        )) : 
        pet.images &&
        pet.images.map((image, index) => (
          <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={pet.name} key={`${pet.name}+${index}`} />
        ))
        }
</div>
...
```

### Concluindo o envio dos dados do formulário de criação de Pets

Agora que temos todos os dados armazenados nos state, vamos partir para criação da função de registro do pet, essa é a função que é executada no nosso submit, mas antes de estruturarmos ela precisamos fazer mais algumas coisa, precisaremos do token, então puxamos ele do localStorage, precisamos também destruturar as flash message e criar o navigate que já importamos anteriormente. Em seguida criaremos as estrutura da função, definimos o tipo da mensagem, criamos o formData e passamos as keys, só que para isso fazemos um if para serparar a definição das imagens e dos dados. Então com os dados no formData faremos a requisição a api para inserção dos dados no banco, será um post, passaremos a rota, formData e os headers que são o authorization que será o token e o content-type que define qual o tipo de conteúdo a ser enviado, neste caso um form-data e fazemos como de costume um then/catch para tratar os erros da requisição. Também enviaremos a flash message e utilizamos o navigate para redirecionar para página mypets fazendo um if para redirecionar apenas se for sucesso. Também adicionamos a função ao evento handleSubmit no componente PetForm.

```jsx
	  
// ./src/components/pages/Pet/AddPet.js
 
...
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();

    async function registerPet(pet) {

        let msgType = 'success';

        const formData = new FormData();

        await Object.keys(pet).forEach((key) => {

            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }

        })

        const data = await api.post('pets/create', formData, {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            }
        )
        .then((response) => {

            return response.data
    
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        
        setFlashMessage(data.message, msgType);

        if(msgType !== 'error') {
            navigate('/pets/mypets')
        }
    }
...
<PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
...
```

### Criando a requisição para coletar os pets do banco

Agora partiremos para o desenvolvimento da página de MyPets, que tem como função mostrar os pets cadastrados pelo usuário, primeiramente precisamos resgatar os pets cadastrado no banco, então iremos desenvolver a requisão para este resgate, mas antes iremos fazer as importações necessárias para todo o funcionamento da página. Bom, vamos precisar do componente de layout RoundedImage pois iremos exibir as imagens do pets e este componente terá a função de arredondar as imagens, também precisaremos do hook das flash messages. Outro hook que já tinha sido importado é o useEffect, ele será usado nesta etapa. Para efetuar o restate precisaremos usar o token, então armazenaremos em um váriável através do useState buscando o valor do token no localStorage, também resgatamos a função de definição das flash messages. Para fazemos a requisição, faremos uso do useEffect e também precisaremos da api, então precisamos importa-la, nela iremos fazer uma requisição get na rota /pets/mypets também passando os headers de authorization onde será enviado o token. Então seguimos com um then para aguardar a solicitação e concluindo-a temos o resgate do pet.

```jsx
// ./src/components/pages/Pet/MyPets.js

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import RoundedImage from '../../layout/RoundedImage';

import api from '../../../utils/api';

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage';

const MyPets = () => {
  const [ pets, setPets ] = useState([]);
  const [ token ] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    
    api.get('/pets/mypets', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
        setPets(response.data.pets)
    })

  }, [token])

  return (
    <section>
      <div>
        <h1>Meus Pets</h1>
        <Link to="/pets/add">Cadastrar Pet</Link>
      </div>
      <div>
        {pets.length > 0 && (
          <p>Meus Pets cadastrados</p>
        )}
        {pets.length === 0 && (
          <p>Não há Pets cadastrados</p>
        )}
      </div>
    </section>
  )
}
```

### Criando a exibição dos pets do usuário na página de meus pets

Agora iniciaremos a criação do exibição dos pets do usuário, bem simples por sinal, faremos um map nos pets que recebemos e criamos a estrutura html. Também precisaremos verificar se o pet já foi adotado ou não, para isso basta utilizarmos um operador ternário na prop pet.avaliable, após essa verificação precisamos o pet está em processo de adoção, diferente da verificação anterior onde o pet já foi adotado, aqui o pet ainda está disponível porém está em processo de adoção.

```jsx
// ./src/components/pages/Pet/MyPets.js

...
return (
    <section>
      <div>
        <h1>Meus Pets</h1>
        <Link to="/pets/add">Cadastrar Pet</Link>
      </div>
      <div>
        {pets.length > 0 && 
          pets.map((pet) => (
            <div key={pet._id}>
              <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="75px" />
              <span className="bold">{pet.name}</span>
              <div className={styles.action}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button>Concluir adoção</button>
                    )}
                    <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                    <button>Excluir</button>
                  </>
                ) : (
                  <p>Pet já adotado</p>
                )}
              </div>
            </div>
          ))
        }
        {pets.length === 0 && (
          <p>Não há Pets cadastrados</p>
        )}
      </div>
    </section>
  )
}
...
```

### Criando a função de exclusão de pets

Bom, agora criaremos iremos acessar a operação de exclusão dos pets, para isso precisaremos criar uma função onde passaremos o id do pet então fazemos uma requisição a api por um rota delete enviando os headers com a Authorization e então fazemos um than/catch armazenando a resposta no data, também criamos uma forma de atualizar os pets no front pois eles só serão removidos do front quando a página atualizar então meio que criamos um filtro para verificar o pet que foi removido do back e também remove-lo do front. E por fim criamos o evento onClick para fazer o acionamento da nossa função, porém existe um problema, pois quando a página der um render a função será acionada, precisamos informar ao react que a função só será executada quando o usuário clicar pois estamos efetuando um execução de método pois precisamos utilizar os parenteses para adionar o argumento, para resolver isto basta apenas utilizar um função anônima executando a nossa função, ele nada mais é do que um callback e terá efeito apenas quando executarmos o evento de clique.

```jsx
// ./src/components/pages/Pet/MyPets.js

...
async function removePet(id) {

      let msgType = 'success';

      const data = await api.delete(`/pets/${pets.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }
      })
      .then((response) => {

        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets)
        return response.data

      })
      .catch((err) => {

        msgType = 'error';
        return err.response.data

      })

      setFlashMessage(data.message, msgType);

  }
...
<button className={styles.delete_btn} onClick={() => {
    removePet(pet._id)
 }}>Excluir</button>
...
```

### Criando a página de edição dos pets

Iniciaremos pela criação do componente de edição, onde faremos algumas importações iniciais que serão necessárias. Precisaremos da api, dos hooks useState e useEffect, dos estilos do nosso componente de formulário de pet e do hook das flash messages. Nesta etapa será isso, posteriormente iremos desenvolve-lo pois agora iremos adiciona-lo a rota.

```jsx
// ./src/components/pages/Pet/EditPet.js

import api from '../../../utils/api';

import { useState, useEffect } from 'react';

import styles from './AddPet.module.css';

import PetForm from '../../form/PetForm';

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage';

const EditPet = () => {
  return (
    <section>
        <h1>Edit Pet</h1>
    </section>
  )
}

export default EditPet;
```

Partindo para a rota, fazemos a adição da rota no App.js, dando acesso ao componente fazendo o uso o id pois cada componente será vinculado ao pet, lembrando sempre de importa-lo.

```jsx
// ./src/App.js

...
// pages
import EditPet from './components/pages/Pet/EditPet';
...

...
<Route path='/pets/edit/:id' element={<EditPet />} />
...
```

### Criando o formulário de edição e preenchendo com os dados do pet

Agora iremos criar o formulário de edição de cada pet, como será uma edição, precisaremos que o formulário já venha preenchido com os dados atuais do pet, então começaremos criando um state para armazenar esses dados, ambém precisaremos do token pois iremos precisar autenticar o usuário, devido a edição estar viculada apenas ao usuário que o registrou. Para resgatar o pet iremos utilizar o id que é passado na URL e para isso vamos utilizar um hook feito especificamente para isso, o useParams ele tem a função de colatar parâmetros da URL, também utilizaremos as flash messages. Agora vamos executar o resgate, para isso vamos utilizar o useEffect passando o token e o id como depêndencias, toda vez q a página for atualizar ele fará o resgate, essa é uma requisição get pois estamos apenas regatando dados, passamos a URL da requisão com o id que recebemos do useParams e também enviamos os headers, como neste caso é apenas uma requisição get apenas enviamos o Authorization e no then definimos o pet que vem da requisição. Agora podemos utilizar os dados para fazer a construção do nosso formulário, como os dados provavelmete não vão está sincronizados precisaremos criar uma condicional no JSX, onde só mostrará o form quando os dados do pet chegarem. 

```jsx
// ./src/components/page/Pet/EditPet.js

import api from '../../../utils/api';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './AddPet.module.css';

import PetForm from '../../form/PetForm';

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage';

const EditPet = () => {

    const [ pet, setPet ] = useState({});
    const [ token ] = useState(localStorage.getItem('token') || '');
    const { id } = useParams();
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {

        api.get(`/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        })
        .then((response) => {
            setPet(response.data.pet)
        })
      
    }, [token, id])

    async function updatePet (pet) {

    }

  return (
    <section>
        <div className={styles.addpet_header}>
            <h1>Editando o Pet: {pet.name}</h1>
            <p>Depois da edição os dados serão atualizados no sistema</p>
        </div>
        {pet.name && (
          <PetForm handleSubmit={updatePet} btnText='Atualizar' petData={pet} />
        )}
    </section>
  )
}

export default EditPet;
```

### Criando função de atualizar o pet

Agora, no nosso componente de formulário passamos um evento de submit onde executará a função de updatePet, que será responsável para atualizar os dados no sistema. Primeiro definimos o tipo de mensagem que será mostrado nas flash message, criamos um form data e fazemos uso do método de objeto keys e o forEach para armazenar todos os dados dos pets no form data através do append, se exitir imagens faremos um for pois podem ser multiplas imagens. Com os dados armazenados no formData, fazemos a requisição patch para a api passando a URL com o id, o formData e os headers de autorização e o content-type. Em seguida fazemos um then/catch para tratar as respostas que iremos obter fazendo retorno das mesmas para o data e por fim definimos nas flash messages a mensagem de retorno, seja ela de success/error e o tipo da mensagem.

```jsx
// ./src/components/page/Pet/EditPet.js

async function updatePet (pet) {

      let msgType = 'success'

      const formData = new FormData();

      await Object.keys(pet).forEach((key) => {
        if(key === 'images') {

          for(let i = 0; i < pet[key].length; i++) {
            formData.append('images', pet[key][i])
          }

        } else {

          formData.append(key, pet[key])

        }
      })

      const data = await api.patch(`/pets/${pet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        }
      })
      .then((response) => {

        return response.data

      })
      .catch((err) => {

        msgType = 'error'
        return err.response.data
        
      })

      setFlashMessage(data.message, msgType)

    }
```

Precisamos fazer uma pequena correção no backend com relação a imagens na operação de atualização, pois temos uma verificação onde as imagens precisam ser obrigatórios e nesta situação não será necessário, então fazemos uma pequena modificação no PetController na função de atualização a updatePet. Modificaremos o código de verificação anterior para o código a seguir, onde removemos a obrigotórieidade da imagem.

```jsx
// ../backend/controllers/PetController.js

**// CODIGO ANTERIOR
if(images.length === 0) {
            res.status(422).json({ message: "A imagem é obrigatória!" })
        }  else {
            updatedData.images = [];
            images.map((image) => {
                updatedData.images.push(image.filename);
            })
}**

**// CODIGO CORRIGIDO
if(images > 0) {
            updatedData.images = [];
            images.map((image) => {
                updatedData.images.push(image.filename);
            })
}**
```

### Criando a página de adoção

Agora damos inicio a criação da página principal, a página de adoção. Começaremos pelo resgate do dados dos pets no componente da home, para isso precisaremos da api, então fazemos a importação da mesma, também importaremos o Link, os hooks useState para setar os dados que vem da api e useEffect para executar o resgate na api e os estilos para a página. Com as importações feitas partiremos para a construção, iniciamos pela criação do state dos pets e também o resgate dos dados que serão armazenados no state, então fazemos uso do useEffect fazendo um requisição get a api na rota de pets, nesta situação não precisamos passar nenhum header pois qualquer usuário pode resgatar esta rota.

```jsx
// ./src/components/pages/Home.js

import api from '../../utils/api';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Home.module.css';

const Home = () => {

  const [ pets, setPets ] = useState([]);

  useEffect(() => {

    api.get('/pets').then((response) => {
      setPets(response.data.pets)
    })

  }, [])

  return (
    <section>
        <h1>Home</h1>
    </section>
  )
}

export default Home;
```

Agora será a construção do jsx da página, utilizaremos um map para resgatar cada pet cadastrado e passaremos os estilos para cada elemento.

```jsx
// ./src/components/pages/Home.js

...
return (
    <section>
        <div className={styles.pet_home_header}>
          <h1>Adote um Pet</h1>
          <p>Veja os detalhes de cada um e conheça o tutor deles</p>
        </div>
        <div className={styles.pet_container}>
          {pets.length > 0  && 
            pets.map((pet) => (
              <div className={styles.pet_card}>
                <div style={{backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`}} className={styles.pet_card_image}></div>
                <h3>{pet.name}</h3>
                <p>
                  <span className="bold">Peso: {pet.weight}kg</span>
                </p>
                {pet.available ? (
                  <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
                ) : (
                  <p className={styles.adopted_text}>Adotado</p>
                )}
              </div>
            ))
          }
          {pets.length === 0 && (
            <p>Não há pets cadastrados ou disponíveis para adoção no momento!</p>
          )} 
        </div>

    </section>
  )
}
...
```

### Criação da página detalhes de cada pet

Iniciaremos pela criação do componente PetDetails.

```jsx
// ./src/components/pages/Pet/PetDetails.js

import styles from './PetDetails.module.css';

const PetDetails = () => {
  return (
    <div>PetDetails</div>
  )
}

export default PetDetails;
```

Agora fazemos a adição deste componente as rotas no App.js lembrando de fazer a importação do componente.

```jsx
// ./src/App.js

	<Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/pets/mypets' element={<MyPets />} />
        <Route path='/pets/add' element={<AddPet />} />
        <Route path='/pets/edit/:id' element={<EditPet />} />
        **<Route path='/pet/:id' element={<PetDetails />} />**
        <Route path='/' element={<Home />} />
	</Routes>
```

Vamos agora fazer a estruturação da página, iniciaremos pelas importações, precisaremos importa a api, os hooks useStates, useEffect, useParams, useFlashMessage e o Link. Agora fazemos a criação das variáveis do state, do id quem vem do params, da função das flash messages e do token que vem do localStorage. Agora faremos uso o effect executando a requisição a api pelo método get passando o id na rota e retornando com o then o pet que será armazenado no state pet e passando o id como dependêcia do useEffect.

```jsx
// ./src/components/pages/Pet/PetDetails.js

import api from '../../../utils/api';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import styles from './PetDetails.module.css';

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage';

const PetDetails = () => {

    const [ pet, setPet ] = useState({});
    const { id } = useParams();
    const { setFlashMessage } = useFlashMessage();
    const [ token ] = useState(localStorage.getItem('token') || '');

    useEffect(() => {

        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })

    },[id])

  return (
    <div>
        <h1>{pet.name}</h1>
    </div>
  )
}

export default PetDetails;
```

Agora faremos a estruturação da página, o JSX  e a estilização.

```jsx
// ./src/components/pages/Pet/PetDetails.js

...
return (
    <>
        {pet.name && (
            <section className={styles.pet_details_container}>
                <div className={styles.pet_details_header}>
                    <h1>Conhecendo o Pet: {pet.name}</h1>
                    <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
                </div>
                <div className={styles.pet_info_container}>
                    <div className={styles.pet_images}>
                        {pet.images.map((image, index) => (
                            <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={pet.name} key={index} />
                        ))}
                    </div>
                    <p>
                        <span className="bold">Peso: </span> {pet.weight} kg
                    </p>
                    <p>
                        <span className="bold">Idade: </span> {pet.age} {pet.age === 1 ? (<span>ano</span>) : (<span>anos</span>)}
                    </p>
                </div>
                {token ? (
                        <p><button>Solicitar uma visita</button></p>
                    ) : (
                        <p>Você precisa <Link to='/register'>criar uma conta</Link> para solicitar a visita</p>
                    )}
            </section>
        )}
    </>
  )
...
```

### Criando a função de agendamento de visitas

Agora criaremos a função responsável para agendar visitas com os tutores do pets, onde o usuário entrar em processo de adoção e receberá os dados do tutor para contato. Primeiro precisamos criar o evento de onClick onde quando acionado executará a função de agendamento. Na função definimos o tipo da mensagem e em seguida faremos a requisição a api, neste caso será um patch, acessamos a rota especifica para agendamento através do id, também passamos o authorization fazemos um then/catch para armazenar as repostas e por fim definimos a flash message.

 

```jsx
// ./src/components/pages/Pet/PetDetails.js

...
async function schedule() {

        let msgType = 'success';

        const data = await api.patch(`/pets/schedule/${pet._id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error';
            return err.response.data
        })

        setFlashMessage(data.message, msgType);

    }
...
...
<button onClick={schedule}>Solicitar uma visita</button>
...
```

### Criando a página das adoções dos usuários

Como de costume criamos o componente da página, já importando os estilos da dashboard pois serão semelhantes.

```jsx
// ./src/components/pages/Pet/MyAdoptions.js

import styles from './Dashboard.module.css';

const MyAdoptions = () => {
  return (
    <div>
        <h1>My adoptions</h1>
    </div>
  )
}

export default MyAdoptions;
```

E precisamos criar a rota para esse componente, então a definiremos no App.js lembrando de importar o componente.

```jsx
// ./src/App.js

...
// pages
import MyAdoptions from './components/pages/Pet/MyAdoptions';
...
...
<Routes>
...
    <Route path='/pets/myadoptions' element={<MyAdoptions />} />
...
</Routes>
...
```

Outra coisa que precisamos fazer é definir o acesso dessa rota pela navbar, então precisamos criar um componentes de Link para dar acesso a nossa página.

```jsx
// ./src/components/layout/Navbar.js

...
<li>
   <Link to="/pets/myadoptions">Minhas Adoções</Link>
</li>
...
```

Agora resgataremos os pets da nossa api, então precisaremos importar a api, os hooks states e effects e também vamos importar o nosso componente RoundedImage. E começaremos a definir os states e executar, através do useEffect, a requisição a api passando a rota e o header de authorization, em seguida damos um then setando o que obtivemos de resposta no state pets.

```jsx
// ./src/components/pages/Pet/MyAdoptions.js

import api from '../../../utils/api';

import { useState, useEffect } from 'react';

import styles from './Dashboard.module.css';

import RoundedImage from '../../layout/RoundedImage';

const MyAdoptions = () => {

    const [ pets, setPets ] = useState({});
    const [ token ] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setPets(response.data.pets)
        })

    }, [token])

  return (
    <div>
        <h1>My adoptions</h1>
    </div>
  )
}

export default MyAdoptions;
```

Agora iremos criar o nosso JSX, especificamente estrutura a página com os dados que recebemos da api.

```jsx
// ./src/components/pages/Pet/MyAdoptions.js

...
return (
    <section>
        <div className={styles.petlist_header}>
            <h1>Minhas Adoções</h1>
        </div>
        <div className={styles.petlist_container}>
            {pets.length > 0 &&
                pets.map((pet) => (
                <div key={pet._id} className={styles.petlist_row}>
                    <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="px75" />
                    <span className="bold">{pet.name}</span>
                    <div className={styles.contacts}>
                        <p>
                            <span className="bold">Ligue para: </span>
                            {pet.user.phone}
                        </p>
                        <p>
                            <span className="bold">Fale com: </span>
                            {pet.user.name}
                        </p>
                    </div>
                    <div className={styles.actions}>
                    {pet.available ? (
                        <div className={styles.status_container}>
                            <p>Status: </p>
                            <p className={styles.in_proccess}><span></span>Adoção em processo</p>
                        </div>
                    ) : (
                        <div className={styles.status_container}>
                            <p>Status: </p>
                            <p className={styles.proccess_finish}><span></span>Adoção foi concluida</p>
                        </ div>
                    )}
                </div>
            </div>
                ))}
            {pets.length === 0 && (
                <p>Ainda não há adoções de Pets.</p>
            )}
        </div>
    </section>
  )
...
```

### Criando a função de conclusão da adoção

Agora partiremos para finalização do processo de adoção e finalização do projeto, nossa ultima função fará com que o processo de adoção seja finalizado tornando o pet indisponível para adoção. Primeiramente precisamos criar o evento no botão de concluir a adoção, será um evento onClick, este evento irá executar nossa função de conclusão, porém vamos cair em um situação anteriormente vista, que precisaremos passa uma callback que executará nossa função porque se não a função será executada no momento que a página renderizar.

```jsx
// ./src/components/pages/Pet/MyAdoptions.js

...
{pet.adpoter && (
    <button className={styles.conclude_btn} onClick={() => {
      concludeAdoption(pet._id)
    }}>Concluir adoção</button>
)}
...
```

E damos inicio a contrução da função de conclusão, nela será passado o id como argumento, e começamos criando o tipo da mensagem que será passada na flash message, em seguida fazemos a requisição patch a api na rota de conclude passando o id que recebemos no argumento, e também passamos o token nos headers de authorization e fazemos o then/catch retornando os dados pro data e por fim enviamos as repostas para a flash message e o tipo da mensagem.

```jsx
// ./src/components/pages/Pet/MyAdoptions.js

...
async function concludeAdoption(id) {

    let msgType = 'success';

    const data = api.patch(`/pets/conclude/${id}`, {
      headers : {
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      msgType = 'error';
      return err.response.data
    })

      setFlashMessage(data.message, msgType);

}
...
```

Bom, assim finalizamos o projeto…