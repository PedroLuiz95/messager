import { postgreSql } from "../../assets/database"
export default async function handler() {
  const conn = await postgreSql()
  const queryToGerNumbers = `select cd_pessoa as "cod_cliente", nome_razaosocial as "Cliente", valor_total as "Valor", data_vencimento as "Data Vencimento", fone01 as "Celular", email as "Email"
  from mk_faturas
  inner join mk_pessoas on cd_pessoa = codpessoa
  where excluida = 'N' and suspenso = 'N' and liquidado = 'N' and data_vencimento >= current_date and data_vencimento <= current_date + 3`
  const out = await conn.query(queryToGerNumbers)
  return out
}
