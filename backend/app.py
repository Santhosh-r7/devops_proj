from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import psycopg2 as psy
from dotenv import load_dotenv
from newsapi import NewsApiClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
#finally lets goooooo
load_dotenv()

#getting username and password from .env file
username = os.getenv('username')
pwd = os.getenv('password')
news_api_key = os.getenv('news_api_key')
render_db_url = os.getenv('DATABASE_URL')
print(f"Username: {username}, Password: {pwd}")

#connecting to postgresql
def get_db_connection():
    conn = psy.connect(render_db_url)
    
    return conn

#api to add users
@app.route('/add_user', methods = ['POST'])
def add_user():
    data = request.get_json()
    name = data['name']
    age = data['age']
    email = data['email']
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('INSERT INTO user_details(name, age, email_id) VALUES(%s, %s, %s)', (name, age, email))
    
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({'status': 'User data added'}), 201

#api to get list of users
@app.route('/get_users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM user_details')
    rows = cur.fetchall()
    user_records = []
    columns = ['name', 'age', 'email_id', 'id']
    for row in rows:
            record_dict = {}
            for i, value in enumerate(row):
                record_dict[columns[i]] = value
            user_records.append(record_dict)
    cur.close()
    conn.close()
    
    return jsonify({'user_details': user_records}), 201

#api to add a tax record
@app.route('/add_tax_record', methods=['POST'])
def add_tax_record():
    try:
        data = request.get_json()
        #income details
        email_id = data['email_id']
        income_from_salary = data['income_from_salary']
        exempt_allowances = data['exempt_allowances']
        income_from_interest = data['income_from_interest']
        interest_on_home_loan_self = data['interest_on_home_loan_self']
        rental_income_recieved = data['rental_income_recieved']
        interest_on_home_loan = data['interest_on_home_loan']
        income_from_digital_assets = data['income_from_digital_assets']
        other_income = data['other_income']
        
        #deductions
        basic_deductions = data['basic_deductions']
        interest_from_deposits = data['interest_from_deposits']
        medical_insurance = data['medical_insurance']
        donation_to_charity = data['donation_to_charity']
        interest_on_education_loan = data['interest_on_education_loan']
        contribution_to_nps = data['contribution_to_nps']
        
        #old regime
        total_income_old = data['total_income_old']
        deductions_old = data['deductions_old']
        taxable_income_old = data['taxable_income_old']
        total_tax_old = data['total_tax_old']
        
        #new regime
        total_income_new = data['total_income_new']
        deductions_new = data['deductions_new']
        taxable_income_new = data['taxable_income_new']
        total_tax_new = data['total_tax_new']
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('INSERT INTO tax_details(email_id, income_from_salary, exempt_allowances, income_from_interest, interest_on_home_loan_self, rental_income_recieved, interest_on_home_loan, income_from_digital_assets, other_income, basic_deductions, interest_from_deposits, medical_insurance, donation_to_charity, interest_on_education_loan, contribution_to_nps, total_income_old,  deductions_old, taxable_income_old, total_tax_old, total_income_new, deductions_new, taxable_income_new, total_tax_new) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (email_id, income_from_salary, exempt_allowances, income_from_interest, interest_on_home_loan_self, rental_income_recieved, interest_on_home_loan, income_from_digital_assets, other_income, basic_deductions, interest_from_deposits, medical_insurance, donation_to_charity, interest_on_education_loan, contribution_to_nps, total_income_old,  deductions_old, taxable_income_old, total_tax_old, total_income_new, deductions_new, taxable_income_new, total_tax_new))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({'status': 'record added succesfully'}), 201
    except Exception as e :
        return jsonify({'error': str(e)}), 400


#api to get list of all past tax records
@app.route('/get_tax_records/', methods=['GET'])
def get_tax_records():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM tax_details')
    columns = ['email_id', 'income_from_salary', 'exempt_allowances', 'income_from_interest', 'interest_on_home_loan_self', 'rental_income_recieved', 'interest_on_home_loan', 'income_from_digital_assets', 'other_income', 'basic_deductions', 'interest_from_deposits', 'medical_insurance', 'donations_to_charity', 'interest_on_educational_loan', 'contribution_to_nps', 'total_income_old',  'deductions_old', 'taxable_income_old', 'total_tax_old', 'total_income_new', 'deductions_new', 'taxable_income_new', 'total_tax_new']
    tax_records = []
    # cur.execute('SELECT email_id, income_from_salary, exempt_allowances, income_from_interest, interest_on_home_loan_self, rental_income_recieved, interest_on_home_loan, income_from_digital_assets, other_income, basic_deductions, interest_from_deposits, medical_insurance, donation_to_charity, interest_on_education_loan, contribution_to_nps, total_income_old,  deductions_old, taxable_income_old, total_tax_old, total_income_new, deductions_new, taxable_income_new, total_tax_new FROM tax_details')
    rows = cur.fetchall()
    for row in rows:
            record_dict = {}
            for i, value in enumerate(row):
                record_dict[columns[i]] = value
            tax_records.append(record_dict)
            
    cur.close()
    conn.close()
    
    return jsonify({'tax-records': tax_records}), 200

#api to get specific records based on email
@app.route('/get_tax_records/<email_id>', methods=['GET'])
def get_tax_record(email_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM tax_details WHERE email_id = %s', (email_id,))
    columns = ['email_id', 'income_from_salary', 'exempt_allowances', 'income_from_interest', 'interest_on_home_loan_self', 'rental_income_recieved', 'interest_on_home_loan', 'income_from_digital_assets', 'other_income', 'basic_deductions', 'interest_from_deposits', 'medical_insurance', 'donations_to_charity', 'interest_on_educational_loan', 'contribution_to_nps', 'total_income_old',  'deductions_old', 'taxable_income_old', 'total_tax_old', 'total_income_new', 'deductions_new', 'taxable_income_new', 'total_tax_new']
    tax_records = []
    rows = cur.fetchall()
    for row in rows:
            record_dict = {}
            for i, value in enumerate(row):
                record_dict[columns[i]] = value
            tax_records.append(record_dict)
            
    cur.close()
    conn.close()
    
    return jsonify({'tax-records': tax_records}), 200



@app.route('/news', methods=['GET'])
def get_news():
    client = NewsApiClient(api_key= news_api_key)
    
    news = client.get_everything(q='finance+india', sort_by='popularity')
    
    return jsonify({'news': news}), 200
    
if __name__ == '__main__':
    app.run()