import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import os

# Set a dummy API key for testing if the app setup requires it,
# though it will be mocked so it won't be used for actual calls.
os.environ["GEMINI_API_KEY"] = "test_api_key"

# It's important to import the app after the environment variable is set, if the app uses it at import time.
from main import app # Changed from relative to direct import


client = TestClient(app)

# Test Scenario 1: Successful Chat Response
def test_chat_success():
    mock_gemini_response = MagicMock()
    mock_gemini_response.text = "Hello from Gemini!"

    # Patch the 'generate_content' method on the 'models' attribute of the 'client' instance in 'main.py'
    with patch('main.client.models.generate_content', return_value=mock_gemini_response) as mock_generate_content:
        response = client.post("/chat", json={"message": "Hello", "is_initial": False})
        
        assert response.status_code == 200
        assert response.json() == {"response": "Hello from Gemini!"}
        mock_generate_content.assert_called_once_with(
            model="gemini-2.0-flash",  # Model name from main.py
            contents="Hello"
        )

# Test Scenario 2: Successful Initial Greeting
def test_chat_initial_greeting_success():
    mock_gemini_response = MagicMock()
    mock_gemini_response.text = "Welcome! How can I help you today?"

    with patch('main.client.models.generate_content', return_value=mock_gemini_response) as mock_generate_content:
        response = client.post("/chat", json={"message": "", "is_initial": True}) # Message can be empty for initial
        
        assert response.status_code == 200
        assert response.json() == {"response": "Welcome! How can I help you today?"}
        mock_generate_content.assert_called_once_with(
            model="gemini-2.0-flash",
            contents="Greet the user as a friendly AI assistant and offer to help with any questions."
        )

# Test Scenario 3: Gemini API Failure
def test_chat_gemini_api_failure():
    # Patch client.models.generate_content to raise an exception
    with patch('main.client.models.generate_content', side_effect=Exception("Gemini API Error")) as mock_generate_content:
        response = client.post("/chat", json={"message": "Test message", "is_initial": False})
        
        assert response.status_code == 500
        assert "Error calling Gemini API: Gemini API Error" in response.json()["detail"]
        mock_generate_content.assert_called_once_with(
            model="gemini-2.0-flash",
            contents="Test message"
        )

# Test Scenario 4: Input Validation (FastAPI handles missing 'message' if not optional)
# The ChatRequest model has 'message: str', so FastAPI/Pydantic will return a 422 if it's missing.
def test_chat_missing_message_body():
    response = client.post("/chat", json={"is_initial": False}) # Missing 'message'
    assert response.status_code == 422 # Unprocessable Entity
    # The response will contain details about the missing field
    assert "Field required" in response.text
    # Check the location of the error more robustly
    error_detail = response.json()["detail"][0]
    assert error_detail["type"] == "missing"
    assert error_detail["loc"] == ["body", "message"]


def test_chat_missing_is_initial_body():
    # is_initial has a default value (False), so this should still work.
    # The test ensures the default is applied and doesn't cause an error.
    mock_gemini_response = MagicMock()
    mock_gemini_response.text = "Response to default initial"
    with patch('main.client.models.generate_content', return_value=mock_gemini_response) as mock_generate_content:
        response = client.post("/chat", json={"message": "A message"})
        assert response.status_code == 200
        assert response.json() == {"response": "Response to default initial"}
        mock_generate_content.assert_called_once_with(
            model="gemini-2.0-flash",
            contents="A message" # is_initial defaults to False
        )

# Test for when GEMINI_API_KEY might be missing at app startup
# This is more of an integration test for app setup, but useful.
# We need to manipulate os.environ *before* 'from .main import app'
# This requires running this test in a separate file or using pytest features to reload modules.
# For simplicity, this specific scenario might be better tested manually or with a different test structure.
# However, if client.models.generate_content itself fails due to no API key during the call (less likely, usually fails at Client init):
def test_chat_gemini_client_init_failure_simulation():
    # Simulate that client.models.generate_content is not available or fails if client init had issues
    # This specific mock simulates an AttributeError if 'client.models' was not properly initialized or accessible.
    with patch('main.client.models.generate_content', side_effect=AttributeError("Simulated 'models' attribute error due to client init failure")) as mock_generate_content:
        response = client.post("/chat", json={"message": "Test message", "is_initial": False})
        
        assert response.status_code == 500 
        assert "Error calling Gemini API: Simulated 'models' attribute error due to client init failure" in response.json()["detail"]
        # The call might not happen if 'client.models' itself is the problem before 'generate_content' is reached.
        # If the error happens before calling generate_content, then assert_called_once_with might fail or be irrelevant.
        # For this specific mock, we assume generate_content is what's directly patched and fails.
        # If client itself was None, it'd be a different error path.
        mock_generate_content.assert_called_once()

# It's good practice to ensure the environment is clean after tests if modified.
# Pytest fixtures are better for this, but os.environ manipulation is tricky with module imports.
@pytest.fixture(autouse=True)
def cleanup_env_vars():
    original_key = os.environ.get("GEMINI_API_KEY")
    yield
    if original_key is None:
        if "GEMINI_API_KEY" in os.environ:
            del os.environ["GEMINI_API_KEY"]
    else:
        os.environ["GEMINI_API_KEY"] = original_key

# Add a pytest configuration file if not present, e.g. backend/pytest.ini or pyproject.toml
# For now, this should run with `pytest backend/` from the root.
