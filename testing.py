import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Load the trained model
model = load_model('D:/Desktop/Python/facerecognition/backend/home/sign_model_2.h5')

# Set the path to the input image
input_image_path = "D:/Desktop/Python/facerecognition/image5.png"  # Replace with the actual path

# Read and preprocess the input image
input_image = cv2.imread(input_image_path)
input_image = cv2.resize(input_image, (224, 224))  # Resize to match the model's expected input size
input_image = input_image / 255.0  # Normalize the pixel values to the range [0, 1]
input_image = np.expand_dims(input_image, axis=0)  # Add batch dimension

# Make predictions
predictions = model.predict(input_image)
print(predictions)
# Get the predicted class index
predicted_class_index = np.argmax(predictions[0])

# Print the predicted class index
print("Predicted Class Index:", predicted_class_index)

# Map the class index back to the actual class label based on your training data
# class_labels = ['A', 'B', 'C', ..., 'Z']  # Replace with your actual class labels
class_labels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

predicted_class_label = class_labels[predicted_class_index]

# Print the predicted class label
print("Predicted Class Label:", predicted_class_label)
