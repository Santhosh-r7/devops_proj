import React, { useState } from 'react';
import '../styles/Faq.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import AppBar from '../components/AppBar';

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const togglePanel = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="main-container-faq">
      <AppBar/>
      <div className="wrapper">
        <h1 className='font-bold text-3xl'>Frequently Asked Questions</h1>

        <div className={`faq ${activeIndex === 0 ? 'active' : ''}`}>
          <button className="question" onClick={() => togglePanel(0)}>
            How can I calculate my Income tax?
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="pannel" style={{ display: activeIndex === 0 ? 'block' : 'none' }}>
            <p>
              The salary income is comprised of the Basic salary + HRA + Special Allowance + Transport Allowance + any other allowance. Some of the components of the salary are exempt from tax, like reimbursement of the telephone bills, leave travel allowance, etc. If you have rented a place and received HRA, you can also claim an exemption on HRA.

              Apart from these deductions, there is a standard deduction of Rs 40,000 which was introduced in the budget 2018 which was later increased to Rs 50,000 in the budget 2019.
            </p>
          </div>
        </div>

        <div className={`faq ${activeIndex === 1 ? 'active' : ''}`}>
          <button className="question" onClick={() => togglePanel(1)}>
            How much tax will be deducted from my salary?
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="pannel" style={{ display: activeIndex === 1 ? 'block' : 'none' }}>
            <p>
              The tax will be levied based on the income slab you belong to. You can refer to the income tax slabs and rates table given in the article to get more clarity on this.
            </p>
          </div>
        </div>

        <div className={`faq ${activeIndex === 2 ? 'active' : ''}`}>
          <button className="question" onClick={() => togglePanel(2)}>
            Does everyone have to file their income tax returns?
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="pannel" style={{ display: activeIndex === 2 ? 'block' : 'none' }}>
            <p>
              No, if your income is below the basic exemption limit then you are not required to file income tax returns. However, those with an income less than Rs 2.5L and who still want to claim an income tax refund can only claim the refund by filing an ITR. Otherwise, if it’s above the basic exemption limit, it is mandatory to file income tax returns.
            </p>
          </div>
        </div>

        <div className={`faq ${activeIndex === 3 ? 'active' : ''}`}>
          <button className="question" onClick={() => togglePanel(3)}>
            How can I manage my income tax?
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="pannel" style={{ display: activeIndex === 3 ? 'block' : 'none' }}>
            <p>
              One of the easiest ways to save tax is to avail tax deductions under section 80C. Each fiscal year presents an opportunity to reduce your taxable income by upto 15 lakh through section 80C deductions.
            </p>
          </div>
        </div>

        <div className={`faq ${activeIndex === 4 ? 'active' : ''}`}>
          <button className="question" onClick={() => togglePanel(4)}>
            How much income is tax free?
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="pannel" style={{ display: activeIndex === 4 ? 'block' : 'none' }}>
            <p>
              As per the new tax regime, the tax exemption limit for individuals is Rs 3,00,000. On the other hand, as per the old tax regime, a person below 60 years is exempt up to Rs 2,50,000, senior citizens (60 to 80 years) are exempt up to Rs 3,00,000 and super senior citizens (above 80 years) are exempted up to Rs 5,00,000.
            </p>
          </div>
        </div>

        <div className={`faq ${activeIndex === 5 ? 'active' : ''}`}>
          <button className="question" onClick={() => togglePanel(5)}>
            Does the income tax calculator calculate TDS also?
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="pannel" style={{ display: activeIndex === 5 ? 'block' : 'none' }}>
            <p>
              No, the income tax calculator does not calculate TDS. Note, it calculates an individual's tax liability for a certain assessment year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;