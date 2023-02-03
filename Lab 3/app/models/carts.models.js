const getAllCarts = (done) => {
    const sql = 'SELECT * FORM carts'

    const error = []
    const results = []

    db.each(
        sql,
        [],
        (err, row) => {
            if(err) errors.push(err)

            results.push({
                item_id: row.item_id,
                item_name: row.item_name,
                item_price: row.item_price,
                quantity: row.quantity
            })
        },
        (err, num_rows) => {
            return done(err, num_rows, results)
        }
    )
}