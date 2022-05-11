const express = require('express');
const { url } = require('inspector');
const path = require('path')
const app = express()
const urllib = require('urllib');
const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
function getPlayerImg(firstName,lastName){
    const img=`https://nba-players.herokuapp.com/players/${lastName}/${firstName}` 
    return img  

}


function fetchTeamPlayers(allPlayersData,teamId){
    teamPlayers=[]
    for(let player of allPlayersData){
        if(player.isActive && player.teamId===teamId){
            teamPlayers.push({firstName:player.firstName,
            lastName:player.lastName,
            pic:getPlayerImg(player.firstName,player.lastName)})
        }   
    }
    return {teamPlayers}
}

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.get('/api/:teamName', function (request, response) {
    const url ='http://data.nba.net/10s/prod/v1/2018/players.json'
    const teamId=teamToIDs[request.params.teamName]
    let allPlayersData={}
    

urllib.request(url, function (err, data, res) {
    allPlayersData=JSON.parse(data.toString()).league.standard
  
   players=fetchTeamPlayers(allPlayersData,teamId)
   response.send(players)
  
});

})




const port = 3200
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})