import csv
import uuid
import random
from faker import Faker

fake = Faker()
Faker.seed(0)
random.seed(0)

# Initialize uniqueness trackers
ssn_set = set()
email_set = set()
phone_set = set()
twitter_set = set()
instagram_set = set()
linkedin_set = set()

def generate_unique_ssn():
    while True:
        ssn = fake.ssn()
        if ssn not in ssn_set:
            ssn_set.add(ssn)
            return ssn

def generate_unique_email():
    while True:
        email = fake.email()
        if email not in email_set:
            email_set.add(email)
            return email

def generate_unique_phone():
    while True:
        phone = fake.phone_number()
        normalized = ''.join(filter(str.isdigit, phone))
        if normalized not in phone_set:
            phone_set.add(normalized)
            return phone

def generate_unique_social_id(existing_set):
    while True:
        social_id = fake.user_name()
        if social_id not in existing_set:
            existing_set.add(social_id)
            return social_id

marital_statuses = ['Single', 'Married', 'Divorced', 'Widowed']
sexes = ['Male', 'Female', 'Other']
sex_weights = [0.49, 0.49, 0.02]

rows = []
for _ in range(50000):
    customer_id = str(uuid.uuid4())
    name = fake.name()
    sex = random.choices(sexes, weights=sex_weights)[0]
    age = random.randint(18, 100)
    address = fake.street_address()
    pincode = fake.zipcode()
    marital_status = random.choice(marital_statuses)
    ssn = generate_unique_ssn()
    email = generate_unique_email()
    phone = generate_unique_phone()
    twitter_id = generate_unique_social_id(twitter_set)
    instagram_id = generate_unique_social_id(instagram_set)
    linkedin_id = generate_unique_social_id(linkedin_set)
    
    rows.append([
        name,
        customer_id,
        sex,
        age,
        address,
        pincode,
        marital_status,
        ssn,
        email,
        phone,
        twitter_id,
        instagram_id,
        linkedin_id
    ])

# Write to CSV
with open('demographic_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow([
        'name', 'customer_id', 'sex', 'age', 'address', 'pincode', 
        'marital_status', 'ssn', 'email', 'phone', 
        'twitter_id', 'instagram_id', 'linkedin_id'
    ])
    writer.writerows(rows)

print("CSV file generated successfully.")