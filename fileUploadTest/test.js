// http://localhost:3001


let response = async () => {
    let x = await fetch('http://localhost:3001/', {method: 'get'});

    x = x.json();

    console.log(x.message());
}

response();

