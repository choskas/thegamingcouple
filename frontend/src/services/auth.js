import axios from 'axios';
const baseURL = 'https://thegamingcouple.herokuapp.com/api'

const SERVICE = axios.create({ withCredentials: true, baseURL });

const AUTH_SERVICE = {
  signup: async (user) => {
    return await SERVICE.post('/signup', user);
  },
  login: async (user) => {
    return await SERVICE.post('/login', user);
  },
  logOut: async () => {
    return await SERVICE.get('/logout');
  },
  edit: async (form) =>{
    return await SERVICE.put('/edit', form)
  },
  deleteUser: async ()=>{
    return await SERVICE.delete('/deleteuser')
  },
  createTeam: async (form) => {
    return await SERVICE.post('/createteam', form)
  },
  editTeam: async (form, id)=>{
    return await SERVICE.put(`/editteam/${id}`, form)
  },
  allTeams: async () =>{
    return await SERVICE.get('/oneuserteams')
  },
  oneTeam : async (id)=>{
    return await SERVICE.get(`/teamregister/${id}`)
  },
  addOneMember: async (id, form)=>{
    console.log('los auth services: ', id, form)
    return await SERVICE.post(`/addmember/${id}`, form)   
  },
  deleteTeam: async (id) =>{
    return await SERVICE.delete(`/deleteteam/${id}`)
  },
  createGame: async (form) =>{
    return await SERVICE.post('/creategame', form)
  },
  allUsers: async()=>{
    return await SERVICE.get('/allusers')
  },
  allEvents: async ()=>{
    return await SERVICE.get('/eventsall')
  },
  gamesHome: async()=>{
    return await SERVICE.get('/gamesall')
  },
  teamsHome: async()=>{
    return await SERVICE.get('/hometeams')
  },
  oneEvent: async(id)=>{
    return await SERVICE.get(`/event/${id}`)
  },
  oneGame: async(id)=>{
    return await SERVICE.get(`/game/${id}`)
  },
  mail: async(sendmail)=>{
    return await SERVICE.post('/mail/send', sendmail)
  },
  teamRegister: async(id)=>{
    return await SERVICE.get(`/teamregister/${id}`)
  },
  teamsAll: async()=>{
    return await SERVICE.get('/teamsall')
  },
  editGame: async (form, id)=>{
    return await SERVICE.put(`/editgame/${id}`, form)
  },
  deleteGame: async (id) =>{
    return await SERVICE.delete(`/deletegame/${id}`)
  },

  
};

export default AUTH_SERVICE;