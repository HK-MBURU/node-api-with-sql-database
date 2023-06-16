const mssql = require("mssql");
const config = require("../config");

async function getAllProducts(req, res) {
  let { product_id } = req.params;
  let sql = await mssql.connect(config);
  console.log(sql.connected);
  if (sql.connected) {
    let results = await sql.query(`SELECT * FROM production.products`);
    // console.log(results.recordset);
    let products = results.recordset;
    // console.log(results.recordset);
    res.json({
      success: true,
      message: "fetched products succesfully",
      results: products,
    });
  } else {
    res.status(500).send("Internal server error");
  }

  //res.send('HERE ARE THE PRODUCTS')
  // res.send
}
async function getProductById(req, res) {
  let sql = await mssql.connect(config);
  let { product_id } = req.params;
  if ((await sql).connected) {
    let results = await sql.query(
      `SELECT * FROM production.products WHERE product_id=${Number(product_id)}`
    );
    let product = results.recordset[0];

    res.json({
      success: true,
      message: "fetched product succesfully",

      results: product,
    });
  }
}
async function getSalesPerYear(req,res){
    let {page,limit,year}=req.params

    let sql=await mssql.connect(config)
    if(sql.connected){
        let results=await sql.request()
        .input("_year",Number(year))
        .input("_limit", Number(limit))
        .input("_page",Number(page))
        .execute("sales.paginated_sales")
        res.json({
            success:true,
            message:"sales for year" + year,
            results:{
                metadata:{
                    page,
                    record:results.recordset.length
                },
                data:results.recordset
            }
        })
    }
    
}
module.exports = { getAllProducts, getProductById,getSalesPerYear };
