import { postgreSql } from "../../../assets/database"
export default async function handler(req, res) {
  const conn = await postgreSql()
  const out = await conn.query(`
  select cd_pessoa as "Cod. Cliente",
    nome_razaosocial as "nome",
    valor_total as "valor",
    data_vencimento as "data_vencimento",
    fone01 as "numero",
    email as "email",
    codigo_barras, 
    linha_digitavel
  from mk_faturas
  inner join mk_pessoas on cd_pessoa = codpessoa
  inner join mk_boletos_gerados on cd_fatura=codfatura and substituido='N'
  where excluida = 'N' and mk_faturas.suspenso = 'N' and liquidado = 'N' and data_vencimento >= current_date and data_vencimento <= current_date + 3 LIMIT 10`)
  res.status(200).json(out)
}
