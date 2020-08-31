$(document).ready(() => {
    $("#enviar").click(() => {
        var pokemon = $("#pokemon").val();
        // llamar a pokeapi
        if (pokemon != null && pokemon > 0 && pokemon < 152) {
            $.get("https://pokeapi.co/api/v2/pokemon/" + pokemon, function (result) {
                var type = result.types[0].type.name;
                var stats = result.stats;
                var $card = $(`
                <div class="card">
                    <img src="${result.sprites.front_default}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${result.name}</h5>
                        <p class="card-text">Tipo: <strong>${type}</strong></p>
                        <div id="chartContainer" style="height: 300px; width: 100%;"></div>
                        <h6>Otros pokemones del tipo</h6>
                        <div class="pokemonesrelacionados row">
                        
                        </div>
                    </div>
                </div>                
                `);
                // mostrar resultado
                $(".result").html($card);

                console.log(result);
                // llamar a api type para mostrar algunos pokemones del mismo tipo
                $.get("https://pokeapi.co/api/v2/type/" + type, function (data) {
                    console.log(data);
                    var relacionados = data.pokemon;
                    for (item of relacionados) {
                        var $pokemon = $(`
                        <div class="col-6 card">
                            <div class="card-body">
                                <h5 class="card-title">${item.pokemon.name}</h5>
                            </div>
                        </div> 
                        `);
                        $(".pokemonesrelacionados").append($pokemon);
                    }
                    var datos = [];
                    for (stat of stats) {
                        datos.push({
                            label: stat.stat.name,
                            y: stat.base_stat
                        });
                    }
                    var chart = new CanvasJS.Chart("chartContainer", {
                        title: {
                            text: "Estadísticas del pokémon"
                        },
                        data: [{
                            // Change type to "doughnut", "line", "splineArea", etc.
                            type: "column",
                            dataPoints: datos
                        }]
                    });
                    chart.render();
                });
            });
        } else {
            alert("Ingresar un número del 1 al 151")
        }

    })
})