import axios from 'axios'

const springUrl = process.env.springUrl || 'http://localhost:8090/att'

async function handleAddAttendance(attendance){
    try {
        const response = await axios.post(`${springUrl}/add-att`, attendance);
        console.log("att service", response);
        return response;
      } catch (error) {
          console.log("att service", error);
          throw new Error(error);
      }
}


export default {
    handleAddAttendance
}