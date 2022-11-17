import { gql } from 'apollo-angular';

export const PessoaGrupoSchema = {

    create_PessoaGrupo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $pessoaGrupo: GrupoPessoaInserirInput! )
        {
            grupoPessoa_Inserir( sessao: $sessao,
                                 pessoaGrupo: $pessoaGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_PessoaGrupo: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcPessoaGrupoSortInput!],
               $where: NcPessoaGrupoFilterInput,
               $first: Int )
        {        
            grupoPessoa( sessao: $sessao,
                         order: $order,
                         where: $where,
                         first: $first ) 
            {
                nodes 
                {
                    id
                    pessoaGrupo
                    pessoaInterna
                    pessoaPrestador
                    pessoaVisitante
                }
            }
        }`,

    update_PessoaGrupo: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $pessoaGrupo: GrupoPessoaAlterarInput! )
        {
            grupoPessoa_Alterar( sessao: $sessao,
                                 pessoaGrupo: $pessoaGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_PessoaGrupo: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            grupoPessoa_Excluir ( id: $id,
                                  sessao: $sessao ) 
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}
