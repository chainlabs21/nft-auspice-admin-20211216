import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  *{
    padding:0;
    margin:0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
    border: none;

    user-select: none;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }
  
  
  u{
    text-decoration: underline;
  }
  
  *:link,
  *:visited{
    color:unset;
  }
  
  *::-webkit-scrollbar {
    display: none;
  }
  
  *:focus{
    outline:none;
  }
  
  input{
    outline: none;
    user-select: auto;
    background: unset;
  }



  /* input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  } */

  label{
    cursor: pointer;
  }

  button{
    background: none;
    cursor: pointer;
  }

  textarea{
    resize: none;
  }

  &#BroadBox {
    background: #373737;
  }
`;

export default GlobalStyle;
