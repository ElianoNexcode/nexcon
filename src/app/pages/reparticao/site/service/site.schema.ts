import gql from 'graphql-tag';

export const SiteSchema = {

    create_Site: gql`
        mutation($sessao: UsuarioSessaoInput!,
                 $site: ReparticaoSiteInserirInput!) {
            reparticaoSite_Inserir (sessao: $sessao,
                                    site: $site)
            {   
                mensagem
                mensagemTipo
                sucesso  
                objeto  
            }
        }`,

    read_Site_ListView: gql`
        query($sessao: UsuarioSessaoInput!, 
            $order: [NcSiteSortInput!], 
            $where: NcSiteFilterInput,
            $first: Int) {
        reparticaoSite(sessao: $sessao, 
                       order: $order,
                       where: $where,
                       first: $first)
        {
            totalCount 
            nodes {id
                   nome
                   observacao
            }
            
        }
    }`,

    read_Site_CRUD: gql`
    query($sessao: UsuarioSessaoInput!, 
          $order: [NcSiteSortInput!], 
          $where: NcSiteFilterInput,
          $first: Int) {
        reparticaoSite(sessao: $sessao, 
                       order: $order,
                       where: $where,
                       first: $first)
        {
            nodes {id
                   nome
                   observacao
                   supervisao {
                       tipo
                       pessoaId
                       pessoaInterna {
                           id
                           nome
                       }
                   }
            }
            totalCount     
        }
    }`,

    read_Site: gql`
    query($sessao: UsuarioSessaoInput!, 
          $order: [NcSiteSortInput!], 
          $where: NcSiteFilterInput,
          $first: Int) {
        reparticaoSite(sessao: $sessao, 
                       order: $order,
                       where: $where,
                       first: $first)
        {
            nodes {id
                   nome
                   observacao
                   setores {
                        id
                        nome
                        areas {
                            id
                            nome  
                        }
                   }
                   supervisao {
                       tipo
                       pessoaId
                       pessoaInterna {
                           id
                           nome
                       }
                   }
            }
            totalCount     
        }
    }`,

    update_Site: gql`
        mutation($sessao: UsuarioSessaoInput!,
                 $site: ReparticaoSiteAlterarInput!) {
            reparticaoSite_Alterar (sessao: $sessao,
                                    site: $site)
            {   
                mensagem 
                mensagemTipo 
                sucesso 
                objeto
            }
        }`,

    delete_Site: gql`
        mutation($id: Int!,
                 $sessao: UsuarioSessaoInput!) {
            reparticaoSite_Excluir( id: $id,
                                    sessao: $sessao )
            {   
                mensagem
                mensagemTipo
                sucesso    
            }
        }`
}
