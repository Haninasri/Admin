import React, { useState } from "react";
import styles from './TableStyles.module.css';
import {doc, writeBatch, addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
function Reader() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [loading, setLoading]   = useState(false)
  const batch  = writeBatch(db)
  const dbref = collection(db, 'Data')
  const [data, setData]   = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array); 
    console.log(array)
  };


  const handleSubmit = async (event) => {
    event.preventDefault()
    try 
    {
      var docRef = collection(db, 'Data');

      array.map((item, index) => {
          console.log(item)
           addDoc(docRef, item)
          //alert("Data added Successfully")
      });
      
      //awit batch.commit();

      setLoading(false);
      return docRef;
        
      alert("Data added Successfully")
    } 
    catch (error) {
        alert(error)
        setLoading(true);
        
    }

}
  

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  
  return (
    <div style={{ textAlign: "center" }}>
      <h1> CSV IMPORT </h1>
      <form onSubmit={handleSubmit}>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
        <button 
     type="submit"
     className="btn"
     
     >
        Send to FireStore

    </button>
      </form>

      <br />

      <table className={styles.table}>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reader;