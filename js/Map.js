class Map{
    constructor(){
        this.fetchData();
    }

    fetchData(){
        axios.get('192.168.1.24/data.json')
        .then(response => {
            console.log(response)
            const users = response.data.data;
            console.log('GET list users, users');
        })
        .catch(error => console.error(error));
    }
}