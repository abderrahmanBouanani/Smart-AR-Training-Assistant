import requests
import json

BASE_URL = "http://127.0.0.1:8000/api/"

def test_create_exercise():
    # 1. Create a Sport
    sport_data = {
        "nom": "Test Sport",
        "description": "Sport for testing"
    }
    print("Creating Sport...")
    response_sport = requests.post(f"{BASE_URL}sports/", json=sport_data)
    
    if response_sport.status_code != 201:
        print(f"Failed to create Sport: {response_sport.status_code}")
        print(response_sport.text)
        return

    sport_id = response_sport.json()['id']
    print(f"Sport created with ID: {sport_id}")

    # 2. Create an Exercise linked to the Sport
    exercise_data = {
        "nom": "Test Exercise",
        "description": "Exercise for testing",
        "difficulte": "FACILE",
        "sport": sport_id
    }
    print("Creating Exercise...")
    response_exercise = requests.post(f"{BASE_URL}exercices/", json=exercise_data)

    if response_exercise.status_code != 201:
        print(f"Failed to create Exercise: {response_exercise.status_code}")
        print(response_exercise.text)
    else:
        print("Exercise created successfully!")
        print(response_exercise.json())

if __name__ == "__main__":
    try:
        test_create_exercise()
    except Exception as e:
        print(f"An error occurred: {e}")
