import { postgreSql } from "../../assets/database"
export default async function handler(mode) {
  const conn = await postgreSql()
  let queryToGerNumbers
  const limit = parseInt(process.env.CONFIG_LIMIT_RETURN_QUERYS)
  if (mode === 'beforeExpire') {
    queryToGerNumbers = `select cd_pessoa as "cod_cliente",
    nome_razaosocial as "nome",
    valor_total as "valor",
    data_vencimento as "data_vencimento",
    fone01 as "numero",
    email as "email",
    codigo_barras, 
    linha_digitavel,
    cpf,
    inativo
  from mk_faturas
  inner join mk_pessoas on cd_pessoa = codpessoa
  inner join mk_boletos_gerados on cd_fatura=codfatura and substituido='N'
  where excluida = 'N' and mk_faturas.suspenso = 'N' and inativo = 'N' and liquidado = 'N' and data_vencimento >= current_date and data_vencimento <= current_date + 3 LIMIT ${limit}`
  } else if (mode === 'afterExpire') {
    queryToGerNumbers = `select cd_pessoa as "cod_cliente",
    nome_razaosocial as "nome",
    valor_total as "valor",
    data_vencimento as "data_vencimento",
    fone01 as "numero",
    email as "email",
    codigo_barras, 
    linha_digitavel,
    cpf
  from mk_faturas
  inner join mk_pessoas on cd_pessoa = codpessoa
  inner join mk_boletos_gerados on cd_fatura=codfatura and substituido='N'
  where excluida = 'N' and mk_faturas.suspenso = 'N' and liquidado = 'N' and data_vencimento <= current_date and data_vencimento >= current_date - 3 LIMIT 0`
  }
  const out = await conn.query(queryToGerNumbers)
  return out
}
