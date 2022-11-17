import gql from 'graphql-tag';

export const EmpresaReparticaoSchema = {
    get_Empresa: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcEmpresaSortInput!],
               $where: NcEmpresaFilterInput
               $first: Int ) {
            reparticaoEmpresa( sessao: $sessao,
                                order: $order,
                                where: $where
                                first: $first )
            {
                nodes 
                {
                    id
                    grupoId
                    nome
                    gestor
                    telefone1
                    telefone2
                    email
                    observacao
                    razaoSocial
                    cnpj
                    ie
                    complemento1
                    complemento2
                    classificacao
                    enderecoLogradouro
                    enderecoNumero
                    enderecoComplemento
                    enderecoBairro
                    enderecoCep
                    enderecoCidade
                    enderecoEstado
                    enderecoPais
                    sites
                    {
                        siteId                        
                    }                    
                    dataCadastro
                }
            }
        }`,

        get_EmpresaRelat: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcEmpresaSortInput!],
               $where: NcEmpresaFilterInput
               $first: Int ) {
            reparticaoEmpresa( sessao: $sessao,
                                order: $order,
                                where: $where
                                first: $first )
            {
                totalCount
                nodes 
                {
                    id
                    grupoId
                    empresaGrupo{
                        id
                        empresaGrupo
                    }
                    nome
                    gestor
                    telefone1
                    telefone2
                    email
                    observacao
                    razaoSocial
                    cnpj
                    ie
                    complemento1
                    complemento2
                    classificacao
                    enderecoLogradouro
                    enderecoNumero
                    enderecoComplemento
                    enderecoBairro
                    enderecoCep
                    enderecoCidade
                    enderecoEstado
                    enderecoPais
                    sites
                    {
                        siteId                        
                    }                    
                    dataCadastro
                }
            }
        }`,

    create_Empresa: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $empresa: ReparticaoEmpresaInserirInput! )
        {            
            reparticaoEmpresa_Inserir( sessao: $sessao,
                                       empresa: $empresa )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    update_Empresa: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $empresa: ReparticaoEmpresaAlterarInput! ) {            
            reparticaoEmpresa_Alterar( sessao: $sessao,
                                       empresa: $empresa ) 
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_Empresa: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! ) {            
            reparticaoEmpresa_Excluir( id: $id,
                                       sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}
