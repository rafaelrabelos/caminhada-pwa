export const getLang = () => "ptbr";
export const __LANG = getLang();

export const __CONSTS = {
  orientations: { horizontal: 1, vertical: -1 },
  sizes: { sm: 20, smx: 25, md: 30, mdx: 35, xg: 40, xgx: 45, full: 100 },
};

export const __TEXTS = {
  ptbr: {
    titleApp: `Meus privilegios`,
    titlePage: `Caminhada do privilégio`,
    buttons:{
      enter: `Entrar`,
      start: `Iniciar`
    },
    loginView:{
      presentation: `Responda algumas questões e descubra sua posição de privilégio social.`,
      acceptToStart: `Para iniciar a caminhada aceite os termos e condições.`,
      logedInInfo: ``,
      acceptTerms: {
        accept: `Eu aceito os`,
        terms: `Termos de Uso`,
        policies: `Politica de Privacidade`,
      }
    },
    exit: `Sair`,
    logOut: `Sair da conta`,
    logedInAs: `Você está logado(a) como`,
    userProfileImage: `Imagem de perfil do usuário`
  },
};
