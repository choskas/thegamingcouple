import axios from 'axios';
const baseURL = 'http://localhost:3000/api';

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
    return await SERVICE.post('/edit', form)
  },
  createTeam: async (form) => {
    return await SERVICE.post('/createteam', form)
  },
  editTeam: async (form, id)=>{
    return await SERVICE.post(`/editteam/${id}`, form)
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
  }
  

  
};

export default AUTH_SERVICE;