import openai
import requests

#set the API key
openai.api_key = "sk-None-l2X4bF4L6g0QNQkeTW6YT3BlbkFJ5kBCqe6yEjLlRAw6PuL6"
google_places_api_key = "AIzaSyBFd2X5zeztTSa99DHm0_clDXfBL40ycBs"

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

def main():
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit', 'stop', 'bye']:
            break
        elif "clinic" in user_input.lower() or "hospital" in user_input.lower():
            # Example coordinates for Memphis, TN
            location = "35.1606,-89.8665"
            clinics = find_nearby_clinics(location)
            if clinics:
                response = "Here are some nearby clinics: " + ", ".join(clinics)
            else:
                response = "I couldn't find any clinics nearby."
        else: 
            response = chat_with_gpt3(user_input)
        
        
        print("Chatbot:", response)



if __name__ == "__main__":
    main()