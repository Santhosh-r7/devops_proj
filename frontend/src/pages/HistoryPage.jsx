import React from 'react';
import AppBar from '../components/AppBar';
import { useState, useEffect } from 'react';
import { useUser } from './auth/UserContext';
import axios from 'axios';
import '../styles/History.css';

const HistoryPage = () => {

  const { user } = useUser();
  const [taxRecords, setTaxRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      console.log(user.email)
      axios.get(`https://tax-track-updated.onrender.com/get_tax_records/${user.email}`)
        .then(response =>   {
          console.log(response)
          setTaxRecords(response.data['tax-records']);
          setLoading(false);
        }).catch(error => {
          console.log(error)
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <>
    <AppBar />
    <div className='main-container-history p-5'>        
      <h2 className="heading font-bold text-3xl text-center m-0">Previous Tax Records</h2><br/>
      <div className="container">      
        {taxRecords.map((record, index) => (
          <div className="card" key={index}>   
          <div className='font-bold text-xl text-center p-2'>Record #{index+1}</div>       
            <div>                
                  <div className='p-1'>Income from Salary: {record.income_from_salary}</div>   
                  <div className='p-1'>Exempt Allowances: {record.exempt_allowances}</div>
                  <div className='p-1'>Income from Interest: {record.income_from_interest}</div>
                  <div className='p-1'>Total Income Old: {record.total_income_old}</div>
                  <div className='p-1'>Total Income New: {record.total_income_new}</div>
                  <div className='p-1'>Total Tax New: {record.total_tax_new}</div>
            </div>
          </div>
        ))}
      </div>
    </div>      
    </>   
  )
}

export default HistoryPage;
