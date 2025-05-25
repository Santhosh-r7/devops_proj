from flask import Flask, request, jsonify
import os
import psycopg2 as psy
from dotenv import load_dotenv
from newsapi import NewsApiClient
from flask_cors import CORS
from flask_pymongo import PyMongo
import random
from datetime import datetime


app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
print(os.environ['MONGO_URI'])
db = PyMongo(app).db

app = Flask(__name__)
CORS(app)
#finally lets goooooo
load_dotenv()

news_api_key = os.getenv('news_api_key')


#api to add users
@app.route('/add_user', methods = ['POST'])
def add_user():
    try:
        data = request.get_json()
        name = data['name']
        email = data['email']
        
        ssn = random.random()%100
        
        user = {
            'name': name,
            'email': email,
            'phone_no': '+91123456789',
            'address': 'ABC, XYZ - 560062',
            'ssn':str(ssn)
        }
        
        db.user_details.insert_one(user)
        
        return jsonify({'status': 'User data added'}), 201
    
    except Exception as e :
        return jsonify({'error': str(e)}), 400

#api to get list of users
@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        users_list_object = db.user_details.find()
        
        users_list = [
            {
                    'name': user['name'],
                    'email': user['email'],
                    'phone_no': user['phone_no'],
                    'address': user['address'],
                    'ssn':user['ssn']
            }
            for user in users_list_object
        ] 
        
        
        return jsonify({'user_details': users_list}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

#api to add a tax record
@app.route('/add_tax_record', methods=['POST'])
def add_tax_record():
    try:
        data = request.get_json()
        
        formatted_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        #income details
        data_map = {
            "email_id": data['email'],
            "income_from_salary": data['income_from_salary'],
            "exempt_allowances": data['exempt_allowances'],
            "income_from_interest": data['income_from_interest'],
            "interest_on_home_loan_self": data['interest_on_home_loan_self'],
            "rental_income_received": data['rental_income_recieved'],
            "interest_on_home_loan": data['interest_on_home_loan'],
            "income_from_digital_assets": data['income_from_digital_assets'],
            "other_income": data['other_income'],
            
            # deductions
            "basic_deductions": data['basic_deductions'],
            "interest_from_deposits": data['interest_from_deposits'],
            "medical_insurance": data['medical_insurance'],
            "donation_to_charity": data['donation_to_charity'],
            "interest_on_education_loan": data['interest_on_education_loan'],
            "contribution_to_nps": data['contribution_to_nps'],
            
            # old regime
            "total_income_old": data['total_income_old'],
            "deductions_old": data['deductions_old'],
            "taxable_income_old": data['taxable_income_old'],
            "total_tax_old": data['total_tax_old'],
            
            # new regime
            "total_income_new": data['total_income_new'],
            "deductions_new": data['deductions_new'],
            "taxable_income_new": data['taxable_income_new'],
            "total_tax_new": data['total_tax_new'],
            
            # extra parameters
            'type': 'savings',
            'date': formatted_time,
            'deductions_description': 'Capital loss',
            'income_bracket': data['income_from_salary']
           
        }
        
        db.tax_details.insert_one(data_map)
        
        return jsonify({'status': 'record added succesfully'}), 201
    except Exception as e :
        return jsonify({'error': str(e)}), 400


#api to get list of all past tax records
@app.route('/get_tax_records/', methods=['GET'])
def get_tax_records():
    try:
        data_object = db.tax_details.find()
    
        data_list = [
            {
                "email_id": data['email_id'],
                "income_from_salary": data['income_from_salary'],
                "exempt_allowances": data['exempt_allowances'],
                "income_from_interest": data['income_from_interest'],
                "interest_on_home_loan_self": data['interest_on_home_loan_self'],
                "rental_income_received": data['rental_income_received'],
                "interest_on_home_loan": data['interest_on_home_loan'],
                "income_from_digital_assets": data['income_from_digital_assets'],
                "other_income": data['other_income'],
                
                # deductions
                "basic_deductions": data['basic_deductions'],
                "interest_from_deposits": data['interest_from_deposits'],
                "medical_insurance": data['medical_insurance'],
                "donation_to_charity": data['donation_to_charity'],
                "interest_on_education_loan": data['interest_on_education_loan'],
                "contribution_to_nps": data['contribution_to_nps'],
                
                # old regime
                "total_income_old": data['total_income_old'],
                "deductions_old": data['deductions_old'],
                "taxable_income_old": data['taxable_income_old'],
                "total_tax_old": data['total_tax_old'],
                
                # new regime
                "total_income_new": data['total_income_new'],
                "deductions_new": data['deductions_new'],
                "taxable_income_new": data['taxable_income_new'],
                "total_tax_new": data['total_tax_new'],
                
                # extra parameters
                'type': data['type'],
                'date': data['date'],
                'deductions_description': data['deductions_description'],
                'income_bracket': data['income_from_salary']
                
                
            }
            for data in data_object
        ] 
        
        return jsonify({'tax-records': data_list}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400
        
#api to get specific records based on email
@app.route('/get_tax_records/<email_id>', methods=['GET'])
def get_tax_record(email_id):
    
    try:
        query= {'email_id': email_id}
    
        data_object = db.tax_details.find(query)
        
        data_list = [
            {
                "email_id": data['email_id'],
                "income_from_salary": data['income_from_salary'],
                "exempt_allowances": data['exempt_allowances'],
                "income_from_interest": data['income_from_interest'],
                "interest_on_home_loan_self": data['interest_on_home_loan_self'],
                "rental_income_received": data['rental_income_received'],
                "interest_on_home_loan": data['interest_on_home_loan'],
                "income_from_digital_assets": data['income_from_digital_assets'],
                "other_income": data['other_income'],
                
                # deductions
                "basic_deductions": data['basic_deductions'],
                "interest_from_deposits": data['interest_from_deposits'],
                "medical_insurance": data['medical_insurance'],
                "donation_to_charity": data['donation_to_charity'],
                "interest_on_education_loan": data['interest_on_education_loan'],
                "contribution_to_nps": data['contribution_to_nps'],
                
                # old regime
                "total_income_old": data['total_income_old'],
                "deductions_old": data['deductions_old'],
                "taxable_income_old": data['taxable_income_old'],
                "total_tax_old": data['total_tax_old'],
                
                # new regime
                "total_income_new": data['total_income_new'],
                "deductions_new": data['deductions_new'],
                "taxable_income_new": data['taxable_income_new'],
                "total_tax_new": data['total_tax_new'],
                
                # extra parameters
                'type': data['type'],
                'date': data['date'],
                'deductions_description': data['deductions_description'],
                'income_bracket': data['income_from_salary']
                
                
            }
            for data in data_object
        ]
        
        return jsonify({'tax-records': data_list}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    



@app.route('/news', methods=['GET'])
def get_news():
    client = NewsApiClient(api_key= news_api_key)
    
    news = client.get_everything(q='finance+india', sort_by='popularity')
    
    return jsonify({'news': news}), 200
    
if __name__ == '__main__':
    app.run()