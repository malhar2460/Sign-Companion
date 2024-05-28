import shutil
import os

# Set the paths to your train and test folders
train_folder = "D:/Desktop/Python/facerecognition/train"
test_folder = "D:/Desktop/Python/facerecognition/test"
combined_folder = "D:/Desktop/Python/facerecognition/combined_data1"

# Create the combined folder if it doesn't exist
os.makedirs(combined_folder, exist_ok=True)

# Function to copy files from source to destination
def copy_files(source_folder, destination_folder):
    for class_folder in os.listdir(source_folder):
        source_path = os.path.join(source_folder, class_folder)
        destination_path = os.path.join(destination_folder, class_folder)

        # Check if the destination folder already exists
        if os.path.exists(destination_path):
            # Merge the contents of the existing folder with the new one
            for file_name in os.listdir(source_path):
                source_file = os.path.join(source_path, file_name)
                destination_file = os.path.join(destination_path, file_name)
                shutil.copy2(source_file, destination_file)
        else:
            # Create a new destination folder and copy the contents
            shutil.copytree(source_path, destination_path)

# Combine train and test folders
copy_files(train_folder, combined_folder)
copy_files(test_folder, combined_folder)

print("Data combined successfully.")

import splitfolders # or import splitfolders
input_folder = "D:/Desktop/Python/facerecognition/combined_data1"
output = "D:/Desktop/Python/facerecognition/new_data" 

splitfolders.ratio(input_folder, output=output, seed=99, ratio=(.8, .2)) 