import React from 'react'
import AppBar from '../components/AppBar'
import "../styles/Home.css"
import { useUser } from './auth/UserContext'
import axios from 'axios'

const HomePage = () => {

    const {user} = useUser();
    
    const calculateAndShowSummary = async(e) => {  
        let income = parseInt(document.querySelector('[name="input1"]').value) || 0;
        let exemptAllowances = parseInt(document.querySelector('[name="input2"]').value) || 0;
        let incomeInterest = parseInt(document.querySelector('[name="input3"]').value) || 0;
        let interestHomeLoanSelf = parseInt(document.querySelector('[name="input4"]').value) || 0;
        let rentalIncome = parseInt(document.querySelector('[name="input5"]').value) || 0;
        let interestHomeLoanLetOut = parseInt(document.querySelector('[name="input6"]').value) || 0;
        let incomeDigitalAssets = parseInt(document.querySelector('[name="input7"]').value) || 0;
        let otherIncome = parseInt(document.querySelector('[name="input8"]').value) || 0;
    
        let basicDeductions = parseInt(document.querySelector('[name="input-basic-deductions"]').value) || 0;
        let interestDeposits = parseInt(document.querySelector('[name="input-interest-deposits"]').value) || 0;
        let medicalInsurance = parseInt(document.querySelector('[name="input-medical-insurance"]').value) || 0;
        let charityDonations = parseInt(document.querySelector('[name="input-charity-donations"]').value) || 0;
        let educationalLoan = parseInt(document.querySelector('[name="input-educational-loan"]').value) || 0;
        let housingLoan = parseInt(document.querySelector('[name="input-housing-loan"]').value) || 0;
        let npsContribution = parseInt(document.querySelector('[name="input-nps-contribution"]').value) || 0;
    
        let totalIncomeOldRegime = income + incomeInterest + rentalIncome + incomeDigitalAssets + otherIncome - exemptAllowances;
        let totalDeductionsOldRegime = basicDeductions + interestDeposits + medicalInsurance + charityDonations + educationalLoan + housingLoan + npsContribution + interestHomeLoanSelf + interestHomeLoanLetOut;
        let taxableIncomeOldRegime = totalIncomeOldRegime - totalDeductionsOldRegime;
    
        let totalIncomeNewRegime = totalIncomeOldRegime; 
        let totalDeductionsNewRegime = Math.min(50000, totalIncomeNewRegime); 
        let taxableIncomeNewRegime = totalIncomeNewRegime - totalDeductionsNewRegime;  
    
        let taxOldRegime = taxableIncomeOldRegime > 250000 ? (taxableIncomeOldRegime - 250000) * 0.05 : 0;
        let taxNewRegime = taxableIncomeNewRegime > 250000 ? (taxableIncomeNewRegime - 250000) * 0.05 : 0;

        const d = new Date();
        let localDate = d.toLocaleDateString();
        console.log(localDate);

        const taxData = {
            email: user.email,
            income_from_salary: income,
            exempt_allowances: exemptAllowances,
            income_from_interest: incomeInterest,
            interest_on_home_loan_self: interestHomeLoanSelf,
            rental_income_recieved: rentalIncome,
            interest_on_home_loan: interestHomeLoanLetOut,
            income_from_digital_assets: incomeDigitalAssets,
            other_income: otherIncome,
            basic_deductions: basicDeductions,
            interest_from_deposits: interestDeposits,
            medical_insurance: medicalInsurance,
            donation_to_charity: charityDonations,
            interest_on_education_loan: educationalLoan,
            contribution_to_nps: npsContribution,
            total_income_old: totalIncomeOldRegime,
            deductions_old: totalDeductionsOldRegime,
            taxable_income_old: taxableIncomeOldRegime,
            total_tax_old: taxOldRegime,
            total_income_new: totalIncomeNewRegime,
            deductions_new: totalDeductionsNewRegime,
            taxable_income_new: taxableIncomeNewRegime,
            total_tax_new: taxNewRegime, 
            type: "savings",
            date: localDate,
            deductions_description: "Capital loss",
            income_bracket: "1"
        };

        console.log(taxData)

        await axios.post("https://tax-track-updated.onrender.com/add_tax_record", taxData).then(response => {
            console.log('Data sent to backend successfully:', response.data);
        }).catch(error => {
            console.error('Error sending data to backend:', error);
        });

        let summaryText = `
            <table>
            <tr>
                <th></th>
                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Post-Budget(Old Regime)<br>FY(2024-2025)</th>
                <th>&nbsp;&nbsp;&nbsp;Post-Budget(New Regime)<br>FY(2024-2025)</th>
            </tr>
            <tr>
                <td>Total Income</td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs. ${totalIncomeOldRegime.toLocaleString('en-IN')}</td>
                <td>&nbsp;&nbsp;&nbsp;Rs. ${totalIncomeNewRegime.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
                <td>Exemptions & Deductions</td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs. ${totalDeductionsOldRegime.toLocaleString('en-IN')}</td>
                <td>&nbsp;&nbsp;&nbsp;Rs. ${totalDeductionsNewRegime.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
                <td>Taxable Income</td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs. ${taxableIncomeOldRegime.toLocaleString('en-IN')}</td>
                <td>&nbsp;&nbsp;&nbsp;Rs. ${taxableIncomeNewRegime.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
                <td>Tax due on above</td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs. ${taxOldRegime.toLocaleString('en-IN')}</td>
                <td>&nbsp;&nbsp;&nbsp;Rs. ${taxNewRegime.toLocaleString('en-IN')}</td>
            </tr>
            </table>
        `;  

        let summaryElement = document.getElementById('summaryOutput');
        summaryElement.innerHTML = summaryText; 
        showContent('Summary');
    }

    function showContent(contentId) {
        const contents = document.querySelectorAll('.content');
        contents.forEach(function(content) {
            content.style.display = 'none';
            content.classList.remove('active');
        });
        
        const selectedContent = document.getElementById('content-' + contentId);
        if (selectedContent) {
            selectedContent.style.display = 'block';
            selectedContent.classList.add('active');
        }
        
        const radios = document.querySelectorAll('.radio input');
        radios.forEach(function(radio) {
            if (radio.nextElementSibling.textContent.replace(/\s/g, '-') === contentId) {
                radio.checked = true;
            }
        });
    }
    
    function nextStep(nextContentId) {
        showContent(nextContentId);
    }

    return (
        <>
            
            <div class="main-container">
            <AppBar/>
            <div class="heading">
                <h2 className='font-bold text-3xl'>Income Tax Calculator - FY 2024-2025</h2>
            </div>
            
            <div class="radio-inputs">
                <label class="radio">
                <input type="radio" name="radio" checked onClick={() => showContent('Basic-Details')}/>
                <span class="name">Basic Details</span>
                </label>
                <label class="radio">
                <input type="radio" name="radio" onClick={() => showContent('Income-Details')}/>
                <span class="name">Income Details</span>
                </label>
                <label class="radio">
                <input type="radio" name="radio" onClick={() => showContent('Deductions')}/>
                <span class="name">Deductions</span>
                </label>
                <label class="radio">
                <input type="radio" name="radio" onClick={() => showContent('Summary')}/>
                <span class="name">Summary</span>
                </label>
            </div>
            
            <div id="content-Basic-Details" class="content active">
                <h2>Which Financial Year do you want to calculate taxes for?</h2>
                <div class="radio-container">
                <div class="radio-wrapper">
                    <label class="radio-button">
                    <input id="option1" name="financial-year" type="radio"/>
                    <span class="radio-checkmark"></span>
                    <span class="radio-label">FY 2024-2025 Latest Budget (Return to be filed between 1st April 2025 - 31st March 2026)</span>
                    </label>
                </div>
                
                <div class="radio-wrapper">
                    <label class="radio-button">
                    <input id="option2" name="financial-year" type="radio"/>
                    <span class="radio-checkmark"></span>
                    <span class="radio-label">FY 2023-2024 (Return to be filed between 1st April 2024 - 31st March 2025)</span>
                    </label>
                </div>
                </div>
                <h2>Your Age</h2>
                <div class="radio-container">
                <div class="radio-wrapper">
                    <label class="radio-button">
                    <input id="option3" name="age-group" type="radio"/>
                    <span class="radio-checkmark"></span>
                    <span class="radio-label">0 to 60</span>
                    </label>
                </div>
                
                <div class="radio-wrapper">
                    <label class="radio-button">
                    <input id="option4" name="age-group" type="radio"/>
                    <span class="radio-checkmark"></span>
                    <span class="radio-label">60 to 70</span>
                    </label>
                </div>
                <div class="radio-wrapper">
                    <label class="radio-button">
                    <input id="option5" name="age-group" type="radio"/>
                    <span class="radio-checkmark"></span>
                    <span class="radio-label">80 and above</span>
                    </label>
                </div>
                </div>
                <button class="button" onClick={() => nextStep('Income-Details')}>
                <span class="text">Next Step</span>
                <svg class="arrow" viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.8.2-105.7 105.7c-12.5 12.5-12.5 32.8 0 45.3 12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3L438.6 278.6z"/></svg>
                </button>
            </div>
            
            <div id="content-Income-Details" class="content" style={{display: 'none'}}>
                <div class="coolinput-container">
                <div class="coolinput">
                    <label for="input1" class="number">Income from Salary</label>
                    <input type="text" placeholder="Enter" name="input1" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input2" class="text">Exempt Allowances</label>
                    <input type="text" placeholder="Enter" name="input2" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input3" class="text">Income from Interest</label>
                    <input type="text" placeholder="Enter" name="input3" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input4" class="text">Interest on Home Loan-Self</label>
                    <input type="text" placeholder="Enter" name="input4" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input5" class="text">Rental Income Received</label>
                    <input type="text" placeholder="Enter" name="input5" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input6" class="text">Interest on Home Loan- Let Out</label>
                    <input type="text" placeholder="Enter" name="input6" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input7" class="text">Income from Digital Assets</label>
                    <input type="text" placeholder="Enter" name="input7" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input8" class="text">Other Income</label>
                    <input type="text" placeholder="Enter" name="input8" class="input" pattern="[0-9]*"/>
                </div>
                </div>
                <button class="button" onClick={() => nextStep('Deductions')}>
                <span class="text">Next Step</span>
                <svg class="arrow" viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.8.2-105.7 105.7c-12.5 12.5-12.5 32.8 0 45.3 12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3L438.6 278.6z"/></svg>
                </button>
            </div>
            
            <div id="content-Deductions" class="content" style={{display:'none'}}>
                <div class="coolinput-container">
                <div class="coolinput">
                    <label for="input-basic-deductions" class="text">Basic Deductions</label>
                    <input type="text" placeholder="Enter" name="input-basic-deductions" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input-interest-deposits" class="text">Interest from Deposits</label>
                    <input type="text" placeholder="Enter" name="input-interest-deposits" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input-medical-insurance" class="text">Medical Insurance</label>
                    <input type="text" placeholder="Enter" name="input-medical-insurance" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input-charity-donations" class="text">Donations to Charity</label>
                    <input type="text" placeholder="Enter" name="input-charity-donations" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input-educational-loan" class="text">Interest on Educational Loan</label>
                    <input type="text" placeholder="Enter" name="input-educational-loan" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input-housing-loan" class="text">Interest on Housing Loan</label>
                    <input type="text" placeholder="Enter" name="input-housing-loan" class="input" pattern="[0-9]*"/>
                </div>
                <div class="coolinput">
                    <label for="input-nps-contribution" class="text">Employee's contribution to NPS</label>
                    <input type="text" placeholder="Enter" name="input-nps-contribution" class="input" pattern="[0-9]*"/>
                </div>
                </div>
                <button id="calculateButton" class="button" onClick={() => calculateAndShowSummary()}>
                <span class="text">Calculate</span>
                <svg class="arrow" viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.8.2-105.7 105.7c-12.5 12.5-12.5 32.8 0 45.3 12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3L438.6 278.6z"/></svg>
                </button>
            </div>
            
            <div id="content-Summary" class="content" style={{display: 'none'}}>
                
                <div id="summaryOutput"></div>
                <p class="summary-suggestion"><strong>ClearTax Suggestion:</strong> You should opt for Old Regime as it allows you to avail exemptions and deductions from your income sources.</p>
                
            </div>
            </div>                                   
        </>
    )
}

export default HomePage