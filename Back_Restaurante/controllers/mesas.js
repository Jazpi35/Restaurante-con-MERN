const fs = require("fs/promises");
const path = require("path");


const obtenerMesas = async (req, res) => {

  try {
    // Consultar todas las mesas

    const mesas = await fs.readFile(
        path.join(__dirname, "../data/mesas.json")
    );

      const mesasJSON = JSON.parse(mesas);
  
      console.log(mesasJSON);
      // Filtra los productos con estado true
      const mesasTrue = mesasJSON.mesas.filter(mesas => mesas.estado === true);
      // Convierto el objeto en JSon para enviar al front
      res.json({mesas: mesasTrue});

  } catch (error) {
    console.error("❌ Error al consultar las mesas:", error);
    res.status(500).json({
      message: "❌ Error al consultar las meesas",
    });
  }

};

module.exports = {
  obtenerMesas
}