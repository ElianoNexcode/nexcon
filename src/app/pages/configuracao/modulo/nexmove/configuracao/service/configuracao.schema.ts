import gql from "graphql-tag";

export const ConfiguracaoNexmoveSchema = {

    read_ConfiguracaoNexmove: gql`
        query($sessao:UsuarioSessaoInput!)
        {
            integracaoNexmove( sessao: $sessao)
            {
                nodes
                {
                    id
                    identificacao
                    acessoAutorizacao
                    acessoIngresso
                    acessoSaida
                    funcaoAgendamento
                    funcaoIdentificacao
                    qrcodeValidacao
                }
            }
        }`,

    update_ConfiguracaoNexmove: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $nexmove: IntegracaoNexmoveAlterarInput! )
        {
            integracaoNexmove_Alterar( sessao: $sessao,
                                       nexmove: $nexmove )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            } 
        }`,

}