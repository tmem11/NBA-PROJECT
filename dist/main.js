function renderPlayers(teamPlayers){
    const source = $('#player-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template(teamPlayers);
        $('.row').append(newHTML);   

}
const fetchData = function(){
    $('.row').empty()
    let teamName=$("#team-input").val()
    console.log(teamName)
    $.get(`api/${teamName}`,function(data){
        renderPlayers({ players:data.teamPlayers})
        console.log(data.teamPlayers)
    })
}