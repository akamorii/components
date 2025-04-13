import React, {useState} from 'react'

const Hitler =  () => {
      const [values, setVoices] = useState([0, 0])
      // console.log(state);
      // console.log(values, setVoices);
    
      function setNewVoice(index) {
        const updates_values = [...values]
        updates_values[index] += 1
        setVoices(updates_values)
      }

      return (
        <div className="App">
        <div>
        <h1>ГИТЛЕР ВИНОВАТ?</h1>
        
        <button onClick={() => setNewVoice(0)}>виноват!!</button>
        <button onClick={() => setNewVoice(1)}>нет!!!!</button>
  
        <p>виноват: {values[0]}</p>
        <p>не виноват: {values[1]}</p>
      </div>
      </div>
      )
}

export default Hitler