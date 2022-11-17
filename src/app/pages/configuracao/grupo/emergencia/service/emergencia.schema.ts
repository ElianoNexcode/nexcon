import gql from 'graphql-tag';

export const EmergenciaGrupoSchema = {

    create_Grupo_Emergencia: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $emergenciaGrupo: GrupoEmergenciaInserirInput! )
        {
            grupoEmergencia_Inserir( sessao: $sessao,
                                     emergenciaGrupo: $emergenciaGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_Grupo_Emergencia: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcEmergenciaGrupoSortInput!],
               $where: NcEmergenciaGrupoFilterInput,
               $first: Int )
        {
            grupoEmergencia ( sessao: $sessao,
                              order: $order,
                              where: $where,
                              first: $first )
            {
                nodes 
                {
                    id
                    emergenciaGrupo
                }
            }
        }`,

    update_Grupo_Emergencia: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $emergenciaGrupo: GrupoEmergenciaAlterarInput! )
        {
            grupoEmergencia_Alterar( sessao: $sessao,
                                     emergenciaGrupo: $emergenciaGrupo )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto 
            }
        }`,

    delete_Grupo_Emergencia: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! )
        {
            grupoEmergencia_Excluir( id: $id,
                                     sessao: $sessao ) 
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`
}