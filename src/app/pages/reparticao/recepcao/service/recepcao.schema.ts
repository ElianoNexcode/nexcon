import gql from 'graphql-tag';

export const RecepcaoSchema = {
    create_Recepcao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $recepcao: ReparticaoRecepcaoInserirInput! ) {
            reparticaoRecepcao_Inserir( sessao: $sessao,
                                        recepcao: $recepcao ) 
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    read_RecepcaoGrid: gql`
        query( $sessao: UsuarioSessaoInput!,
               $order: [NcRecepcaoSortInput!],
               $where: NcRecepcaoFilterInput
               $first: Int ) {
            reparticaoRecepcao( sessao: $sessao,
                                order: $order,
                                where: $where
                                first: $first) 
            {
                totalCount
                nodes 
                {
                    id      
                    nome
                    localizacao
                    telefone1
                    telefone2
                    email
                    observacao
                    
                    controle
                    iniciarCadastro
                    capturarImagem
                    identificador
                    
                    notificarMenor
                    notificarMaior
                    
                    campoComplemento
                    campoEmail
                    campoMotivo
                    campoObservacao
                    campoTelefone
                    campoVeiculo
                    campoEmpresa
                    
                    apresentarFelicitacao
                    apresentaUltimoVisitado
                    arquivarRegistro
                    ativarExclusaoPrestador
                    ativarExclusaoVisitante
                    ativarCaptura
                    imprimirCracha
                    identificarGaragem
                    identificarVeiculo
                    identificarAutorizante

                    informarPresencaVisitado
                    
                    internoTipoDocId
                    internoMotivoId
                    internoIngresso
                    internoCrachaId
                    internoAutorizacao
                    
                    prestadorTipoDocId
                    prestadorGrupoId
                    prestadorMotivoId
                    prestadorIngresso
                    prestadorCrachaId
                    prestadorAutorizacao
                    
                    visitanteTipoDocId
                    visitanteGrupoId
                    visitanteMotivoId
                    visitanteIngresso
                    visitanteCrachaId
                    visitanteAutorizacao

                    estacionamentos {
                        estacionamento {
                          id
                          nome
                          garagens {
                            garagem
                             
                          }
                        }
                    }

                    niveisAcessos {
                        nivelAcessoPadrao
                        nivelAcesso {
                          id
                          nome
                          
                        }
                      }
                 
                }
            }
        }`,

    update_Recepcao: gql`
        mutation( $sessao: UsuarioSessaoInput!,
                  $recepcao: ReparticaoRecepcaoAlterarInput! ) {
            reparticaoRecepcao_Alterar( sessao: $sessao,
                                        recepcao: $recepcao )
            {
                mensagem
                mensagemTipo
                sucesso
                objeto
            }
        }`,

    delete_Recepcao: gql`
        mutation( $id: Int!,
                  $sessao: UsuarioSessaoInput! ) {
            reparticaoRecepcao_Excluir( id: $id,
                                        sessao: $sessao )
            {
                mensagem
                mensagemTipo
                sucesso
            }
        }`        
}
