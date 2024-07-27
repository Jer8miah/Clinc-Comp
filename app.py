# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import requests

#set the API key
openai.api_key = "sk-None-l2X4bF4L6g0QNQkeTW6YT3BlbkFJ5kBCqe6yEjLlRAw6PuL6"
google_places_api_key = "AIzaSyBFd2X5zeztTSa99DHm0_clDXfBL40ycBs"

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def chat_with_gpt3(prompt):
    response = openai.chat.completions.create(
      model = "gpt-3.5-turbo",
      messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

def find_nearby_clinics(location):
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "key": google_places_api_key,
        "location": location,
        "radius": 5000, # 5 km
        "type": "hospital"
    }
    response = requests.get(url, params=params)
    results = response.json()["results"]
    clinics = [result["name"] for result in results[:5]]
    return clinics
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get('message')
    if "clinic" in user_input.lower() or "hospital" in user_input.lower():
        # Example coordinates for Memphis, TN
        location = "35.1606,-89.8665" 
        clinics = find_nearby_clinics(location)
        response = "Here are some nearby clinics:\n" + "\n".join(clinics)
    else:
        response = chat_with_gpt3(user_input)
    return jsonify({'response': response})
        
        



if __name__ == "__main__":
    app.run(debug=True)