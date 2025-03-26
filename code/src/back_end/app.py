from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
import os
import random

app = Flask(__name__)

# Enable CORS for all routes (you can be more specific if needed)
# CORS(app, resources={
#     r"/*": {
#         "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
#         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#         "allow_headers": ["Content-Type", "Authorization"]
#     }
# })
# Function to load users from a CSV file
def load_from_csv(file_path):
    users = []
    with open(file_path, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # # Convert string values to proper types if needed
            # row['age'] = int(row['age'])  # Convert age to integer
            users.append(row)
    return users

# Get the directory of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))
# Go up to src directory
src_dir = os.path.abspath(os.path.join(current_dir, '..'))
# Data directory path
data_dir = os.path.join(src_dir, 'data')

# Load users data from the CSV file when the app starts
try:
    account_data = load_from_csv(os.path.join(data_dir, 'accounts.csv'))
    transaction_date = load_from_csv(os.path.join(data_dir, 'transactions.csv'))
    cards_date = load_from_csv(os.path.join(data_dir, 'cards.csv'))
    user_info = load_from_csv(os.path.join(data_dir, 'users.csv'))
    print("Successfully loaded all CSV files")
    print(f"Loaded {len(account_data)} accounts, {len(transaction_date)} transactions, {len(cards_date)} cards, {len(user_info)} users")
except Exception as e:
    print(f"Error loading CSV files: {str(e)}")
    account_data = []
    transaction_date = []
    cards_date = []
    user_info = []

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_id = data.get('id')
    password = data.get('password')

    print("Login attempt - User ID:", user_id)
    print("Password provided:", password)

    # Find user in user_info using user_id and password
    user = next((u for u in user_info if u['id'] == user_id and u['password'] == password), None)
    print("User found:", user)

    if user:
        # Return comprehensive user data for localStorage
        return jsonify({
            'id': user['id'],
            'username': user.get('username', user['id']),
            'email': user.get('email', ''),
            'name': user.get('name', ''),
            'phone': user.get('phone', ''),
            'income': user.get('income', ''),
            'address': user.get('address', ''),
            'city': user.get('city', ''),
            'state': user.get('state', ''),
            'zip': user.get('zip', ''),
            'date_of_birth': user.get('date_of_birth', ''),
            'isLoggedIn': True
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/signout', methods=['POST'])
def signout():
    # Since we're not maintaining any server-side session,
    # we just return a success response
    # The frontend should handle clearing any stored credentials
    return jsonify({
        'message': 'Successfully signed out',
        'status': 'success'
    }), 200

# Route to fetch user details by customer_id
@app.route('/user/<customer_id>', methods=['GET'])
def get_user_by_customer_id(customer_id):
    # Search for the user with the matching customer_id
    user = next((user for user in account_data if user["user_id"] == customer_id), None)
    
    if user:
        return jsonify(user), 200  # Return user data as JSON with HTTP status 200
    else:
        return jsonify({"error": "User not found"}), 404  # Return error if not found
    
def get_transaction_by_customer_id_flask(customer_id):
    # Search for the user with the matching customer_id
    user_transactions = [user for user in transaction_date if user["user_id"] == customer_id]
    
    if user_transactions:
        return user_transactions  # Return user data as JSON with HTTP status 200
    else:
        return jsonify({"error": "User not found"})
    
@app.route('/transaction/<customer_id>', methods=['GET'])
def get_transaction_by_customer_id(customer_id):
    # Search for the user with the matching customer_id
    user_transactions = [user for user in transaction_date if user["user_id"] == customer_id]
    
    if user_transactions:
        return jsonify(user_transactions), 200  # Return user data as JSON with HTTP status 200
    else:
        return jsonify({"error": "User not found"}), 404  # Return error if not found
    
@app.route('/cards/', methods=['GET'])
def get_credit_cards_by_customer_id():
    # Search for the user with the matching customer_id
    card_details = [card for card in cards_date]
    
    if card_details:
        return jsonify(card_details), 200  # Return user data as JSON with HTTP status 200
    else:
        return jsonify({"error": "User not found"}), 404  # Return error if not found
    

import os
from dotenv import load_dotenv
import json
import traceback
from typing import Dict, List, Optional
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

class CreditCardRecommender:
    SYSTEM_PROMPT = """
    You are an advanced AI financial advisor specializing in hyper-personalized credit card recommendations.
    Strictly follow these guidelines:

    1. **Data Analysis**:  
    - Thoroughly analyze the user's transaction history  
    - Identify their dominant spending category (e.g., travel, dining, gaming)  
    - Detect any niche interests (e.g., K-pop, anime, sneaker collecting)  

    2. **Card Selection**:  
    - Recommend ONLY ONE credit card that maximizes rewards for their spending pattern  
    - Prioritize cards with sign-up bonuses if their spending justifies it  

    3. **Response Format**:  
    - Output MUST be valid JSON with these exact keys:  
        {  
        "id": "unique_card_identifier",  
        "title": "Full card name",  
        "description": "Concise rationale (30 words max)",  
        "category": "Primary spending category (e.g., 'travel')",  
        "annual_fee": 99,  
        "cashback": "Tiered cashback structure (e.g., '5% on gas')",  
        "reward_points": "Points system (e.g., '3X points on dining')",  
        "benefits": ["Priority boarding", "Free Uber credits"],  
        "min_income_required": 40000, 
        "why_specific_for_you": "Explains data-driven personalization (e.g., 'You spend $600/month on groceries – this card gives 6% back at supermarkets')", 
        "marketing_statement": "Meme-referenced pitch (e.g., 'Shut up and take my money!' for Futurama fans)"  
        }  

    4. **Marketing Statement Rules**:  
    - MUST reference viral memes/trends related to the user's interest  
    - Examples:  
        - Gaming: "GG! This card gives you OP loot (5% back on Steam)"  
        - Crypto: "When Lambo? Get 3X points on crypto purchases 👀"  
        - Gym rats: "Stop scrolling, start swiping! (3% back on protein)"  
    - Use emojis sparingly (max 2 per statement)  

    5. **Prohibited Actions**:  
    - Never recommend multiple cards  
    - Never omit required JSON keys  
    - Never use generic phrases like "great rewards" without specificity  
    """

    def __init__(self, api_key: str):
        """
        Initialize the credit card recommendation system with OpenRouter
        
        :param api_key: OpenRouter API key
        """
        self.client = OpenAI(
            api_key=api_key,
            base_url='https://openrouter.ai/api/v1'
        )

    def recommend_credit_card(
        self, 
        user_transactions_data: Dict, 
        credit_card_options: Dict
    ) -> Dict:
        """
        Recommend the most suitable credit card based on user data
        
        :param user_transactions_data: User's transaction history and profile
        :param credit_card_options: Available credit card options
        :return: Recommended credit card as a dictionary
        """
        try:
            # Prepare the recommendation request
            response = self.client.chat.completions.create(
                model='deepseek/deepseek-chat-v3-0324:free',
                response_format={'type': 'json_object'},
                messages=[
                    {
                        'role': 'system', 
                        'content': self.SYSTEM_PROMPT
                    },
                    {
                        'role': 'user',
                        'content': json.dumps({
                            'user_transactions_data': user_transactions_data,
                            'credit_card_options': credit_card_options,
                            'detailed_instructions': '''
                                CRITICAL: Your response MUST be a VALID JSON object.
                                - Do NOT add any text before or after the JSON
                                - Ensure all required fields are present
                                - Use appropriate data types
                                - If no perfect match, choose the closest option
                            '''
                        })
                    }
                ],
                temperature=0.7,
                max_tokens=500,
                top_p=0.9,
                frequency_penalty=0.5,
                presence_penalty=0.5
            )

            # Extract and clean the response content
            raw_content = response.choices[0].message.content or ''
            print("Raw API Response:", raw_content)  # Debug print

            # Attempt to parse the JSON
            try:
                recommendation = json.loads(raw_content.strip())
            except json.JSONDecodeError as json_error:
                # print(f"JSON Parsing Error: {json_error}")
                # print("Problematic Content:", repr(raw_content))
                
                # Attempt to extract JSON from the content
                import re
                json_match = re.search(r'\{.*\}', raw_content, re.DOTALL)
                if json_match:
                    try:
                        recommendation = json.loads(json_match.group(0))
                    except Exception as extract_error:
                        print(f"JSON Extraction Error: {extract_error}")
                        raise
                else:
                    raise

            return recommendation

        except Exception as error:
            print(f'Credit Card Recommendation Error: {error}')
            print(traceback.format_exc())  # Print full traceback
            raise

    def validate_recommendation(self, recommendation: Dict) -> bool:
        """
        Validate the structure of the credit card recommendation
        
        :param recommendation: Recommended credit card dictionary
        :return: Whether the recommendation is valid
        """
        required_keys = [
            'id', 'title', 'description', 
            'category', 'annual_fee', 
            'cashback', 'reward_points', 
            'benefits', 'min_income_required'
        ]
        
        # Detailed validation
        is_valid = all(key in recommendation for key in required_keys)
        
        if not is_valid:
            print("Missing keys in recommendation:")
            for key in required_keys:
                if key not in recommendation:
                    print(f"- {key}")
        
        return is_valid
    
user_interests = [
    "Technology",
    "Science",
    "Movies & TV Shows",
    "Music",
    "Books & Literature",
    "Sports",
    "Gaming",
    "Travel",
    "Food & Cooking",
    "Fitness & Health",
    "Finance & Investing",
    "Business & Entrepreneurship",
    "Self-Improvement",
    "Fashion & Style",
    "Photography",
    "Cars & Automobiles",
    "Art & Design",
    "Education & Learning",
    "Mental Health & Wellness",
    "Social Media & Influencers"
]


@app.route('/recommenedOffers/<customer_id>', methods=['GET'])
def get_recommend_offers_customer_id(customer_id):
    # users_detai, = get_user_by_customer_id(customer_id)
    transactions = get_transaction_by_customer_id_flask(customer_id)

    print("hi",transactions)

    # Sample user transactions data
    user_transactions_data = {
        "transactions": transactions,
        "user_interest": random.choice(["Movies", "Technology", "Science", "Gaming", "Mental Health & Wellness", "Social Media & Influencers"]) 
    }

    # Sample credit card options
    credit_card_options = {
        "credit_cards": [
            {
                "card_name": "Elite Dining Rewards",
                "category": "Dining",
                "annual_fee": 999,
                "cashback": "5% on dining, 2% on groceries",
                "reward_points": "10x on restaurants",
                "benefits": [
                "Complimentary fine-dining vouchers",
                "Priority reservations at premium restaurants",
                "No surcharge on food delivery platforms"
                ],
                "min_income_required": 500000,
                "bank": "XYZ Bank"
            },
            {
                "card_name": "Global Travel Explorer",
                "category": "Travel",
                "annual_fee": 2999,
                "cashback": "5% on flight and hotel bookings",
                "reward_points": "15x on international spends",
                "benefits": [
                "Complimentary airport lounge access",
                "Zero forex markup",
                "Travel insurance and trip cancellation cover"
                ],
                "min_income_required": 700000,
                "bank": "ABC Bank"
            },
            {
                "card_name": "Luxury Prestige Platinum",
                "category": "Luxury",
                "annual_fee": 4999,
                "cashback": "3% on premium brands",
                "reward_points": "20x on luxury shopping",
                "benefits": [
                "Personalized concierge service",
                "Access to exclusive fashion events",
                "Free business-class flight upgrade once a year"
                ],
                "min_income_required": 1000000,
                "bank": "Premium FinCorp"
            },
           {
                "card_name": "Lifestyle Premium Card",
                "category": "Lifestyle",
                "annual_fee": 1499,
                "cashback": "3% on shopping and entertainment",
                "reward_points": "5x on streaming services",
                "benefits": [
                    "Complimentary movie tickets monthly",
                    "Buy-one-get-one on weekend shopping",
                    "Exclusive brand discounts"
                ],
                "min_income_required": 400000,
                "bank": "XYZ Bank"
            },
            {
                "card_name": "Student Essentials",
                "category": "Education",
                "annual_fee": 0,
                "cashback": "2% on educational expenses",
                "reward_points": "3x on books and stationery",
                "benefits": [
                    "Education loan interest discounts",
                    "Free educational subscriptions",
                    "Internship opportunity priorities"
                ],
                "min_income_required": 100000,
                "bank": "Education Bank"
            },
            {
                "card_name": "Business Professional",
                "category": "Business",
                "annual_fee": 4999,
                "cashback": "4% on business expenses",
                "reward_points": "12x on business travel",
                "benefits": [
                    "Dedicated business lounge access",
                    "Expense management tools",
                    "Tax advisory services",
                    "Extended warranty on business purchases"
                ],
                "min_income_required": 1000000,
                "bank": "Business Bank"
            }
        ]
    }

    # Initialize recommender
    recommender = CreditCardRecommender(
        api_key=os.getenv('OPENROUTER_API_KEY', '')  # Use OpenRouter API key from environment
    )

    # Get recommendation
    recommendation = recommender.recommend_credit_card(
        user_transactions_data, 
        credit_card_options
    )

    # Validate recommendation
    if recommender.validate_recommendation(recommendation):
        print("Recommended Credit Card:")
        print(json.dumps(recommendation, indent=2))
        return json.dumps(recommendation, indent=2)
    else:
        print("Invalid recommendation format")
        return {}
    



class CreditCardRecommender1:
    SYSTEM_PROMPT1 = """
    You are an advanced AI financial advisor specializing in hyper-personalized insurance recommendations.
    Strictly follow these guidelines:

    1. **Data Analysis**:  
    - Thoroughly analyze the user's transaction history    
    - Detect any niche interests (e.g., K-pop, anime, sneaker collecting)  

    2. **Insurance Selection**:  
    - Recommend ONLY ONE insurance insurance that maximizes benefits for their spending pattern  
    - Prioritize insurance with benefots if their spending justifies it  

    3. **Response Format**:  
    - Output MUST be valid JSON with these exact keys:  
        {  
        "plan_name": "unique_plan_identifier",  
        "title": "Full insurance name",  
        "description": "Concise rationale (30 words max)",  
        "category": "insurance categpry",  
        "annual_fee": 99,  
        "coverage": "Insurance coverage (e.g., Up to ₹50,00,000 life cover)",
        "benefits": ["Life cover with additional critical illness riders","Flexible premium payment terms",],  
        "min_age_required": 18, 
        "why_specific_for_you": "Explains data-driven personalization (e.g., 'You spend $600/month on hospitals – this insurance gives 500000 cover')", 
        "marketing_statement": "Meme-referenced pitch (e.g., 'Shut up and take my insurance!' for Futurama fans)"  
        }  

    4. **Marketing Statement Rules**:  
    - MUST reference viral memes/trends related to the user's interest  
    - Examples:  
        - Gaming: "GG! This insurance gives you OP loot (5% back on Steam)"  
        - Crypto: "When Lambo? Get 3X points on crypto purchases 👀"  
        - Gym rats: "Stop scrolling, start swiping! (3% back on protein)"  
    - Use emojis sparingly (max 2 per statement)  

    5. **Prohibited Actions**:  
    - Never recommend more than TWO insurance  
    - Never omit required JSON keys  
    - Never use generic phrases like "great rewards" without specificity  
    """

    def __init__(self, api_key: str):
        """
        Initialize the insurance recommendation system with OpenRouter
        
        :param api_key: OpenRouter API key
        """
        self.client = OpenAI(
            api_key=api_key,
            base_url='https://openrouter.ai/api/v1'
        )

    def recommend_credit_card1(
        self, 
        user_transactions_data: Dict, 
        insurance_options: Dict
    ) -> Dict:
        """
        Recommend the TWO suitable insurance based on user data
        
        :param user_transactions_data: User's transaction history and profile
        :param insurance_options: Available insurance options
        :return: Recommended insurance as a dictionary
        """
        try:
            # Prepare the recommendation request
            response = self.client.chat.completions.create(
                model='deepseek/deepseek-chat-v3-0324:free',
                response_format={'type': 'json_object'},
                messages=[
                    {
                        'role': 'system', 
                        'content': self.SYSTEM_PROMPT1
                    },
                    {
                        'role': 'user',
                        'content': json.dumps({
                            'user_transactions_data': user_transactions_data,
                            'insurance_options': insurance_options,
                            'detailed_instructions': '''
                                CRITICAL: Your response MUST be a VALID JSON object.
                                - Do NOT add any text before or after the JSON
                                - Ensure all required fields are present
                                - Use appropriate data types
                                - If no perfect match, choose the closest option
                            '''
                        })
                    }
                ],
                temperature=0.7,
                max_tokens=500,
                top_p=0.9,
                frequency_penalty=0.5,
                presence_penalty=0.5
            )

            # Extract and clean the response content
            raw_content = response.choices[0].message.content or ''
            print("Raw API Response:", raw_content)  # Debug print

            # Attempt to parse the JSON
            try:
                recommendation = json.loads(raw_content.strip())
            except json.JSONDecodeError as json_error:
                # print(f"JSON Parsing Error: {json_error}")
                # print("Problematic Content:", repr(raw_content))
                
                # Attempt to extract JSON from the content
                import re
                json_match = re.search(r'\{.*\}', raw_content, re.DOTALL)
                if json_match:
                    try:
                        recommendation = json.loads(json_match.group(0))
                    except Exception as extract_error:
                        print(f"JSON Extraction Error: {extract_error}")
                        raise
                else:
                    raise

            return recommendation

        except Exception as error:
            print(f'Insurance Recommendation Error: {error}')
            print(traceback.format_exc())  # Print full traceback
            raise

    def validate_recommendation1(self, recommendation: Dict) -> bool:
        """
        Validate the structure of the insurance recommendation
        
        :param recommendation: Recommended insurance dictionary
        :return: Whether the recommendation is valid
        """
        required_keys = [
            'plan_name', 'title', 'description', 
            'category', 'annual_fee', 
            'coverage', 'min_age_required', 
            'benefits',
        ]
        
        # Detailed validation
        is_valid = all(key in recommendation for key in required_keys)
        
        if not is_valid:
            print("Missing keys in recommendation:")
            for key in required_keys:
                if key not in recommendation:
                    print(f"- {key}")
        
        return is_valid
    
@app.route('/recommenedInsurance/<customer_id>', methods=['GET'])
def get_recommend_insurance_offers_customer_id(customer_id):
    # users_detai, = get_user_by_customer_id(customer_id)
    transactions = get_transaction_by_customer_id_flask(customer_id)

    print("hi",transactions)

    # Sample user transactions data
    user_transactions_data = {
        "transactions": transactions,
        "user_interest": ["Movies"]
    }
    # Sample credit card options
    credit_card_options = {
        "credit_cards": [
            {
                "card_name": "Elite Dining Rewards",
                "category": "Dining",
                "annual_fee": 999,
                "cashback": "5% on dining, 2% on groceries",
                "reward_points": "10x on restaurants",
                "benefits": [
                "Complimentary fine-dining vouchers",
                "Priority reservations at premium restaurants",
                "No surcharge on food delivery platforms"
                ],
                "min_income_required": 500000,
                "bank": "XYZ Bank"
            },
            {
                "card_name": "Global Travel Explorer",
                "category": "Travel",
                "annual_fee": 2999,
                "cashback": "5% on flight and hotel bookings",
                "reward_points": "15x on international spends",
                "benefits": [
                "Complimentary airport lounge access",
                "Zero forex markup",
                "Travel insurance and trip cancellation cover"
                ],
                "min_income_required": 700000,
                "bank": "ABC Bank"
            },
            {
                "card_name": "Luxury Prestige Platinum",
                "category": "Luxury",
                "annual_fee": 4999,
                "cashback": "3% on premium brands",
                "reward_points": "20x on luxury shopping",
                "benefits": [
                "Personalized concierge service",
                "Access to exclusive fashion events",
                "Free business-class flight upgrade once a year"
                ],
                "min_income_required": 1000000,
                "bank": "Premium FinCorp"
            },
            {
                "card_name": "Smart Shopper Cashback",
                "category": "Shopping",
                "annual_fee": 799,
                "cashback": "10% on Amazon, Flipkart, Myntra",
                "reward_points": "5x on all retail shopping",
                "benefits": [
                "Buy now, pay later with 0% interest",
                "Extra warranty on electronics",
                "Exclusive partner discounts"
                ],
                "min_income_required": 400000,
                "bank": "Retail Bank"
            },
            {
                "card_name": "Fuel Saver Gold",
                "category": "Fuel",
                "annual_fee": 499,
                "cashback": "5% on fuel transactions",
                "reward_points": "3x on fuel and toll payments",
                "benefits": [
                "1% fuel surcharge waiver",
                "Free road assistance and car insurance discounts",
                "Monthly fuel vouchers"
                ],
                "min_income_required": 300000,
                "bank": "Petro Finance"
            },
            {
                "card_name": "Online Spender Pro",
                "category": "Online",
                "annual_fee": 999,
                "cashback": "7% on OTT, food delivery & gaming",
                "reward_points": "8x on e-commerce & digital payments",
                "benefits": [
                "Free Netflix & Spotify subscription",
                "No-cost EMI on gadgets",
                "Cyber fraud protection"
                ],
                "min_income_required": 450000,
                "bank": "DigitalPay Bank"
            }
        ]
    }

    insurance_options = {
        "insurance_plans": [
            {
                "plan_name": "Elite Health Coverage",
                "category": "Health",
                "annual_premium": 15000,
                "coverage": "Up to ₹10,00,000 for hospitalization, surgeries, and critical illnesses",
                "benefits": [
                    "Cashless treatment at network hospitals",
                    "Pre and post-hospitalization coverage",
                    "Free annual health check-ups",
                    "Maternity and new-born baby coverage"
                ],
                "min_age_required": 18,
                "max_age_limit": 65,
                "insurance_provider": "HealthGuard Insurance"
            },
            {
                "plan_name": "Global Travel Shield",
                "category": "Travel",
                "annual_premium": 12000,
                "coverage": "Comprehensive travel insurance including trip cancellations and medical emergencies",
                "benefits": [
                    "Emergency medical evacuation",
                    "Trip interruption and cancellation cover",
                    "Lost luggage and personal belongings cover",
                    "24/7 customer assistance and helpline"
                ],
                "min_age_required": 18,
                "max_age_limit": 70,
                "insurance_provider": "SafeTravel Insurance"
            },
            {
                "plan_name": "Family Protect Plus",
                "category": "Family",
                "annual_premium": 25000,
                "coverage": "Up to ₹15,00,000 for health, accidents, and death benefits for the entire family",
                "benefits": [
                    "Covers hospitalization and critical illness for the entire family",
                    "Accidental death and disability benefits",
                    "Daily cash allowance for hospitalization",
                    "Emergency ambulance coverage"
                ],
                "min_age_required": 18,
                "max_age_limit": 70,
                "insurance_provider": "FamilyCare Insurers"
            },
            {
                "plan_name": "Car Accident Protection",
                "category": "Vehicle",
                "annual_premium": 8000,
                "coverage": "Comprehensive coverage for accidents, damage, and theft of the car",
                "benefits": [
                    "Zero depreciation cover",
                    "Third-party liability cover",
                    "Own damage protection",
                    "Roadside assistance and emergency towing"
                ],
                "min_age_required": 21,
                "max_age_limit": 65,
                "insurance_provider": "DriveSafe Insurance"
            },
            {
                "plan_name": "Home Shield Protection",
                "category": "Home",
                "annual_premium": 10000,
                "coverage": "Up to ₹20,00,000 for fire, theft, and natural disaster damage to your home",
                "benefits": [
                    "Damage caused by fire, flooding, and earthquakes",
                    "Loss or theft of personal belongings",
                    "Liability coverage for injuries or accidents at home",
                    "Temporary accommodation cover if home is uninhabitable"
                ],
                "min_age_required": 25,
                "max_age_limit": 70,
                "insurance_provider": "HomeGuard Insurance"
            },
            {
                "plan_name": "LifeSecure Term Plan",
                "category": "Life",
                "annual_premium": 5000,
                "coverage": "Up to ₹50,00,000 life cover with flexible premium payment options",
                "benefits": [
                    "Life cover with additional critical illness riders",
                    "Flexible premium payment terms",
                    "Nominee benefits in case of untimely death",
                    "Tax-saving under section 80C"
                ],
                "min_age_required": 18,
                "max_age_limit": 60,
                "insurance_provider": "LifeSecure Insurers"
            }
        ]
    }


    # Initialize recommender
    recommender = CreditCardRecommender1(
        api_key=os.getenv('OPENROUTER_API_KEY', '')  # Use OpenRouter API key from environment
    )

    try:
        # Get recommendation
        recommendation = recommender.recommend_credit_card1(
            user_transactions_data, 
            insurance_options
        )

        # Validate recommendation
        if recommender.validate_recommendation1(recommendation):
            print("Recommended Insurance:")
            print(json.dumps(recommendation, indent=2))
            return json.dumps(recommendation, indent=2)
        else:
            print("Invalid recommendation format")
            return {}

    except Exception as e:
        print(f"Recommendation process failed: {e}")
        print(traceback.format_exc())
        return {}






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)