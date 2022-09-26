import log from "../../../factory/handleLog"
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const params = req.query
    let out
    if (params) {
      const dateFilter = handleDateParams(params)
      out = await log('list_filter', dateFilter)
    } else {
      out = await log('list_all')
    }
    res.status(200).json(out)

  } else if (req.method === 'POST') {
    try {
      const out = await log('insert', req.body)
      res.status(200).json(out)

    } catch (e) {
      console.log(e)
      res.status(400).json({ error: 'Nome duplicado' })
    }

  } else if (req.method === 'DELETE') {
    const out = await log('delete', req.body)
    res.status(200).json(out)
  }
  else {
    res.status(200).json()
  }
}

function handleDateParams(params) {
  let start_date, end_date
  if (params.period) {
    end_date = new Date(Date.now())
    start_date = end_date.toISOString()
    start_date = new Date(start_date)
    start_date.setDate(start_date.getDate() - parseInt(params.period))
  } else if (params.start_date && params.end_date) {
    start_date = new Date(params.start_date)
    end_date = new Date(params.end_date)
  } else if (params.start_date && !params.end_date) {
    start_date = new Date(params.start_date)
    end_date = new Date(Date.now())
  } else if (!params.start_date && params.end_date) {
    start_date = new Date('1970-01-01T00:00:00.000Z')
    end_date = new Date(params.end_date)
  } else {
    end_date = new Date(Date.now())
    start_date = end_date
    start_date.setDate(start_date.getDate() - 30)
  }
  end_date.setHours(45, 0, 0)
  const queryDate = {
    date: { $lte: new Date(end_date), $gte: new Date(start_date) }
  }
  console.log(queryDate)
  return queryDate
}